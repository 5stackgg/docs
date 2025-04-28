# Command Line Arguments

While running the installation or update script, you can pass the following options to the script to configure the installation.

## Kubeconfig Location

You may wish to specify the location of your kubeconfig file.

```bash
./update --kubeconfig $HOME/.kube/config
```

## Debug mode

```bash
./update.sh -- debug
```

## Skip Reverse Proxy Check

When running in a CI environment, you can bypass the reverse proxy check by passing either `--reverse-proxy=1` or `--reverse-proxy=0`.
