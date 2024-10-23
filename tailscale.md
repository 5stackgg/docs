# Tailscale Integration

Tailscale is utilized for managing game server nodes in 5Stack. It provides a secure and reliable connection to facilitate on-demand servers for matches.

## Tailscale Access Control Lists (ACLs)

When using Tailscale across multiple networks, it's recommended to set up an Access Control List (ACL). This ACL helps isolate the game server nodes from other machines in your Tailscale network, enhancing security and control.

```bash
{
	"tagOwners": {
		"tag:fivestack": [],
	},

	"autoApprovers": {
		"routes": {
			"10.42.0.0/16": ["tag:fivestack"],
		},
	},

	// Define access control lists for users, groups, autogroups, tags,
	// Tailscale IP addresses, and subnet ranges.
	"acls": [
		{
			"action": "accept",
			"src":    ["tag:fivestack", "10.42.0.0/16"],
			"dst":    ["tag:fivestack:*", "10.42.0.0/16:*"],
		},
	],
}
```
