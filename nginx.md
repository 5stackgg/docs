# Nginx Configuration

If you need to host the panel on a system that already uses ports 80 and 443, you can modify the [Nginx service](https://github.com/5stackgg/5stack-panel/blob/main/base/nginx/service.yaml) YAML to change the listening ports.

The YAML file is located in the `base/nginx/service.yaml` directory.

You can update the ports in the `targetPort` section as shown below:

```
  - appProtocol: http
    name: http
    port: 80
    protocol: TCP
    targetPort: http
  - appProtocol: https
    name: https
    port: 443
    protocol: TCP
    targetPort: https
```