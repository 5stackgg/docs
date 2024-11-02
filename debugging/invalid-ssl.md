# Invalid SSL

Sometimes the SSL certificates are invalid. This is a common issue with Nginx.

To fix this, you can run the following command to generate new certificates:

1. Navigate to the installation directory.
2. Run `git pull` to fetch the latest updates.
3. Execute

```bash
./fix-ssl.sh
```
