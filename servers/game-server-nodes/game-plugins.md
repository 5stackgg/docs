# Game Plugins

::: info Game plugins, not panel plugins
This page is about **CS2 server-side plugins** that load into your game servers.
For a web app that runs inside the panel, see
[5Stack Plugin Development](/plugins/). Those are registered under
**Settings → Application → Panel Plugins**.
:::

5Stack can install CS2 server plugins onto your Game Server Nodes for you: pick
one from the directory, and every node downloads and installs it.

It is on by default; the registry it reads from is configured under
**Settings → Application → Plugin Directory**.

::: danger You are running someone else's code
A game plugin runs inside the CS2 server on your machines, and can do anything
that server can. Install plugins you trust, and prefer the ones marked
**Verified**, which means a 5Stack maintainer reviewed the entry.
:::

## The directory

**Plugin Directory**, under **Site** in the admin navigation, lists
everything in the catalog. It is administrator-only. Each entry says which
runtime it is built for, who wrote it, and whether it needs an external service
you have to provide yourself.

The catalog comes from a registry, by default `https://registry.5stack.gg/`,
published from
[5stackgg/plugin-registry](https://github.com/5stackgg/plugin-registry). Point
**Registry URL** at a fork or an internal mirror if you would rather curate your
own, then hit **Sync Now**.

## When the catalog does not have it

The registry is a curated list, and CS2 has more plugins than it carries. If the
one you want is not in the directory, **Add a plugin** takes a release URL and
turns it into an entry of your own:

- a **repository**, `https://github.com/owner/repo`, uses the newest Linux
  archive of its latest release;
- a **release**, `.../releases/tag/v1.2.0`, pins that release instead;
- a **direct link** to a `.zip` is taken as-is, and you supply the slug and
  version yourself.

You always pick the framework, because nothing inside the archive says which
one it was built for. A plugin added under the wrong one installs but never
loads.

From there it installs and loads like a directory entry. It is marked **Custom**
so it is clear nobody reviewed it.

::: danger Nobody reviewed this one
A game plugin runs inside the CS2 server on your machines. Installing from the
directory means a 5Stack maintainer at least looked at the entry; adding one by
URL means you are vouching for it yourself.
:::

To update one, add the same slug again with a newer release. A registry sync
never changes or removes your entries. **Remove from catalog**, on the plugin's
page, deletes it once it is uninstalled from every node.

If you find yourself adding several, point **Registry URL**
[at your own fork of the registry](#the-directory) instead, so every panel you
run reads one list.

## Installing

Press **Install**. Each node checks for changes every 5 minutes and installs the
plugin on its own, including a node that was offline when you pressed it and a
node you add later. A node that can't reach the panel keeps its plugins as they
are.

Plugins you placed by hand are never touched; see
[what is actually on a node](#what-is-actually-on-a-node).

### Install state

The directory shows how many online nodes have the plugin:

| State         | What it means                                                               |
| ------------- | --------------------------------------------------------------------------- |
| **Installed** | Every online node reports it on disk                                        |
| **Partial**   | Some nodes have it, some do not                                             |
| **Pending**   | Asked for, but no node has reported it yet, or no node is online            |
| **Failed**    | A node reported the install as failed; the error is kept on that node's row |
| **Manual**    | Nobody asked for it, but it is there anyway: someone dropped it in by hand  |

Only enabled nodes that are **Online** or **Not Accepting New Matches** count.

::: tip Partial for a few minutes is normal
A fresh install reads **Pending** and then **Partial** before it settles. It is
only worth looking into if it is still Partial well after that.

While it is partial, a [Game Mode](/features/admin/game-modes) that uses the
plugin will work on some servers and not others.
:::

## Removing

**Remove** clears the plugin, and each node drops the files on its next check. A
plugin that a live (non-archived) game mode still selects cannot be removed: the
panel names the mode and asks you to take it out of the mode first.

## What is actually on a node

- Plugins you dropped into `/opt/5stack/custom-plugins` by hand are listed too,
  marked **Manual**. They load on every server on the node, regardless of mode,
  and 5Stack never removes them.
- A managed plugin that has gone missing from disk drops the install back to
  **Partial**.

## Loading

::: tip Installing is not loading
An installed plugin is on the node but dormant. Nothing loads it until a
[Game Mode](/features/admin/game-modes) selects it and a server starts.
:::

### Load without a game mode

Each installed plugin's directory page has three switches saying which kinds of
match load it on their own, whether or not a mode selects it:

| Switch                 | Covers                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| **Ranked Matches**     | Anything counting toward ranking: the queue or a draft lobby alike |
| **Tournament Matches** | Matches played as part of a tournament bracket, ranked or not      |
| **Custom Matches**     | Everything else: matches that count toward nothing                 |

A match falls into exactly one of these, and a ranked tournament game counts as
a **tournament** game. Use them for plugins that aren't a game mode, such as a
stats collector or an admin tool.

All three start **off**. Until you turn one on, or a game mode selects the
plugin, nothing loads it.

::: warning A game mode still wins
A mode that names the plugin loads it regardless of these switches.
:::

::: danger Ranked Matches reaches competitive play
"Ranked" here means the match counts toward ranking: a queued match and a draft
lobby playing for Elo alike. It is the broadest of the three: a match is ranked
unless a game mode made it unranked or a bracket made it a tournament game.
:::

On a [community server](/servers/dedicated-servers/community-servers), which
hosts no match, a plugin loads by default when **Tournament Matches** or
**Custom Matches** is on. Each community server can also switch a plugin
**On** or **Off** for itself under **Settings → Plugins**.

### Configuration

Each installed plugin's page has a **Configuration** box.
**Edit configuration** opens an editor with up to three tabs:

| Tab             | What it edits                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Settings**    | A form for the plugin's console variables, with each one's description and default                                                                        |
| The config file | The plugin's JSON config file, as a form when the registry describes it, or as JSON. Named after the file, for example **Weapon rotation** for Deathmatch |
| **Advanced**    | The raw cvar block                                                                                                                                        |

What you set runs after the match type's config and after the
[Global config](/features/admin/game-modes#global-configuration), on servers
that load the plugin **and nowhere else**.

```
invsim_url "https://inventory.example.gg"
invsim_apikey "inv_…"
```

#### Descriptions and defaults

Descriptions and defaults are read from a real server. Until a server running
the plugin comes online, the form says **Descriptions and defaults show up once
a server running this plugin comes online.**

#### Config files

A plugin that reads a JSON file gets a config file tab. **Customize** starts
from the file the plugin ships with; **Use the Plugin's File** goes back to it.
**View in Repo** opens the shipped file at the installed release, and **Open on
Node** opens it in a node's file browser.

Your file is written to every server that loads the plugin.

#### Cvars the plugin overrides

Some plugins set console variables themselves on every map load, after every
config has run. The plugin's page lists them under **Set by the plugin on every
map**, and warns when your configuration sets one, since the value would be
overwritten.

#### One server only

A community server can layer its own settings over the plugin page's with
**Configure for This Server**. See
[Community Servers](/servers/dedicated-servers/community-servers#plugins).

### Workshop addons

A plugin's custom models, sounds or HUD layouts reach players as Steam Workshop
addons. A plugin that needs them shows them under **Workshop addons** on its
page. On SwiftlyS2, players download them from the Workshop while they connect.
Nothing to install or configure.

::: warning SwiftlyS2 only
CounterStrikeSharp servers start without the addons and log why. The plugin
still loads; whatever needed the addon does not show.
:::

### Plugins that need Valve's server guidelines off

By default, both frameworks follow Valve's server guidelines and block plugins
from changing what a player sees: custom HUDs, scoreboard text, skins and agents
in place of the default models. A plugin that needs this is badged **Needs
guidelines off** in the directory.

To allow it, turn on **Turn off Valve's server guidelines** on the plugin's
page. It applies only to servers that load that plugin. Left off, the plugin
still installs and loads, but the parts that change what a player sees do
nothing.

::: danger This can get your Steam GSLTs banned
Per Valve, running outside their official
[server guidelines](https://blog.counter-strike.net/index.php/server_guidelines/)
can trigger **every** Game Server Login Token on the server owner's Steam
account to be banned, not just the one the offending server used. It is the
same trade-off as
[showing 5stack ranks in-game](/features/admin/matchmaking).
:::

Servers pick up the switch the next time they start.

## Runtimes

A CounterStrikeSharp plugin will not load under SwiftlyS2, and vice versa. Nodes
only get builds for the [runtime](/servers/game-server-nodes/plugin-runtimes)
they run, so a plugin with no build for your runtime installs nothing, and its
page says so.

This also decides where a game mode can run: a mode is runnable on a runtime
only if **every** plugin it selects has a build for it. See
[Runtime compatibility](/features/admin/game-modes#runtime-compatibility).

## Updates

An install either tracks the newest release or sits on one version:

- **Auto** (what you get by installing from the directory): nodes install the
  newest release for their runtime when it comes out. Servers pick it up the
  next time they start; a live match is never disturbed.
- **Pinned**: the version stays put. Administrators get a notification when a
  pinned install falls behind the newest release.

## Where the files live

| Path                               | What                                                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/opt/5stack/custom-plugins/`      | Both managed installs and hand-managed files, laid out relative to `game/csgo` ([Custom Game Plugins](/servers/game-server-nodes/custom-plugins)) |
| `/opt/5stack/servers/<server id>/` | A single dedicated server's own files                                                                                                             |
