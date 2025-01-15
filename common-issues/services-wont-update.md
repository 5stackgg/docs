# Services Won't Update

Sometimes the services won't update. This is caused by an image SHA not refreshing on your system.

To fix this, you can run the following command to refresh the images:

1. Navigate to the installation directory.
2. Run `git pull` to fetch the latest updates.
3. Execute

```bash
./fix-versions.sh
```
