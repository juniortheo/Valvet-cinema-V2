/* ==========================================================
   VELVET CINEMA — shared site script
   Header and footer are rendered from here so every page
   stays in sync. Set <body data-page="..."> for nav state.
   ========================================================== */

/* ----------------------------------------------------------
   EDIT HERE — site details
   ---------------------------------------------------------- */
var SITE = {
  email: "velvetcinemakgl@gmail.com",
  instagram: "https://instagram.com/velvetcinemakgl",
  tiktok: "",                                   // TODO: add the TikTok URL
  tickets: "https://velvetcinemakgl.sinc.events",
  sponsorSubject: "Velvet Cinema Partnerships"
};

/* ----------------------------------------------------------
   EDIT HERE — to announce a night, add an event to EVENTS.
   Leave EVENTS empty and the ticket banner, the "Tickets"
   nav link and the "Our next event" block stay hidden, and
   the homepage shows "Our last event" instead.
   Past dates disappear on their own.
     date: "YYYY-MM-DD"  (stays visible through that day)
     film: null  ->  "Film revealed soon"
   ---------------------------------------------------------- */
var EVENTS = [
  /* Example — delete the comment markers to use:
  { title:"Halloween Night", date:"2026-10-30", time:"6:30 PM",
    venue:"Utakah, Masoro", film:"American Psycho",
    price:"From RWF 10,000", poster:"assets/images/poster-halloween.jpg",
    tickets:"https://velvetcinemakgl.sinc.events" }
  */
];

/* ----------------------------------------------------------
   Past events — newest first. The first entry is shown on the
   homepage as "Our last event" when nothing is upcoming.
   ---------------------------------------------------------- */
var PAST_EVENTS = [
  {
    slug: "the-devil-wears-prada-2",
    title: "The Devil Wears Prada 2",
    heading: "An unforgettable night",
    text: "We showed the newly released The Devil Wears Prada 2, followed by an incredible music performance by Sema Sole and electrifying sound by Chris Ruti.",
    date: null,
    venue: null,
    poster: "assets/images/poster-tdwp2.jpg",
    cover: "assets/images/last-event.jpg",
    ticket: null,
    shots: []
  },
  {
    slug: "black-swan",
    title: "Black Swan",
    heading: "A memorable and beautiful first event",
    text: "We showed the classic psychological horror film Black Swan and ended the night with an amazing performance by the one and only Sheja Lau.",
    date: "Saturday 28 March 2026",
    time: "6:00 PM",
    venue: "Utakah, Masoro — Kigali",
    film: "Black Swan (2010), dir. Darren Aronofsky",
    music: "Live performance by Sheja Lau",
    poster: "assets/images/poster-black-swan.jpg",
    cover: "assets/images/event-01.jpg",
    ticket: "assets/images/ticket-banner.jpg",
    shots: [
      "assets/images/event-01.jpg","assets/images/event-02.jpg","assets/images/event-03.jpg",
      "assets/images/event-04.jpg","assets/images/event-05.jpg","assets/images/event-06.jpg",
      "assets/images/event-07.jpg","assets/images/event-08.jpg","assets/images/event-09.jpg",
      "assets/images/event-10.jpg","assets/images/event-11.jpg","assets/images/event-12.jpg",
      "assets/images/still-01.jpg","assets/images/still-02.jpg","assets/images/still-03.jpg",
      "assets/images/still-04.jpg","assets/images/still-05.jpg","assets/images/spotlight.jpg",
      "assets/images/tile-season.jpg","assets/images/tile-store.jpg",
      "assets/images/tile-archive.jpg","assets/images/tile-support.jpg"
    ]
  }
];

/* ----------------------------------------------------------
   Newsletter delivery.
   Leave SHEETS_ENDPOINT empty to use Netlify Forms (the
   hidden form in index.html is what Netlify detects).
   To send straight to Google Sheets instead, publish an
   Apps Script web app and paste its /exec URL here.
   ---------------------------------------------------------- */
var SHEETS_ENDPOINT = "";

/* ========================================================== */

var ICON = {
  ig:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  tt:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.4 1.9 4.1 4.5 4.3"/></svg>',
  mail:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/></svg>'
};

function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

function sponsorMailto(){
  return "mailto:"+SITE.email+"?subject="+encodeURIComponent(SITE.sponsorSubject);
}

/* ---------- upcoming ---------- */
function upcomingEvents(){
  var today=new Date(); today.setHours(0,0,0,0);
  return EVENTS.filter(function(e){
    var p=e.date.split("-"); return new Date(p[0],p[1]-1,p[2])>=today;
  }).sort(function(a,b){return a.date<b.date?-1:1;});
}

/* ---------- header ---------- */
function buildHeader(page){
  var up=upcomingEvents();
  var items=[
    up.length?'<li><a href="index.html#upcoming">Tickets</a></li>':'',
    '<li><a href="about.html"'+(page==="about"?' aria-current="page"':'')+'>Our story</a></li>',
    '<li><a href="events.html"'+(page==="events"?' aria-current="page"':'')+'>Events</a></li>',
    '<li><a href="gallery.html"'+(page==="gallery"?' aria-current="page"':'')+'>Gallery</a></li>',
    '<li><a href="sponsor.html"'+(page==="sponsor"?' aria-current="page"':'')+'>Sponsor us</a></li>'
  ].join("");

  var banner="";
  if(up.length){
    var f=up[0];
    banner='<div class="banner">Tickets for '+esc(f.title)+' are on sale now. '+
           '<a href="'+esc(f.tickets||SITE.tickets)+'">Get yours</a></div>';
  }

  return banner+
  '<header><div class="wrap nav">'+
    '<a class="logo" href="index.html" aria-label="Velvet Cinema">Velvet<br>Cinema</a>'+
    '<nav aria-label="Main"><ul>'+items+'</ul></nav>'+
  '</div></header>';
}

/* ---------- footer ---------- */
function buildFooter(){
  var tiktok=SITE.tiktok
    ? '<li><a href="'+esc(SITE.tiktok)+'" aria-label="TikTok">'+ICON.tt+'</a></li>' : '';
  return '<footer><div class="wrap">'+
    '<div class="fgrid">'+
      '<div>'+
        '<h3 class="flogo" aria-label="Velvet Cinema">Velvet<br>Cinema</h3>'+
        '<p>An independent pop-up cinema in Kigali, Rwanda.</p>'+
        '<ul class="icons">'+
          '<li><a href="'+esc(SITE.instagram)+'" aria-label="Instagram">'+ICON.ig+'</a></li>'+
          tiktok+
          '<li><a href="mailto:'+esc(SITE.email)+'" aria-label="Email">'+ICON.mail+'</a></li>'+
        '</ul>'+
      '</div>'+
      '<div>'+
        '<h3>Newsletter</h3>'+
        '<p>Get informed about each screening event in advance, and stay up to date with our programming.</p>'+
        '<form class="news" id="newsletter" aria-label="Newsletter sign-up">'+
          '<label class="hidden" for="nl-email">Email</label>'+
          '<input id="nl-email" type="email" name="email" placeholder="Your email" required>'+
          '<button class="btn" type="submit">Sign up</button>'+
        '</form>'+
        '<p class="consent">By signing up, you agree to receive email updates about Velvet Cinema’s screenings and events. You can unsubscribe at any time.</p>'+
        '<p class="formnote" id="nl-note" role="status"></p>'+
        '<ul class="links">'+
          '<li><a href="about.html">Our Story</a></li>'+
          '<li><a href="contact.html">Contact Us</a></li>'+
          '<li><a href="sponsor.html">Sponsor Us</a></li>'+
        '</ul>'+
      '</div>'+
    '</div>'+
    '<div class="fine"><span>&copy; '+new Date().getFullYear()+' Velvet Cinema</span></div>'+
  '</div></footer>';
}

/* ---------- show an image only if the file exists ---------- */
function loadImg(el,src,clearText){
  if(!el||!src) return;
  var i=new Image();
  i.onload=function(){
    el.style.backgroundImage='url("'+src+'")';
    if(clearText) el.textContent="";
  };
  i.src=src;
}

/* ---------- newsletter ---------- */
function wireNewsletter(){
  var form=document.getElementById("newsletter");
  if(!form) return;
  var note=document.getElementById("nl-note");
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var email=form.querySelector("input[type=email]").value.trim();
    if(!email) return;
    var btn=form.querySelector("button");
    btn.disabled=true; btn.textContent="Signing up…";

    var url, body;
    if(SHEETS_ENDPOINT){
      url=SHEETS_ENDPOINT;
      body=new URLSearchParams({email:email});
    }else{
      url="/";                               // Netlify Forms
      body=new URLSearchParams({"form-name":"newsletter",email:email});
    }

    fetch(url,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:body.toString()})
      .then(function(){ done("Thank you — you’re on the list."); })
      .catch(function(){ done("We couldn’t save that just now. Please email "+SITE.email+"."); });

    function done(msg){
      form.reset();
      btn.disabled=false; btn.textContent="Sign up";
      if(note){ note.textContent=msg; note.classList.add("show"); }
    }
  });
}

/* ---------- gallery lightbox ---------- */
function wireLightbox(){
  var lb=document.querySelector(".lb");
  if(!lb) return;
  var shots=[].slice.call(document.querySelectorAll(".shot img"));
  if(!shots.length) return;
  var big=lb.querySelector("img"), idx=0;

  function show(i){
    idx=(i+shots.length)%shots.length;
    big.src=shots[idx].src;
    big.alt=shots[idx].alt||"";
    lb.classList.add("open");
    document.body.style.overflow="hidden";
  }
  function close(){ lb.classList.remove("open"); document.body.style.overflow=""; }

  shots.forEach(function(img,i){
    img.parentNode.addEventListener("click",function(){show(i);});
  });
  lb.querySelector(".x").addEventListener("click",close);
  lb.querySelector(".p").addEventListener("click",function(e){e.stopPropagation();show(idx-1);});
  lb.querySelector(".n").addEventListener("click",function(e){e.stopPropagation();show(idx+1);});
  lb.addEventListener("click",function(e){ if(e.target===lb) close(); });
  document.addEventListener("keydown",function(e){
    if(!lb.classList.contains("open")) return;
    if(e.key==="Escape") close();
    if(e.key==="ArrowLeft") show(idx-1);
    if(e.key==="ArrowRight") show(idx+1);
  });
}

/* ---------- homepage: next or last event ---------- */
function renderHome(){
  var host=document.getElementById("eventBlock");
  if(!host) return;
  var up=upcomingEvents();

  if(up.length){
    var list=document.getElementById("eventList");
    if(list){
      list.innerHTML=up.map(function(e){
        var p=e.date.split("-");
        var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return '<div class="ev"><div class="d">'+parseInt(p[2],10)+
          '<small>'+M[p[1]-1]+' '+p[0]+'</small></div>'+
          '<div><h3>'+esc(e.title)+'</h3><p>'+esc(e.film?e.film:"Film revealed soon")+
          ' &middot; '+esc(e.time)+' &middot; '+esc(e.venue)+
          (e.price?' &middot; '+esc(e.price):'')+'</p></div>'+
          '<a class="btn solid" href="'+esc(e.tickets||SITE.tickets)+'">Get tickets</a></div>';
      }).join("");
      document.getElementById("upcoming").classList.remove("hidden");
    }
    host.classList.add("hidden");
    return;
  }

  /* nothing upcoming -> show the last event */
  var last=PAST_EVENTS[0];
  host.querySelector(".kicker").textContent="Our last event";
  host.querySelector("h2").textContent=last.heading;
  host.querySelector(".ttl").textContent=last.title;
  host.querySelector(".body").textContent=last.text;
  var link=host.querySelector(".btn");
  link.href="event-"+last.slug+".html";
  loadImg(host.querySelector(".img"),last.cover,true);
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded",function(){
  var page=document.body.dataset.page||"";
  var h=document.getElementById("site-header");
  var f=document.getElementById("site-footer");
  if(h) h.innerHTML=buildHeader(page);
  if(f) f.innerHTML=buildFooter();

  document.querySelectorAll("[data-sponsor]").forEach(function(a){ a.href=sponsorMailto(); });
  document.querySelectorAll("[data-img]").forEach(function(el){ loadImg(el,el.dataset.img,true); });

  renderHome();
  wireNewsletter();
  wireLightbox();
});
