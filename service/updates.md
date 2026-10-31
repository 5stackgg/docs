# Updates

On a panel with the 5Stack service, you update from the panel. There is no SSH,
`git pull` or `./update.sh`. The agent fetches each release from the 5Stack
cloud, checks its signature, and applies it when you choose.

<ArchitectureDiagram flows="update" />

Click a box to see what it does and what it talks to.

## Choose when updates run

Open the update center in the panel's header. The **Panel** row shows the
installed release, or the release it can update to. Under **When to update**,
pick one:

- **Manual**: updates wait until you click **Update Now**.
- **Scheduled**: a new release runs in your maintenance window. Set the window's
  start and end times.
- **When idle**: a new release runs automatically the first time no matches are
  live inside your window. Set the window's start and end times. It never stops a
  match to make room. If the panel stays busy, it tries again in the next window.

The update center is the only place in the panel to update it. `5stack update` on
the server applies the newest release right away. See
[The 5stack Command](/service/command).

## Update now

When a release is waiting, click **Update Now** on the **Panel** row.

1. If the release moves the database to a new PostgreSQL major version, the
   **Before it starts** card shows how much disk the upgrade needs, how much is
   free, and how long the database will be offline. If there isn't enough free
   disk, the card says so and you can't continue. Otherwise click **Continue**,
   or **Cancel** to leave the panel as it is.
2. Pick when it runs:
   - **Pick a time** schedules it. Players see the maintenance banner from 24
     hours before, or right away if that is sooner.
   - **Now** starts it within a minute, and the banner goes up straight away.

While an update is scheduled, the **Panel** row shows when it will run. Click
**Change** to pick another time, or **Update now** to start it straight away.

The database upgrade works the same way as described in
[Database upgrades](/updating#database-upgrades).

## What players see

1. A maintenance banner at the top of every page, ahead of a scheduled update.
2. When the update starts, new matches are paused. Matches already running keep
   going, and the update waits for them to finish.
3. The release is applied. The API restarts partway through, and the update
   center picks up where it left off.
4. New matches resume, and the banner goes away.

With **Manual**, if live matches haven't finished 30 minutes after the update
starts, it stops, and the **Panel** row shows that the last update failed. Start
it again when the panel is quieter. With **Scheduled** or **When idle**, it waits
for the next window instead.

## The agent updates itself

The `5stack` agent installs its own new versions. If a new version fails to
start, it goes back to the previous one.
