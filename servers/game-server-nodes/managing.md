# Managing Nodes

**Game Server Nodes**, under **Servers** in the admin navigation, is where you
look after your nodes once they're set up. The table lists every node with its
**Node**, **Load**, **CS2**, **Capacity** and **Region**, plus a mark on any
node that needs attention. Filter it by region, **Only enabled nodes** or
**Hide offline nodes**, and click a row to open the node's inspector.

## The node inspector

The inspector holds everything about one node: its live CPU, memory, disk and
network charts, hardware, ports, capacity, CS2 and GPU.

Select several nodes for bulk changes: Ctrl- or ⌘-click a row to add or drop
it, Shift-click for a range, then **Apply to all**.

### What needs attention

At the top, the inspector lists what wants your attention, worst first: a node
waiting to connect or offline, a failed CS2 update, more servers on its ports
than the CPU has room for, a plugin that doesn't support its build, what it
still needs before it can host matches (a region, ports or CS2), a CS2 build
that's behind, a CPU at under 3 GHz, a CPU governor other than `performance`, a
filling disk, the warnings the node reports itself, and GPU workloads that are
switched off.

### Warnings from the node

Each node checks itself and reports what it finds. A warning can have
**Details**, a **Docs** link, and a command to copy and run when there's a fix.

| Warning                                                    | What to do                                                                                                            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Needs a reboot to finish installing updates**            | Turn off **Accepting new servers**, wait for its matches to end, turn off **Enabled**, reboot, then turn both back on |
| **Automatic security updates are off**                     | Ubuntu's unattended-upgrades; run the command shown and answer Yes                                                    |
| **{name} is CPU-constrained**                              | A game server is at its pinned CPU limit: give servers more CPUs ([CPU Pinning](/servers/cpu-pinning))                |
| **Reserves {cores} CPU cores for Kubernetes instead of 1** | [CPU Pinning](/servers/cpu-pinning#nodes-that-reserve-two-cores)                                                      |
| **Governor is {governor} with pinning on**                 | [CPU Governance](/servers/cpu-governance)                                                                             |
| **Legacy lowlatency kernel**                               | [Low-Latency Kernel](/servers/low-latency-kernel)                                                                     |
| **Game files are on a hard drive**                         | [Storage](/servers/game-server-nodes/storage)                                                                         |
| **Secure Boot blocks the NVIDIA driver**                   | [NVIDIA](/servers/gpu-nodes/nvidia#secure-boot)                                                                       |
| **The NVIDIA driver isn't loaded**                         | [NVIDIA](/servers/gpu-nodes/nvidia)                                                                                   |
| **New GPU pods fail until it reboots**                     | An NVIDIA driver update is installed but the old one is still loaded                                                  |
| **NVIDIA modeset is off**                                  | [NVIDIA](/servers/gpu-nodes/nvidia#modeset)                                                                           |
| **Unused graphics card: {card}**                           | Set it up as a [GPU node](/servers/gpu-nodes/) for streams, demos and highlights, or acknowledge it                   |

The NVIDIA driver and Secure Boot warnings mark the node as broken, since its
GPU can't take work until they're fixed; the rest are warnings.

**Acknowledge** sets a warning aside, and **Restore** brings it back.
CPU-constrained and governor warnings can't be acknowledged.

The same warnings, grouped by kind across every node, are listed in the
[update popover](/features/admin/system#updates) in the header.

### Tuning a node

On Ubuntu nodes, the inspector can apply the fixes from the tuning pages for
you, and reports when the change has finished or failed.

| Button                                 | What it does                                                                                       | Needs                 |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------- |
| **Set CPU Governor to Performance**    | The [CPU Governance](/servers/cpu-governance) setup                                                | Ubuntu 22.04 or newer |
| **Turn On Low Latency** / **Turn Off** | Adds or removes the `preempt=full` boot option ([Low-Latency Kernel](/servers/low-latency-kernel)) | Ubuntu 24.04 or newer |
| **Move to the Generic Kernel**         | Moves a node off the legacy `linux-lowlatency` kernel                                              | Ubuntu 24.04 or newer |
| **Finish Removing the Old Kernel**     | Purges the old lowlatency kernel packages once the node boots the generic one                      | Ubuntu 24.04 or newer |

Changes to the boot options or kernel take effect after a reboot, so they ask
first (**Reboot Needed**), and the node then shows a reboot warning until it
has rebooted. A button that can't run says why: the node isn't on Ubuntu, its
Ubuntu is too old, another change is running, or it's waiting for a reboot. The
panel's own server is changed on that server, not from here.

## Where matches run

Each node's row has a node control menu, and the inspector has the same
switches:

- **Enabled**: off, the node is fully disabled, with no GPU work and no match
  scheduling.
- **Matchmaking**: matches start here. Off keeps the node for dedicated
  servers, GPU work and practice servers.
- **Accepting new servers**: off, the node takes no new matches or practice
  servers, and the ones it is running keep going.
- **Match types**: **All**, **Only** the types you pick, or **No matches**.
- **Practice servers**: whether players can boot
  [practice servers](/features/practice-servers) here, with **Matchmaking** on
  or off.

If no node in a region takes a match type any more, the list warns "No node in
{region} takes {types}", and region pickers leave out regions that can't host
the match being set up.

## CS2 on a node

The inspector's **CS2** section shows the node's build and its update state
(**Up to date**, **Update available**, **Updating to {build}**), with the
**Update log**. It also holds the node's **Version** and plugin pins; see
[Version Pinning](/servers/game-server-nodes/version-pinning).

Its **⋮** menu also has:

- **Remove CS2**: deletes the CS2 files from the node, after a confirm. Turn
  off **Matchmaking**, **Practice servers** or **Accepting new servers** first.
  Enabled nodes install CS2 again when the next CS2 update comes out.
- **Install CS:GO**, for legacy CS:GO servers. It starts right away, with no
  confirm. Once CS:GO is installed, the inspector gets its own **CS:GO**
  section with **Update CS:GO**, the **Update log** and **Remove CS:GO**.

The **CS2 build** card at the top of the page shows the current CS2 version and
when it was released.

## Kubernetes updates

When your nodes need a Kubernetes update or restart, the header's update
popover shows a **Kubernetes** section with how many nodes need it. **Update**
offers **Update now** or **Schedule** for a time you pick.

- It runs one node at a time. Matches already running keep going.
- Players see a maintenance banner 24 hours before (right away for **Update
  now**).
- Each node shows **Waiting**, **Updating**, **Updated** or **Skipped**, and an
  offline node is skipped.
- **Cancel update** calls off a scheduled run.

If the popover says the system-upgrade-controller is missing, update the panel
to put it back.
