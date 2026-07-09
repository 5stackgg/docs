# Plugin Configuration

The plugin configuration lives under your runtime's addons directory:

- **SwiftlyS2** — `<server_path>/game/csgo/addons/swiftlys2/configs`
- **CounterStrikeSharp** — `<server_path>/game/csgo/addons/counterstrikesharp/configs`

## Match Configuration Files

Once the plugin has been added, it will download the following configuration files and store them in the cfg directory at `<game-directory>/csgo/cfg`:

- 5stack.base.cfg
- 5stack.warmup.cfg
- 5stack.knife.cfg
- 5stack.live.cfg

The base config is always executed first, followed by either the warmup, knife, or live config depending on the current phase of the match.

These configs can be modified to suit your needs.
