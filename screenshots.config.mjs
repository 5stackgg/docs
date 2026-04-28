const env = (name, fallback) => process.env[name] || fallback;

// Edit this file when the docs gallery should show a different route or section.
// Useful per-screenshot options: profile, path, url, selector, fullPage, clip, viewport,
// localStorage, leftSidebar, waitForSelector, waitForTimeout, and actions.
// Actions can click/fill/hover/wait; see web/scripts/capture-doc-screenshots.mjs.
// For live-site captures, set the SCREENSHOT_*_PATH env vars below when a
// screenshot needs a specific real tournament, player, match, or server node.
// Profiles are guest, user, and admin. The runner captures guest first, then
// user, then admin; within each profile it preserves the order below.
// Use leftSidebar: "collapsed" on screenshots where the page content matters
// more than the left navigation. Use right-hub-pinned below only on screenshots
// that should intentionally show the right hub.

const adminScreenshot = {
  profile: "admin",
  leftSidebar: "collapsed",
};

export const defaults = {
  viewport: { width: 1440, height: 960 },
  selector: "[data-screenshot-root]",
  waitUntil: "domcontentloaded",
  waitForTimeout: 1200,
  fullPage: false,
  quality: 88,
  colorScheme: "dark",
  localStorage: {
    "nuxt-color-mode": "dark",
    "right-hub-active-tab": null,
    "right-hub-pinned": null,
  },
};

export const screenshots = [
  {
    title: "Play",
    file: "Play.webp",
    path: "/play",
    profile: "user",
  },
  {
    title: "Lobby",
    file: "Lobby.webp",
    path: "/play",
    profile: "user",
    localStorage: {
      "right-hub-active-tab": "lobby",
      "right-hub-pinned": "1",
    },
  },
  {
    title: "Match Overview",
    file: "MatchOverview.webp",
    path: env("SCREENSHOT_MATCH_PATH", "/manage-matches"),
    ...adminScreenshot,
  },
  {
    title: "Match Previews",
    file: "MatchPreviews.webp",
    path: "/manage-matches",
    ...adminScreenshot,
  },
  {
    title: "Match Settings",
    file: "MatchSettings.webp",
    path: env("SCREENSHOT_MATCH_SETTINGS_PATH", "/matches/create"),
    ...adminScreenshot,
  },
  {
    title: "Match Map Veto",
    file: "MatchMapVeto.webp",
    path: env("SCREENSHOT_MATCH_VETO_PATH", "/manage-matches"),
    ...adminScreenshot,
    actions: [{ clickText: "Map Veto", optional: true }],
  },
  {
    title: "Quick Match Status",
    file: "QuickMatchStatus.webp",
    path: "/play",
    profile: "user",
  },
  {
    title: "Multi Stage Tournament",
    file: "Mutli Stage Tounament.webp",
    path: env(
      "SCREENSHOT_MULTI_STAGE_TOURNAMENT_PATH",
      "/tournaments/b0000000-0000-0000-0000-000000000004",
    ),
  },
  {
    title: "Game Server Nodes",
    file: "GameServerNodes.webp",
    path: "/game-server-nodes",
    ...adminScreenshot,
  },
  {
    title: "Dedicated Servers",
    file: "DedicatedServers.webp",
    path: "/dedicated-servers",
    ...adminScreenshot,
  },
  {
    title: "Public Servers",
    file: "PublicServers.webp",
    path: "/public-servers",
  },
  {
    title: "Regions",
    file: "Regions.webp",
    path: "/regions",
    ...adminScreenshot,
  },
  {
    title: "File Manager",
    file: "FileManager.webp",
    path: env(
      "SCREENSHOT_FILE_MANAGER_PATH",
      "/game-server-nodes/fixture-node-us-east/files",
    ),
    ...adminScreenshot,
  },
  {
    title: "Player Stats",
    file: "PlayerStats.webp",
    path: env("SCREENSHOT_PLAYER_PATH", "/players/76561198000000001"),
  },
  {
    title: "Teams",
    file: "Teams.webp",
    path: "/teams",
  },
  {
    title: "Friends List",
    file: "FriendsList.webp",
    path: "/play",
    profile: "user",
    localStorage: {
      "right-hub-active-tab": "social",
      "right-hub-pinned": "1",
    },
  },
  {
    title: "System Metrics",
    file: "SystemMetrics.webp",
    path: "/system-metrics",
    ...adminScreenshot,
  },
  {
    title: "System Logs",
    file: "Systemlogs.webp",
    path: "/system-logs",
    ...adminScreenshot,
  },
  {
    title: "Map Pools",
    file: "MapPools.webp",
    path: "/settings/application/map-pools",
    ...adminScreenshot,
  },
  {
    title: "Account Settings",
    file: "AccountSettings.webp",
    path: "/settings",
    profile: "user",
  },
  {
    title: "Application Settings",
    file: "ApplictaionSettings.webp",
    path: "/settings/application",
    ...adminScreenshot,
  },
  {
    title: "Public Pages",
    file: "PublicPages.webp",
    path: "/",
  },
  {
    title: "Stream Picture In Picture",
    file: "StreamPictureInPicture.webp",
    path: env("SCREENSHOT_STREAM_PATH", "/watch"),
    profile: "user",
    localStorage: {
      "right-hub-active-tab": "recent-games",
      "right-hub-pinned": "1",
    },
  },
];
