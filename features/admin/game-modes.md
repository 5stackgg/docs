# Game Modes

A **game mode** is the difference between a competitive match and a fun one. It
bundles the things that have to change together:

- the **plugins** the server loads, and the order it loads them in,
- a block of **console variables**, exec'd after the match type's config,
- optional **launch parameters**,
- and, for community servers, the [Valve Game Mode](#valve-game-mode) the
  server starts on.

Modes are created under **Settings → Application → Game Modes**. They need
[Game Plugins](/servers/game-server-nodes/game-plugins) turned on first — a mode
has nothing to load without them.

## What ships with it

Four starter modes are created once, so a fresh install has something to pick
besides Competitive:

| Mode           | Wraps                                                                         | Valve Game Mode |
| -------------- | ----------------------------------------------------------------------------- | --------------- |
| **Deathmatch** | [ianlucas/cs2-ss2-deathmatch](https://github.com/ianlucas/cs2-ss2-deathmatch) | Deathmatch      |
| **Retakes**    | [a2Labs-cc/SwiftlyS2-Retakes](https://github.com/a2Labs-cc/SwiftlyS2-Retakes) | Custom          |
| **1v1 Arenas** | [shmitzas/K4-Arenas-Upkeep](https://github.com/shmitzas/K4-Arenas-Upkeep)     | Custom          |
| **Chaos**      | [LCrew/S2-CSRoll](https://github.com/LCrew/S2-CSRoll)                         | Competitive     |

Each wires itself to its catalog plugin as soon as the registry has synced. On a
very first boot they exist with no plugins and pick them up on a later pass.
A mode that already selects plugins is left alone.

::: warning All four need SwiftlyS2
Every starter plugin is built for SwiftlyS2, the default runtime. On a
CounterStrikeSharp deployment none of them installs, and selecting one of these
modes is refused by name rather than silently starting a server with nothing
loaded. See [Runtime compatibility](#runtime-compatibility).
:::

They are yours from then on: edit them freely, and a mode you delete stays
deleted.

::: tip Upgrading from an earlier version
Earlier versions seeded **Deathmatch** and **Retakes** with CounterStrikeSharp
plugins. Those modes are kept, and the catalog entries they select (`deathmatch`
and `retakes`) now point at the SwiftlyS2 plugins above.
:::

Arenas keeps its ladder in a database (SQLite by default). Chaos is not
**Verified** in the catalog, and it ships a Workshop addon that players download
when they join; see
[Workshop addons](/servers/game-server-nodes/game-plugins#workshop-addons).

### The official mode

**Utility Practice** is marked **Official 5Stack**: utility practice servers run
on it, so it cannot be deleted, disabled or renamed. Its cvars are yours to
edit.

## Creating one

Give it a name and a slug, pick the plugins it needs, and write the cvars. The
plugins list only offers what is in your catalog, so install what you need
first.

Plugins load in the order shown. Anything hand-placed in
`/opt/5stack/custom-plugins` still wins a collision, so a file you dropped there
yourself is never replaced by a managed one.

### Console variables

The cvar block is exec'd **last**, after the match type's config, the global
config and any plugin's own cvars, so anything you set here beats all of them:

```
mp_freezetime 3
mp_respawn_immunitytime 2
```

The full order a server applies, each layer beating the one above it:

| Order | Layer                                                                                         |
| ----- | --------------------------------------------------------------------------------------------- |
| 1     | The match type — Competitive, Wingman, Duel, Rush                                             |
| 2     | LAN tuning, on a LAN region                                                                   |
| 3     | [Global](#global-configuration)                                                               |
| 4     | Each loading [game plugin's](/servers/game-server-nodes/game-plugins#configuration) own cvars |
| 5     | The game mode's block, above                                                                  |

That order is for matches. A community server has no match, so it gets a
shorter one; see [On a community server](#on-a-community-server).

On workshop maps CS2 drops a handful of "workshop-disallowed" cvars from an
exec'd config. 5Stack starts CS2 servers with
`-disable_workshop_command_filtering` so they are kept, and the match plugin
also re-sends them directly, with a value set in a mode winning over the same
value in the type config — the same order they would have applied in.

### Valve Game Mode

**Valve Game Mode** is the CS2 game mode a community server running this mode
starts on: **Custom** (the default), Casual, Competitive, Wingman, Retakes, Rush,
Arms Race or Deathmatch.

It matters for plugins built on one of Valve's modes. The Deathmatch plugin
changes CS2's own deathmatch rules, which stock Custom never runs, so on Custom
everyone spawns at their team's spawn. Matches ignore it: they keep their own
match type.

### On a community server

A [community server](/servers/dedicated-servers/community-servers) running a
mode has no match to exec the layers above, so they are written into the
**Valve Game Mode's** server config instead, which CS2 execs on every map load.
That is also what keeps them across a map rotation. In order, last wins:

1. each loading plugin's own cvars,
2. the game mode's block,
3. the server's own plugin cvars, set per server.

The Global config and the match type configs are not applied there. Changing a
mode's cvars reaches a running community server the next time it restarts.

## Global configuration

A cvar that should apply to **every** match, whatever its type, belongs in the
**Global** tab under **Settings → Application → Game Type Configs**, beside
Competitive, Wingman, Duel, Rush and LAN.

It is a layer rather than a type: it is exec'd on top of whichever type config
the match already got, so it is the one place to put something cross-cutting
instead of pasting it into three configs and keeping them in step.

Global is deliberately unscoped — it is the "every match" layer, and a global
with exceptions is just a type config with extra steps. To narrow something to
particular matches, put it on a [game plugin](/servers/game-server-nodes/game-plugins#load-without-a-game-mode)
or in a game mode instead.

::: tip Nothing ships in it
Global starts empty and has no shipped default — **Revert to Defaults** on that
tab clears it rather than restoring anything.
:::

## Where a mode is used

| Surface            | How                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| A custom match     | **Game Mode** on the match options form                                                                                    |
| A draft lobby      | the same field, when creating a draft room. Only modes with **Offer in draft lobbies** on are listed                       |
| A community server | **Custom Presets** on the dedicated server form. The mode's name shows on the server's card on the **Public Servers** page |

Setting a mode on a long-lived server changes it for everyone on that server, so
the server is recreated to pick the plugins up. On-demand match servers get a
fresh pod per match anyway, so there is nothing to restart.

**Enabled** controls whether a mode can be picked at all. A disabled mode is
kept, but cannot be picked for a match, server or draft room.

## Custom modes are unranked

A match with **any** custom mode never counts toward ELO or the stats
leaderboards. It plays under third-party plugins, so it is unranked
unconditionally, whatever the mode's settings say.

An unranked match is a completely real match. It plays on a real server, and
stats, demos and round data are all recorded and shown exactly as they always
are. The only difference is that it does not move anybody's ELO, and it is left
out of the stats leaderboards.

The **Offer in draft lobbies** switch, off by default, only decides whether lobby
hosts can pick the mode when creating a draft room. It does not make a mode
ranked.

::: tip Written onto the match
Whether a match counts is written onto the match itself, and follows its mode
only until the match goes **Live**, when the mode is locked. A match with no
mode at all counts, as it always did.
:::

### Ranked servers

The guarantee that actually protects matchmaking is stronger, and lives in the
database rather than in a switch:

::: tip A Ranked server never inherits a mode
Servers of type **Ranked** — the pool matchmaking draws from — cannot carry a
persistent game mode at all. The database refuses to store one, and refuses to
move a server that has one into the Ranked pool.

A fun match has to ask for its mode on the match itself. That means a server
handed back to matchmaking always comes up on a clean plugin set, without anyone
having to remember to switch anything off.
:::

Matchmaking never sets a mode on the matches it creates, so a queued match is
competitive by construction.

The one exception is a plugin whose
[**Ranked Matches** switch](/servers/game-server-nodes/game-plugins#load-without-a-game-mode)
is on, which every ranked server loads regardless of mode.

## Runtime compatibility

A mode does not declare which framework it runs on — that is decided by the
plugins it selects. A mode is runnable on a runtime only if **every** plugin in
it publishes a build for that runtime.

Selecting a mode whose plugins have no build for the runtime your deployment
runs is refused, naming the plugin that is missing, rather than booting a server
with none of its plugins and nothing to say why. This applies wherever a mode is
picked: a match, a draft lobby, or a server.

Two plugins that exist for different frameworks resolve to a mode that runs
nowhere, and the panel says so before you get as far as starting anything.

## Changing and retiring a mode

A mode cannot be changed once its match is **Live** or in **Veto**, alongside the
other settings that are locked at that point.

Retiring a mode **archives** it rather than deleting it: it disappears from every
picker, but matches that were played under it keep saying so. A mode no match has
ever used can be deleted outright.
