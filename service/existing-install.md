# Upgrade an Existing Panel

If you installed the panel from the git checkout (`git clone` and
`./install.sh`), move it onto the 5Stack service. On the panel server, in the
5Stack-Panel directory, run:

```bash
git pull && sudo ./service.sh
```

Your config and secrets carry over, and nothing is reinstalled. Open the claim
link it prints and sign in through Steam. From then on you update from the
panel.
