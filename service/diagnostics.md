# Diagnostics

A panel on the 5Stack service sends 5Stack crash reports, so problems can be
found and fixed. It is on by default, and one switch turns it off.

## What is sent

- **Crash reports.** When a panel service crashes or restarts, a crash report
  holds its exit reason, its recent events and the logs from before the crash. At
  most 10 reports are sent an hour.

Before anything leaves your server, player data is removed: Steam IDs, IP
addresses, email addresses, chat and player names. Each report is capped at 5 MB.

## Debug bundles

A full debug bundle, like the one [`./debug.sh`](/common-issues/debug-script)
makes, is sent only when 5Stack support asks for one while helping you. Player
data is removed from it the same way.

## Turn it off

In the panel's settings, open **Diagnostics** and turn off
**Send crash reports to 5Stack**. Or, on the panel server, run:

```bash
5stack diagnostics off
```

While it is off, nothing is sent, and requests for a debug bundle are refused.
