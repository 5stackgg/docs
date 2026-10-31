# Updates

On a panel with the 5Stack service, you update from the panel. There is no SSH,
`git pull` or `./update.sh`. The agent fetches each release from the 5Stack
cloud, checks its signature, and applies it when you choose.

<ArchitectureDiagram flows="update" />

Click a box to see what it does and what it talks to.

## Choose when updates run

Open the update center in the panel's header. The **Panel** row shows the
installed release and, when there is one, the new release. Under
**When to update**, pick one:

- **Manual**: nothing runs until you start it. Click **Update Now**, or pick a
  time for it to run.
- **Scheduled**: a new release runs in the maintenance window you set.
- **When idle**: a new release runs automatically the first time the panel is
  idle inside your window, meaning no live matches, streams or renders. It never
  stops a match to make room. If the panel stays busy, it tries again in the next
  window.

The update center is the only place to update the panel. `5stack update` on the
server applies the newest release right away. See
[The 5stack Command](/service/command).

## Before it starts

Some releases need more than a restart. The update center shows what will happen
before anything changes. For a new PostgreSQL major version, it shows:

- how much disk the upgrade needs, and how much is free on the database's node,
- how long the database will be offline,
- where the old data is kept, such as `timescaledb-pg18`, so you can roll back.

Click **Continue** to go ahead, or **Cancel** to leave the panel as it is. The
upgrade works the same way as described in
[Database upgrades](/updating#database-upgrades), and the database is backed up
before migrations run.

## What players see

1. For a scheduled update, a maintenance banner appears at the top of every page
   24 hours ahead.
2. When the update starts, the banner says maintenance is in progress, and new
   matches are paused. Matches already running keep going, and the update waits
   for them to finish.
3. The release is applied. The API restarts partway through, and the update
   center picks up where it left off.
4. New matches resume, and the banner goes away.

With **Manual**, if live matches haven't finished 30 minutes after you start the
update, it stops and the update center says so. Start it again when the panel is
quieter. With **Scheduled** or **When idle**, it waits for the next window
instead.

## The agent updates itself

The `5stack` agent installs its own new versions. If a new version fails to
start, it goes back to the previous one.
