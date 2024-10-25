# Installation

The [5Stack-Panel](https://github.com/5stackgg/5stack-panel) repostiory includes scirpts to help facilityte the installation process.

```bash
git clone https://github.com/5stackgg/5stack-panel
```

::: danger
Please ensure you have met the [Requirements](/install/requirements) before you begin installing the 5Stack Panel.
:::

## Running the Installation Script

Inside the 5Stack-Panel directory, run the installation script with `sudo` priviliges, `./install.sh`.

After running the installation script, there are additional steps required to complete the installation. Please refer to the [Post Installation](#post-installation) section for more details.

## Post Installation

You will need to set up additional environment variables located in the `INSTALL_DIR/base/properties` and `INSTALL_DIR/base/secrets` folders.

## Api Config
Located in `INSTALL_DIR/base/properties/api.env`, update the domains and ensure your DNS points to the 5Stack Panel.

Additionally, there are Tailscale environment variables that need to be set. The .env file should contain links directing you to where you can obtain these variables.

## S3 Setup
5Stack includes a built-in S3-compatible object storage system.

### S3 console host 
Located in `INSTALL_DIR/base/properties/s3.env`, update the domain for the S3 console host. Ensure that your DNS is configured to point this domain to the 5Stack Panel.

#### S3 Bucket Setup

Located in `INSTALL_DIR/base/secrets/s3-secrets.env`, you will need to create a new bucket and generate an access key and secret key.

You can obtain the access key and secret key by accessing your `S3_CONSOLE_HOST`, which should have been set up in the previous step.
Log in using the credentials found in `INSTALL_DIR/base/secrets/minio-secrets.env`.


## Steam Api Key Secret
Located in `INSTALL_DIR/base/secrets/steam-secrets.env`, update the `STEAM_WEB_API_KEY`. You can obtain this key from the [Steam Developer Portal](https://steamcommunity.com/dev/apikey).
