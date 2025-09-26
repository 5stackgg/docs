# Game Server Offline Support

If your internet connection goes down, you can still set up and run offline matches using the Game Server Node Connector interface.

To access the offline interface, open a browser and go to your node’s LAN IP at:  
`http://<lan-ip>:8080`

- **Username:** `5s`
- **Password:** The node’s `name`

:::info
To find the node’s name either on the the panel or run the following command on your node: `systemctl cat k3s-agent`
:::