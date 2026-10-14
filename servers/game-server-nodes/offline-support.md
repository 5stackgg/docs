# Game Server Offline Support

If your internet connection goes down. You can still set up and run offline matches using the Game Server Node Connector interface.

To access the offline interface, open a browser and go to your node’s LAN IP at:  
`http://<lan-ip>:8585`

- **Username:** `5s`
- **Password:** The node’s `name`

An offline match can be **Competitive** (5 players per team), **Wingman** (2),
**Duel** (1) or **Rush** (3). The plugin applies Rush's fixed rules itself, since
an offline match never reaches the panel's database.

:::info
To find the node’s name either on the the panel or run the following command on your node: `systemctl cat k3s-agent`
:::
