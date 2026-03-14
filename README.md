# Austin House Cleaners – Website

Professional residential cleaning company website for Austin, Texas. Built with HTML, CSS, and minimal JavaScript. Responsive, accessible, and conversion-focused.

## Quick start

1. Open `index.html` in a browser, or run a local server (e.g. `npx serve .` or Live Server in VS Code).
2. Replace placeholders (phone, email, domain, images, form endpoint) before going live.

## Replace before launch (checklist)

- [ ] **Phone number** – Replace `(555) 123-4567` and `tel:+15551234567` in `index.html` and in the LocalBusiness JSON-LD.
- [ ] **Email** – Replace `hello@austinhousecleaners.com` in `index.html`, contact section, and JSON-LD.
- [ ] **Logo** – Add your logo image and update the header `.logo` link or replace with `<img>` in `index.html`.
- [ ] **Real reviews** – Replace the 6 sample testimonials in the Reviews section with real client reviews (with permission).
- [ ] **Real images** – Add hero and any section images to `/assets` and update paths (see Image suggestions below).
- [ ] **Domain** – Update canonical URL, `og:url`, and JSON-LD `url` from `https://www.austinhousecleaners.com/` to your live domain.
- [ ] **Analytics** – Add your analytics script (e.g. Google Analytics, GTM) in the `<head>` or before `</body>` in `index.html`.
- [ ] **Form submission** – Point the contact form to your backend or service (e.g. Formspree, Netlify Forms, or your API) in `script.js` and/or form `action`.

## Image suggestions (placeholders)

| Location        | File path (suggestion)   | Suggested content / alt text |
|----------------|---------------------------|------------------------------|
| Hero background| `assets/hero-home.jpg`    | Clean, bright living room or kitchen in an Austin-style home. Alt: "Clean modern home interior in Austin TX." |
| Trust/Services | Icons in `assets/icons/`  | Already provided as SVG; replace if you have a different icon set. |

## Deployment (e.g. from Cursor / local)

1. **Static host (Netlify, Vercel, GitHub Pages)**  
   - Push the project to a Git repo.  
   - Connect the repo to the host and set the publish directory to the project root (where `index.html` is).  
   - Deploy. No build step required.

2. **From Cursor**  
   - Use a static hosting extension or drag-and-drop the project folder to Netlify/Vercel.  
   - Or: run `npx serve .` locally and use a tunnel (e.g. ngrok) only for quick sharing, not production.

3. **Custom domain**  
   - In your host’s dashboard, add your domain and update DNS as instructed.  
   - After replacing placeholders, set the canonical and `og:url` in `index.html` to your live URL.

## Recommended next steps

1. Replace all items in the “Replace before launch” checklist above.
2. Add a favicon (e.g. `favicon.ico` or SVG in project root and link in `index.html`).
3. Connect the contact form to a real endpoint and test submissions.
4. Submit sitemap to Google Search Console and verify the site.
5. Consider adding a dedicated `/privacy` or legal page if you collect form data.

## Optional future pages

- **Pricing** – Ballpark rates or “starting at” for each service (Austin-specific if desired).
- **Recurring cleaning** – Benefits, frequency options, and how to set up recurring maid service in Austin TX.
- **Deep cleaning** – Dedicated page for deep cleaning scope, add-ons, and CTA.
- **Move out cleaning** – Move-out checklist, deposit focus, and booking CTA.
- **Airbnb cleaning** – Turnover process, timing, and pricing for hosts.
- **Contact** – Standalone contact page with form, map, hours, and service area reminder.
- **About** – Company story, team, and why Austin House Cleaners (local trust and expertise).
