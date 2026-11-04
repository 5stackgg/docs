# Coach (Rokkan)

**Rokkan** is 5Stack's AI coach. It reviews the matches you play, scouts the
team you're about to face, and keeps track of the habits that keep showing up
in your games. Coach is available on 5stack.gg.

The match page's [Utility tab](/features/match-analysis#utility), which Rokkan's
reviews build on, works on every install.

## Match reviews

Once a match has finished and its demo is parsed, Rokkan reviews it, usually
within the hour. You get one notification per map ("Rokkan reviewed your
Mirage map"), under **Match reviews** in
[notification settings](/features/notifications#what-you-ll-get).

- Rokkan reviews 5Stack matches, imported [Valve and FACEIT
  matches](/features/external-matches), and uploaded demos.
- A match is reviewed when a **Verified User** played in it. Every signed-in
  player on both teams then gets their own section.
- Automatic reviews cover matches that ended in the last 24 hours.
- An uploaded demo is reviewed for the player who uploaded it only.

While a review is on its way, the match page and **Coach** say so: queued,
being reviewed, or, if it didn't work out, that Rokkan couldn't review it.

### Reading a review

A review opens on the map's [2D replay](/features/match-replay), paused on the
first thing to fix, with Rokkan's column beside it.

- **Stats on this map**: **K / A / D**, **ADR**, **KAST**, **HLTV**, and
  **Lineups on the spot**.
- Tabs: **Overview**, **Worked**, **To fix** and **Utility**, then
  **Practice**. Every fix comes with an **Instead:** line saying what to do
  next time.
- Clock times in the text are links (**Play from {clock}**) that jump the
  replay to that moment.
- **Rokkan's moments** step through every round Rokkan has something to say
  about: **P** and **N** move to the previous and next moment, and **Space**
  plays or pauses from anywhere on the page.
- **Viewing** switches to a teammate's section, or to the **Team summary**.

On a wide screen the replay and Rokkan's column sit side by side.

## The Coach page

**Coach**, under **Practice** in the navigation (`/coach`), holds everything
Rokkan has sent you, newest first.

- Tabs: **All**, **New** (reviews you haven't opened), **Reviews** and
  **Scouting**.
- Filter by **Map**, and choose whose reviews to show under **Show reviews
  for**: **Mine**, or one of your teams.

### Habits

After three reviewed matches, **Your habits · last N matches** shows the three
things Rokkan found most often. **See All** opens the full list (`/coach/habits`)
over your last 10 reviewed matches, split into **To fix** and **Working**. Each
habit says how often it came up ("In 4 of 10 matches") and links its **Latest
Review**.

## Scouting

Before a [tournament](/features/tournaments) match or a
[Scrim Finder](/features/scrim-finder) scrim, Rokkan scouts the other team. It
needs a verified player on your roster. Scouting runs when the match is
scheduled, and again for each map the veto picks.

A scouting report has a **Game plan**, how they play the map as CT and as T
(**Them as CT**, **Them as T**), **Their players**, and, before the veto has
picked a map, **Before the Veto**. The match page shows it as the **Rokkan
Briefing**, and you get a **Scouting Ready** notification (**Scouting** in
notification settings).

## Team coaching

A team page's **Coach** tab, open to the roster and to admins, gathers the
team's reviews from the matches it played as the team: **Roster reviews**,
each player's top fix, and **Team habits** across the roster.

## For admins

**Review with Rokkan**, in a finished match's **⋮** menu, sends any match with
demos for review. Older demos are parsed again first, and the menu then shows
the review's progress, **View Rokkan Review** once it's ready, or **Retry
Rokkan Review** if it failed.
