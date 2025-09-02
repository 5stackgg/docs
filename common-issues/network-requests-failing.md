# Network Requests Failing

If you notice that your API logs show failed requests to services like GitHub or SteamCMD, it may be caused by a search domain set by your DHCP server.

## Confirming Search Domains

To check if your DHCP server is setting a search domain, review your `/etc/resolv.conf` file. Look for any `search` or `domain` entries - if there's anything other than standard DNS servers, you may have this issue.

## Change Search Domain

**Important:** Do not directly edit `/etc/resolv.conf` as it will be overwritten on reboot by your system's network management service.

### Method 1: Using systemd-resolved (Ubuntu 18.04+, most modern Linux)

1. Create or edit the systemd-resolved configuration:

   ```bash
   sudo nano /etc/systemd/resolved.conf
   ```

2. Add or modify these lines:

   ```
   [Resolve]
   Domains=~.
   ```

3. Restart systemd-resolved:
   ```bash
   systemctl restart systemd-resolved
   ```

### Method 2: Using Netplan (Ubuntu with Netplan)

1. Find your netplan configuration file:

   ```bash
   ls /etc/netplan/
   ```

2. Edit the configuration file (usually `50-cloud-init.yaml` or similar):

   ```bash
   nano /etc/netplan/50-cloud-init.yaml
   ```

3. Update the search to be an empty array

   ```yaml
   search: []
   ```

4. Apply the changes:
   ```bash
   netplan apply
   ```

### Method 3: Using NetworkManager

1. Edit the connection configuration:

   ```bash
   nmcli connection modify "connection-name" ipv4.dns-search ""
   ```

2. Restart NetworkManager:
   ```bash
   sudo systemctl restart NetworkManager
   ```

### Method 4: DHCP Client Configuration

1. Edit the DHCP client configuration:

   ```bash
   sudo nano /etc/dhcp/dhclient.conf
   ```

2. Add these lines to override DHCP-provided DNS:

   ```
   supersede domain-search "";
   ```

3. Restart networking:
   ```bash
   sudo systemctl restart networking
   ```

### Verification

After applying any method, verify your changes:

1. Check the current resolv.conf:

   ```bash
   cat /etc/resolv.conf
   ```

2. Test DNS resolution:

   ```bash
   nslookup github.com
   ```

3. Reboot and verify the changes persist:
   ```bash
   sudo reboot
   ```
