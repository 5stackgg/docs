# Web Push Notifications

Web Push lets 5stack notify players on their phone or desktop **when the app isn't open** — a match going live, an invite, a scrim request, a new message.

It is enabled out of the box and needs no configuration. Players turn it on per device under **Settings → Notification Preferences**, where they can also mute individual categories and set **quiet hours** — a window in which push stays silent while the notifications still land in the in-app alert bell. Application settings → **Integrations → Web Push** shows whether it's active and how many devices are subscribed.

## No service, no keys to buy

A common assumption is that push notifications need a paid provider like Firebase, OneSignal or Pusher. **They don't.**

Every browser vendor runs its own push service, free, with no account and no API key:

| Browser                       | Push service                    |
| ----------------------------- | ------------------------------- |
| Chrome, Edge, Brave           | Google's push endpoints         |
| Firefox                       | Mozilla autopush                |
| Safari (macOS 16+, iOS 16.4+) | Apple Push Notification service |

When a player enables notifications, their browser hands 5stack a subscription URL pointing at its own vendor's service. 5stack sends notifications to that URL directly.

The one piece of configuration is a **VAPID keypair**, which identifies your panel to those services. It is self-signed and registered with nobody, so 5stack generates it for you on install.

::: tip Why people think it costs money
The old **GCM** protocol did require a Firebase project and a server key. It was replaced by the **VAPID** standard, which needs neither. If a guide tells you to paste a Firebase key, it's describing the deprecated flow.
:::

## Requirements and limitations

These are constraints of the Web Push standard and the browsers, not of 5stack.

**HTTPS is required.** Service workers only run on a secure origin. A panel served over plain HTTP cannot deliver push notifications at all.

**iOS requires the app be installed to the home screen.** On iPhone and iPad, Safari has no notification support in a normal tab. Players must open 5stack in Safari, tap Share → _Add to Home Screen_, and enable notifications from the installed app. This needs iOS 16.4 or newer. The settings page shows this hint automatically on iOS.

**The permission prompt is one-shot.** A browser only asks once. If a player dismisses or blocks it, 5stack cannot ask again — they have to re-enable notifications in their browser or OS settings.

**Delivery is best-effort.** There are no delivery or read receipts. Push services may delay, batch, or drop notifications for a device that has been offline for a long time — the spec makes no guarantees. The in-app alert bell is the reliable record; push is the nudge.

**Subscriptions expire on their own.** Clearing site data, uninstalling the PWA, or a long period of inactivity ends a subscription. 5stack deletes those rows automatically, so the subscriber count reflects reality.

**Payloads are small** — roughly 4KB, so bodies are trimmed to a short preview. Tapping through opens the relevant page in the app.

**Content passes through the vendor's infrastructure** encrypted, but avoid putting anything in a notification title or body you wouldn't want on a lock screen.

## Troubleshooting

**A player sees "Push notifications aren't supported in this browser".** They're on iOS in a Safari tab (see above), on an old browser, or the panel is being served over HTTP.

**The toggle does nothing and no prompt appears.** Notifications are blocked for the site at the browser or OS level. It has to be re-enabled there first; the page will say so when it detects this.

**Notifications stopped for everyone at once.** The signing keys were rotated — every device has to re-enable notifications. Only rotate if the private key has leaked.
