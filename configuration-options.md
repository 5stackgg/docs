# Configuration Options

While running the installation or update script, you can pass the following options to the script to configure the installation.

## Running with a Reverse Proxy (Not Recommended)

Running the ---reverse-proxy flag will remove SSL ingress, this is not recommended!

```bash
--reverse-proxy
```

## Kubeconfig Location

You may wish to specify the location of your kubeconfig file.

```bash
--kubeconfig $HOME/.kube/config
```
