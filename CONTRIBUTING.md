# Contributing to GuiGui

All changes land in `main` through a **fork + branch + pull request** workflow. Nobody pushes to this repository directly — not even maintainers' feature work.

## Ground rules

- ❌ Never push to `Phat-Po/Guigui---Google-io-hackathon` directly.
- ❌ Never push to `main` on any repository.
- ✅ Push only to a feature branch on your own fork.
- ✅ Every change is merged via a pull request into `main`.
- ✅ Run the project checks locally before opening a PR (see below).

## One-time setup

1. Fork this repository: https://github.com/Phat-Po/Guigui---Google-io-hackathon/fork

2. Clone your fork and wire up the remotes:

   ```bash
   git clone https://github.com/<your-username>/Guigui---Google-io-hackathon.git
   cd Guigui---Google-io-hackathon

   git remote add upstream https://github.com/Phat-Po/Guigui---Google-io-hackathon.git
   # Make accidental pushes to upstream impossible:
   git remote set-url --push upstream DISABLED_DO_NOT_PUSH_TO_UPSTREAM
   ```

   Your remotes should look like this (`git remote -v`):

   ```
   origin    https://github.com/<your-username>/Guigui---Google-io-hackathon.git (fetch)
   origin    https://github.com/<your-username>/Guigui---Google-io-hackathon.git (push)
   upstream  https://github.com/Phat-Po/Guigui---Google-io-hackathon.git (fetch)
   upstream  DISABLED_DO_NOT_PUSH_TO_UPSTREAM (push)
   ```

## Per-feature workflow

1. Branch off the latest upstream `main`:

   ```bash
   git fetch upstream main
   git checkout main
   git merge --ff-only upstream/main
   git checkout -b <your-name>/<feature-name>
   ```

2. Develop on that branch.

3. Run the project checks — all three must pass:

   ```bash
   npm install
   npm run lint    # tsc --noEmit
   npm run build   # vite build + esbuild server bundle
   ```

4. Commit and push to **your fork**:

   ```bash
   git add -A
   git commit -m "feat: <short description>"
   git push -u origin <your-name>/<feature-name>
   ```

5. Open a pull request from `<your-username>:<your-name>/<feature-name>` into `Phat-Po/Guigui---Google-io-hackathon:main`.

## Keeping your fork in sync

```bash
git fetch upstream main
git checkout main
git merge --ff-only upstream/main
git push origin main
```

If your feature branch falls behind `main`, rebase it:

```bash
git checkout <your-name>/<feature-name>
git rebase upstream/main
git push --force-with-lease origin <your-name>/<feature-name>
```
