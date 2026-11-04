# Getting Around

Everything in 5Stack is reached from the left navigation, the search box, and
the profile menu. This page covers how they're laid out, what decides which
links you see, and the pages visitors land on before they sign in.

## The left navigation

The top of the navigation links home, which is your own profile (the Watch page
for signed-out visitors), and **Search** (⌘K or Ctrl+K). Signed-out visitors get a
sign-in prompt instead: "Sign in to queue for matches, track your stats and
join tournaments."

Below it are two doors, **Play** and **Watch**. Watch carries a badge while
matches are live. Under them, the pages sit in five sections:

| Section       | Pages                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------- |
| **Compete**   | Tournaments, League, Events                                                                  |
| **Cosmetics** | [Career](/features/career)                                                                   |
| **Practice**  | [Utility](/features/utility-library), [Coach](/features/coach), Public Servers, Scrim Finder |
| **Media**     | Matches, Highlights, [News](/features/news)                                                  |
| **Community** | Players, Teams, Leaderboard, [Bans](/features/moderation#recently-banned)                    |

Click a section's heading to fold it. Folded sections stay folded in that
browser, and a section added later starts open.

### Pins

Star any page (**Pin {page}**) to keep it in **Pinned**, above the sections,
and drag pins to reorder them. Admin pages can be pinned too; they gather under
their own label inside **Pinned**. Pins are saved per browser.

### What shows up

Sections only list what's there for you:

- **Tournaments**, **News** and **Highlights** appear once there's something in
  them. Players who can create tournaments or post news still see those links,
  so they can add the first one.
- **Events** and **League** always show to signed-out visitors while they're
  switched on, so visitors know the site runs them. Signed in, Events shows
  once there's an event or you can create one, and League once a season
  exists (administrators always see it).
- **Public Servers** shows once a server is listed for players; moderators
  always see it.
- **Career** needs you signed in and Career switched on, **Coach** is on
  5stack.gg, and **Scrim Finder** shows when it's enabled.

### Apps from plugins

A [panel plugin](/plugins/) joins the navigation as an app. In its registration
under **Settings → Application → Panel Plugins**:

- **Nav group** names the section it joins: compete, practice, media or
  community. Any other name gets a section of its own after the built-in ones,
  and a blank one puts it in **Apps** at the end.
- **Nav order** is where it sits in that section: 1 after the first page, 2
  after the second, 0 at the end.
- **Featured** shows it as a button right after Watch instead (see
  [`featured`](/plugins/manifest#featured)).

## Play and Admin

Staff with at least three admin pages get a **Play** / **Admin** switch above
the lists. **Admin** shows the admin pages in their groups (see
[Admin navigation](/features/admin/#admin-navigation)), with a count of what
needs attention ("{count} need attention"). Opening an admin page switches the
nav to Admin, and any other page switches it back to Play. With fewer than
three admin pages, such as an organizer with Awards and the Control Room, they
join the Play list as one **Administration** section instead.

## Search

**Search**, or ⌘K / Ctrl+K anywhere, opens one box to "Search players, pages,
settings and help". Results come in groups:

- **Pages**: every page in the navigation, admin pages included.
- **Account Settings** and **Application Settings**: individual settings.
  Picking one opens its page scrolled to that setting.
- **Help**: answers from [Help & FAQ](#help-faq), opened in place.
- **Players**, marked online or registered.

Search only offers what your role can open. Inside **Settings → Application**,
**Search settings** at the top of the rail does the same for every settings
section, reading setting names and descriptions.

## Help & FAQ

**Help & FAQ** (`/faq`) is in the profile menu and behind the **Support** (?)
button at the bottom of the navigation. It's split into parts: **Start Here**, **Running
a Match**, **The Veto**, **Tournaments**, **Playing Here**, **About 5Stack**,
and **For Administrators**, which only administrators see. **Search the FAQ**
filters it, and ⌘K searches it too.

Two pages let you try things without touching a real game:

- **Demo Match** (`/faq/demo-match`): a pretend match for the organizer tools.
  Pick a step, then press **Fix a Problem** in the admin bar (see
  [Fix a Problem](/features/matches#fix-a-problem)).
- **Demo Lobby** (`/faq/demo-draft`): a captains draft played through step by
  step, from the picks and check-in to the veto and the server starting.

## The profile menu

Your avatar at the bottom of the navigation opens the profile menu. It starts
with your player card, then **My Account** (your settings), **Help & FAQ**, and
[Changelog](/features/news#changelog), then the **Legal** pages and **Logout**.

## Before signing in

A signed-out visitor who opens the site lands on **Welcome** (`/welcome`), a
tour of the site under its own name: playing, competing, watching, utility and
the community, with **Open app** to go in. Signed-in players land on their own
profile. An administrator can make a plugin the **Default page** instead, and
then the site opens on that plugin for anyone allowed to see it.

**Run your own** (`/run-your-own`), linked from the Welcome page's footer, shows
the admin side of 5Stack to people thinking of hosting it.

## Legal

Every panel ships a **Terms of Service** (`/terms`) and a **Privacy Policy**
(`/privacy`) written for a self-hosted 5Stack site. They name the site by its
own brand, explain that it runs on 5Stack and is hosted by its operators, and
send questions to those operators. The **Licenses** page lists 5Stack's
[license](/license) and the third-party software it uses. All three are under
**Legal** in the profile menu, and the Welcome page's footer links the terms,
the privacy policy and its cookies section.

## Lists remember where you were

Back returns lists to where you left them. Players, Matches, Teams, Leaderboard
and Highlights come back on the page of results you left, and Teams keeps its
search, sort and filters too. The lists inside team, tournament, league, event
and award pages do the same.
