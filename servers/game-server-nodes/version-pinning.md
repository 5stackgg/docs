# Server Version Pinning

Sometimes you may need to use an older version of the server. When Counter-Strike is updated, it may not work correctly with your compiled plugins. To support server version pinning, you are required to provide Steam credentials.

To update your panel with this feature:

1. Open the file `INSTALL_DIR/overlays/local-secrets/steam-secrets.env`, and update the `STEAM_USER` and `STEAM_PASSWORD` values.

::: danger
You should use an account dedicated to updating servers, as we are unable to provide two-factor authentication automatically.
:::

2. After updating these values, run `./update.sh`.
