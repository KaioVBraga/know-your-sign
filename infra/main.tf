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

  metadata_startup_script = file("./https-startup.sh")

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


