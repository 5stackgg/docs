# Supported GPUs

A [GPU node](/servers/gpu-nodes/) runs on an NVIDIA GeForce GTX 1080 or newer,
or on one of the AMD Radeon GPUs below. The tables show about how fast each one
runs CS2 at 1080p on each quality preset, and which settings to use on it.

## Recommended settings

Use **1080p** with the **High** preset on every GPU node:

1. Open **GPU Nodes**.
2. Open the node's menu and pick **Edit video settings**.
3. Set **Quality preset** to **High** and **Render resolution** to **1080p
   (1920×1080)**.

Viewers get 1080p at 60 fps. While a node renders, 5Stack lets CS2 run at up
to 120 fps, so every frame it captures is fresh. Smokes and big fights pull CS2
well below its average, so a GPU needs to average about **200 fps on High** to
keep up.

The **Settings** column in the tables says what to use on each GPU:
**Recommended** for these settings, or **Medium** for 1080p on the Medium
preset, on GPUs that fall short of 200.

## NVIDIA

Every card here is supported. See [NVIDIA GPU Setup](/servers/gpu-nodes/nvidia)
to install the driver.

| GPU               | Low | Medium | High | Settings    |
| ----------------- | --: | -----: | ---: | ----------- |
| RTX 5090          | 535 |    510 |  470 | Recommended |
| RTX 5080          | 530 |    490 |  450 | Recommended |
| RTX 5070 Ti       | 520 |    470 |  425 | Recommended |
| RTX 5070          | 490 |    420 |  370 | Recommended |
| RTX 5060 Ti 16GB  | 410 |    340 |  290 | Recommended |
| RTX 5060          | 365 |    305 |  255 | Recommended |
| RTX 5050          | 300 |    250 |  210 | Recommended |
| RTX 4090          | 550 |    520 |  500 | Recommended |
| RTX 4080 Super    | 500 |    470 |  450 | Recommended |
| RTX 4080          | 480 |    450 |  430 | Recommended |
| RTX 4070 Ti Super | 450 |    410 |  390 | Recommended |
| RTX 4070 Ti       | 430 |    390 |  370 | Recommended |
| RTX 4070 Super    | 410 |    370 |  350 | Recommended |
| RTX 4070          | 380 |    340 |  320 | Recommended |
| RTX 4060 Ti       | 340 |    300 |  270 | Recommended |
| RTX 4060          | 300 |    250 |  210 | Recommended |
| RTX 3090 Ti       | 440 |    410 |  390 | Recommended |
| RTX 3090          | 420 |    390 |  370 | Recommended |
| RTX 3080 Ti       | 400 |    370 |  350 | Recommended |
| RTX 3080          | 380 |    340 |  320 | Recommended |
| RTX 3070 Ti       | 340 |    310 |  290 | Recommended |
| RTX 3070          | 320 |    290 |  270 | Recommended |
| RTX 3060 Ti       | 300 |    270 |  250 | Recommended |
| RTX 3060          | 250 |    210 |  175 | Medium      |
| RTX 3050          | 195 |    160 |  135 | Medium      |
| RTX 2080 Ti       | 350 |    320 |  300 | Recommended |
| RTX 2080 Super    | 330 |    300 |  280 | Recommended |
| RTX 2080          | 320 |    285 |  265 | Recommended |
| RTX 2070 Super    | 300 |    270 |  250 | Recommended |
| RTX 2070          | 280 |    250 |  230 | Recommended |
| RTX 2060 Super    | 260 |    230 |  210 | Recommended |
| RTX 2060          | 215 |    180 |  145 | Medium      |
| GTX 1080 Ti       | 300 |    270 |  250 | Recommended |
| GTX 1080          | 260 |    230 |  210 | Recommended |

## AMD

**Status** comes from [AMD GPU Setup](/servers/gpu-nodes/amd#supported-gpus).
Experimental GPUs should work but haven't been through the same testing.

| GPU                              | Status       | Low | Medium | High | Settings    |
| -------------------------------- | ------------ | --: | -----: | ---: | ----------- |
| RX 9070 XT                       | Experimental | 510 |    460 |  420 | Recommended |
| RX 9070                          | Experimental | 465 |    420 |  380 | Recommended |
| RX 9060 XT 16GB                  | Experimental | 375 |    315 |  265 | Recommended |
| Radeon 8060S (Ryzen AI Max+ 395) | Supported    | 300 |    250 |  210 | Recommended |
| RX 7900 XTX                      | Experimental | 475 |    440 |  420 | Recommended |
| RX 7900 XT                       | Experimental | 425 |    385 |  365 | Recommended |
| RX 7900 GRE                      | Experimental | 380 |    340 |  320 | Recommended |
| RX 7800 XT                       | Experimental | 370 |    330 |  310 | Recommended |
| RX 7700 XT                       | Experimental | 325 |    290 |  265 | Recommended |
| RX 7600 XT                       | Experimental | 240 |    200 |  170 | Medium      |
| RX 7600                          | Experimental | 240 |    200 |  170 | Medium      |
| RX 6950 XT                       | Experimental | 410 |    370 |  350 | Recommended |
| RX 6900 XT                       | Experimental | 400 |    360 |  340 | Recommended |
| RX 6800 XT                       | Experimental | 385 |    345 |  325 | Recommended |
| RX 6800                          | Experimental | 360 |    320 |  300 | Recommended |
| RX 6750 XT                       | Experimental | 310 |    265 |  230 | Recommended |
| RX 6700 XT                       | Experimental | 300 |    250 |  210 | Recommended |
| RX 6650 XT                       | Experimental | 250 |    210 |  175 | Medium      |
| RX 6600 XT                       | Experimental | 240 |    200 |  170 | Medium      |
| RX 6600                          | Experimental | 215 |    180 |  150 | Medium      |
| RX 5700 XT                       | Untested     | 230 |    190 |  160 | Medium      |

## Intel

Intel GPUs aren't supported yet. See [Intel GPU Setup](/servers/gpu-nodes/intel).

## About the numbers

These are average fps at 1920×1080 from public CS2 benchmarks, run on Windows
with a fast desktop CPU. Many are estimates between the cards that were
measured. AMD figures are placed next to the NVIDIA cards they match in the
same tests, mostly
[ComputerBase's 28-card test](https://www.computerbase.de/2024-04/counter-strike-2-benchmark-test-2024/).
A GPU node runs Linux, captures and encodes video while it plays, and may share
its CPU with matches, so expect lower numbers. Use them to compare GPUs, not as
a promise.

Sources:
[ComputerBase community benchmark](https://www.computerbase.de/artikel/gaming/counter-strike-2-community-benchmark.85680/),
[ComputerBase CS2 test](https://www.computerbase.de/2024-04/counter-strike-2-benchmark-test-2024/),
[Back2Gaming](https://www.back2gaming.com/gpu-performance-test/),
[EMARQUE](https://emarque.co/pages/games/counter-strike-2),
[TechSpot RX 9070 XT review](https://www.techspot.com/review/2961-amd-radeon-9070-xt/),
[TechSpot RX 9060 XT review](https://www.techspot.com/review/2996-amd-radeon-9060-xt/).
