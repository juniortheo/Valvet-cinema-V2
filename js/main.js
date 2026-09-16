/* ============================================================
   VELVET CINEMA — site scripts
   Header and footer are injected from here so every page stays
   in sync. Set <body data-page="..."> to mark the active nav.
   ============================================================ */

const SITE = {
  name: "Velvet Cinema",
  email: "hello@velvetcinema.rw",
  phone: "+250 78 000 0000",
  instagram: "https://instagram.com",
  momoCode: "*182*8*1*VELVET#",   // placeholder merchant code
  promo: { text: "Tickets for Under the Stars — 12 July — are on sale now", href: "tickets.html" }
};

const NAV = [
  { id: "upcoming", label: "Upcoming",     href: "upcoming.html" },
  { id: "tickets",  label: "Tickets",      href: "tickets.html"  },
  { id: "movies",   label: "Movies Shown", href: "movies.html"   },
  { id: "gallery",  label: "Gallery",      href: "gallery.html"  },
  { id: "store",    label: "Store",        href: "store.html"    },
  { id: "about",    label: "About Us",     href: "about.html"    }
];

const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',
  cart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h12l-1.2 12H7.2L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
  menu:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  ig:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
  yt:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none"/></svg>',
  mail:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
};

/* ---------------- Money ---------------- */
const rwf = (n) => "RWF " + Number(n).toLocaleString("en-US");

/* ---------------- Header ---------------- */
function buildHeader(page) {
  const links = NAV.map(
    (n) => `<a href="${n.href}" class="${n.id === page ? "on" : ""}">${n.label}</a>`
  ).join("");

  const menuLinks = NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join("");

  return `
  <div class="promo" id="promo">
    <a href="${SITE.promo.href}">${SITE.promo.text} &nbsp;→</a>
    <button class="promo-x" aria-label="Dismiss">✕</button>
  </div>
  <header class="hdr">
    <div class="wrap hdr-in">
      <a class="mark" href="index.html">
        <img class="mark-logo" src="assets/logo.jpg" alt="" />
        <span class="mark-txt">Velvet Cinema</span>
      </a>
      <nav class="hdr-nav">${links}</nav>
      <div class="hdr-tools">
        <button class="tool js-search" aria-label="Search">${ICON.search}</button>
        <button class="tool js-cart" aria-label="Cart">${ICON.cart}<span class="badge" hidden>0</span></button>
        <button class="burger js-menu" aria-label="Menu">${ICON.menu}</button>
      </div>
    </div>
  </header>

  <div class="scrim js-scrim"></div>

  <aside class="menu" id="menu" aria-label="Menu">
    <div class="menu-top">
      <span class="lbl grey">Menu</span>
      <button class="tool js-menu-close" aria-label="Close">✕</button>
    </div>
    <div class="menu-body">
      ${menuLinks}
      <div class="menu-sub">
        <a href="donate.html">Support Velvet</a>
        <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
    </div>
  </aside>

  <div class="search" id="search">
    <div class="search-top"><button class="tool js-search-close" aria-label="Close">✕</button></div>
    <div class="search-mid">
      <div class="search-box">
        <input type="search" id="search-input" placeholder="Search films, screenings, nights…" />
        <p class="search-hint lbl grey">Press enter to search — or browse <a href="movies.html" style="text-decoration:underline">movies shown</a></p>
      </div>
    </div>
  </div>

  <aside class="cart" id="cart" aria-label="Cart">
    <div class="cart-top">
      <span class="lbl grey">Your order</span>
      <button class="tool js-cart-close" aria-label="Close">✕</button>
    </div>
    <div class="cart-list js-cart-list"></div>
    <div class="cart-foot">
      <div class="total-row"><span class="lbl">Total</span><span class="amt js-cart-total">RWF 0</span></div>
      <button class="btn btn-block js-cart-checkout">Pay with Mobile Money</button>
      <div class="momo js-cart-momo">
        <span class="lbl">Confirm on your phone</span>
        <p class="dim" style="font-size:15px;">Dial this code, or approve the prompt on your MTN line.</p>
        <div class="momo-code">${SITE.momoCode}</div>
        <p class="dim" style="font-size:15px;">Amount: <span class="js-momo-amt">RWF 0</span></p>
      </div>
    </div>
  </aside>

  <div class="toast js-toast"></div>`;
}

/* ---------------- Footer ---------------- */
function buildFooter() {
  return `
  <footer class="ftr">
    <div class="wrap">
      <div class="ftr-cols">
        <div class="ftr-col">
          <h4>The Screenings</h4>
          <a class="link-u" href="upcoming.html">Upcoming</a>
          <a class="link-u" href="movies.html">Movies Shown</a>
          <a class="link-u" href="tickets.html">Tickets</a>
          <a class="link-u" href="gallery.html">Past Events</a>
        </div>
        <div class="ftr-col">
          <h4 class="it">Velvet</h4>
          <a class="link-u" href="about.html">Our Story</a>
          <a class="link-u" href="about.html#contact">Contact Us</a>
          <a class="link-u" href="donate.html">Support Us</a>
          <a class="link-u" href="store.html">Store</a>
        </div>
        <div class="ftr-col">
          <h4>Visit</h4>
          <a class="link-u" href="upcoming.html">Kigali, Rwanda</a>
          <a class="link-u" href="upcoming.html">Venue Varies Nightly</a>
          <a class="link-u" href="mailto:${SITE.email}">Email Us</a>
        </div>
        <div class="ftr-col">
          <h4>Velvet Cinema</h4>
          <p class="ftr-note">An independent pop-up cinema in Kigali. Curated film screenings with music, drinks and bites.</p>
          <div class="socials">
            <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
            <a href="#" aria-label="YouTube">${ICON.yt}</a>
            <a href="mailto:${SITE.email}" aria-label="Email">${ICON.mail}</a>
          </div>
        </div>
      </div>

      <div class="ftr-news">
        <div>
          <h4 style="font-family:var(--serif);font-size:27px;font-weight:600;margin-bottom:10px;">Sign Up for Our Newsletter</h4>
          <p class="ftr-note" style="max-width:44ch;">Hear about each screening before it sells out — plus notes on what we're programming next.</p>
        </div>
        <form class="news-form js-news">
          <input type="email" placeholder="Email" required aria-label="Email" />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div class="ftr-base">
        <span class="link-u" style="cursor:default">© <span id="year"></span> Velvet Cinema</span>
        <span class="link-u" style="cursor:default">Kigali, Rwanda</span>
      </div>
    </div>
  </footer>`;
}

/* ---------------- Cart ---------------- */
const Cart = {
  items: [],
  key: "velvet.cart",

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      this.items = raw ? JSON.parse(raw) : [];
    } catch (e) { this.items = []; }
  },
  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch (e) {}
  },
  add(name, price, meta = "") {
    const hit = this.items.find((i) => i.name === name);
    if (hit) hit.qty += 1;
    else this.items.push({ name, price: Number(price), meta, qty: 1 });
    this.save(); this.render(); toast("Added to order");
  },
  change(i, d) {
    const it = this.items[i]; if (!it) return;
    it.qty += d;
    if (it.qty <= 0) this.items.splice(i, 1);
    this.save(); this.render();
  },
  remove(i) { this.items.splice(i, 1); this.save(); this.render(); },
  total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  open() { document.getElementById("cart")?.classList.add("open"); scrim(true); },
  close() { document.getElementById("cart")?.classList.remove("open"); scrim(false); },

  render() {
    const badge = document.querySelector(".js-cart .badge");
    if (badge) { badge.textContent = this.count(); badge.hidden = this.count() === 0; }

    const list = document.querySelector(".js-cart-list");
    if (list) {
      list.innerHTML = this.items.length
        ? this.items.map((i, idx) => `
            <div class="cart-row">
              <div class="frame"><div class="frame-fb" style="font-size:11px">${i.name.slice(0, 14)}</div></div>
              <div>
                <h4>${i.name}</h4>
                ${i.meta ? `<span class="lbl-sm grey">${i.meta}</span>` : ""}
                <div class="li-price">${rwf(i.price)}</div>
                <div class="qty">
                  <button onclick="Cart.change(${idx},-1)" aria-label="Less">−</button>
                  <span>${i.qty}</span>
                  <button onclick="Cart.change(${idx},1)" aria-label="More">+</button>
                </div>
                <button class="cart-rm" onclick="Cart.remove(${idx})">Remove</button>
              </div>
              <div class="li-price">${rwf(i.price * i.qty)}</div>
            </div>`).join("")
        : `<p class="cart-empty">Nothing here yet.</p>`;
    }
    const t = document.querySelector(".js-cart-total");
    if (t) t.textContent = rwf(this.total());
  },

  checkout() {
    if (!this.items.length) { toast("Your order is empty"); return; }
    const box = document.querySelector(".js-cart-momo");
    if (box) {
      box.querySelector(".js-momo-amt").textContent = rwf(this.total());
      box.classList.add("show");
    }
  }
};

/* ---------------- Helpers ---------------- */
function scrim(on) { document.querySelector(".js-scrim")?.classList.toggle("open", on); }

function toast(msg) {
  const t = document.querySelector(".js-toast");
  if (!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2400);
}

function closeAll() {
  document.getElementById("cart")?.classList.remove("open");
  document.getElementById("menu")?.classList.remove("open");
  scrim(false);
}

/* ---------------- Wiring ---------------- */
function wireChrome() {
  document.querySelector(".promo-x")?.addEventListener("click", () =>
    document.getElementById("promo")?.classList.add("hidden"));

  document.querySelector(".js-menu")?.addEventListener("click", () => {
    document.getElementById("menu")?.classList.add("open"); scrim(true);
  });
  document.querySelector(".js-menu-close")?.addEventListener("click", closeAll);
  document.querySelector(".js-scrim")?.addEventListener("click", closeAll);

  document.querySelector(".js-cart")?.addEventListener("click", () => Cart.open());
  document.querySelector(".js-cart-close")?.addEventListener("click", () => Cart.close());
  document.querySelector(".js-cart-checkout")?.addEventListener("click", () => Cart.checkout());

  const s = document.getElementById("search");
  document.querySelector(".js-search")?.addEventListener("click", () => {
    s?.classList.add("open"); document.getElementById("search-input")?.focus();
  });
  document.querySelector(".js-search-close")?.addEventListener("click", () => s?.classList.remove("open"));
  document.getElementById("search-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { window.location.href = "movies.html"; }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeAll(); s?.classList.remove("open"); document.querySelector(".lb")?.classList.remove("open"); }
  });

  document.querySelector(".js-news")?.addEventListener("submit", (e) => {
    e.preventDefault(); e.target.reset(); toast("You're on the list");
  });

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function wireReveal() {
  const els = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((en) => {
    en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* add-to-cart buttons anywhere on the page */
function wireAddButtons() {
  document.querySelectorAll("[data-add]").forEach((b) => {
    b.addEventListener("click", () => Cart.add(b.dataset.add, b.dataset.price, b.dataset.meta || ""));
  });
}

/* filters (movies page) */
function wireFilters() {
  const chips = document.querySelectorAll("[data-filter]");
  if (!chips.length) return;
  chips.forEach((c) => c.addEventListener("click", () => {
    chips.forEach((x) => x.classList.remove("on"));
    c.classList.add("on");
    const f = c.dataset.filter;
    document.querySelectorAll("[data-cat]").forEach((item) => {
      item.style.display = (f === "all" || item.dataset.cat === f) ? "" : "none";
    });
  }));
}

/* gallery lightbox */
function wireLightbox() {
  const lb = document.querySelector(".lb");
  if (!lb) return;
  const shots = [...document.querySelectorAll(".gal .shot")];
  const fig = lb.querySelector(".lb-fig .frame");
  const cap = lb.querySelector(".lb-cap");
  let idx = 0;

  const show = (i) => {
    idx = (i + shots.length) % shots.length;
    const s = shots[idx];
    const img = s.querySelector("img");
    const label = s.querySelector(".cap")?.textContent || "";
    fig.innerHTML = img
      ? `<img src="${img.getAttribute("src")}" alt="" onerror="this.remove()"><div class="frame-fb">${label}</div>`
      : `<div class="frame-fb">${label}</div>`;
    cap.textContent = label;
    lb.classList.add("open");
  };

  shots.forEach((s, i) => s.addEventListener("click", () => show(i)));
  lb.querySelector(".lb-x")?.addEventListener("click", () => lb.classList.remove("open"));
  lb.querySelector(".lb-prev")?.addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
  lb.querySelector(".lb-next")?.addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
}

/* ticket form */
function wireTicketForm() {
  const f = document.getElementById("ticket-form");
  if (!f) return;
  const sel = f.querySelector("#tk-event");
  const qty = f.querySelector("#tk-qty");
  const out = f.querySelector(".js-tk-total");

  const unit = () => Number(sel.selectedOptions[0].dataset.price || 0);
  const upd = () => { out.textContent = rwf(unit() * (Number(qty.value) || 0)); };

  sel.addEventListener("change", upd);
  qty.addEventListener("input", upd);
  upd();

  f.querySelector(".js-tk-pay").addEventListener("click", (e) => {
    e.preventDefault();
    const q = Number(qty.value) || 0;
    if (!f.querySelector("#tk-name").value.trim()) { toast("Add your name"); return; }
    if (!f.querySelector("#tk-phone").value.trim()) { toast("Add your MTN number"); return; }
    if (q < 1) { toast("Choose at least one ticket"); return; }
    const box = f.querySelector(".momo");
    box.querySelector(".js-momo-amt").textContent = rwf(unit() * q);
    box.classList.add("show");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* donate form */
function wireDonate() {
  const chips = document.querySelectorAll(".amt-chip");
  if (!chips.length) return;
  const custom = document.getElementById("dn-custom");
  let amount = 0;

  chips.forEach((c) => c.addEventListener("click", () => {
    chips.forEach((x) => x.classList.remove("on"));
    c.classList.add("on");
    amount = Number(c.dataset.amount);
    if (custom) custom.value = "";
  }));
  custom?.addEventListener("input", () => {
    chips.forEach((x) => x.classList.remove("on"));
    amount = Number(custom.value) || 0;
  });

  document.getElementById("dn-give")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (amount < 100) { toast("Choose an amount"); return; }
    const box = document.querySelector("#donate-form .momo");
    box.querySelector(".js-momo-amt").textContent = rwf(amount);
    box.classList.add("show");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* contact form */
function wireContact() {
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault(); e.target.reset(); toast("Message noted — we'll reply soon");
  });
}

/* ---------------- Boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "";
  const head = document.getElementById("site-header");
  const foot = document.getElementById("site-footer");
  if (head) head.innerHTML = buildHeader(page);
  if (foot) foot.innerHTML = buildFooter();

  Cart.load();
  wireChrome();
  Cart.render();
  wireReveal();
  wireAddButtons();
  wireFilters();
  wireLightbox();
  wireTicketForm();
  wireDonate();
  wireContact();
});
