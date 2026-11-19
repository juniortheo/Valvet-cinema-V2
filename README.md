# Velvet Cinema — Website

An independent pop-up cinema in Kigali. Static site: plain HTML, CSS and JS.
No build step, no framework, no dependencies.

**Preview locally:** `python3 -m http.server` then open `http://localhost:8000`
(the pages fetch their content, so `file://` will not work).

---

## Pages

| File | URL on Netlify | What it is |
|---|---|---|
| `index.html` | `/` | Home — mission, next/last event, gallery + sponsor, movies shown |
| `about.html` | `/about` | Our story |
| `events.html` | `/events` | All events — ticket, photographs, description per event |
| `event.html` | `/events/<slug>` | One event. Serves every past event, generated from content |
| `admin/` | `/admin` | The site manager the client logs in to |
| `gallery.html` | `/gallery` | A look back at our past events |
| `sponsor.html` | `/sponsor` | Sponsor us |
| `contact.html` | `/contact` | Contact us |

Header and footer are rendered from `js/site.js`, so editing them once updates
every page. All wording and events come from `content/` — see below.

---

## The site manager (CMS)

The client manages everything at **`/admin`** on the live site —
e.g. `https://your-site.netlify.app/admin`.

She signs in with GitHub. Every change she makes is committed to this repo
and Netlify redeploys automatically, so nothing can be lost and every edit
has a history.

**What she can do there:**

| Section | What it controls |
|---|---|
| Upcoming events | Announce a screening. Adding one raises the ticket banner, the Tickets menu link and the "Coming up" section automatically, and swaps the homepage from "Our last event" to the upcoming one. Past dates drop off by themselves. |
| Past events | Every screening. Each gets its own page at `/events/<web-address>` automatically. Add photographs, poster, ticket artwork, venue, music. |
| Gallery | Add, reorder and delete photographs on the gallery page. |
| Page text | Wording on the homepage, Our story, Sponsor us, Contact and Gallery. |
| Site details | Email, Instagram, TikTok, ticket shop link. |

Photographs are uploaded through the media library and land in
`assets/images/`. She can delete them there too.

### One-time setup so she can log in

The CMS needs permission to talk to GitHub on her behalf.

1. Give her GitHub account **write access** to this repository
   (*Settings → Collaborators*). She needs a free GitHub account.
2. Create a GitHub OAuth app: *GitHub → Settings → Developer settings →
   OAuth Apps → New OAuth App*.
   - Homepage URL: your Netlify site address
   - Authorization callback URL: as given by your OAuth client in step 3
3. Connect an OAuth client. Either:
   - **On Netlify** — *Site configuration → Access control → OAuth →
     Install provider → GitHub*, pasting the client ID and secret; or
   - **Sveltia's own client**, deployed free to Cloudflare Workers:
     <https://github.com/sveltia/sveltia-cms-auth>

To test before that is wired up, open `/admin`, click the small arrow next
to *Sign In* and choose **Use Personal Access Token**. That works
immediately but is meant for developers, not for the client.

If the repository is ever renamed, update `repo:` at the top of
`admin/config.yml`.

---

## How content reaches the pages

Content lives as JSON in `content/`:

| File | Holds |
|---|---|
| `content/settings.json` | Email, social links, ticket shop link |
| `content/pages.json` | Wording for each page |
| `content/upcoming.json` | Upcoming events |
| `content/past-events.json` | Past events, each with its own photographs |
| `content/gallery.json` | Gallery photographs |

`js/site.js` fetches these at page load and renders the header, footer and
page content. There is no build step — editing a JSON file, by hand or
through `/admin`, changes the site.

Because the pages fetch these files, **preview locally with a server**
(`python3 -m http.server`) rather than opening the HTML files directly.

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
