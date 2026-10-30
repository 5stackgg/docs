# Load Testing

The api repository has a load lab in `load/`. It runs Postgres and Hasura on
your machine the way a panel runs them, fills them with synthetic data shaped
like a real install, and has a few hundred virtual users browse the site with
[k6](https://grafana.com/docs/k6/latest/). Use it to measure a change, such as
a new subscription or a Hasura setting, before it reaches a real install.

### Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) with
  about 12 GB of memory for 200 users (Settings → Resources)
- A checkout of the api repository with `yarn install` done
- python3

### Quick start

From the api repository:

```bash
./load/lab up --scale 10 --pg-memory 8GB   # build the stack: about 2 minutes
./load/lab run baseline --open             # 200 users for about 6 minutes
./load/lab stop                            # when you're done
```

`--open` opens k6's live dashboard at `http://localhost:5665`. When the run
ends, its results are in `load/results/<label>-<time>/`:

- `summary.md`: CPU and memory of Postgres and Hasura, memory per database
  connection, subscription and query latency, errors, and the most expensive
  statements;
- `report.html`: the k6 dashboard, saved (`./load/lab report` opens the
  latest).

### Commands

| Command                                                                                             | What it does                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `up [--scale N] [--pg-memory 16GB] [--api]`                                                         | Builds a fresh stack, replacing the old one. Scale 1 is the size of the install the data is shaped on. |
| `start`, `stop`                                                                                     | Starts or stops the stack, keeping its data.                                                           |
| `status`                                                                                            | Shows the containers, the seed size, the Hasura settings under test and the latest runs.               |
| `run [label] [--users 200] [--ramp 1m] [--hold 4m] [--prepared on\|off] [--explain 250ms] [--open]` | Runs one measured test. On an `--api` stack, `--api off` runs it without sessions.                     |
| `ab [--users 200] [--open]`                                                                         | Runs prepared statements off, then on, and prints the two side by side.                                |
| `compare <run> <run>`                                                                               | Prints runs side by side.                                                                              |
| `report [run]`                                                                                      | Opens a run's k6 report.                                                                               |
| `down`                                                                                              | Removes the stack and its data.                                                                        |

`yarn load <command>` runs the same commands.

### Finding slow queries

```bash
./load/lab run hunt --users 1000 --explain 250ms
```

A run's `summary.md` lists the slowest GraphQL operations as the browser sees
them, with the pages that send them, and the statements that cost Postgres the
most, from `pg_stat_statements`. With `--explain`, Postgres also logs the plan
of every statement slower than the given time, including statements inside
functions and triggers; the slowest plan of each is in `slow-plans.md`.

### Signed-in players

`up --api` also runs the api from your checkout, with Redis, as a panel runs
it. Hasura then asks the api who sent every request and socket, each virtual
player signs in with a real session, and every signed-in tab keeps the api's
own socket open with its ping and presence. Compare `run --api off` and a
normal run on the same stack to see what that costs.

### A bigger machine

A laptop holds about 1,000 users. `remote.sh` runs the lab's Docker host in a
pod on a Kubernetes node and forwards it here, so the same commands run there:

```bash
KUBECONFIG=~/.kube/<cluster> ./load/remote.sh up   # on a node labelled 5stack-dev-server=true
./load/remote.sh lab up --scale 10 --pg-memory 8GB
./load/remote.sh lab run big --users 5000 --open
./load/remote.sh stop                               # frees the ports for the local lab
./load/remote.sh down                               # deletes the pod and its data
```

The pod is privileged (Docker in Docker) and stays within `CPU_LIMIT` (8) and
`MEMORY_LIMIT` (20Gi). Leave cores free for anything on that node that can't
wait, such as game servers.

### What the virtual users do

Each virtual user is one browser tab. It opens the web app's two websockets
and the subscriptions every page keeps open, then moves from page to page,
mostly tournament and match pages, for 4 to 12 minutes. A quarter of the users
are guests and a tenth are organizers. The operations each page sends were
recorded from the web app's real pages. Live matches get a new round with its
kills every 20 seconds.

### Limits

- Without `--api` the api is not running. With it, the api answers sign-ins
  and keeps its sockets, but its jobs, notifications and game-server traffic
  are still not part of the load.
- Nine pages are recorded. A real install sends many more distinct statements,
  so compare runs with each other rather than with a production install.

See `load/README.md` in the api repository for the details, including how to
record the pages again when the web app changes.
