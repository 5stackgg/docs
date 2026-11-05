# Getting Around

Everything in 5Stack is reached from the left navigation and the search box.
This page covers how they're laid out, what decides which links you see, and
the pages visitors land on before they sign in.

## The left navigation

The top of the navigation links home, which is your own profile (the Watch page
for signed-out visitors), and **Search** (⌘K or Ctrl+K). Signed-out visitors get a
sign-in prompt instead: "Sign in to queue for matches, track your stats and
join tournaments."

Below it are two doors, **Play** and **Watch**. Watch carries a badge while
matches are live. Under them, [News](/features/news) has a row of its own, and
the rest of the pages sit in four sections:

| Section       | Pages                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Compete**   | Matches, Tournaments, League, Events, Leaderboard                                                                              |
| **Practice**  | [Utility](/features/utility-library), [Coach](/features/coach), Scrim Finder, Public Servers                                   |
| **Community** | Players, Teams, Highlights, [Bans](/features/moderation#recently-banned)                                                       |
| **Info**      | [Help & FAQ](#help-faq), How Our Stats Work, [Changelog](/features/news#changelog), Terms of Service, Privacy Policy, Licenses |

**Info** lists the same pages whether you're signed in or not. Organizers and
up see a dot on **Changelog** while it has days they haven't read, and on the
**Info** heading while Info is folded.

Click a section's heading to fold it, and click it again to open it; the
chevron beside the name turns to show which. **Info** starts folded and the
others start open. What you fold or open stays that way in that browser, and a
section added later starts open. Going to a page inside a folded section opens
it for that visit only: following a link to the Changelog opens **Info**, and
it's folded again next time.

When the nav is collapsed to its icon rail, sections don't fold: every page
shows as an icon, **News** included, except **Info**, which is one icon that
opens a menu of its pages. The Changelog dot shows on that icon.

### Pins

Signed in, star any page (**Pin {page}**) to keep it in **Pinned**, between
News and the sections, and drag pins to reorder them. **Pinned** only shows
once something is pinned. Admin pages can be pinned too; they gather under
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
- **Coach** is on 5stack.gg, and **Scrim Finder** shows when it's enabled.

[Career](/features/career) isn't in the navigation: open it from your level in
the top bar, or from search.

### Apps from plugins

A [panel plugin](/plugins/) joins the navigation as an app. In its registration
under **Settings → Application → Panel Plugins**:

- **Nav group** names the section it joins: compete, practice, community or
  info. An app set to media or cosmetics joins **Community**, and one set to
  updates joins **Info**. Any other name gets a section of its own after the
  built-in ones, and a blank one puts it in **Apps** at the end.
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

- **Pages**: every page in the navigation, admin pages included, plus Career.
  Older names still work: "legal" finds the legal pages, "updates" finds News
  and Changelog, and "cosmetics" finds Career.
- **Account Settings** and **Application Settings**: individual settings.
  Picking one opens its page scrolled to that setting.
- **Help**: answers from [Help & FAQ](#help-faq), opened in place.
- **Players**, marked online or registered.

Search only offers what your role can open. Inside **Settings → Application**,
**Search settings** at the top of the rail does the same for every settings
section, reading setting names and descriptions.

## Help & FAQ

**Help & FAQ** (`/faq`) is in the navigation's **Info** section. It's split
into parts: **Start Here**, **Running a Match**, **The Veto**, **Tournaments**,
**Playing Here**, **About 5Stack**, and **For Administrators**, which only
administrators see. **Search the FAQ** filters it, and ⌘K searches it too.

Two pages let you try things without touching a real game:

- **Demo Match** (`/faq/demo-match`): a pretend match for the organizer tools.
  Pick a step, then press **Fix a Problem** in the admin bar (see
  [Fix a Problem](/features/matches#fix-a-problem)).
- **Demo Lobby** (`/faq/demo-draft`): a captains draft played through step by
  step, from the picks and check-in to the veto and the server starting.

## Your player card

Signed in, your player card fills the navigation's bottom-left corner, wearing
your [look](/features/career#the-locker): banner, frame, nameplate, title and
profile stat, with your level, flag and Elo, and your
[pending imports](/features/external-matches#tracking-imports) while you have
any. Collapsed to the icon rail, it's just your avatar and frame.

Click it to open **View Profile**, **My Settings** and **Logout**.

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
**Info** in the navigation, for signed-in players and visitors alike, and the
Welcome page's footer links the terms, the privacy policy and its cookies
section.

## Lists remember where you were

Back returns lists to where you left them. Players, Matches, Teams, Leaderboard
and Highlights come back on the page of results you left, and Teams keeps its
search, sort and filters too. The lists inside team, tournament, league, event
and award pages do the same.
