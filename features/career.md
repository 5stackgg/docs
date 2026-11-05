# Career & the Locker

Every rated match moves a player along their **Career**. Matches earn XP, XP
adds up to levels, and every level pays **Stacks**, which players spend in the
**Locker** on banners, frames, nameplates, titles, backgrounds and a pinned
stat for their player card. Career is on by default; admins tune it under
**Settings → Application → Career** (see [Admin settings](#admin-settings)).

## Earning XP

Each rated match earns **XP per match** (default 100), plus **Extra XP for a
win** (default 50), multiplied by the band of the rating the player brought
into the match (**XP by rating**). A rating below every band earns ×1. A new
install has no bands, so everyone earns ×1 until an admin adds some. 5stack.gg
uses these:

| Rating going in | XP multiplier |
| --------------- | ------------- |
| Below 5,000     | ×1            |
| From 5,000      | ×1.5          |
| From 5,500      | ×2            |
| From 6,000      | ×3            |
| From 6,500      | ×4            |

Every **XP per level** (default 1,000) is a level, and every level pays
**Stacks per level** (default 100). A match whose Elo was voided, or one the
player abandoned, earns nothing.

Players who were already on the instance when Career arrived were counted from
their match history, so nobody starts from zero.

- A finished match's page has a **Match Rewards** panel with your lines:
  **Played**, **Win**, **Rating band** and **XP earned**.
- The top bar shows your level and your Stacks. Only you can see your balance.
- **Career unlocks** notifies you when a level unlocks an item ("Level 100
  reached: you unlocked Centurion"), and **Career rewards** when an admin gives
  you an item or Stacks.

### Level rewards

**Level rewards** is the Career's battle pass: 52 milestone items, from the
**Recruit** title and **Standard** frame at Level 1 to the **Founder** set at
Level 1000. It shows the next unlock and roughly how many matches away it is.

## The Locker

Click your level in the top bar, or search for **Career**, to open your card
and the Locker. Its tabs are **Banners**, **Frames**, **Nameplates**,
**Titles**, **Backgrounds** and **Profile stat**, then **Awards** for items
that come with awards, and **Rewards** with **Level rewards** and your **Stacks
History**.

Items are graded like CS2 skins: **Consumer Grade**, **Industrial Grade**,
**Mil-Spec**, **Restricted**, **Classified**, **Covert** and **★ Special**.
Anything animated is ★ Special.

Each item is **Owned**, **For sale** (75 to 2,000 Stacks), or **Earn only**
(a level or award unlocks it). Filter by grade and status, sort by **Rarity**,
**Price**, **Level** or **Name**, and search by name.

### Trying on a look

Click a tile to preview it on **Your card**, locked items included. Changes
add up: **Apply Look** buys and equips everything you've tried at once, after a
confirm that shows the total and what you'll have left. **Take off** empties a
slot.

- **Colorways**: many items come in several colorways.
- **Custom color**: nameplates take any hue and saturation. Brightness is set
  for you so your name stays readable.

### Wear and patterns

Banners and frames roll a wear (**Factory New**, **Minimal Wear**,
**Field-Tested**, **Well-Worn** or **Battle-Scarred**) and a pattern when you
buy them; backgrounds roll a pattern only. **Reroll** rolls again for 100
Stacks.

### Backgrounds

A background is a full scene behind your whole profile page, and the cards on
it turn to frosted glass. Players who'd rather not see other players'
backgrounds turn off **Player Backgrounds** under **Settings → My Account**.

### Profile stat

Pin one real number to your card: **Kills**, **Headshots**, **Aces**,
**No-scopes**, **Wallbangs**, **Wins** or **Matches**. It's your actual count,
updated after every match, shown in one of the stat looks. Your first pick is
free; changing it costs 250 Stacks.

### Where your look shows

Your banner, frame, nameplate and title show next to your name across the site:
on your profile's hero card, in player rows and lists, and on
[your card](/features/navigation#your-player-card) in the navigation's
bottom-left corner.

## Other ways to earn

### Prizes

Tournament organizers set a **Prize Board**: for each placement (1st, 2nd, 3rd
and MVP), the Locker items and Stacks every player on that team wins. Players
see it as **What you can win** on the tournament page. Admins set season prizes
per [season](/features/seasons) the same way; they're shown on the leaderboard
while the season runs and paid with the season awards when it ends. With
[awards](/features/tournaments#awards) off, each place still wins the Stacks
and items on its board.

Some items can only be won, such as the **Champion** title, the **Seraph**
frame and the **Kintsugi** banner for tournament winners. A finished
tournament's podium shows its winners as mini player cards.

### The 5stack.gg clan tag

Players who wear the `5stack.gg` clan tag in imported Valve or FACEIT matches
earn 100 Stacks for every such match, plus a 2,000 Stacks bonus the first time.
The tag is checked on each [imported match](/features/external-matches), and
the player gets a **Supporter thanks** notification. The **Wear the 5stack.gg
Tag** spotlight walks through joining the Steam group and picking the tag in
CS2.

## Admin settings

**Settings → Application → Career**:

- **Career Levels**: the on switch. Turned off, the Career page says "Career
  levels are turned off on this server."
- **Formula**: **XP per match**, **Extra XP for a win**, **XP per level**,
  **Stacks per level**, and the **XP by rating** bands (**Add Band**, each with
  **From rating** and **Multiplier**). **Save Formula** recounts every player's
  level from their history.
- **Who Sees Career**: the **Minimum role** that sees Career (default User).
  Players below it keep earning XP and Stacks; it's only hidden from them.
- **Items cost Stacks**: off makes every shop item free and hides Stacks.
  Level and award items still have to be earned.
- **Grant Reward**: give Stacks, an item, or both, to players you pick or to a
  team's roster (**Add a team's roster**), with an optional **Reason** that
  goes into their notification. Negative Stacks take Stacks away.
