# AMD GPU Setup

::: warning Not yet supported
Game streaming on AMD GPUs is not currently supported. The streamer pipeline encodes via NVENC (NVIDIA-specific) and the pod runtime relies on the NVIDIA Kubernetes runtime — neither has an AMD equivalent wired up yet.
:::

## Tracking issue

We're tracking demand for AMD support here:

**[5stackgg/5stack-panel#467 — AMD GPU support](https://github.com/5stackgg/5stack-panel/issues/467)**

If you'd like to use AMD GPUs for game streaming, please **upvote and comment on the issue** with details about your hardware (model, driver, ROCm version, codec needs). The more concrete information we have, the easier it is to scope and prioritize.
