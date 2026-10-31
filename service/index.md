# The 5Stack Service

The 5Stack service is a program, `5stack`, that runs as a system service on your
panel server and on each game server node. It takes the place of the git
checkout and the `install.sh` and `update.sh` scripts:

- **Install** the panel with one command, and answer the setup questions on a
  web page or in the terminal.
- **Update** from the panel's header, when you choose. No SSH, `git pull` or
  `./update.sh`.
- **Add game server nodes** by typing a short code the node shows.
- **Move** the panel to a new server, game server nodes included.

<ArchitectureDiagram flows="running,install,update,join,migrate" />

Pick a flow above the diagram to see which parts it uses, and click a box to see
what it does.

## What runs where

- **On the panel server**, the agent runs as root under systemd
  (`5stack.service`). It keeps its own credentials in `/var/lib/5stack`, which
  only root can read.
- **On each game server node**, the same agent joins the node to your panel and
  re-joins it if the panel moves.
- **Both connect out** to the 5Stack cloud at `get.5stack.gg` over HTTPS.
  Nothing connects in to them, and the agent doesn't listen on a network port.

Anything the 5Stack cloud passes between your servers, such as your setup
answers or a node's join keys, is encrypted to the server that receives it. 5Stack
passes it along but can't read it.

## What needs the 5Stack cloud

Installing, updating, adding a game server node and moving to a new server go
through the 5Stack cloud. The panel, matches and game
servers that are already running don't depend on it. If `get.5stack.gg` can't be
reached, they keep working, and only those steps wait.

## Where to start

- A new server: [Install](/service/install).
- A panel you installed from the git checkout:
  [Move an Existing Install](/service/existing-install).
- Adding game servers: [Add a Game Server Node](/service/game-server-nodes).
- Every command: [The 5stack Command](/service/command).
