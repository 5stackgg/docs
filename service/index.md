# How the 5Stack Service Works

The 5Stack service is a program, `5stack`, that runs as a system service on your
panel server and on each game server node. It is how a panel is installed and
run:

- **Install** the panel with one command, and answer the setup questions on a
  web page or in the terminal. See [Install](/install/).
- **Update** from the panel, when you choose. See [Updating](/updating).
- **Manage the server from your browser**: updates, settings, add-ons, GPU
  nodes, backups and logs, all with buttons. See
  [Browser Console](/service/console).
- **Add game server nodes** by typing a short code the node shows. See
  [Add a Game Server Node](/servers/game-server-nodes/create-game-server-node).
- **Move** the panel to a new server, game server nodes included. See
  [Move to a New Server](/service/new-server).
- **Back up** the panel into one encrypted recovery backup. See
  [Backups](/install/backups).
- **Change settings** with `5stack config`, and run the panel's scripts with
  `5stack run`, with no git checkout. See [Command Reference](/service/cli).

On the server, `sudo 5stack ui` opens the browser console, and `5stack` on its
own opens a menu of all of this in the terminal. See
[The 5stack Command](/service/command).

See [How It Fits Together](/service/how-it-fits-together) for a diagram of what
runs where and what each part talks to.

## What runs where

- **On the panel server**, the agent runs as root under systemd
  (`5stack.service`). It keeps its own credentials in `/var/lib/5stack`, which
  only root can read.
- **On each game server node**, the same agent joins the node to your panel and
  re-joins it if the panel moves.
- **Both connect out** to the 5Stack cloud at `get.5stack.gg` over HTTPS.
  Nothing connects in to them, and the agent doesn't listen on a network port.

Anything the 5Stack cloud passes between your servers, such as your setup
answers or a node's join keys, is encrypted to the server that receives it.
5Stack passes it along but can't read it.

## What needs the 5Stack cloud

Installing, updating, adding a game server node and moving to a new server go
through the 5Stack cloud. The panel, matches and game servers that are already
running don't depend on it. If `get.5stack.gg` can't be reached, they keep
working, and only those steps wait.

## Panels installed from the git checkout

A panel installed with `git clone` and `./install.sh` moves onto the 5Stack
service with `git pull && sudo ./service.sh`. Its config and secrets carry over.
See [Upgrade an Existing Panel](/service/existing-install).
