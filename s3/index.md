# Bring Your Own S3

5Stack uses S3-compatible storage for storing demos and backups. By default, it uses MinIO which is hosted locally within the Kubernetes cluster.

## Demo Storage

The S3 storage is primarily used for storing match demos and backups. When a match is played, the demos are automatically uploaded to the configured S3 storage.

## Configuration

The default configuration uses MinIO, but you can override this by modifying the following files:

1. Update the S3 `S3_ENDPOINT`, `S3_USE_SSL`, and `S3_PORT` configuration in `<INSTALL_DIR>/base/properties/s3-config.env`:

2. Update the S3 credentials in `<INSTALL_DIR>/overlays/secrets/s3-secrets.env` with your provider's access key and secret key.