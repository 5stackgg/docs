# Creating a Game Server Node

Use your panel to create and register a new game server node. The panel will generate a one‑line bash install script for you to run on a fresh, supported Linux host (we recommend Ubuntu 22.04+).

## Prerequisites

Before you begin, review the system requirements and networking needs:

- See Game Server Node requirements: [Requirements](./requirements.md)

## Steps

1. In the panel, go to Servers → Game Server Nodes.
2. Click Create Node and copy the generated install command.
3. On the target machine (fresh ubuntu LTS install recommended), connect via SSH as a user with sudo/root privileges.
4. Paste and run the command. The installer will set up all required components and register the node with your panel.
5. Return to the panel to confirm the node shows as Connected.

This creates an internal network the panel uses to create and manage servers. For a broader overview, see [What is installed?](/install/what-is-installed.md).
