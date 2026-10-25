# Load Testing

The api repository has a load lab in `load/`. It runs Postgres and Hasura on
your machine the way a panel runs them, fills them with synthetic data shaped
like a real install, and has a few hundred virtual users browse the site with
[k6](https://grafana.com/docs/k6/latest/). Use it to measure a change, such as
a new subscription or a Hasura setting, before it reaches a real install.

### Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) with at
  least 16 GB of memory for 200 users (Settings → Resources)
- The [api](https://github.com/5stackgg/api) repository with `yarn install` done
- python3

### Quick start

From the api repository:

```bash
./load/lab up --scale 10          # build the stack: about 25 minutes
./load/lab run baseline --open    # 200 users for 12 minutes
```

`--open` opens k6's live dashboard at `http://localhost:5665`. When the run
ends, its results are in `load/results/<label>-<time>/`:

- `summary.md`: CPU and memory of Postgres and Hasura, memory per database
  connection, subscription and query latency, errors, and the most expensive
  statements;
- `report.html`: the k6 dashboard, saved (`./load/lab report` opens the
  latest).

### Commands

| Command                                                                          | What it does                                                                                           |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `up [--scale N] [--pg-memory 16GB]`                                              | Builds a fresh stack, replacing the old one. Scale 1 is the size of the install the data is shaped on. |
| `start`, `stop`                                                                  | Starts or stops the stack, keeping its data.                                                           |
| `status`                                                                         | Shows the containers, the seed size, the Hasura settings under test and the latest runs.               |
| `run [label] [--vus 200] [--ramp 2m] [--hold 10m] [--prepared on\|off] [--open]` | Runs one measured test.                                                                                |
| `ab [--vus 200] [--open]`                                                        | Runs prepared statements off, then on, and prints the two side by side.                                |
| `compare <run> <run>`                                                            | Prints runs side by side.                                                                              |
| `report [run]`                                                                   | Opens a run's k6 report.                                                                               |
| `down`                                                                           | Removes the stack and its data.                                                                        |

`yarn load <command>` runs the same commands.

### What the virtual users do

Each virtual user is one browser tab. It opens the web app's two websockets
and the subscriptions every page keeps open, then moves from page to page,
mostly tournament and match pages, for 4 to 12 minutes. A quarter of the users
are guests and a tenth are organizers. The operations each page sends were
recorded from the web app's real pages. Live matches get a new round with its
kills every 20 seconds.

### Limits

- The api is not running, so its jobs, notifications, presence and game-server
  traffic are not part of the load.
- Nine pages are recorded. A real install sends many more distinct statements,
  so compare runs with each other rather than with a production install.

See `load/README.md` in the api repository for the details, including how to
record the pages again when the web app changes.
