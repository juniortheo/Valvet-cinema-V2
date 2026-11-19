/* ==========================================================
   VELVET CINEMA — site script

   All content comes from the JSON files in /content, which are
   edited through the site manager at /admin. Nothing in this
   file needs editing to change wording, events or photographs.
   ========================================================== */

var CONTENT = {};   // filled on load

var ICON = {
  ig:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  tt:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.4 1.9 4.1 4.5 4.3"/></svg>',
  mail:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/></svg>'
};

/* leave this empty to use Netlify Forms for newsletter sign-ups,
   or paste a Google Apps Script /exec URL to send them to a sheet */
var SHEETS_ENDPOINT = "";

/* ---------- helpers ---------- */
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

function paras(t){
  return String(t||"").split(/\n\s*\n/).map(function(p){
    return "<p>"+esc(p.trim()).replace(/\n/g,"<br>")+"</p>";
  }).join("");
}

function qs(k){
  return new URLSearchParams(window.location.search).get(k);
}

/* The slug can arrive two ways: as /events/black-swan (Netlify rewrites
   this to event.html but the address bar keeps the pretty path, so the
   query string is empty), or as event.html?slug=black-swan. Try both. */
function eventSlug(){
  var m=window.location.pathname.match(/\/events\/([^\/?#]+)\/?$/);
  if(m && m[1]) return decodeURIComponent(m[1]);
  return qs("slug");
}

function sponsorMailto(){
  var s=CONTENT.settings||{};
  return "mailto:"+(s.email||"")+"?subject="+encodeURIComponent(s.sponsor_subject||"Sponsorship");
}

/* show a background image only once it has loaded */
function loadImg(el,src,clearText){
  if(!el||!src) return;
  var i=new Image();
  i.onload=function(){ el.style.backgroundImage='url("'+src+'")'; if(clearText) el.textContent=""; };
  i.src=src;
}

function upcomingEvents(){
  var list=(CONTENT.upcoming&&CONTENT.upcoming.events)||[];
  var today=new Date(); today.setHours(0,0,0,0);
  return list.filter(function(e){
    if(!e||!e.date) return false;
    var p=String(e.date).slice(0,10).split("-");
    return new Date(+p[0],+p[1]-1,+p[2])>=today;
  }).sort(function(a,b){return a.date<b.date?-1:1;});
}

function pastEvents(){ return (CONTENT.past&&CONTENT.past.events)||[]; }

/* ---------- header ---------- */
function renderHeader(page){
  var host=document.getElementById("site-header");
  if(!host) return;
  var up=upcomingEvents(), s=CONTENT.settings||{};

  var banner="";
  if(up.length){
    banner='<div class="banner">Tickets for '+esc(up[0].title)+' are on sale now. '+
           '<a href="'+esc(up[0].tickets||s.tickets||"#upcoming")+'">Get yours</a></div>';
  }

  var items=[
    up.length?'<li><a href="/#upcoming">Tickets</a></li>':'',
    '<li><a href="/about"'+(page==="about"?' aria-current="page"':'')+'>Our story</a></li>',
    '<li><a href="/events"'+(page==="events"?' aria-current="page"':'')+'>Events</a></li>',
    '<li><a href="/gallery"'+(page==="gallery"?' aria-current="page"':'')+'>Gallery</a></li>',
    '<li><a href="/sponsor"'+(page==="sponsor"?' aria-current="page"':'')+'>Sponsor us</a></li>'
  ].join("");

  host.innerHTML = banner+
    '<header><div class="wrap nav">'+
      '<a class="logo" href="/" aria-label="Velvet Cinema">Velvet<br>Cinema</a>'+
      '<nav aria-label="Main"><ul>'+items+'</ul></nav>'+
    '</div></header>';
}

/* ---------- footer ---------- */
function renderFooter(){
  var host=document.getElementById("site-footer");
  if(!host) return;
  var s=CONTENT.settings||{};
  var social="";
  if(s.instagram) social+='<li><a href="'+esc(s.instagram)+'" aria-label="Instagram">'+ICON.ig+'</a></li>';
  if(s.tiktok)    social+='<li><a href="'+esc(s.tiktok)+'" aria-label="TikTok">'+ICON.tt+'</a></li>';
  if(s.email)     social+='<li><a href="mailto:'+esc(s.email)+'" aria-label="Email">'+ICON.mail+'</a></li>';

  host.innerHTML=
  '<footer><div class="wrap">'+
    '<div class="fgrid">'+
      '<div>'+
        '<h3 class="flogo" aria-label="Velvet Cinema">Velvet<br>Cinema</h3>'+
        '<p>An independent pop-up cinema in Kigali, Rwanda.</p>'+
        '<ul class="icons">'+social+'</ul>'+
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
          '<li><a href="/about">Our Story</a></li>'+
          '<li><a href="/contact">Contact Us</a></li>'+
          '<li><a href="/sponsor">Sponsor Us</a></li>'+
        '</ul>'+
      '</div>'+
    '</div>'+
    '<div class="fine"><span>&copy; '+new Date().getFullYear()+' Velvet Cinema</span></div>'+
  '</div></footer>';
}

/* ---------- homepage ---------- */
function renderHome(){
  var homeH=document.getElementById("home-heading");
  if(!homeH) return;
  var p=CONTENT.pages||{}, s=CONTENT.settings||{};

  homeH.textContent=p.home_heading||"";
  var homeB=document.getElementById("home-body");
  if(homeB) homeB.innerHTML=paras(p.home_text);

  var up=upcomingEvents();
  var block=document.getElementById("eventBlock");
  var upSec=document.getElementById("upcoming");

  if(up.length){
    var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    document.getElementById("eventList").innerHTML=up.map(function(e){
      var d=String(e.date).slice(0,10).split("-");
      return '<div class="ev"><div class="d">'+parseInt(d[2],10)+
        '<small>'+M[+d[1]-1]+' '+d[0]+'</small></div>'+
        '<div><h3>'+esc(e.title)+'</h3><p>'+esc(e.film||"Film revealed soon")+
        ' &middot; '+esc(e.time)+' &middot; '+esc(e.venue)+
        (e.price?' &middot; '+esc(e.price):'')+'</p></div>'+
        '<a class="btn solid" href="'+esc(e.tickets||s.tickets||"#")+'">Get tickets</a></div>';
    }).join("");
    upSec.classList.remove("hidden");
    if(block) block.closest("section").classList.add("hidden");
  }else{
    var last=pastEvents()[0];
    if(!last){ if(block) block.closest("section").classList.add("hidden"); return; }
    block.querySelector(".kicker").textContent="Our last event";
    block.querySelector("h2").textContent=last.heading||"";
    block.querySelector(".ttl").textContent=last.title||"";
    block.querySelector(".body").textContent=last.text||"";
    block.querySelector(".btn").href="/events/"+encodeURIComponent(last.slug);
    loadImg(block.querySelector(".img"),last.cover,true);
  }

  /* movies shown */
  var movies=document.getElementById("moviesList");
  if(movies){
    movies.innerHTML=pastEvents().map(function(e){
      return '<article class="film"><a href="/events/'+encodeURIComponent(e.slug)+'">'+
        '<div class="poster" role="img" aria-label="Poster for the '+esc(e.title)+' screening" data-img="'+esc(e.poster||"")+'">Poster coming soon</div>'+
        '<h3>'+esc(e.title)+'</h3></a></article>';
    }).join("");
  }

  /* gallery teaser */
  var teaser=document.querySelector("#galleryTeaser");
  if(teaser){
    var ph=(CONTENT.gallery&&CONTENT.gallery.photos)||[];
    if(ph.length){ teaser.dataset.img=ph[0].image; teaser.setAttribute("aria-label",ph[0].alt||""); }
  }
}

/* ---------- events page ---------- */
function renderEvents(){
  var host=document.getElementById("eventsList");
  if(!host) return;
  host.innerHTML=pastEvents().map(function(e,i){
    var meta=[e.date,e.venue].filter(Boolean).join(" &middot; ") || (i===0?"Our last event":"");
    var shots=(e.photos||[]).slice(0,4);
    var right = shots.length
      ? '<div class="shots">'+shots.map(function(p){
          return '<div class="img r11" data-img="'+esc(p.image)+'" role="img" aria-label="'+esc(p.alt||"")+'">Photo</div>';
        }).join("")+'</div>'
      : '<div class="img r43" data-img="'+esc(e.cover||"")+'" role="img" aria-label="Photograph from '+esc(e.title)+'">Photographs from this night are coming soon</div>';
    var ticket = e.ticket
      ? '<figure class="stub"><div class="img" style="aspect-ratio:11/4" data-img="'+esc(e.ticket)+'" role="img" aria-label="Ticket for '+esc(e.title)+'">Ticket</div>'+
        '<figcaption>The ticket for the night</figcaption></figure>' : '';
    return '<article class="eventcard"><div>'+
      (meta?'<p class="meta">'+meta+'</p>':'')+
      '<h2>'+esc(e.heading)+'</h2>'+
      '<p class="sub">'+esc(e.title)+'</p>'+
      '<p>'+esc(e.text)+'</p>'+ticket+
      '<a class="btn" href="/events/'+encodeURIComponent(e.slug)+'">See the night and more photos</a>'+
      '</div>'+right+'</article>';
  }).join("");
}

/* ---------- single event page ---------- */
function renderEvent(){
  var host=document.getElementById("eventDetail");
  if(!host) return;
  var slug=eventSlug();
  var e=pastEvents().filter(function(x){return x.slug===slug;})[0];

  if(!e){
    host.innerHTML='<div class="wrap"><h1>Event not found</h1>'+
      '<p style="margin-top:1rem">We could not find that screening.</p>'+
      '<p style="margin-top:1.5rem"><a class="btn" href="/events">All events</a></p></div>';
    return;
  }
  document.title=e.title+" | Velvet Cinema";

  var facts=[["Date",e.date],["Doors",e.time],["Venue",e.venue],
             ["Film",e.film],["Live music",e.music],["Sound",e.sound]]
    .filter(function(f){return f[1];})
    .map(function(f){return '<div><dt>'+esc(f[0])+'</dt><dd>'+esc(f[1])+'</dd></div>';}).join("");

  var ticket = e.ticket
    ? '<figure class="stub" style="max-width:520px"><div class="img" style="aspect-ratio:11/4" data-img="'+esc(e.ticket)+'" role="img" aria-label="Ticket for '+esc(e.title)+'">Ticket</div>'+
      '<figcaption>The ticket for the night</figcaption></figure>' : '';

  host.innerHTML='<div class="wrap">'+
    '<p class="crumbs"><a href="/events">Events</a> &nbsp;/&nbsp; '+esc(e.title)+'</p>'+
    '<div class="detail">'+
      '<div class="poster r23" data-img="'+esc(e.poster||"")+'" role="img" aria-label="Poster for the '+esc(e.title)+' screening">Poster coming soon</div>'+
      '<div>'+
        '<h1>'+esc(e.heading)+'</h1>'+
        '<p class="lead" style="margin-top:1rem">'+esc(e.text)+'</p>'+
        (facts?'<dl class="facts">'+facts+'</dl>':'')+
        ticket+
      '</div>'+
    '</div></div>';

  var photos=e.photos||[];
  var gal=document.getElementById("eventPhotos");
  if(gal){
    if(photos.length){
      gal.innerHTML='<div class="wrap"><h2>Photographs from the night</h2><div class="grid-gal">'+
        photos.map(function(p){
          return '<div class="shot"><img src="'+esc(p.image)+'" alt="'+esc(p.alt||"")+'" loading="lazy" decoding="async"></div>';
        }).join("")+'</div></div>';
    }else{
      gal.innerHTML='<div class="wrap"><h2>Photographs from the night</h2>'+
        '<p>Photographs from this screening are on their way. In the meantime, see the gallery from our other nights.</p>'+
        '<p style="margin-top:1.25rem"><a class="btn" href="/gallery">See the gallery</a></p></div>';
    }
  }
}

/* ---------- gallery page ---------- */
function renderGallery(){
  var host=document.getElementById("galleryGrid");
  if(!host) return;
  var p=CONTENT.pages||{};
  var head=document.getElementById("galleryHead");
  if(head){
    head.querySelector("h1").textContent=p.gallery_heading||"Gallery";
    head.querySelector("p").textContent=p.gallery_text||"";
  }
  var photos=(CONTENT.gallery&&CONTENT.gallery.photos)||[];
  host.innerHTML=photos.map(function(x){
    return '<div class="shot"><img src="'+esc(x.image)+'" alt="'+esc(x.alt||"")+'" loading="lazy" decoding="async"></div>';
  }).join("") || '<p>Photographs are on their way.</p>';
}

/* ---------- simple text pages ---------- */
function renderTextPages(){
  var p=CONTENT.pages||{}, s=CONTENT.settings||{};

  var abH=document.getElementById("about-heading");
  var abB=document.getElementById("about-body");
  if(abH) abH.textContent=p.about_heading||"";
  if(abB) abB.innerHTML=paras(p.about_body);
  var set=function(id,val){ var el=document.getElementById(id); if(el) el.textContent=val||""; };
  var html=function(id,val){ var el=document.getElementById(id); if(el) el.innerHTML=val||""; };

  set("sponsor-heading",p.sponsor_heading);
  set("sponsor-tagline",p.sponsor_tagline);
  html("sponsor-body",paras(p.sponsor_body));

  set("contact-heading",p.contact_heading);
  set("contact-tagline",p.contact_text);
  var mail=document.getElementById("contact-email");
  if(mail){ mail.href="mailto:"+(s.email||""); mail.textContent=s.email||""; }
  document.querySelectorAll("[data-sponsor]").forEach(function(a){ a.href=sponsorMailto(); });
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

    var url = SHEETS_ENDPOINT || "/";
    var body = SHEETS_ENDPOINT
      ? new URLSearchParams({email:email})
      : new URLSearchParams({"form-name":"newsletter",email:email});

    fetch(url,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:body.toString()})
      .then(function(){ done("Thank you — you’re on the list."); })
      .catch(function(){ done("We couldn’t save that just now. Please email "+((CONTENT.settings||{}).email||"us")+"."); });

    function done(msg){
      form.reset(); btn.disabled=false; btn.textContent="Sign up";
      if(note){ note.textContent=msg; note.classList.add("show"); }
    }
  });
}

/* ---------- lightbox ---------- */
function wireLightbox(){
  var lb=document.querySelector(".lb");
  if(!lb) return;
  var shots=[].slice.call(document.querySelectorAll(".shot img"));
  if(!shots.length) return;
  var big=lb.querySelector("img"), idx=0;

  function show(i){
    idx=(i+shots.length)%shots.length;
    big.src=shots[idx].src; big.alt=shots[idx].alt||"";
    lb.classList.add("open"); document.body.style.overflow="hidden";
  }
  function close(){ lb.classList.remove("open"); document.body.style.overflow=""; }

  shots.forEach(function(img,i){ img.parentNode.addEventListener("click",function(){show(i);}); });
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

/* ---------- boot ---------- */
function loadContent(){
  var files=["settings","pages","upcoming","past-events","gallery"];
  return Promise.all(files.map(function(f){
    return fetch("/content/"+f+".json",{cache:"no-cache"})
      .then(function(r){ return r.ok?r.json():{}; })
      .catch(function(){ return {}; });
  })).then(function(res){
    CONTENT.settings=res[0]; CONTENT.pages=res[1];
    CONTENT.upcoming=res[2]; CONTENT.past=res[3]; CONTENT.gallery=res[4];
  });
}

document.addEventListener("DOMContentLoaded",function(){
  loadContent().then(function(){
    var page=document.body.dataset.page||"";
    renderHeader(page);
    renderFooter();
    renderHome();
    renderEvents();
    renderEvent();
    renderGallery();
    renderTextPages();
    /* any element with data-img gets its background once loaded */
    document.querySelectorAll("[data-img]").forEach(function(el){ loadImg(el,el.dataset.img,true); });
    wireNewsletter();
    wireLightbox();
    document.body.classList.add("ready");
  });
});
