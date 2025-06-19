# HashiCorp Vault

Vault is used to store and tightly control access to encryption keys for protecting secrets which can be used for 5stack.

## Install

In the `<INSTALL_DIR>` of your panel, located under `overlays/vault/scripts` there are two scripts that we will run.

1. Install

Run `./overlays/vault/scripts/install.sh`, which will install the external-secrets required for Vault to work within a Kubernetes cluster.

2. Setup Vault

::: warning
The setup vault script should only be run if it's a clean install of vault, otherwise you should manually configure vault access.
:::

Run `./overlays/vault/scripts/setup-vault.sh`, which will setup the proper access to your vault within the Kubernetes cluster.

3. After running these scripts run `./update.sh` and it should modify your secrets to use the new secret manager.
