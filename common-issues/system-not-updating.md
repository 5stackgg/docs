# System Not Updating

If a service still appears as needing an update after you've already updated the system, the version information may not have refreshed properly.

::: tip
A rebuild of an image that changed nothing used to show up here as a pending update. The panel now compares against every digest the node knows for the image, so that no longer happens. Update the panel first if you still see it.
:::

To fix this, follow these steps to refresh the service versions:

1. **On each server running 5Stack services, run:**

   ```bash
   crictl image | grep ghcr.io/5stackgg | awk '{print $3}' | xargs -n 1 crictl rmi
   ```

   This command removes cached 5Stack images so the latest versions can be pulled.

2. **In the 5Stack Panel, click the `Update` button** to refresh the service status.

After completing these steps, the update status should display correctly.
