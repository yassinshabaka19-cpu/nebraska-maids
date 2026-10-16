# Nebraska Maids — website

Live site: https://www.nebraskamaids.com (Vercel project `nebraska-maids`; a second Vercel project `nebraska-maids-app` also exists).
This site was created by copying the Austin House Cleaners site and rebranding it (March 2026: charcoal + sky-blue theme). **`README.md` still describes Austin House Cleaners and is out of date.**

## Stack
- Plain static HTML/CSS/JS, no build step, no dependencies. ~90 pages: `index.html`, service and area pages, `blog/`.
- Shared `style.css` and `script.js`, images in `assets/`.
- The quote/contact form posts to **Formspree** from `script.js` (no server code in this repo).
- `vercel.json` only sets no-cache headers on HTML.

## Commands
- Preview locally: `npx serve .` then open http://localhost:3000

## Rules
- Pushing to `main` deploys to production automatically. Never push without the owner's approval.
- When editing copy, check for leftover Austin/Texas references (city names, phone numbers, schema) — this site serves Nebraska.
- Keep canonicals, JSON-LD and `sitemap.xml` consistent when adding pages.
- Do not invent reviews, testimonials or business details.
