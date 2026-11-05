# Custom Kubernetes YAML

Sometimes you may need to customize the K8s YAML files, for instance if you want to add the cs2 ranks plugin. You may need to add mysql.

On the panel server, create a new folder called `/etc/5stack/custom/mysql`. Your custom overlays live in `/etc/5stack/custom`, so they survive every update.

::: code-group

```yaml [kustomization.yaml]
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: 5stack

resources:
  - deployment.yaml
  - service.yaml
  - pvc.yaml

secretGenerator:
  - name: mysql-secret
    literals:
      - password=CHANGE_ME
```

```yaml [deployment.yaml]
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  selector:
    matchLabels:
      app: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          env:
            - name: MYSQL_DATABASE
              value: ranks
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: password
          ports:
            - containerPort: 3306
              name: mysql
          volumeMounts:
            - name: mysql-persistent-storage
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-persistent-storage
          persistentVolumeClaim:
            claimName: mysql-pvc
```

```yaml [pvc.yaml]
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv
  namespace: 5stack
spec:
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: /opt/5stack/mysql
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: 5stack-timescaledb
              operator: In
              values:
                - "true"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
  namespace: 5stack
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: local-storage
  resources:
    requests:
      storage: 2Gi
  volumeName: mysql-pv
```

```yaml [service.yaml]
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  ports:
    - port: 3306
      targetPort: 3306
  selector:
    app: mysql
```

:::

Once you have created the files, apply them with:

```bash
sudo 5stack run custom.sh mysql
```

Without the folder's name, the script asks which overlay to deploy. You can also pick **Custom overlays** in the [`5stack` menu](/service/command#the-menu).

::: info
To allow the plugin to connect to the database. Use the service name `mysql`.
:::
