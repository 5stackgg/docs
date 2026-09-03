# Bring Your Own S3

5Stack uses S3-compatible storage for storing demos and backups. By default it uses [RustFS](https://rustfs.com/), which is hosted locally within the Kubernetes cluster.

## Demo Storage

The S3 storage is primarily used for storing match demos and backups. When a match is played, the demos are automatically uploaded to the configured S3 storage.

## Configuration

The default configuration uses the in-cluster RustFS, but you can override this by modifying the following files:

1. Update the S3 `S3_ENDPOINT`, `S3_USE_SSL`, `S3_PORT`, and `S3_REGION` configuration in `<INSTALL_DIR>/overlays/config/s3-config.env`:

2. Update the S3 credentials in `<INSTALL_DIR>/overlays/local-secrets/s3-secrets.env` with your provider's access key and secret key.

### Remote provider settings

| Variable               | Notes                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `S3_ENDPOINT`          | Your provider's hostname (for example `s3.us-east-005.backblazeb2.com`). Leaving this as `rustfs` keeps the in-cluster store.                                           |
| `S3_USE_SSL`           | Set to `true` for a remote provider.                                                                                                                                   |
| `S3_PORT`              | `443` for a remote provider.                                                                                                                                           |
| `S3_REGION`            | Must match the region your endpoint expects (Backblaze uses values like `us-east-005`). Requests are signed with it, so a mismatch is rejected. Defaults to `us-east-1`. |
| `S3_FORCE_PATH_STYLE`  | Leave unset for every provider except real AWS S3, which requires `false` for buckets created after September 2020.                                                     |

:::info
If you are upgrading from an install that used MinIO, nothing needs to change. RustFS serves the same volume in place, and `S3_ENDPOINT=minio` keeps working — the panel keeps a Service under that name pointing at the RustFS pods.
:::
