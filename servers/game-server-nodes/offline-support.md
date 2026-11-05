# Game Server Offline Support

If your internet connection goes down, you can still set up and run offline matches with the offline match tool on each game server node.

Open a browser on the same network as the node and go to its LAN IP:
`http://<lan-ip>:8585`

The panel links to it from **Game Server Nodes → your node → Offline**. That section also shows whether the node is ready for offline matches.

## Signing in

The offline match tool asks for the node's offline password. Every node has its own.

- **In the panel:** Game Server Nodes → your node → Offline → **Copy Password**. Copy it while the panel is reachable, before you need it.
- **Panel down?** On the node itself, run:

  ```bash
  sudo cat /var/lib/rancher/k3s/agent/pod-manifests/.offline-password
  ```

After 10 wrong passwords in 5 minutes from one address, that address has to wait before it can try again.

:::info
To use a password of your own, set `OFFLINE_MATCHES_PASSWORD` in the environment of the game server node connector DaemonSet. Every node then shares that one password. **Copy Password** still shows the generated password, so read the file above to see the one a node actually uses.
:::

## Match types

An offline match can be **Competitive** (5 players per team), **Wingman** (2),
**Duel** (1) or **Rush** (3).
