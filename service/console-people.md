# Console People

Who can use your panel's [browser console](/service/console), and what they can
do there. Admins manage the list in the console, on **Config → People**.

## Roles

| Role      | What they can do                                                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin     | Everything in the console: updates, settings, add-ons, plugins, backups, People and the **Allow opening from get.5stack.gg** switch. An Admin can add code that runs as root, so treat Admin like root. |
| Read only | Sees every page and runs nothing.                                                                                                                                                                       |

Whoever claims the panel is its first Admin. A panel holds up to 50 people.

## Add someone

On **Config → People**, paste their SteamID64 or Steam profile link into
**Add someone**, pick their role, and add them. Name search may not be
available, but a SteamID64 or a profile link always works.

Picking Admin shows a red warning:

> **Admin can run anything on this server.** They can upload add-ons and
> plugins that run as root, and manage everyone on this list. Only make someone
> Admin if you'd give them root.

Making someone an Admin later asks first, with the same warning.

Once added, they open the console from
[My Panels on 5stack.gg](/service/console#from-5stack-gg), or sign in to a link
from `sudo 5stack ui`.

## Change or remove someone

- Change someone's role in the menu next to their name.
- **Remove** ends their open console sessions at once. Anything they already
  installed stays.
- The panel always keeps at least one Admin. The last Admin can't be removed or
  made Read only: make someone else an Admin first.

## What Read only can't do

Read only people see every page, but they can't:

- run, change, install, download or stop anything, or answer a running
  command's questions,
- read the 5Stack service's own log, though Logs still shows k3s and the
  panel's services,
- see secret values, such as a hidden setting's value,
- see what other people's commands print, only that they started and finished.

## Opening from get.5stack.gg

The **Allow opening from get.5stack.gg** switch on this page decides whether
people on the list can open the console from
[My Panels on 5stack.gg](/service/console#from-5stack-gg). It's on by default.
Turning it off ends every console opened from there, and `sudo 5stack ui` on
the server still works.

## The console log

Admins also see the **Console Log** on this page: every command, who ran it,
and whether they opened the console from get.5stack.gg.

## Fix the list as root

Root on the panel server can always change the list, even when no Admin can
sign in:

| Command                                               | What it does                                                                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `sudo 5stack people`                                  | Lists everyone with their role and SteamID64, and whether opening from get.5stack.gg is on. So does `sudo 5stack people list`. |
| `sudo 5stack people add <steamid64> admin\|readonly`  | Adds someone as an Admin or Read only.                                                                                         |
| `sudo 5stack people role <steamid64> admin\|readonly` | Changes someone's role.                                                                                                        |
| `sudo 5stack people remove <steamid64>`               | Removes someone. Their open console sessions end within 10 seconds.                                                            |
| `sudo 5stack people web on\|off`                      | Turns **Allow opening from get.5stack.gg** on or off.                                                                          |

The same rule holds here: the last Admin can't be removed or made Read only.
Making someone an Admin prints the same warning as the console.
