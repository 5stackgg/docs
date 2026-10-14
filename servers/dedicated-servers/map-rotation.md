# Map Rotation

A [community server](./community-servers) on a game server node can cycle
through a list of maps. Set it under **Settings → Map Rotation** on the server's
page.

The server boots on the first map, or a random one when **Shuffle** is on. From
there the map rotation plugin takes over: end-of-map votes, rock the vote, and
the automatic cycle.

## Building the list

- **In Rotation** is the ordered list. Drag maps to reorder them, or use the
  move buttons. The first map is tagged **Boots First**.
- **Available** holds every map not in the rotation, grouped into **Official**
  and **Workshop**. Click a map to add it, use **Add All** on a group, or type in
  **Filter maps**. Drag a map out of the list to remove it.
- **Shuffle** picks the next map at random. It is on for a new rotation.

The pool is your panel's maps table, so any map you have added to 5Stack is
available, not only the ones in a map pool.

### Importing from the Steam Workshop

**Import From Workshop** takes a Steam Workshop collection or a single map, as a
link or an ID. Every public CS2 map in it is added to your maps table and to the
rotation. Items that are not CS2 maps (skins, other games, removed items) are
skipped and counted.

## The rotation plugin

A rotation needs a game plugin that can play it. The catalog's is
**MapChooser** (SwiftlyS2), which declares a `map_rotation` block in its
[registry entry](https://github.com/5stackgg/plugin-registry#plugins-that-run-a-map-rotation).

- Once one is installed, a server with a rotation loads it automatically,
  unless the server switches it **Off** under **Plugins**. The plugins list says
  **Loads to play the map rotation**.
- If none is installed, the section says so and links to **Install MapChooser**.
  Without one, the server stays on its first map.

5Stack writes the rotation into the plugin's own config files every time the
server starts, so the list in the panel is always what the server plays.

::: warning It replaces those files
The files the rotation writes, MapChooser's `maps.jsonc` and `config.jsonc`
under `addons/swiftlys2/configs/plugins/MapChooser/`, are written whole on
every boot. A hand edit to either file on that server is overwritten.
:::

::: warning Keep Shuffle on for workshop maps
MapChooser loses its place in the list on workshop maps and keeps returning to
the second one. The panel warns when a rotation with workshop maps has
**Shuffle** off.
:::

## Saving

Rotation changes are saved with the rest of the server's settings and restart
the server once (**Save & Restart**). A map deleted from the maps table drops
out of every rotation.

Map rotations are CS2 only, and Ranked and Practice servers never play one.
