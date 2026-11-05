# RCON Commands Fail

If RCON commands are failing, your firewall might be blocking the TCP port used for RCON. It is often 27015, but can be different. Check your game server setup or panel for the port your servers use.

## Checking UFW

If you are using UFW, list your current firewall rules with:

```
ufw status
```

Look for "ALLOW" rules matching the TCP port(s) your game servers use for RCON. If a port is missing or "DENY" is listed for it, adjust your UFW rules.

## Checking iptables

To see your existing iptables rules, run:

```
iptables -L -n
```

In the "INPUT" chain, confirm there is an "ACCEPT" rule for your RCON port, and no "DROP" or "REJECT" rule for it before the "ACCEPT" rule.

Once the port is open, try your RCON command again.
