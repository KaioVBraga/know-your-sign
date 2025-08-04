resource "google_service_account" "cloudbuild" {
  account_id   = "kys-build-service-account"
  display_name = "Cloud Build Service account"
}

resource "google_project_iam_member" "cloudbuild_permission" {
  project = var.project
  member  = "serviceAccount:${google_service_account.cloudbuild.email}"
  role    = "roles/iam.serviceAccountUser"
}

resource "google_project_iam_member" "cloudbuild_log" {
  project = var.project
  member  = "serviceAccount:${google_service_account.cloudbuild.email}"
  role    = "roles/logging.logWriter"
}


resource "google_storage_bucket" "cloudbuild_logs_bucket" {
  name     = "kys-cloudbuild-logs-bucket" # Make sure this name is globally unique
  location = var.region
  # force_destroy               = false # Set to true carefully for destroy
  force_destroy               = true # Set to true carefully for destroy
  uniform_bucket_level_access = true # Recommended for security
}

resource "google_storage_bucket_iam_member" "cloudbuild_logs_bucket_iam" {
  role   = "roles/storage.admin"                                       # Or a more specific role like storage.objectCreator
  member = "serviceAccount:${google_service_account.cloudbuild.email}" # Replace with your SA
  bucket = google_storage_bucket.cloudbuild_logs_bucket.name
}

resource "google_cloudbuild_trigger" "api_trigger" {
  location    = var.region
  name        = "kys-api-trigger"
  description = "Print Hello World from GitHub push"

  github {
    owner = "KaioVBraga"
    name  = "know-your-sign"
    push {
      branch = "^main$"
    }
  }

  # filename = "api/cloudbuild.yaml"

  build {
    step {
      name       = "gcr.io/cloud-builders/bash"
      entrypoint = "bash"
      args       = ["-c", "echo Hello World"]
    }

    logs_bucket = google_storage_bucket.cloudbuild_logs_bucket.id # Reference your new bucket
  }

  service_account = google_service_account.cloudbuild.id
}
