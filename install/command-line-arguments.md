# Command Line Arguments

While running the installation or update script, you can pass the following options to the script to configure the installation.

## Running with a Reverse Proxy

Running the ---reverse-proxy flag will remove SSL ingres

```bash
--reverse-proxy
```

:::danger
Running the ---reverse-proxy flag will remove SSL ingress, this is not recommended!
:::

## Kubeconfig Location

You may wish to specify the location of your kubeconfig file.

```bash
--kubeconfig $HOME/.kube/config
```
