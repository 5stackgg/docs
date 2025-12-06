import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "5Stack",
  description:
    "A Counter-Strike Panel for Managing Servers, Matches, and Tournaments",
  appearance: "dark",
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/5stack-logo-mini.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: '5Stack | Counter-Strike Management System' }],
    ['meta', { property: 'og:description', content: 'A Counter-Strike Panel for Managing Servers, Matches, and Tournaments' }],
    ['meta', { property: 'og:site_name', content: '5Stack' }],
    ['meta', { property: 'og:image', content: 'https://docs.5stack.gg/5stack-logo.png' }],
    ['meta', { property: 'og:url', content: 'https://docs.5stack.gg' }],
  ],  

  themeConfig: {
    logo: "/5stack-logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
      { text: "Common Issues", link: "/common-issues/debug-script" },
      {
        text: 'Report an Issue',
        link: 'https://github.com/5stackgg/5stack-panel/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D+'
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          {
            text: "Install",
            link: "/install",
            items: [
              { text: "Requirements", link: "/install/requirements" },
              { text: "What is Installed?", link: "/install/what-is-installed" },
              {
                text: "Configuration Options",
                link: "/install/command-line-arguments",
              },
              { text: "Cookie Domain", link: "/install/cookie-domain" },
              { text: "Reverse Proxy", link: "/install/reverse-proxy" },
              { text: "Change Default Ports (80/443)", link: "/install/nginx" },
            ],
          },
          { text: "Updating", link: "/install/updating" },
          { text: "Uninstall", link: "/uninstall" },
        ],
      },
      { 
        text: "Troubleshooting", 
        items: [
          { text: "Invalid SSL", link: "/common-issues/invalid-ssl" },
          { text: "Unable to Log In", link: "/common-issues/unable-to-login" },
          { text: "System Not Updating", link: "/common-issues/system-not-updating" },
          { text: "RCON Commands Fail", link: "/common-issues/rcon-fails" },
          {
            text: "Game Node Server",
            items: [
              { text: "Unable to Obtain Auth Key", link: "/common-issues/tailscale-setup-issues" },
              { text: "Tailscale Disconnected After Reboot", link: "/common-issues/tailscale-disconnected-after-reboot" }
            ]
          },
          { text: "Debug Script", link: "/common-issues/debug-script" },
        ]
      },
      {
        text: "Servers",
        items: [
          {
            text: "Getting Started with Servers",
            link: "/servers",
          },
          {
            text: "5Stack Game Server Nodes",
            link: "/servers/game-server-nodes",
            items: [
              { text: "Install", link: "/servers/game-server-nodes/install",
                
              },
              {
                text: "Create Game Server Node",
                link: "/servers/game-server-nodes/create-game-server-node",
                items: [
                  { text: "Requirements", link: "/servers/game-server-nodes/requirements" },
                  { text: "What is Installed?", link: "/servers/game-server-nodes/what-is-installed" },
                ]
              },
              { text: "Port Forwarding", link: "/servers/game-server-nodes/ports" },
              { text: "Tailscale Integration", link: "/servers/game-server-nodes/tailscale" },
              { text: "Custom CSS Plugins", link: "/servers/game-server-nodes/custom-plugins" },
              { text: "Version Pinning", link: "/servers/game-server-nodes/version-pinning" },  
              { text: "Dedicated Servers on Game Node Server", link: "/servers/game-server-nodes/dedicated-servers" },
              { text: "Offline Support", link: "/servers/game-server-nodes/offline-support" },
            ]
          },
          {
            text: "Third PartyDedicated Servers",
            link: "/servers/dedicated-servers",
            items: [
              {
                text: "Plugin Configuration", 
                link: "/servers/plugin-configuration",
              },
            ]
          },
          {
            text: "CPU Pinning",
            link: "/servers/cpu-pinning",
          },
          {
            text: "CPU Governance",
            link: "/servers/cpu-governance",
          },
          {
            text: "Low Latency Kernel",
            link: "/servers/low-latency-kernel",
          },
          {
            text: "Steam Datagram Relay (SDR)",
            link: "/servers/steam-relay",
          },
        ],
      },
      { 
        text: "Advanced", 
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
            items: [
              { text: "Backblaze + Cloudflare", link: "/s3/backblaze" },
            ]
          },
          {
            text: "Custom K8s",
            link: "/custom-k8s",
          },
          {
            text: "HashiCorp Vault",
            link: "/vault",
          },
          {
            text: "Lens IDE",
            link: "/lens-ide",
          },
        ]
      },
      {
        text: "Community",
        items: [
          {
            text: "Localization",
            link: "/localization",
          },
          {
            text: "Developer",
            link: "/developer",
          }
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
        ariaLabel: "5Stack" ,
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5,3 19,12 5,21"/></svg>`
        }
    },
      { icon: "discord", link: "https://5stack.gg/discord-invite" },
      { icon: "github", link: "https://github.com/5stackgg/5stack-panel/" },
    ],
  },
});
