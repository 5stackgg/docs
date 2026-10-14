# Web Push Notifications

Web Push lets 5stack notify players on their phone or desktop **when the app isn't open** — a match going live, an invite, a scrim request, a new message.

It is enabled out of the box and needs no configuration. Players turn it on per device under **Settings → Notifications**, where they also choose which groups of notifications push and set **quiet hours**; see [Notifications](/features/notifications). **Settings → Application → Web Push** shows whether it's working:

- a state: **Transmitting**, **Standby** (devices are subscribed but nothing has reached one yet), **Ready** (waiting for the first device) or **Offline**,
- the **Last confirmed delivery**,
- **Devices**, **Players**, **Active 7d** and **New 7d** counts, and the **Platform Mix** (Apple, Chrome / Android, Firefox, Windows, other),
- how many subscribed devices have never received a push.

## No service, no keys to buy

A common assumption is that push notifications need a paid provider like Firebase, OneSignal or Pusher. **They don't.**

Every browser vendor runs its own push service, free, with no account and no API key:

| Browser                       | Push service                    |
| ----------------------------- | ------------------------------- |
| Chrome, Edge, Brave           | Google's push endpoints         |
| Firefox                       | Mozilla autopush                |
| Safari (macOS 16+, iOS 16.4+) | Apple Push Notification service |

When a player enables notifications, their browser hands 5stack a subscription URL pointing at its own vendor's service. 5stack sends notifications to that URL directly.

The one piece of configuration is a **VAPID keypair**, which identifies your panel to those services. It is self-signed and registered with nobody, so 5stack generates it for you on first boot and stores it in the database. If you'd rather manage it yourself, `WEB_PUSH_PUBLIC_KEY` and `WEB_PUSH_PRIVATE_KEY` in the API's environment take precedence.

::: tip Why people think it costs money
The old **GCM** protocol did require a Firebase project and a server key. It was replaced by the **VAPID** standard, which needs neither. If a guide tells you to paste a Firebase key, it's describing the deprecated flow.
:::

## When a push is sent

A push is only worth sending if the player hasn't already seen the thing it's about, so delivery depends on the kind of notification:

| Kind                                                                                | How it's delivered                                                                                                                                                               |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Match found**, **Admin calls**                                                    | Immediately, as an urgent push that rings. Expires after 30 seconds, so an offline phone never gets a stale one. Ignores quiet hours.                                            |
| **Chat** and **match chat**                                                         | Only if the player isn't looking at the conversation and hasn't read past the message. The first of a burst goes at once; the rest of the next 15 seconds arrive as one summary. |
| **Match alerts** for organizers                                                     | The first at once; a condition that flaps in the next 30 seconds is collapsed, and one that's already resolved sends nothing.                                                    |
| Invites, reminders, imports, stats, clips, awards, account notices, scrims, leagues | At once, unless the player already dealt with it in the app.                                                                                                                     |
| **New tournaments**, **news**                                                       | The first at once; a 5-second window absorbs the burst of a fan-out to everyone.                                                                                                 |
| Staff alerts                                                                        | The first at once; anything else in the next 60 seconds is collapsed.                                                                                                            |

During a player's **quiet hours**, pushes are held and sent as one summary per thread when the window ends.

Pushes carry more than text where the platform allows it: invites have **Accept** and **Decline** buttons that work straight from the notification, a hero image shows on Android and desktop, and the app icon's badge shows the unread count. iOS shows the badge but drops images and buttons.

## Requirements and limitations

These are constraints of the Web Push standard and the browsers, not of 5stack.

**HTTPS is required.** Service workers only run on a secure origin. A panel served over plain HTTP cannot deliver push notifications at all.

**iOS requires the app be installed to the home screen.** On iPhone and iPad, Safari has no notification support in a normal tab. Players must open 5stack in Safari, tap Share → _Add to Home Screen_, and enable notifications from the installed app. This needs iOS 16.4 or newer. The settings page shows this hint automatically on iOS.

**The permission prompt is one-shot.** A browser only asks once. If a player dismisses or blocks it, 5stack cannot ask again — they have to re-enable notifications in their browser or OS settings.

**Delivery is best-effort.** There are no delivery or read receipts. Push services may delay, batch, or drop notifications for a device that has been offline for a long time — the spec makes no guarantees. The in-app Inbox is the reliable record; push is the nudge.

**Ringing depends on the platform.** Urgent pushes ask the device to vibrate and keep the notification on screen; platforms that don't support that show an ordinary notification.

**Subscriptions expire on their own.** Clearing site data, uninstalling the PWA, or a long period of inactivity ends a subscription. 5stack deletes those rows automatically, so the subscriber count reflects reality.

**Payloads are small** — roughly 4KB, so bodies are trimmed to a short preview. Tapping through opens the relevant page in the app.

**Content passes through the vendor's infrastructure** encrypted, but avoid putting anything in a notification title or body you wouldn't want on a lock screen.

## Troubleshooting

**A player sees "Push notifications aren't supported in this browser".** They're on iOS in a Safari tab (see above), on an old browser, or the panel is being served over HTTP.

**The toggle does nothing and no prompt appears.** Notifications are blocked for the site at the browser or OS level. It has to be re-enabled there first; the page will say so when it detects this.

**Turning push on times out.** The page names the step that stalled: the permission prompt, fetching the push key, the service worker, or registering with the device's push service. Background or battery restrictions are a common cause of the last one on Android.

**Notifications stopped for everyone at once.** The keypair changed. 5stack never rotates it on its own, but setting or changing `WEB_PUSH_PUBLIC_KEY` / `WEB_PUSH_PRIVATE_KEY` does, and every subscription was taken out against the old public key. Every device has to turn push on again.
