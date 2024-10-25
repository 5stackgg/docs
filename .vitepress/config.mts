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
              {
                text: "Configuration Options",
                link: "/install/command-line-arguments",
              },
              { text: "Updating", link: "/install/updating" },
              { text: "Nginx Configuration", link: "/install/nginx" },
              { text: "Tailscale Integration", link: "/install/tailscale" },
              { text: "Whats Installed?", link: "/install/what-is-installed" },
            ],
          },
        ],
      },
      {
        text: "Game Server Nodes",
        link: "/game-server-nodes",
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
      { icon: "github", link: "https://github.com/5stackgg/docs/" },
    ],
  },
});
