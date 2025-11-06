# ADW — Luxury Faux Florals & Botanicals (Next.js + i18n)

A minimal ecommerce-style front for **ADW** based on a clean, modern aesthetic.
Built with **Next.js (App Router)** and **Tailwind CSS**, featuring:

- Top-page language chooser (EN/JA/ZH) that sets a `NEXT_LOCALE` cookie
- Localized routes under `/(en|ja|zh)/*`
- Shared dictionaries in `lib/dictionaries/*.json`
- Hero + featured grid, collections, about, contact
- Placeholder images ready to swap later (`/public`)

## Quick Start

```bash
pnpm i   # or: npm i / yarn
pnpm dev # or: npm run dev
```

Open http://localhost:3000 — you'll see the language chooser.
After choosing, you are redirected to `/{locale}/home`.

## Replace Photos & Copy

- Swap `/public/placeholder.jpg` with your real images (keep filenames or update imports).
- Edit translations in `lib/dictionaries/*.json`.
- Replace placeholder text with brand-approved copy.

## Notes

- Built-in `next.config.mjs` i18n + middleware ensures language is sticky via cookie.
- The language switcher in header updates the cookie and navigates instantly.
- Add real commerce later (e.g., Stripe, Shopify Storefront API) by wiring product data.
