# RCON Commands Fail

If RCON commands are failing, your firewall might be blocking the TCP port used for RCON. This port can vary depending on your game node server's configuration (it is often 27015, but can be different). Check your game server setup or panel to determine the specific port(s) used for RCON.

## Checking UFW

If you are using UFW, list your current firewall rules with:

```
ufw status
```

Review the output carefully. Look for "ALLOW" rules matching the TCP port(s) used by your game servers for RCON, not just the default port 27015. If your desired port is missing or "DENY" is listed for it, you'll need to adjust the UFW rules. Make sure no rules are explicitly blocking your RCON port.

## Checking iptables

To see your existing iptables rules, run:

```
iptables -L -n
```

Check the "INPUT" chain and locate any rules involving the port used by your game server for RCON. Confirm that there is an "ACCEPT" rule for your specific port (for example, 27015 or whichever port your server uses), and that there isn't a "DROP" or "REJECT" rule for it before the "ACCEPT" rule.

---

**Identify the correct RCON port for your game server before reviewing the firewall rules. Once you are sure the required port is open and not blocked on your firewall, try your RCON command again.**
