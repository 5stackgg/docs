# Updating the 5Stack Panel

You update the panel from the panel. There is no SSH, `git pull` or update
script. Each new release installs when you choose.

::: tip Panel installed from the git checkout?
Move it onto the 5Stack service once, with `git pull && sudo ./service.sh`. See
[Upgrade an Existing Panel](/service/existing-install).
:::

## Choose when updates install

In the panel, open **Settings → System → Panel updates**. Under
**When to update**, pick one:

- **Manual**: updates wait until you press **Update Now**.
- **Scheduled**: updates run in your maintenance window. Set the window's start
  and end times.
- **When idle**: updates run in your maintenance window once no matches are
  live. If matches are still live, it tries again in the next window.

A new panel starts on **When idle** from 03:00 to 06:00 server time. A panel
moved over from the git checkout starts on **Manual**. The same choice covers
the 5Stack service itself: on **Manual** it waits for **Update Now** too.

On the panel server, `5stack update-policy` sets the same thing:

```bash
5stack update-policy idle --window 03:00-06:00
```

Use `manual`, `scheduled --window <start>-<end>` or `idle --window <start>-<end>`.

## Update now

When a release is waiting for you, the update center in the panel's header shows
the **Panel** row with **Update Now**.

1. If the release upgrades the database, the **Before it starts** card shows
   how much disk the upgrade needs, how much is free, and how long the database
   will be offline. If there isn't enough free disk, the card says so and you
   can't continue. Otherwise click **Continue**, or **Cancel** to leave the
   panel as it is.
2. Pick when it runs:
   - **Pick a time** schedules it.
   - **Now** starts it within a minute.

While an update is scheduled, the **Panel** row shows when it will run. Click
**Change** to pick another time, or **Update Now** to start it straight away.

## Update from the terminal

On the panel server, run:

```bash
5stack update
```

It applies the newest release on your channel straight away, by the same rules
as **Update Now**. It needs no sudo once you are in the `5stack` group. You can
also pick **Updates** in the [`5stack` menu](/service/command#the-menu).

To schedule it instead, like **Pick a time**, give a time:

```bash
5stack update --at 03:00
```

`03:00` is the next time that clock time comes round on the server. See
[Command Reference](/service/cli#updates) for the other options.

## What players see

Most updates apply straight away. Players see nothing, and matches carry on.

An update holds new matches only when it would restart something that can't
restart without downtime: the database, the cache, file storage or search. Then:

1. The panel shows the banner **New matches are on hold while the panel
   updates. Matches already running carry on.** New matches wait for a server
   until the update ends.
2. The update waits for live matches to finish, then applies the release.
3. New matches start again by themselves, and the banner goes away.

If live matches haven't finished 30 minutes after the hold starts, a **Manual**
update stops, and the **Panel** row shows that it failed. Start it again when
the panel is quieter. With **Scheduled** or **When idle**, it waits for the next
window instead.

## Database upgrades

When a release moves the database to a new PostgreSQL major version (for
example from 17 to 18), the panel doesn't work until the database is back, and
the update holds new matches while it runs.

The upgrade copies the data, so the old database stays on the server as
`timescaledb-pgNN` (for example `timescaledb-pg17`) next to the live one.
