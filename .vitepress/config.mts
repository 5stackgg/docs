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
    ['meta', { property: 'og:site_name', content: '5Stack' }],
    ['meta', { property: 'og:image', content: 'https://docs.5stack.gg/5stack-logo.png' }],
    ['meta', { property: 'og:url', content: 'https://docs.5stack.gg//' }],
  ],  

  themeConfig: {
    logo: "/5stack-logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
      {
        text: 'Report an Issue',
        link: 'https://github.com/5stackgg/5stack-panel/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D+'
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Requirements", link: "/install/requirements" },
          { text: "What is Installed?", link: "/install/what-is-installed" },
          {
            text: "Install",
            link: "/install",
            items: [
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
        text: "Common Issues", 
        link: "/common-issues", 
        items: [
          { text: "Invalid SSL", link: "/common-issues/invalid-ssl" },
          { text: "System Not Updating", link: "/common-issues/system-not-updating" },
        ]
      },
      {
        text: "Servers",
        link: "/servers",
        items: [
          {
            text: "Dedicated Servers",
            link: "/servers/dedicated-servers",
            items: [
              {
                text: "Plugin Configuration", 
                link: "/servers/plugin-configuration",
              },
            ]
          },
          {
            text: "Game Server Nodes",
            link: "/servers/game-server-nodes",
            items: [
              { text: "Custom Plugins", link: "/servers/game-server-nodes/custom-plugins" },
              { text: "Tailscale Integration", link: "/servers/game-server-nodes/tailscale" },
            ]
          }
        ],
      },
      {
        text: "Discord Bot",
        link: "/discord-bot",
      },
      {
        text: "Custom K8s",
        link: "/custom-k8s",
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
      { icon: "discord", link: "https://5stack.gg/discord-invite" },
      { icon: "github", link: "https://github.com/5stackgg/5stack-panel/" },
    ],
  },
});
