# Game Modes

A **game mode** is the difference between a competitive match and a fun one. It
bundles the things that have to change together:

- the **plugins** the server loads, and the order it loads them in,
- a block of **console variables**,
- optional **launch parameters**,
- and, for community servers, the [Valve Game Mode](#valve-game-mode) the
  server starts on.

Modes are created under **Settings → Application → Game Modes**. They need
[Game Plugins](/servers/game-server-nodes/game-plugins) turned on first, since
a mode has nothing to load without them.

## What ships with it

Four starter modes are created once, so a fresh install has something to pick
besides Competitive:

| Mode           | Wraps                                                                         | Valve Game Mode |
| -------------- | ----------------------------------------------------------------------------- | --------------- |
| **Deathmatch** | [ianlucas/cs2-ss2-deathmatch](https://github.com/ianlucas/cs2-ss2-deathmatch) | Deathmatch      |
| **Retakes**    | [a2Labs-cc/SwiftlyS2-Retakes](https://github.com/a2Labs-cc/SwiftlyS2-Retakes) | Custom          |
| **1v1 Arenas** | [shmitzas/K4-Arenas-Upkeep](https://github.com/shmitzas/K4-Arenas-Upkeep)     | Custom          |
| **Chaos**      | [LCrew/S2-CSRoll](https://github.com/LCrew/S2-CSRoll)                         | Competitive     |

On a fresh install they can show no plugins at first. They pick up their
plugins once the plugin catalog has synced.

::: warning All four need SwiftlyS2
Every starter plugin is built for SwiftlyS2, the default runtime. On a
CounterStrikeSharp deployment none of them installs, and selecting one of these
modes is refused. See [Runtime compatibility](#runtime-compatibility).
:::

They are yours from then on: edit them freely, and a mode you delete stays
deleted.

::: tip Upgrading from an earlier version
Earlier versions seeded **Deathmatch** and **Retakes** with CounterStrikeSharp
plugins. Those modes are kept, and now load the SwiftlyS2 plugins above.
:::

Chaos is not **Verified** in the catalog, and it ships a Workshop addon that
players download when they join; see
[Workshop addons](/servers/game-server-nodes/game-plugins#workshop-addons).

### The official mode

**Utility Practice** is marked **Official 5Stack**: utility practice servers run
on it, so it cannot be deleted, disabled or renamed. Its cvars are yours to
edit.

## Creating one

Give it a name and a slug, pick the plugins it needs, and write the cvars. The
plugins list only offers what is in your catalog, so install what you need
first.

Plugins load in the order shown. Anything you placed by hand in
`/opt/5stack/custom-plugins` wins a collision with a managed plugin.

### Console variables

On a match, the cvar block runs **last**, after the match type's config, LAN
tuning on a LAN region, the [Global](#global-configuration) config and each
plugin's own cvars, so anything you set here beats all of them:

```
mp_freezetime 3
mp_respawn_immunitytime 2
```

Cvars that CS2 normally blocks on workshop maps still apply.

A community server has no match, so it uses a shorter order; see
[On a community server](#on-a-community-server).

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
mode skips the match type and Global configs. It applies, in order, last one
winning:

1. each loading plugin's own cvars,
2. the game mode's block,
3. the server's own plugin cvars, set per server.

These stay applied across a map rotation. Changing a mode's cvars reaches a
running community server the next time it restarts.

## Global configuration

A cvar that should apply to **every** match, whatever its type, belongs in the
**Global** tab under **Settings → Application → Game Type Configs**, beside
Competitive, Wingman, Duel, Rush and LAN.

It runs on top of whichever type config the match got, so you set something
once instead of in every type config.

Global applies to every match with no exceptions. To narrow something to
particular matches, put it on a
[game plugin](/servers/game-server-nodes/game-plugins#load-without-a-game-mode)
or in a game mode instead.

::: tip Nothing ships in it
Global starts empty. **Revert to Defaults** on that tab clears it.
:::

## Where a mode is used

| Surface            | How                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| A custom match     | **Game Mode** on the match options form                                                                                    |
| A draft lobby      | the same field, when creating a draft room. Only modes with **Offer in draft lobbies** on are listed                       |
| A community server | **Custom Presets** on the dedicated server form. The mode's name shows on the server's card on the **Public Servers** page |

Setting a mode on a dedicated server changes it for everyone on that server,
and the server is recreated to load the plugins.

**Enabled** controls whether a mode can be picked at all. A disabled mode is
kept, but cannot be picked for a match, server or draft room.

## Custom modes are unranked

A match with **any** custom mode never counts toward ELO or the stats
leaderboards, whatever the mode's settings say.

It is otherwise a normal match: stats, demos and round data are recorded and
shown as usual. It just doesn't move anyone's ELO, and it is left out of the
stats leaderboards.

The **Offer in draft lobbies** switch, off by default, only decides whether lobby
hosts can pick the mode when creating a draft room. It does not make a mode
ranked.

### Ranked servers

::: tip A Ranked server never inherits a mode
Servers of type **Ranked**, the pool matchmaking draws from, cannot carry a
game mode, and a server with one cannot be moved into the Ranked pool. A fun
match has to ask for its mode on the match itself, so a server handed back to
matchmaking always comes up on a clean plugin set.
:::

Matchmaking never sets a mode on the matches it creates.

The one exception is a plugin whose
[**Ranked Matches** switch](/servers/game-server-nodes/game-plugins#load-without-a-game-mode)
is on, which every ranked server loads regardless of mode.

## Runtime compatibility

A mode runs on a runtime only if **every** plugin in it has a build for that
runtime. Picking a mode that doesn't is refused, naming the missing plugin.
This applies wherever a mode is picked: a match, a draft lobby, or a server.

A mode that mixes plugins built for different runtimes runs nowhere, and the
panel says so before you start anything.

## Changing and retiring a mode

A mode cannot be changed once its match is **Live** or in **Veto**, alongside the
other settings that are locked at that point.

Retiring a mode **archives** it rather than deleting it: it disappears from every
picker, but matches that were played under it keep saying so. A mode no match has
ever used can be deleted outright.
