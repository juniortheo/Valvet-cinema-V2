# Velvet Cinema — Website

An independent pop-up cinema in Kigali. Static site: plain HTML, CSS and JS.
No build step, no framework, no dependencies.

**Preview locally:** `python3 -m http.server` then open `http://localhost:8000`
(opening the files directly with `file://` also works).

---

## Pages

| File | URL on Netlify | What it is |
|---|---|---|
| `index.html` | `/` | Home — mission, next/last event, gallery + sponsor, movies shown |
| `about.html` | `/about` | Our story |
| `events.html` | `/events` | All events — ticket, photographs, description per event |
| `event-black-swan.html` | `/events/black-swan` | Black Swan, 28 March 2026 |
| `event-the-devil-wears-prada-2.html` | `/events/the-devil-wears-prada-2` | The Devil Wears Prada 2 |
| `gallery.html` | `/gallery` | A look back at our past events |
| `sponsor.html` | `/sponsor` | Sponsor us |
| `contact.html` | `/contact` | Contact us |

Header and footer are rendered from `js/site.js`, so editing them once updates
every page.

---

## Announcing a new event

Open `js/site.js` and add to the `EVENTS` array near the top:

```js
var EVENTS = [
  { title:"Halloween Night", date:"2026-10-30", time:"6:30 PM",
    venue:"Utakah, Masoro", film:"American Psycho",
    price:"From RWF 10,000",
    tickets:"https://velvetcinemakgl.sinc.events" }
];
```

That one change automatically:

- shows the **ticket banner** across the top of every page
- adds **Tickets** to the main navigation
- shows a **Coming up** section on the homepage with a *Get tickets* button
- replaces *Our last event* on the homepage with the upcoming one

When the date passes, all of it disappears again on its own. Leave `EVENTS`
empty and the homepage shows *Our last event* instead.

After a screening, move it into `PAST_EVENTS` (same file, newest first) and
the homepage picks it up as the new last event.

---

## Site details in one place

Also at the top of `js/site.js`:

```js
var SITE = {
  email: "velvetcinemakgl@gmail.com",
  instagram: "https://instagram.com/velvetcinemakgl",
  tiktok: "",                                   // TODO: add the TikTok URL
  tickets: "https://velvetcinemakgl.sinc.events",
  sponsorSubject: "Velvet Cinema Partnerships"
};
```

The TikTok icon stays hidden until a URL is added there. *Sponsor us* buttons
open an email to the address above with the subject line already filled in.

---

## Images

In `assets/images/`, already resized (max 2000px) and compressed. All current
photographs are from the **Black Swan** night at Utakah, Masoro — 28 March
2026, with a live set by Sheja Lau.

**Still needed:**

| Filename | Where it appears |
|---|---|
| `last-event.jpg` | Homepage *Our last event*, Events page — a photo from The Devil Wears Prada 2 |
| `poster-tdwp2.jpg` | *Movies shown* on the homepage, and that event's page — portrait poster |

Until those files exist, the site shows a tidy "coming soon" panel rather than
a broken image. Drop the files in with those exact names and they appear.

Add more photographs to the gallery by copying a line in `gallery.html`:

```html
<div class="shot"><img src="assets/images/your-photo.jpg" alt="Describe it" loading="lazy" decoding="async"></div>
```

Keep files under about 400 KB so pages stay quick on mobile data.

---

## Newsletter sign-ups

By default submissions go to **Netlify Forms** — read them under *Forms* in the
Netlify dashboard, where you can also set email notifications. The hidden form
at the bottom of `index.html` is what Netlify detects; leave it in place.

**To send straight to Google Sheets instead:**

1. Create a sheet, then *Extensions → Apps Script*.
2. Paste a script that appends `e.parameter.email` to the sheet.
3. *Deploy → New deployment → Web app*, access **Anyone**.
4. Copy the `/exec` URL into `SHEETS_ENDPOINT` in `js/site.js`.

The consent notice required by the brief is already shown under the form.

---

## Deploying

`netlify.toml` is committed, so Netlify needs no configuration: publish
directory `.`, no build command. Pushing to `main` redeploys automatically.
It also sets the clean URLs in the table above and long-lived caching for
images.

---

## Design

Per the client's design: cream `#faf6e8` bands on white, wine `#4d0806` for the
wordmark, buttons and footer. Chonburi for the wordmark, Newsreader for
headings, Inter for body text. Tokens are at the top of `css/site.css`.
