# Game Modes

A **game mode** is the difference between a competitive match and a fun one. It
bundles the things that have to change together:

- the **plugins** the server loads, and the order it loads them in,
- a block of **console variables**, exec'd after the match type's config,
- and optional **launch parameters**.

Modes are created under **Settings → Application → Game Modes**. They need
[Game Plugins](/servers/game-server-nodes/game-plugins) turned on first — a mode
has nothing to load without them.

## What ships with it

Two starter modes are seeded on every boot, so a fresh install has something
to pick besides Competitive:

| Mode | Wraps | Only exists for |
| --- | --- | --- |
| **Retakes** | [B3none/cs2-retakes](https://github.com/B3none/cs2-retakes) | CounterStrikeSharp |
| **Deathmatch** | [NockyCZ/CS2-Deathmatch](https://github.com/NockyCZ/CS2-Deathmatch) | CounterStrikeSharp |

Both are unranked out of the box, and each wires itself to its catalog plugin as
soon as the registry has synced — on a very first boot they exist with no
plugins and pick them up on a later pass.

::: warning Both need CounterStrikeSharp
These are third-party projects, and the maintained ones are all built for
CounterStrikeSharp. On a SwiftlyS2 deployment — the default — neither will
install, and selecting one is refused by name rather than silently starting a
server with nothing loaded. See
[Runtime compatibility](#runtime-compatibility) and
[Game Plugin Runtimes](/servers/game-server-nodes/plugin-runtimes).
:::

Editing them is safe. The name and description are re-applied on every boot, but
**Enabled**, **Safe for competitive play** and the cvar block are left alone once
you have touched them, and modes you created yourself are never touched.

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

| Order | Layer |
| --- | --- |
| 1 | The match type — Competitive, Wingman, Duel |
| 2 | LAN tuning, on a LAN region |
| 3 | [Global](#global-configuration) |
| 4 | Each loading [game plugin's](/servers/game-server-nodes/game-plugins#configuration) own cvars |
| 5 | The game mode's block, above |

On workshop maps CS2 silently drops a handful of cvars from an exec'd config.
5Stack re-sends those directly, and a value set in a mode wins over the same
value in the type config — the same order they would have applied in.

## Global configuration

A cvar that should apply to **every** match, whatever its type, belongs in the
**Global** tab under **Settings → Application → Game Type Configs**, beside LAN,
Competitive, Wingman and Duel.

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

| Surface | How |
| --- | --- |
| A custom match | **Game Mode** on the match options form |
| A draft lobby | the same field, on the lobby's options |
| A community server | a mode set on the server itself, shown as a badge on the Community Servers page |

Setting a mode on a long-lived server changes it for everyone on that server, so
the server is recreated to pick the plugins up. On-demand match servers get a
fresh pod per match anyway, so there is nothing to restart.

## Unranked modes

Every mode has a **Safe for competitive play** switch, off by default. A mode
without it is unranked, and that is a much narrower statement than it sounds
like.

An unranked match is a completely real match. It plays on a real server, and
stats, demos and round data are all recorded and shown exactly as they always
are. The only difference is that it does not move anybody's ELO, and it is left
out of the stats leaderboards.

::: tip The decision is frozen when the match is created
Whether a match counts is written onto the match itself at creation, not worked
out later from the mode. Flipping a mode's switch changes what happens next, and
never rewrites whether matches played months ago counted.

A match with no mode at all counts, as it always did.
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
