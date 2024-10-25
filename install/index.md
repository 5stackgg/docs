::: danger
Please ensure you have met the [Requirements](/install/requirements) before you begin installing the 5Stack Panel.
:::

# Installation

The [5Stack-Panel](https://github.com/5stackgg/5stack-panel) repostiory includes scirpts to help facilityte the installation process.

```bash
git clone https://github.com/5stackgg/5stack-panel
```

## Running the Installation Script

Inside the 5Stack-Panel directory, run the installation script with `sudo` priviliges, `./install.sh`.

After running the installation script, there are additonal steps required to complete the installation.

In the folders `INSTALL_DIR/base/properties` and `INSTALL_DIR/base/secrets`, you will find the `env` files. Go through each file and populate the variables with your desired values. You should then run the `./update.sh` script`.

::: warning
We are actively working on improving the installation process. For now, it's crucial to carefully review and configure each file to ensure the setup is correct.
:::

## Updating

After the first install you should run the `./update.sh` script

::: info
Additional arguments can be passed to modify how the panel operates. For more details, please refer to the [Command Line Arguments](/install/command-line-arguments) page.
:::
