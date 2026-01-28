# Lens IDE - Kubernetes Management Made Simple

Lens IDE is a powerful desktop application that provides a visual interface for managing Kubernetes clusters. It's often called "The Kubernetes IDE" and offers an intuitive way to interact with your 5stack infrastructure.

## Download and Installation

Visit [https://k8slens.dev/](https://k8slens.dev/) to download

## Connecting Your 5stack Cluster

### Import kubeconfig File

If you have access to your 5stack server:

1. **Locate your kubeconfig file**:

   ```bash
   # On 5stack server, the kubeconfig is typically at:
   /etc/rancher/k3s/k3s.yaml
   ```

2. **Copy the kubeconfig**:

   ```bash
   # Copy to your local machine
   scp user@your-5stack-server:/etc/rancher/k3s/k3s.yaml ~/.kube/5stack-config
   ```

3. **Edit the server URL**:
   - Open the downloaded `k3s.yaml` file
   - Replace `https://127.0.0.1:6443` with your actual server IP
   - Example: `https://your-server-ip:6443`

4. **Import in Lens**:
   - Open Lens IDE
   - Click "+" in the top-left corner
   - Select "Add Cluster from Kubeconfig"
   - Browse and select your modified k3s.yaml file
   - Click "Add Cluster"
