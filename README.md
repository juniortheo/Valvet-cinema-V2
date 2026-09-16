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

## ADDING IMAGES — read this first

Put every image in `assets/images/` using the **exact filenames below**. Until a file exists, the site shows a labelled placeholder — nothing breaks, so you can add them a few at a time.

### Home
| Filename | Where | Best size |
|---|---|---|
| `spotlight.jpg` | Big hero image | 2000 × 1200 |
| `tile-season.jpg` | Large mosaic tile | 1600 × 900 |
| `tile-store.jpg` | Tall tile | 800 × 1000 |
| `tile-archive.jpg` | Tile | 900 × 600 |
| `tile-gallery.jpg` | Tile | 900 × 600 |
| `tile-support.jpg` | Tile | 900 × 600 |
| `event-01.jpg` … `event-05.jpg` | Pictures strip | 900 × 600 |

### Movies Shown (`movies.html`)
`film-01.jpg` … `film-11.jpg` — **poster shape, 2:3** (e.g. 800 × 1200)

### Gallery (`gallery.html`)
`event-01.jpg` … `event-12.jpg` — any shape, mixed looks best

### Screening page
`poster-african-shorts.jpg` (2:3 poster), `still-01.jpg` … `still-05.jpg`

### Store
`shop-tee.jpg`, `shop-tote.jpg`, `shop-posters.jpg`, `shop-cap.jpg`, `shop-book.jpg`, `shop-pass.jpg`, `shop-gift.jpg`, `shop-mug.jpg` — 2:3

### About
`about-hero.jpg` — wide, 2000 × 1125

**Tip:** keep each image under ~400 KB so pages stay fast. Any free tool (Squoosh, TinyJPG) will do it.

---

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
