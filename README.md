# Velvet Cinema — Website

Static site. No build step, no framework. Open `index.html` in a browser, or upload the whole folder to any host (Netlify, Vercel, cPanel, GitHub Pages).

---

## Pages

| File | What it is |
|---|---|
| `index.html` | Home — spotlight, mosaic tiles, upcoming, archive rail, pictures |
| `upcoming.html` | All upcoming screenings + private screening enquiry |
| `film-african-shorts.html` | Single screening detail page (template for every future night) |
| `movies.html` | Movies Shown — full archive with year filters |
| `gallery.html` | Pictures of Past Events — masonry + lightbox |
| `tickets.html` | Ticket reservation with Mobile Money flow |
| `store.html` | Merch with working cart |
| `donate.html` | Donations with amount picker |
| `about.html` | About Us + contact form (`about.html#contact`) |

---

## Images

All photographs live in `assets/images/`, already resized (max 2000px) and
compressed (~6.7 MB total). They come from the **Black Swan** screening at
Atelier Ikaze, Kigali — Sat 28 March 2026, with a live set by Sheja Lau.

| File | Content |
|---|---|
| `spotlight.jpg` | Home hero — the film projected in the garden |
| `tile-season.jpg`, `tile-support.jpg` | Venue / garden before doors |
| `tile-store.jpg`, `tile-archive.jpg` | Sheja Lau performing |
| `tile-gallery.jpg`, `about-hero.jpg` | Group shots under string lights |
| `event-01.jpg` … `event-12.jpg` | Gallery page |
| `still-01.jpg` … `still-05.jpg` | Stills on the screening page |
| `poster-black-swan.jpg` | Black Swan poster |
| `poster-black-swan-performance.jpg` | Poster crediting Sheja Lau |
| `ticket-banner.jpg` | Wide ticket artwork |
| `film-01.jpg` | Archive thumbnail (Black Swan poster) |

**To add more:** drop a file in `assets/images/` and point the relevant
`<img src>` at it. Slots marked `ratio-poster` or `tile-tall` need PORTRAIT
images; `ratio-wide` and `ratio-still` need LANDSCAPE. Keep files under
400 KB.

Every image slot keeps a `.frame-fb` fallback and an `onerror` handler, so a
missing file shows a styled placeholder instead of a broken image. Keep both
when editing.

### Still needing real photographs
- `shop-*.jpg` — store product shots (8 slots, no real photos yet)
- `film-02.jpg` … `film-11.jpg` — archive posters for films not yet screened

## Changing text and content

**Site-wide details** (email, phone, Instagram, Mobile Money code, promo bar) live in one place — the top of `js/main.js`:

```js
const SITE = {
  email: "hello@velvetcinema.rw",
  phone: "+250 78 000 0000",
  instagram: "https://instagram.com",
  momoCode: "*182*8*1*VELVET#",
  promo: { text: "...", href: "tickets.html" }
};
```

**Menu items** are the `NAV` array right below it. Change once, updates every page.

**Header and footer** are generated from `js/main.js` so all nine pages stay in sync. Edit `buildHeader()` / `buildFooter()` to change them everywhere at once.

**Screenings, films, products** are plain HTML inside each page — copy an existing block and edit the text.

---

## Payments — IMPORTANT

The Mobile Money flow is currently a **display mock**. It shows the USSD code and the right amount, but no money moves. A static site cannot process payments on its own.

To take real payments you need one of:
- **MTN MoMo API** (Collections) — needs a small backend/serverless function
- A hosted checkout provider that supports MoMo in Rwanda

Once you have a real merchant code, change `momoCode` in `js/main.js`.

Same for the **contact and newsletter forms** — they validate and confirm, but don't send yet. Quickest fix is Formspree or Netlify Forms (a one-line change to the `<form>` tag).

---

## Design system

- **Serif:** Source Serif 4 — headings, with italic used as a deliberate accent
- **Sans:** Archivo — bold, wide-tracked uppercase for nav, labels and links
- **Palette:** charcoal `#262626` chrome, white and warm-paper `#f6f4ef` editorial bands, near-black `#1c1c1c` dark pages. One wine accent `#7d1d24`, used almost never.

If Velvet ever licenses Freight Text Pro and Founders Grotesk, swap the two font variables at the top of `css/styles.css` and the whole site changes.

Tokens live in `css/styles.css`, components in `css/pages.css`.

---

## Notes

- Works on phones, tablets and desktop.
- Cart persists in the browser between pages.
- Keyboard: `Esc` closes menus and the lightbox; arrow keys move through gallery photos.
- Respects "reduce motion" accessibility settings.
