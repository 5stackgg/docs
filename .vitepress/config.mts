import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "5Stack",
  titleTemplate: ":title | 5Stack",
  description:
    "Counter-Strike Management System — a panel for managing servers, matches, and tournaments.",
  appearance: "dark",
  cleanUrls: true,

  head: [
    ["link", { rel: "icon", href: "/5stack-logo-mini.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    [
      "meta",
      {
        property: "og:title",
        content: "5Stack — The System Behind the Game—Yours",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Counter-Strike Management System — a panel for managing servers, matches, and tournaments.",
      },
    ],
    ["meta", { property: "og:site_name", content: "5Stack" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://docs.5stack.gg/5stack-logo.png",
      },
    ],
    ["meta", { property: "og:url", content: "https://docs.5stack.gg" }],
  ],

  themeConfig: {
    logo: "/5stack-logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
      { text: "Common Issues", link: "/common-issues/debug-script" },
      {
        text: "Roadmap",
        link: "https://github.com/orgs/5stackgg/projects/14/views/2",
      },
      {
        text: "Report an Issue",
        link: "https://github.com/5stackgg/5stack-panel/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D+",
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        link: "/getting-started",
        items: [
          {
            base: "/install",
            text: "Install",
            link: "/",
            items: [
              {
                text: "Requirements",
                link: "/requirements",
                items: [{ text: "Why Kubernetes?", link: "/why-k8s" }],
              },
              { text: "What is Installed?", link: "/what-is-installed" },
              {
                text: "Configuration Options",
                link: "/command-line-arguments",
              },
              { text: "Cookie Domain", link: "/cookie-domain" },
              { text: "Reverse Proxy", link: "/reverse-proxy" },
              { text: "Change Default Ports (80/443)", link: "/nginx" },
              {
                base: "/install/cloudflare",
                text: "Cloudflare",
                link: "/",
                items: [
                  { text: "DNS & SSL", link: "/dns-and-ssl" },
                  { text: "Cloudflare Proxy", link: "/proxy" },
                  { text: "Cloudflare Tunnel", link: "/tunnel" },
                  {
                    text: "Google Tag Manager",
                    link: "/google-tag-manager",
                  },
                ],
              },
            ],
          },
          {
            text: "Game Server Node Setup",
            link: "/servers/game-server-nodes/panel-upgrade",
          },
          { text: "Updating", link: "/updating" },
          { text: "Uninstall", link: "/uninstall" },
        ],
      },
      {
        text: "Features",
        base: "/features",
        link: "/",
        items: [
          {
            text: "User Features",
            items: [
              { text: "Quick Play & Matchmaking", link: "/quick-play" },
              { text: "Matches", link: "/matches" },
              { text: "Map Veto Format", link: "/map-veto" },
              { text: "Tournaments & Brackets", link: "/tournaments" },
              { text: "Teams, Lobbies & Chat", link: "/social" },
              { text: "Match Replay (2D & 3D)", link: "/match-replay" },
              { text: "In-Browser Demo Playback", link: "/demo-playback" },
              { text: "Highlights", link: "/highlights" },
              { text: "Live Streaming", link: "/live-streaming" },
              { text: "Stats & Leaderboards", link: "/stats-and-leaderboards" },
              { text: "External Matches", link: "/external-matches" },
              { text: "Steam Presence", link: "/steam-presence" },
              { text: "Demos", link: "/demos" },
              { text: "API Keys", link: "/api-keys" },
              { text: "Languages", link: "/languages" },
            ],
          },
          {
            text: "Admin Features",
            base: "/features/admin",
            link: "/",
            items: [
              { text: "Roles & Players", link: "/roles-and-players" },
              { text: "Matchmaking & Ranks", link: "/matchmaking" },
              { text: "Servers & Regions", link: "/servers" },
              { text: "Branding & Theming", link: "/branding" },
              { text: "Integrations", link: "/integrations" },
              { text: "System & Monitoring", link: "/system" },
            ],
          },
        ],
      },
      {
        text: "Troubleshooting",
        base: "/common-issues",
        items: [
          { text: "Unable to Log In", link: "/unable-to-login" },
          { text: "System Not Updating", link: "/system-not-updating" },
          { text: "RCON Commands Fail", link: "/rcon-fails" },
          {
            text: "Game Node Server",
            items: [
              {
                text: "Unable to Obtain Auth Key",
                link: "/tailscale-setup-issues",
              },
              {
                text: "Tailscale Disconnected After Reboot",
                link: "/tailscale-disconnected-after-reboot",
              },
            ],
          },
          { text: "Debug Script", link: "/debug-script" },
          {
            base: "/install/cloudflare",
            text: "Cloudflare Issues",
            link: "/dns-and-ssl",
          },
        ],
      },
      {
        text: "Servers",
        base: "/servers",
        items: [
          {
            text: "Getting Started with Servers",
            link: "/",
          },
          {
            text: "5Stack Game Server Nodes",
            base: "/servers/game-server-nodes",
            link: "/",
            items: [
              {
                text: "Panel Upgrade",
                link: "/panel-upgrade",
              },
              {
                text: "Create Game Server Node",
                link: "/create-game-server-node",
                items: [
                  { text: "Requirements", link: "/requirements" },
                  { text: "What is Installed?", link: "/what-is-installed" },
                ],
              },
              { text: "Port Forwarding", link: "/ports" },
              { text: "Tailscale Integration", link: "/tailscale" },
              {
                text: "Plugin Runtimes",
                link: "/plugin-runtimes",
                items: [{ text: "Custom Plugins", link: "/custom-plugins" }],
              },
              { text: "Version Pinning", link: "/version-pinning" },
              {
                text: "Dedicated Servers on Game Node Server",
                link: "/dedicated-servers",
              },
              { text: "Offline Support", link: "/offline-support" },
            ],
          },
          {
            text: "GPU Nodes",
            link: "/gpu-nodes",
          },
          {
            text: "Third PartyDedicated Servers",
            base: "/servers/dedicated-servers",
            link: "/",
            items: [
              {
                text: "Plugin Configuration",
                link: "/plugin-configuration",
              },
            ],
          },
          {
            text: "CPU Pinning",
            link: "/cpu-pinning",
          },
          {
            text: "CPU Governance",
            link: "/cpu-governance",
          },
          {
            text: "Low Latency Kernel",
            link: "/low-latency-kernel",
          },
          {
            text: "Steam Datagram Relay (SDR)",
            link: "/steam-relay",
          },
        ],
      },
      {
        text: "Plugin Development",
        base: "/plugins",
        link: "/",
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "The Manifest", link: "/manifest" },
          { text: "Routing", link: "/routing" },
          { text: "Module Federation", link: "/module-federation" },
          { text: "Styling", link: "/styling" },
          { text: "Components", link: "/components" },
          { text: "Backend & Auth", link: "/backend" },
          { text: "Deploying", link: "/deploying" },
        ],
      },
      {
        text: "Advanced",
        base: "/advanced",
        items: [
          {
            text: "API",
            link: "/api",
          },
          {
            text: "Discord Bot",
            link: "/discord-bot",
          },
          {
            text: "Bring Your Own S3",
            link: "/s3",
            items: [{ text: "Backblaze + Cloudflare", link: "/s3/backblaze" }],
          },
          {
            text: "Game Streaming",
            link: "/game-streaming/",
            items: [
              { text: "NVIDIA", link: "/game-streaming/nvidia" },
              { text: "AMD", link: "/game-streaming/amd" },
              { text: "Intel", link: "/game-streaming/intel" },
            ],
          },
          {
            text: "Custom Kubernetes",
            link: "/custom-k8s",
          },
          {
            text: "Faceit Integration",
            link: "/faceit-integration",
          },
          {
            text: "HashiCorp Vault",
            link: "/vault",
          },
          {
            text: "Lens IDE",
            link: "/lens-ide",
          },
        ],
      },
      {
        text: "Community",
        base: "/community",
        items: [
          {
            text: "Localization",
            link: "/localization",
          },
          {
            text: "Developer",
            link: "/developer",
          },
        ],
      },
    ],

    search: {
      provider: "local",
    },

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    editLink: {
      pattern: "https://github.com/5stackgg/docs/edit/main/:path",
    },

    socialLinks: [
      {
        link: "https://5stack.gg",
        ariaLabel: "5Stack",
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5,3 19,12 5,21"/></svg>`,
        },
      },
      { icon: "discord", link: "https://5stack.gg/discord-invite" },
      { icon: "github", link: "https://github.com/5stackgg/5stack-panel/" },
    ],
  },
});
