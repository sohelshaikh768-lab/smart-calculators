# GST Calculator India 🇮🇳

A modern, fast, SEO-optimized GST Calculator website for India — built with **React, Vite, TypeScript & Tailwind CSS**. No backend, no database — everything runs entirely in the browser.

**Live features:** GST Exclusive/Inclusive/Reverse calculator, Percentage/Discount/Profit-Margin calculators, a 10-article GST blog, light/dark mode, and full on-page SEO (meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt).

---

## ✨ Features

- **GST Calculator** — Exclusive, Inclusive & Reverse modes for all official Indian slabs (0%, 3%, 5%, 12%, 18%, 28%) with automatic CGST/SGST split, copy-to-clipboard and reset.
- **Bonus calculators** — Percentage, Discount, and Profit Margin calculators.
- **10 in-depth SEO blog articles** covering GST formulas, rates, invoicing, compliance, FAQs and more.
- **Light & dark mode** with persisted preference (localStorage) and system-preference detection.
- **Mobile-first, responsive, animated UI** built entirely with Tailwind CSS utility classes.
- **SEO-ready**: per-route meta title/description, canonical tags, Open Graph & Twitter Card tags, JSON-LD structured data, `sitemap.xml`, `robots.txt`.
- **Monetization-ready**: Google AdSense placeholder slots, affiliate banner placeholders, and a newsletter signup form.
- **Static-hosting friendly**: works out of the box on GitHub Pages, Netlify, and Vercel (includes `_redirects`, `vercel.json`, and a GitHub Pages SPA `404.html` fallback for deep-linking).
- **Zero backend** — all calculations run client-side in plain TypeScript.

---

## 🗂️ Project Structure

```
├── index.html                 # Document shell + all global SEO/meta/schema tags
├── vercel.json                 # Vercel SPA rewrite rule
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   ├── _redirects              # Netlify SPA rewrite rule
│   ├── 404.html                 # GitHub Pages SPA fallback (deep-link support)
│   ├── favicon.png
│   └── og-image.jpg
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Router setup (all page routes)
│   ├── index.css                # Tailwind import + custom animations/utilities
│   ├── context/
│   │   └── ThemeContext.tsx     # Light/dark mode provider
│   ├── hooks/
│   │   └── useSEO.ts            # Lightweight per-route SEO/meta manager
│   ├── utils/
│   │   ├── calculators.ts       # Pure GST/percentage/discount/margin formulas
│   │   └── cn.ts
│   ├── data/
│   │   └── blogPosts.ts         # All 10 blog articles as structured content
│   ├── components/
│   │   ├── Navbar.tsx / Footer.tsx / Layout.tsx
│   │   ├── AdSlot.tsx            # AdSense / affiliate placeholder block
│   │   ├── Newsletter.tsx        # Front-end newsletter capture form
│   │   ├── CopyButton.tsx
│   │   ├── ResultStat.tsx
│   │   └── LegalPage.tsx         # Shared layout for legal pages
│   └── pages/
│       ├── Home.tsx
│       ├── GstCalculator.tsx
│       ├── PercentageCalculator.tsx
│       ├── DiscountCalculator.tsx
│       ├── ProfitMarginCalculator.tsx
│       ├── Blog.tsx / BlogPost.tsx
│       ├── About.tsx / Contact.tsx
│       ├── PrivacyPolicy.tsx / Terms.tsx / Disclaimer.tsx
│       └── NotFound.tsx
```

---

## 🧮 GST Formulas Used

```
GST Exclusive (add tax):
  GST Amount   = (Amount × Rate) / 100
  Total Amount = Amount + GST Amount

GST Inclusive / Reverse (remove tax):
  Original Amount = (Total × 100) / (100 + Rate)
  GST Amount       = Total − Original Amount

CGST = SGST = GST Amount / 2   (intra-state)
IGST = GST Amount              (inter-state)
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## 🌐 Deployment

This is a static single-page app — deploy the `dist/` folder anywhere.

### Netlify
- Drag & drop the `dist/` folder, or connect your Git repo.
- `public/_redirects` (copied into `dist/`) already handles SPA routing.

### Vercel
- Import the repo — `vercel.json` at the project root already configures the SPA rewrite.

### GitHub Pages
- Push the contents of `dist/` to your `gh-pages` branch (or use the `docs/` folder option).
- `404.html` (copied into `dist/`) enables deep-linking (e.g. `/blog/gst-faqs`) to work correctly on GitHub Pages, which has no server-side rewrites.

---

## 🔍 SEO Checklist Implemented

- [x] Unique `<title>` and meta description per route (via `useSEO` hook)
- [x] Canonical URLs
- [x] Open Graph + Twitter Card tags
- [x] JSON-LD structured data (WebApplication, Organization, Article)
- [x] `robots.txt` + `sitemap.xml`
- [x] Semantic HTML, descriptive headings, alt text-ready image components
- [x] Mobile-first responsive layout & accessible focus states

---

## 💰 Monetization Hooks

- `<AdSlot />` — drop-in placeholder for Google AdSense `<ins>` tags or affiliate banners.
- `<Newsletter />` — captures emails client-side (swap in Mailchimp/ConvertKit/Beehiiv easily).
- Dedicated `/contact`, `/about`, `/privacy-policy`, `/terms-and-conditions`, `/disclaimer` pages required by ad networks like AdSense.

---

## ⚠️ Disclaimer

This tool is for informational/estimation purposes only and does not constitute tax or legal advice. Always confirm current GST rates on the official GST portal (gst.gov.in) or consult a professional.

---

## 📄 License

Free to use and modify for personal or commercial projects.
