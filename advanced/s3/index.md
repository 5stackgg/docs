# Bring Your Own S3

5Stack uses S3-compatible storage for storing demos and backups. By default it uses [RustFS](https://rustfs.com/), which runs locally on your panel.

## Configuration

The [setup page](/install/#storage) can point a new panel at your S3 storage, and checks the keys and buckets before it installs. To change it later, run this on the panel server with your provider's values:

```bash
sudo 5stack config set \
  S3_ENDPOINT=s3.us-east-005.backblazeb2.com S3_REGION=us-east-005 \
  S3_USE_SSL=true S3_PORT=443 \
  S3_BUCKET=my-5stack S3_DB_BACKUP_BUCKET=my-5stack-db-backups \
  S3_ACCESS_KEY= S3_SECRET=
```

It asks for the access key and secret key, typed hidden, shows the changes, asks, and applies the panel again. `S3_ENDPOINT` is also **Config → S3 storage** in the [`5stack` menu](/service/command#the-menu).

### Remote provider settings

| Variable               | Notes                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `S3_ENDPOINT`          | Your provider's hostname (for example `s3.us-east-005.backblazeb2.com`). Leaving this as `rustfs` keeps the local store.                                               |
| `S3_USE_SSL`           | Set to `true` for a remote provider.                                                                                                                                   |
| `S3_PORT`              | `443` for a remote provider.                                                                                                                                           |
| `S3_REGION`            | Must match the region your endpoint expects (Backblaze uses values like `us-east-005`), or requests are rejected. Defaults to `us-east-1`.                              |
| `S3_FORCE_PATH_STYLE`  | Leave unset for every provider except real AWS S3, which requires `false` for buckets created after September 2020.                                                     |
| `S3_DB_BACKUP_BUCKET`  | Where the panel's nightly database backups go. Use a second bucket of your own, in the same account, such as `<bucket>-db-backups`. The backup job keeps only the newest 7 objects in it, so never share it with demos. |

:::info
If you are upgrading from an install that used MinIO, nothing needs to change. `S3_ENDPOINT=minio` keeps working.
:::
