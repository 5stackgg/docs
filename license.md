# License

5Stack is free to run, but most of it is not open source. The API, web app,
demo parser, node connector, browser extension and game streamer are
proprietary: you may run the published images, unmodified, as part of your
own 5Stack installation, for any purpose, but you may not copy, modify,
resell or reverse engineer them, or host them as a service for others.

The open-source parts are:

- the [panel](https://github.com/5stackgg/5stack-panel), which installs and
  runs 5Stack, and the
  [inventory plugin](https://github.com/lukepolo/5stack-inventory-plugin),
  under the
  [GNU Affero General Public License v3](https://www.gnu.org/licenses/agpl-3.0.html)
  (AGPL);
- the [game server plugins](https://github.com/5stackgg/game-server), under
  the [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.html),
  because CounterStrikeSharp and SwiftlyS2 only let their plugins use the
  GPL or MIT;
- the game streamer's HUD and Vulkan capture components, which are GPL,
  with their source in
  [game-streamer-gpl](https://github.com/5stackgg/game-streamer-gpl);
- `@5stack/ui`, the
  [example plugin](https://github.com/5stackgg/5stack-example-plugin) and
  the [plugin registry](https://github.com/5stackgg/plugin-registry), under
  the MIT License;
- these docs, under
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Versions released before 30 October 2026 remain under the licenses they were
released under: the MIT License, and from 19–20 October 2026 the AGPL. Each
repository's `NOTICE` file holds the exact terms.

## What you can do

- Run 5Stack for your community, league, LAN or business, including events
  you charge for.
- Configure it through its settings and branding, and extend it with
  plugins.
- Change the open-source parts under their licenses.

## What you must not do

- Copy, modify, resell or reverse engineer the proprietary parts, or offer
  them to others as a hosted or managed service.
- Remove the **Powered by 5Stack** credit, with its link to
  [5stack.gg](https://5stack.gg), from the panel's **Licenses** page, which
  is linked from the sign-in page and the profile menu.
- Present a changed version of the open-source parts as the official
  5Stack. No license gives rights to the 5Stack name or logo beyond the
  credit.

## Plugins

Plugins that work with 5Stack only through its plugin interfaces
(`@5stack/ui`, plugin pages, the plugin registry and the APIs) are not part
of 5Stack, and you may license them however you like.

## Game Streamer

The streamer renders highlight intros and outros with
[Remotion](https://www.remotion.dev). Remotion is free for individuals,
non-profits and companies with up to three employees. A larger company
running the streamer needs a
[Remotion company license](https://www.remotion.dev/license).

## Third-party software

5Stack is built on many open-source projects. Every panel's **Licenses**
page links to the licenses of the packages the web app ships, and each
repository credits the software it uses in its `NOTICE` file.

## Contributing

Contributions to 5Stack's repositories are accepted under the terms in their
`CONTRIBUTING.md`: you keep the copyright in your work, and the maintainer
may license it under any terms, including commercial ones. The MIT
repositories and these docs take contributions under their own licenses.

## Other licensing

To use 5Stack under other terms, contact
[@lukepolo](https://github.com/lukepolo).
