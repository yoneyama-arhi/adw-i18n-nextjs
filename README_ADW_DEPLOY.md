# ADW i18n Next.js — Deploy Guide (Vercel)

## 1) Install dependencies
```bash
npm ci   # or: npm install
```

## 2) Run locally (optional)
```bash
npm run dev
```

## 3) Deploy to Vercel
- Push this repository to GitHub.
- In Vercel, create a new Project from this repo.
- Framework preset: **Next.js**
- Build Command: (leave default) — Vercel auto-detects (next build)
- Output Directory: (leave default)

> node_modules / .next / .vercel are ignored by .gitignore.

Enjoy!
