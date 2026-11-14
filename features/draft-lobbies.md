# Draft Lobbies

A draft lobby (a **draft room** in the app) is a pick-up game with structure.
You host a room, players join, teams get formed the way you chose, and the
match starts, no spreadsheets, no "who's captain?", no arguing about the pick
order.

Draft rooms live in the **Draft rooms** section of the
[Play page](/features/quick-play): the open rooms to join, and a bar to host
your own.

## Hosting from the Play page

**Host a room** opens a room in one click, using three choices you can change
first:

| Choice           | Options                                                 |
| ---------------- | ------------------------------------------------------- |
| **Format**       | 5v5, 3v3, 2v2, or 1v1                                   |
| **Draft style**  | **Captains draft**, **Host assigns**, or **Auto-split** |
| **Who can join** | **Open**, **Friends**, or **Invite**                    |

A quick room uses the same match settings matchmaking uses for that format and
your preferred regions. A captains draft picks two random players as captains
and drafts in snake order, and a 1v1 is always auto-split since there is
nobody to draft. Everything else is under **All settings**.

- If you already have a room open, the bar takes you **Back to your room**.
- In a party, only the party leader can host.
- On a LAN you're asked whether the room plays on the LAN or online, and the
  button reads **Host a LAN room** for a LAN room. See
  [LAN or online](/features/quick-play#lan-or-online).

## Creating a room with every setting

**All settings** opens the full form. It is one page, with a live preview beside
it that shows the format, the exact pick order, and the rules you've set, and a
**Create** button that stays in reach.

The form opens on the draft settings you last chose on this device: **Draft
Mode**, **Captain Selection**, **Draft Order**, **Lobby Access**, **Rank Gate
(optional)** and **Require Approval**. Everything else starts from the defaults
every time.

### Draft Mode

Pick how teams get formed:

| Mode               | What happens                                            |
| ------------------ | ------------------------------------------------------- |
| **Auto-Split**     | No draft, teams are auto-balanced when the lobby fills. |
| **Captains Draft** | Two captains take turns picking players.                |
| **Host Assigns**   | You build both teams yourself.                          |
| **Pre-Made Teams** | Pick two saved teams to face off.                       |

**Pre-Made Teams** has an extra wrinkle: a single team is enough. Set **Team 1
(required)** and leave **Team 2 (optional)** open for a team-against-the-world
match, or turn on **Inner Squad** to split one roster across both sides for an
intra-squad scrim. Starters fill in automatically and you can tap a player to
swap them between the lineup and the bench.

In a party, **Keep Lobby Together** puts everyone in it on the same team.

For a captains draft, choose how the two captains are decided under **Captain
Selection**:

- **Top 2 by Rank**
- **Host & Next Highest** (only when the host is playing)
- **Random Two** (the default)
- **Manual**: you pick them in the room

and the **Draft Order**:

- **Snake (1-2-2-1)**
- **Alternating (1-2-1-2)**
- **Front-Loaded (1-2-2-1-2-1)**

The preview spells the resulting order out pick by pick.

### Game Settings

Map pool, MR, best-of, overtime, knife round, coaches, map veto, and region are
set inline. See [Matches](/features/matches) for what each option does.

### Mode

When the instance has [custom game modes](/features/admin/game-modes), pick one
to load its plugins on the server, or leave it on **Competitive**. Custom modes
never count toward ELO, and rooms using one are listed as unranked.

### Lobby Rules

- **Lobby Access**: **Open**, **Friends**, **Invite**, or **Private**. Setting
  both teams up front locks the lineup, so the lobby stays private.
- **Rank Gate (optional)**: a minimum and maximum rank for joining.
- **Require Approval**: players _request_ to join and you pick who plays from a
  queue, instead of first-come-first-served.
- **Host Only**: create and manage the lobby without being added as a player.

## The draft room

On a phone, your pick is a bar pinned to the bottom of the screen.

### Drafting

- A **clock band** shows who is **On The Clock** (or **Your Pick**), **Pick 3
  of 8**, and the time left. Each pick has 30 seconds.
- A **pick track** lays out the whole pick order, numbered, with the team each
  pick belongs to. Picks fill in as they're made.
- Team 1's captain makes the first pick: with **Top 2 by Rank** that's the
  higher-rated captain, with **Host & Next Highest** the host, and with
  **Random Two** either captain at random.
- When a captain runs out of time, the highest-rated player still in the pool
  is picked for them, ties going to whoever joined first. The captain on the
  clock is told who that will be ahead of time, and the pick is marked
  **Auto** on the track.
- Once the draft is over, the pick track stays on the page as the **Draft
  Log**.

### Running the room

- **Lobby Chat** runs alongside the draft (players only during the draft
  itself).
- Drag a player to the **bench** to make them a backup, per side or
  unassigned.
- In **Host Assigns**, fill the open slots to add players straight to a team.
  With **Manual** captains, **Choose Captains** to start the draft.
- The lobby expires on a timer, and the host can keep the room open for
  another 30 minutes.
- **Copy Invite Link** pulls people in directly, and you can invite friends
  straight from the room.
- **Edit Settings** changes the room's settings, and **Cancel Draft** closes the
  room for everyone, after a confirmation. A room opened with **Host a room**
  keeps its format, mode, and match settings when you edit it.
- **Reset Draft**, in the admin dock, starts the picks over. The host or a
  Match Organizer and above can use it, only while picking is under way, and a
  host who is one of the captains can't reset their own draft.

### Substitutes and the sub queue

If the lobby is full, players can **Join Waitlist**. When a slot opens they
**auto-join**, no one has to notice and re-invite them. Backups sit on each
team's bench and can be swapped into the lineup at any time.

### Join requests

With **Require Approval** on, the host gets a **Join Requests** queue, which
can be searched and sorted by rank or most recent. Each request can be
accepted into the lineup, **Accept as backup**, or **Deny**.

## Starting the match

When both teams are set, the host hits **Start Match**. Players check in, the
server is provisioned, veto runs, and from there it's an ordinary 5Stack match,
demo, [stats](/features/stats-and-leaderboards),
[replay](/features/match-replay), and [highlights](/features/highlights) all
included.

The veto runs in the room on the same
[veto board](/features/map-veto#the-veto-board) as the match page, with
[veto scouting](/features/map-veto#veto-scouting) where it's on. After the last
pick the room reads **Match starting** until it hands over to the match page.

If no server region has a server available, the room says so and won't start
until one comes online.

## Browsing rooms

Every open room is listed on the Play page with its format and draft style,
access when it isn't open, average rank, regions, a custom mode if it uses one,
its player and sub counts, and why you can or can't get in: **3 spots left**,
**The host approves**, **No room for your party**, **Full**, or **You're in**.

Narrow the list by **Format**, search for any player in a room, and under
**Filters** show **Only rooms with space** or an **Average rank** range. Sort
by **Filling up first**, **Newest**, **Highest average rank**, or **Lowest
average rank**.

You can **Join** as yourself, **Join with party** to bring your whole
matchmaking group into the room, or **Request** a spot in a room that needs
approval.
