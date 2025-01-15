# System Not Updating

If after updating the system a service still shows it needs an update, this usually means the version number hasn't properly refreshed in your system.

To fix this issue, follow these steps to refresh the service versions:

1. Navigate to the installation directory.
2. Run `git pull` to fetch the latest updates.
3. Execute

```bash
./fix-versions.sh
```
