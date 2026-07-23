# Highlights

5Stack turns finished matches into shareable video automatically, and gives you
an in-app editor to cut your own clips. Both render on a [GPU node](/servers/gpu-nodes).

## Automatic highlights

When a match finishes (or an imported demo is analyzed), 5Stack detects the
standout moments, **multikills, best rounds, clutches, and knife kills**, and
renders them into clips. You can:

- **Group by match** or view every clip individually.
- **Filter** by player, time range (24h / 7d / 30d / 90d / all-time), and kill
  count (2+, 3+, 4+, 5+).
- **Share** a clip with a link, and toggle clips between **public** and
  **private**.

## In-app clip builder

From [demo playback](/features/demo-playback), anyone with the right role can cut
a custom clip two ways:

- **One-click presets**: Multikills, Best Round, Knife, or a match Recap.
- **Manual editor**: drag segments onto a tick timeline, trim and reposition
  them, and set the POV player per segment. Round markers make it easy to line
  cuts up with the action.

Set a title, resolution (720p/1080p), and FPS (30/60), then submit. The job goes
into the **render queue**, where you can watch its progress.

## Admin controls

- **Auto-generate** highlights on match completion and/or on imported demo
  analysis.
- **Pause renders during live matches** so playback and streaming get GPU
  priority.
- **Bake branding** into rendered clips.
- Default **resolution / FPS** and video **codec** (H.264 or H.265).
- **Retention**: minimum retention days and a maximum storage cap.
- Default clip **visibility** (public or private).

::: tip
Highlights, clips, and demo playback all share your [GPU nodes](/servers/gpu-nodes).
If renders are slow or queued. Check the GPU pool and the "pause during live
matches" setting.
:::
