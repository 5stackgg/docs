import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "5Stack",
  description:
    "A Counter-Strike Panel for Managing Servers, Matches, and Tournaments",
  appearance: "dark",
  themeConfig: {
    logo: "/5stack-logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
      {
        text: 'Report an Issue',
        link: 'https://github.com/5stackgg/5stack-panel/issues/new'
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
              { text: "What is Installed?", link: "/install/what-is-installed" },
              { text: "Requirements", link: "/install/requirements" },
              {
                text: "Configuration Options",
                link: "/install/command-line-arguments",
              },
              { text: "Cookie Domain", link: "/install/cookie-domain" },
              { text: "Nginx Configuration", link: "/install/nginx" },
            ],
          },
          { text: "Updating", link: "/install/updating" },
        ],
      },
      {
        text: "Servers",
        link: "/servers",
        items: [
          {
            text: "Dedicated Servers",
            link: "/servers/dedicated-servers",
          },
          {
            text: "Game Server Nodes",
            link: "/servers/game-server-nodes",
            items: [
              { text: "Tailscale Integration", link: "/servers/game-server-nodes/tailscale" },
            ]
          }
        ],
      },
      {
        text: "Discord Bot",
        link: "/discord-bot",
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
