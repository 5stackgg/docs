import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "5Stack",
  base: 'https://docs.5stack.gg/',
  description: "A Counter-Strike Panel for Managing Servers, Matches, and Tournaments",
  appearance: 'dark',
  themeConfig: {
    logo: '/5stack-logo.png',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Install', link: '/install', items: [
            { text: 'Requirements', link: '/requirements' },
            { text: 'Configuration Options', link: '/configuration-options' },
            { text: 'Updating', link: '/updating' }
          ]}
        ]
      },
      {
        text: "Game Server Nodes",
        link: '/game-server-nodes',
        items: [
          {
            text: "Tailscale",
            link: '/tailscale'
          }
        ]
      },
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/5stackgg/docs' }
    ],
  }
})
