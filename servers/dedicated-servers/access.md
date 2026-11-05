# Restricted Servers

A [community server](./community-servers) is open to anyone by default. Turn on
**Restricted** under **Settings → Access** on the server's page and only the
players you choose can join it. Everyone else:

- does not see it on the **Public Servers** page, or on its own page,
- gets no connect address from the panel,
- is refused by the [Player Management plugin](./player-management) if they
  connect anyway, with the message _"This server is private: you are not on
  its access list"_.

## Who gets in

A player gets in if any one of these lets them in:

| Rule                     | Who it covers                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Moderators and above** | Always, so a restricted server can still be moderated                                                                                |
| **Minimum Role**         | Everyone at or above the role you pick. **No role rule** turns it off                                                                |
| **Players**              | Players you add by name. They can always join                                                                                        |
| **Events**               | Members of the events you add, **only while the event is live**: from its start until its end, or indefinitely if it has no end date |

Event members are the event's organizers and players, the rosters of its
teams, and the rosters, organizers and team owners of its tournaments. The list
follows the event: a player added to it, or an event that starts or ends,
changes who gets in without anyone editing the server.

## Saving

Access changes save with the rest of the server's settings and apply within
seconds, with no restart. This works on external servers too.

::: warning The plugin does the refusing
A restricted server is hidden by the panel, but only the Player Management
plugin can keep someone who knows the address out. If the plugin is not
reporting, the **Access** section says so: nobody is kept out yet.
:::

## How it is enforced

- If the panel cannot be reached, the last list stays in force: the server is
  neither opened up nor locked to everyone.
- **SwiftlyS2** refuses a player at connect, before they load in. A player on the
  list does not need the server's connect password: the plugin lets them past
  it. If a CS2 update breaks this, the plugin falls back to kicking after join
  until it is fixed.
- **CounterStrikeSharp** kicks a player who is not on the list as soon as they
  join. Allowed players still need the connect password, if the server has one.

Restricted servers need the Player Management plugin, so they are CS2 only.
