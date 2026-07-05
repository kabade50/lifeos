# Life OS — deploy guide (with cross-device sync)

This folder is a complete, installable web app (PWA) **with cloud sync built in**. Host the whole folder → live website + installable app, and your data follows you across phone, tablet and laptop once you sign in.

Files: `index.html`, `manifest.webmanifest`, `sw.js`, `icon-*.png`.

## Deploy (fastest, ~1 min, no account)
1. Go to **app.netlify.com/drop**
2. Drag this entire `lifeos-app` folder onto the page.
3. You get a live URL instantly (e.g. `your-name.netlify.app`).

Other hosts work too (Vercel, GitHub Pages, Cloudflare Pages) — there is no server code to run; the backend is Supabase.

## Install as an app
- **Android/Chrome:** open the URL → menu → "Add to Home screen".
- **iPhone/Safari:** Share → "Add to Home Screen".
- **Desktop:** install icon in the address bar.

## How sync works
- On first open you'll see a **sign-in screen**. Create an account (email + password) once.
- **Supabase** (your own project, free tier) stores your data as one secure row tied to your login. Row-Level Security means only you can read/write it.
- Sign in with the **same account on any device** → your tasks, routines, projects, distractions, dashboard and levers are all there, kept in sync (saves every few seconds and on close; last write wins).
- Offline: the app still works on the device (local cache) and pushes up when you're back online.
- "Skip — use only on this device" is available if you don't want an account on a given device.
- Sign out / switch account from **Settings → Account**.

### First sign-up note
Supabase sends a **confirmation email** on account creation (default security setting). Click the link in that email, then sign in. To skip this: Supabase dashboard → Authentication → Providers → Email → turn off "Confirm email".

## Your Supabase project
- Project: **lifeos** (region ap-south-1 / Mumbai)
- The app already has the project URL + public key embedded (safe — the publishable key is meant to be public; data is protected by Row-Level Security).
- Table: `app_state(user_id, data jsonb, updated_at)` with per-user RLS policies.

## Still needs more than this build
- **Lock-screen push notifications** (the in-app bell is the inbox for now).
- **Server-scheduled reminders** and **team sharing**.
These need a small server/worker (Supabase Edge Functions later) — the data model is already in place.
