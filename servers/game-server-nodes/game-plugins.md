# Game Plugins

::: info Game plugins, not panel plugins
This page is about **CS2 server-side plugins** that load into your game servers.
For a web app that runs inside the panel, see
[5Stack Plugin Development](/plugins/) — those are registered under
**Settings → Application → Panel Plugins**.
:::

5Stack can install CS2 server plugins onto your Game Server Nodes for you: pick
one from the directory, and every node downloads the release, checks it against
the digest the registry published, and unpacks it into the node's plugin
directory.

It is on by default; the registry it reads from is configured under
**Settings → Application → Plugin Directory**.

::: danger You are running someone else's code
A game plugin is a .NET assembly loaded into the `cs2` process on your machines.
It can do anything that process can. Install plugins you trust, and prefer the
ones marked **Verified**, which means a 5Stack maintainer reviewed the entry.
:::

## The directory

**Plugin Directory**, in the **Platform** group of the left navigation, lists
everything in the catalog. It is administrator-only: it is where third-party
code gets chosen to run on your servers, which is not a browsing experience for
players. Each entry says which runtime it is built for, who wrote it, and
whether it needs an external service you have to provide yourself.

The catalog is pulled from a registry — by default
`https://registry.5stack.gg/`, published from
[5stackgg/plugin-registry](https://github.com/5stackgg/plugin-registry). Point
**Registry URL** at a fork or an internal mirror if you would rather curate your
own, then hit **Sync Now**.

Syncing happens automatically every 30 minutes. A registry that fails to load,
or comes back empty, leaves the last good catalog in place rather than emptying
the directory.

## When the catalog does not have it

The registry is a curated list, and CS2 has more plugins than it carries. If the
one you want is not in the directory, **Add a plugin** takes a release URL and
turns it into an entry of your own:

- a **repository** — `https://github.com/owner/repo` — resolves to the newest
  Linux archive of its latest release, the same choice the registry build makes;
- a **release** — `.../releases/tag/v1.2.0` — pins that release instead;
- a **direct link** to a `.zip` is taken as-is, and you supply the slug and
  version yourself, because nothing in the URL reliably says what they are.

You always pick the framework: a CounterStrikeSharp build unpacks perfectly well
under SwiftlyS2 and then never loads, and nothing inside the archive says which
one it was built for.

The panel downloads the archive once and records its SHA-256, so every node
verifies its own download against a digest the same way it does for a
catalogued plugin. From there it installs, versions, and loads exactly like a
registry entry — modes select it, nodes converge to it, the directory shows its
coverage. It is marked **Custom** so it is clear nobody reviewed it.

::: danger Nobody reviewed this one
A game plugin runs inside the `cs2` process on your machines. Installing from
the directory means a 5Stack maintainer at least looked at the entry; adding one
by URL means you are vouching for it yourself.
:::

Adding the same slug again with a newer release adds a version rather than a
second entry — that is how you update one. A registry sync never touches your
entries: it will not overwrite one, prune one, or replace it if the catalog
later publishes a plugin under the same slug. **Remove from catalog**, on the
plugin's page, deletes it once it is uninstalled from every node.

If you find yourself adding several, point **Registry URL**
[at your own fork of the registry](#the-directory) instead — one index every
panel you run can read, rather than the same URLs typed into each of them.

## Installing

Pressing **Install** records that this deployment wants the plugin. It does not
reach out to your nodes. Each node then converges to that list on its own:

1. every 5 minutes, and once on boot, the node's connector asks the panel what
   it should have,
2. the panel resolves that to concrete downloads for the runtime **that node**
   runs — the newest release, or the exact version if one is pinned,
3. the node downloads anything missing, **verifies the SHA-256**, and checks
   every path in the archive before a byte is written,
4. it unpacks it into `/opt/5stack/custom-plugins/`, deleting the version it
   replaced and recording which files belong to it,
5. it removes any managed plugin that is no longer wanted, and reports back
   everything it now has.

An archive that does not match its digest, or that contains a path escaping the
plugin directory, is refused and nothing reaches disk.

Because this is a pull, there is nothing to re-run and nothing to remember. A
node that was offline when you clicked install picks the plugin up when it comes
back, and a node that joins the cluster next week arrives, asks, and converges
like every other one.

::: warning A node that cannot reach the panel changes nothing
Failing to fetch the list is not the same as being told to have nothing. A node
that cannot reach the API leaves its plugins exactly as they are and tries again
on the next pass. Treating a failed request as an empty answer would uninstall
every plugin on every node the first time the API restarted.
:::

Hand-placed plugins are never touched by any of this — see
[what is actually on a node](#what-is-actually-on-a-node).

### Install state is a count, not a yes or no

Since nodes converge on their own clocks, "installed" is a fraction: how many
online nodes report the plugin against how many should have it. The directory
shows one of:

| State | What it means |
| --- | --- |
| **Installed** | Every online node reports it on disk |
| **Partial** | Some nodes have it, some do not |
| **Pending** | Asked for, but no node has reported it yet — nothing has converged since you asked, or no node is online to converge |
| **Failed** | A node reported the install as failed; the error is kept on that node's row |
| **Manual** | Nobody asked for it, but it is there anyway: someone dropped it in by hand |

Only enabled nodes that are **Online** or **Not Accepting New Matches** count
toward the target.

::: tip Partial for a few minutes is normal
Nodes poll on their own five-minute clocks, so a fresh install reads **Pending**
and then **Partial** before it settles. It is only worth looking into if it is
still Partial well after that.

While it is partial, a [Game Mode](/features/admin/game-modes) that uses the
plugin will work on some servers and not others.
:::

## Removing

**Remove** clears the intent, and each node drops the files on its next pass. A
plugin that a live (non-archived) game mode still selects cannot be removed —
the panel names the mode and asks you to take it out of the mode first, rather
than leaving a mode pointing at something no server has.

## What is actually on a node

Each node reports its whole inventory every time it converges — the panel does
not go looking. Two things are worth knowing:

- Plugins you dropped into `/opt/5stack/custom-plugins` by hand are reported
  too, marked **Manual**. Those are loaded on every server on the node,
  regardless of mode — that is the existing behaviour and it has not changed.
  The converge pass never removes them; the panel does not own them.
- A managed plugin that has gone missing from disk stops being reported, so the
  install falls back to **Partial** rather than quietly failing to load the next
  time a match starts.

## Loading

::: tip Installing is not loading
An installed plugin is on the node but dormant. Nothing loads it until a
[Game Mode](/features/admin/game-modes) selects it and a server starts. That is
what lets one node host a competitive match and a fun match at the same time.
:::

### Load on every match

Each installed plugin has a **Load on every match** switch on its directory
page. Turn it on and every server the deployment starts loads the plugin,
whether or not a mode selects it.

That is what it is for: a stats collector or an admin tool is not a game mode,
and the only way to get one onto every server used to be hand-placing the files
in `custom-plugins` — the exact thing the catalog replaces.

::: danger This is the one setting that reaches ranked play
Everything else about game plugins stops at the edge of matchmaking: a Ranked
server cannot carry a game mode at all, and matchmaking never sets one on the
matches it creates. **Load on every match** deliberately steps over that line
and applies to ranked and matchmaking servers too.

Use it for plugins that observe. Anything that changes how the game plays does
not belong on a ranked server.
:::

### Plugins that need Valve's server guidelines off

Both frameworks ship with `FollowCS2ServerGuidelines` on, and while it is on
they refuse the calls a plugin makes to change what a player sees — custom HUDs,
scoreboard text, skins and agents in place of the default models. A plugin that
cannot work without those calls says so in its registry entry, and the directory
badges it **Needs guidelines off**.

The panel never turns them off on the strength of that alone. The plugin's page
carries a **Turn off Valve's server guidelines** switch, off until you set it,
and it applies to that plugin only: servers whose mode does not load it keep
booting compliant. Left off, the plugin still installs and loads — the parts
that change what a player sees simply do nothing.

::: danger This can get your Steam GSLTs banned
Per Valve, running outside their official
[server guidelines](https://blog.counter-strike.net/index.php/server_guidelines/)
can trigger **every** Game Server Login Token on the server owner's Steam
account to be banned — not just the one the offending server used. It is the
same trade-off as
[showing 5stack ranks in-game](/features/admin/matchmaking), which flips the
same framework setting.
:::

The switch is a statement of intent, like installing: the next server to start
with that plugin in its mode picks it up. Servers already running are not
touched — the setting lives in the framework's own config and is read once, at
boot.

## Runtimes

A CounterStrikeSharp plugin will not load under SwiftlyS2, and vice versa, so
each registry entry publishes its releases per runtime. Nodes are only ever sent
builds for the [runtime](/servers/game-server-nodes/plugin-runtimes) they run,
so asking for a plugin that has no build for your deployment installs nothing —
the directory says as much on the plugin's page.

Many projects publish both — the CS2 Inventory Simulator, for instance, has a
SwiftlyS2 build and a CounterStrikeSharp build, so it is installable either way.

This is also what decides where a game mode can run: a mode is runnable on a
runtime only if **every** plugin it selects has a build for it. See
[Runtime compatibility](/features/admin/game-modes#runtime-compatibility).

## Updates

An install either tracks the newest release or sits on one version:

- **Auto** (what you get by installing from the directory) — every converge pass
  resolves the newest published release for the node's runtime and installs it
  if it differs, removing the version it replaced. Servers pick it up the next
  time they start; a live match is never disturbed.
- **Pinned** — the version stays put. Once an hour the panel compares pinned
  installs against the newest release and raises a single administrator
  notification when any of them have fallen behind, the same way
  [CS2 build and plugin version pinning](/servers/game-server-nodes/version-pinning)
  already reports.

## Where the files live

| Path | What |
| --- | --- |
| `/opt/5stack/custom-plugins/` | Both managed installs and hand-managed files, laid out relative to `game/csgo` ([Custom Game Plugins](/servers/game-server-nodes/custom-plugins)) |
| `/opt/5stack/custom-plugins/.5stack-plugins/` | Which files belong to which managed plugin, and at what version |
| `/opt/5stack/servers/<server id>/` | A single dedicated server's own files |

Managed installs land in the directory operators already use rather than a store
of their own: it is where a plugin writes its own config at runtime, and it
needs no extra mount for a game server to see it. Ownership is recorded in
`.5stack-plugins` instead of being inferred from where a file sits.

That record is what makes installing different from loading. At boot the server
links this directory into its own tree, leaving out the files the index
attributes to a managed plugin the mode did not ask for. Anything hand-placed is
in no manifest, so it is never left out — which is exactly how `custom-plugins`
behaved before plugins were managed at all.
