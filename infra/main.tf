terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.8.0"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}


# Networking
resource "google_compute_network" "vpc_network" {
  name                    = "kys-vpc-network"
  routing_mode            = "REGIONAL"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet_1" {
  region        = var.region
  name          = "kys-subnet-1"
  ip_cidr_range = "10.0.1.0/24"
  network       = google_compute_network.vpc_network.name
  depends_on    = [google_compute_network.vpc_network]
}

resource "google_compute_firewall" "vpc_network_firewall_ssh" {
  name    = "kys-vpc-network-firewall-ssh"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["187.16.187.91/32"]
  source_tags   = ["web"]
}

resource "google_compute_firewall" "vpc_network_firewall_http" {
  name    = "kys-vpc-network-firewall-http"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  source_tags   = ["web"]
}


# API
resource "google_compute_address" "api_internal_ip_address" {
  name         = "kys-api-internal-ip-address"
  region       = var.region
  subnetwork   = google_compute_subnetwork.subnet_1.id
  address_type = "INTERNAL"
}

resource "google_compute_address" "api_external_ip_address" {
  name         = "kys-api-external-ip-address"
  region       = var.region
  address_type = "EXTERNAL"
}

resource "google_compute_instance" "api_instance" {
  name         = "kys-api-instance"
  machine_type = "f1-micro"

  metadata = {
    "ssh-keys" : "kaio:ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOyZoMaDnwmACxedrcpFD5i7qOJzAtKCqT4RGQ/4glX3 kaiovbraga2001@gmail.com"
  }

  metadata_startup_script = file("./setup.sh")

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      labels = {
        my_label = "kys-api-instance-disk"
      }
    }
  }

  network_interface {
    network    = google_compute_network.vpc_network.name
    subnetwork = google_compute_subnetwork.subnet_1.name
    network_ip = google_compute_address.api_internal_ip_address.address

    access_config {
      nat_ip = google_compute_address.api_external_ip_address.address
    }
  }

  tags = ["web"]
}


# DB
resource "google_compute_global_address" "private_ip_alloc" {
  name          = "kys-db-private-ip-range"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc_network.id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.vpc_network.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_alloc.name]
}

resource "google_sql_database" "db" {
  name     = "kys-db"
  instance = google_sql_database_instance.db_instance.name
}

resource "google_sql_database_instance" "db_instance" {
  depends_on = [google_service_networking_connection.private_vpc_connection]

  name             = "kys-db-instance"
  region           = "us-central1"
  database_version = "MYSQL_8_0"
  settings {
    # tier = "db-g1-small"
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled                                  = false
      private_network                               = google_compute_network.vpc_network.self_link
      enable_private_path_for_google_cloud_services = true
    }
  }

  deletion_protection = false
}


# DB Admin User
resource "google_secret_manager_secret" "db_admin_password" {
  secret_id = "kys-db-admin-password"

  labels = {
    label = "my-label"
  }

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "db_admin_password_version" {
  secret      = google_secret_manager_secret.db_admin_password.id
  secret_data = file("./db_admin_password.txt")
}

resource "google_sql_user" "db_admin_user" {
  instance = google_sql_database_instance.db_instance.name
  name     = "admin"
  password = google_secret_manager_secret_version.db_admin_password_version.secret_data
}

# DB API User
resource "google_secret_manager_secret" "db_api_password" {
  secret_id = "kys-db-api-password"

  labels = {
    label = "my-label"
  }

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "db_api_password_version" {
  secret      = google_secret_manager_secret.db_api_password.id
  secret_data = file("./db_api_password.txt")
}

resource "google_sql_user" "db_api_user" {
  instance = google_sql_database_instance.db_instance.name
  name     = "kys-api"
  password = google_secret_manager_secret_version.db_api_password_version.secret_data
}
