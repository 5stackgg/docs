# Intel GPU Setup

::: warning Not yet supported
Game streaming on Intel GPUs is not currently supported. The streamer pipeline encodes via NVENC (NVIDIA-specific) and the pod runtime relies on the NVIDIA Kubernetes runtime, neither has an Intel equivalent wired up yet.
:::

## Tracking issue

We're tracking demand for Intel support here:

**[5stackgg/5stack-panel#468, Intel GPU support](https://github.com/5stackgg/5stack-panel/issues/468)**

If you'd like to use Intel GPUs (Arc discrete, or iGPU on recent Xeon / Core platforms) for game streaming, please **upvote and comment on the issue** with details about your hardware (model, driver, codec needs). The more concrete information we have, the easier it is to scope and prioritize.
