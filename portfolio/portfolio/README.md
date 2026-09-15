# Personal Portfolio — Informatics Engineering / AI & Cyber Security

A modern, dark, responsive personal portfolio template for an Informatics
Engineering student at Universitas Budi Luhur focused on AI and Cyber
Security. Pure HTML, CSS, and vanilla JavaScript — no build step, no
frameworks, no external JS dependencies.

## Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.svg          (placeholder — replace with profile.jpg)
│   │   └── university-logo.svg  (placeholder — replace with the official logo)
│   └── icons/
├── documents/
│   └── README-CV.txt            (placeholder — add your real CV.pdf here)
└── README.md
```

## Before you publish, replace the placeholders

This is a template. Nothing in it is real personal data yet.

1. **Name, bio, role, and links** — search `index.html` for "Your Name",
   `your.email@example.com`, and the `#` placeholder links in the Projects
   and Contact sections, and replace them with your own.
2. **Profile photo** — replace `assets/images/profile.svg` with a real
   photo. Simplest approach: add `assets/images/profile.jpg` and update the
   `src` in the "About" section of `index.html` to match.
3. **University logo** — replace `assets/images/university-logo.svg` with
   the official Universitas Budi Luhur logo asset (obtain it from the
   university's own brand resources) and update the `src` accordingly. Do
   not redraw, distort, or recolor the official logo.
4. **CV** — add your real resume as `documents/CV.pdf`, then delete
   `documents/README-CV.txt`.
5. **Projects** — the "StockMind AI" card and the two other project cards
   are placeholders. Swap in your real projects, screenshots, tech stacks,
   and GitHub / live demo links.

## Running locally

No build tools are required. Any static file server works, for example:

```bash
cd portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Contact form

The contact form validates name, email, subject, and message length
entirely in the browser for a better user experience. **Client-side
validation is not a security control.** The form is not wired to a backend.
To make it functional:

- Add your own server-side endpoint (or a form service) that re-validates
  and sanitizes every field before storing or forwarding it.
- Never trust the values the browser sends.
- If you add an API key for a form service, keep it on the server side —
  never place secrets in HTML, CSS, or client-side JavaScript, and never
  commit a `.env` file (add it to `.gitignore`).

## Security checklist

- [x] No `eval()`, no `new Function()`, no inline JS, no inline event
      handlers (`onclick`, etc.)
- [x] No `innerHTML` used for dynamic/user-originated content — the form
      script uses `textContent` only
- [x] All external links opened with `target="_blank"` use
      `rel="noopener noreferrer"`
- [x] No API keys, passwords, or secrets anywhere in this repository
- [x] Client-side form validation with sensible max lengths (name 100,
      subject 150, message 2000 characters) — must be re-checked server-side
- [ ] Configure security headers at your hosting provider (see below) —
      not something a static file can set on its own
- [ ] Run `npm audit` if you introduce any npm-managed tooling later
- [ ] Serve the final site over HTTPS

### Recommended security headers (set at your host, e.g. Netlify, Vercel,
Cloudflare Pages)

```
Content-Security-Policy: default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
X-Frame-Options: DENY
```

Adjust the CSP if you add other external resources — keep it as narrow as
possible rather than using a wildcard like `default-src *`.

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a
  skip-to-content link are included.
- Focus states are visible (`:focus-visible`) for full keyboard navigation.
- The hero background animation and smooth scrolling both respect
  `prefers-reduced-motion`.
- Project images use `loading="lazy"`.
- Only one external dependency is used: Google Fonts (Sora + Inter), loaded
  from Google's CDN with `preconnect` for performance. Remove this if you
  prefer a fully self-hosted, zero-external-request page.

## License

Use and adapt this template freely for your own personal portfolio.
