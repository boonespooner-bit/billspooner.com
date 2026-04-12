# Deploying billspooner.com to Render

This repo is configured for one-click auto-deploy to Render as a **Static
Site**. Every push to your chosen branch triggers a fresh deploy.

## 1 · Push this repo to GitHub

If you haven't yet:

```bash
git remote add origin https://github.com/<your-user>/billspooner.com.git
git push -u origin main
```

> Make sure the `render.yaml` at the repo root is committed. Render reads
> it on the first deploy.

## 2 · Create a Render account

1. Go to https://render.com and sign up (free tier is fine).
2. On first login, choose **"Connect GitHub"** and authorize Render to read
   your repositories. You can scope it to just this one repo.

## 3 · Create the Static Site

**Option A — from the Blueprint (recommended, uses `render.yaml`):**

1. In the Render dashboard, click **New +** → **Blueprint**.
2. Select the `billspooner.com` repo.
3. Render reads `render.yaml` and previews the service it will create.
   Click **Apply**.
4. Render provisions the site and kicks off the first deploy. You'll get a
   live URL like `https://billspooner-com.onrender.com` within a minute.

**Option B — manual (no blueprint):**

1. Dashboard → **New +** → **Static Site**.
2. Select the repo.
3. Fill in:
   - **Name:** `billspooner-com`
   - **Branch:** `main` (or whichever you want to auto-deploy from)
   - **Build Command:** *leave blank*
   - **Publish Directory:** `.`
4. Click **Create Static Site**.

## 4 · Auto-deploy is already on

Render auto-deploys on every push to the branch you selected. There's
nothing to wire up — it installs a GitHub webhook for you when you
connect the repo.

To watch a deploy: dashboard → your service → **Events** tab.

## 5 · (Optional) Custom domain — billspooner.com

1. In the service, go to **Settings** → **Custom Domains** → **Add**.
2. Enter `billspooner.com` (and add `www.billspooner.com` too).
3. Render shows you DNS records to add at your registrar:
   - **Apex** (`billspooner.com`): an `A` record pointing at the IP Render
     gives you (or an `ALIAS`/`ANAME` if your registrar supports it).
   - **www**: a `CNAME` pointing at `<your-service>.onrender.com`.
4. Save the DNS records. DNS propagation is usually a few minutes.
5. Render issues a free Let's Encrypt SSL cert automatically once DNS
   resolves. Your site will then be live at `https://billspooner.com`.

## 6 · Pull-request previews (free)

`render.yaml` has `pullRequestPreviewsEnabled: true`, so every PR gets a
one-off preview URL. Use it to review photo/content changes before
merging.

## 7 · Updating content

Edit a file, commit, push:

```bash
git add .
git commit -m "Swap hero photo for 1981 tour shot"
git push
```

Render will kick off a new deploy automatically. It's usually live in
under a minute.

## Troubleshooting

- **"Publish directory is empty" error:** make sure you set publish
  directory to `.` (a single dot) — the site is served from the repo root.
- **404s on `/about`, `/tubes`, `/music`:** the `routes` section in
  `render.yaml` handles these. If you removed it, add trailing slashes
  when linking (`/about/` instead of `/about`).
- **CSS/JS not loading after adding subdirectories:** all assets are
  referenced from the site root (`/css/styles.css`, `/js/main.js`). Keep
  those leading slashes.
