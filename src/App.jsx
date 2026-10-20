import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Clock, Heart, MapPin, Menu, Phone, ShoppingBag, Star, X } from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";

// ---------------------------------------------------------------- Content (from carlsonvineyards.com, checked 2026-10-20)
const COMPANY = "Carlson Vineyards";
const ABBR = "cv";
const END_DATE = "2026-11-24T23:59:59-07:00";
const PHONE = "(970) 464-5554";
const PHONE_HREF = "tel:+19704645554";
const EMAIL = "info@carlsonvineyards.com";
const CLUB_EMAIL = "wineclub@carlsonvineyards.com";
const CLUB_PHONE = "(970) 640-9455";
const ORIGINAL = "https://www.carlsonvineyards.com/";

// Purchases stay on their existing WineDirect store and club sign-up.
const SITE = "https://www.carlsonvineyards.com";
const SHOP = `${SITE}/Wines/Red`;
const SHOP_LINKS = [["Red", `${SITE}/Wines/Red`], ["White & Rosé", `${SITE}/Wines/White`], ["Fruit", `${SITE}/Wines/Fruit`], ["Bundles", `${SITE}/Wines/Sample-Bundles`], ["Gift Cards", `${SITE}/Wines/Gift-Cards`], ["Event Tickets", `${SITE}/Wines/Eventtickets`]];
const CART = `${SITE}/index.cfm?method=cartV2.showCart`;
const LOGIN = `${SITE}/index.cfm?method=memberLogin.showLogin`;
const CLUB_PAGE = `${SITE}/Wine-Club`;
const CLUB_POLICIES = `${SITE}/Wine-Club/Membership-Policies`;

const A = `${SITE}/assets`;
const LOGO = `${A}/images/logo.png`;
const PHOTO = {
  hero: `${A}/images/pods/HomepageHeader-ZHLETW.png`,
  flight: `${A}/new/Flight%20Board.jpg`,
  corks: `${A}/new/Corks%20with%20Bottles.jpg`,
  backyard: `${A}/new/Backyard.jpg`,
  downtown: `${A}/new/Bottle%20Lineup%20DT.jpg`,
  founders: `${A}/new/Garrett%20and%20Parker.jpg`,
  hauling: `${A}/new/Parker/Hauling%20Grapes%201988.jpg`,
  vines: `${A}/client/Image/vines2019.jpg`,
};

const LOCATIONS = [
  { name: "The Winery", town: "Palisade", address: "461 35 Road, Palisade, CO 81526", phone: "(970) 464-5554", tel: "tel:+19704645554", hours: [["Daily", "10am – 6pm"]], note: "Last pour 5:30 · bottles to go until 5:45", img: PHOTO.backyard, map: "461 35 Road, Palisade, CO 81526" },
  { name: "Downtown Tasting Room", town: "Grand Junction", address: "545 Main Street, Grand Junction, CO 81501", phone: "(970) 424-5827", tel: "tel:+19704245827", hours: [["Mon – Sat", "12pm – 8pm"], ["Sunday", "12pm – 6pm"]], note: "Last pour 30 min before close", img: PHOTO.downtown, map: "545 Main Street, Grand Junction, CO 81501" },
];

const P = `${A}/images/products/pictures`;
const WINES = [
  { name: "Tyrannosaurus Red", vintage: "’24", style: "Dry red blend", note: "Cherry, raspberry and a hint of leather. Great with brats, pizza and, of course, raw stegosaurus.", price: "$24", img: `${P}/Untitleddesign15-BEJQFQ.png`, href: `${SITE}/product/Tyrannosaurus-Red--23-Copy`, tag: "Longest-running" },
  { name: "Sweet Baby Red", vintage: "NV", style: "Sweet red · Laughing Cat", note: "Black currant, cherry and blackberry with balanced sweetness. Delicious chilled.", price: "$18", img: `${P}/SBR21.png`, href: `${SITE}/product/Sweet-Baby-Red-24`, tag: "Best-seller" },
  { name: "Sweet Gewürztraminer", vintage: "NV", style: "Sweet white", note: "Pink grapefruit, lychee and tropical fruit. Try it with smoked salmon or spice cake.", price: "$18", img: `${P}/SweetG21.png`, href: `${SITE}/product/Sweet-Gewurztraminer-2023` },
  { name: "Cherry", vintage: "’24", style: "Fruit wine", note: "100% Montmorency pie cherries, no grapes added. Cherry pie without the crust.", price: "$24", img: `${P}/Cherry21.png`, href: `${SITE}/product/Cherry--23-Copy` },
  { name: "Peach", vintage: "NV", style: "Fruit wine", note: "A bright, peachy nose and the taste of tree-ripened Palisade peach.", price: "$18", img: `${P}/Peach-RCIZBA.png`, href: `${SITE}/product/Peach--23` },
  { name: "Wren Quinn Red", vintage: "’22", style: "Cabernet Sauvignon", note: "Blackberry and toasted vanilla. 10% of proceeds go to the Wren Quinn giving fund.", price: "$45", img: `${P}/wrenquinnredbottlepic1.png`, href: `${SITE}/product/Wren-Quinn-Red--22`, tag: "Gives back" },
];

// Verbatim customer reviews from product pages on carlsonvineyards.com (2025–2026).
const REVIEWS = [
  { text: "I visited the winery there in palisade and bought this wine, I was not expecting it to be as good as it was! This wine blew away all my expectations and is easily now one of my favorites.", name: "Mike", wine: "Sweet Gewürztraminer" },
  { text: "Sweet Baby Red has been our favorite for many years! Just the right sweetness with a round fruity body. We love it chilled anytime. With food or on the patio with a sunset.", name: "Jean H", wine: "Sweet Baby Red" },
  { text: "This was served at a wedding and everyone that drank it, loved it!", name: "Tina Clarke", wine: "Sweet Gewürztraminer" },
  { text: "I had this on a road trip through Colorado. The fact that it was good enough to leave a review, should be an indication of how good it is. If you like sweet wines, you'll love this.", name: "Alex Lowe", wine: "Sweet Gewürztraminer" },
];

const CLUBS = [
  { name: "CV3", discount: "15%", bottles: "3 bottles", when: "March, May, Sept., Nov.", ship: "Regular shipping", custom: true, href: `${SITE}/clubs/cv3` },
  { name: "CV6", discount: "20%", bottles: "6 bottles", when: "February, June, October", ship: "$20 flat-rate shipping", custom: true, href: `${SITE}/clubs/CV6` },
  { name: "CV12", discount: "25%", bottles: "12 bottles", when: "February, June, October", ship: "$15 flat-rate shipping", custom: true, href: `${SITE}/clubs/cv12`, featured: true },
  { name: "SimplyCV", discount: "25%", bottles: "6 bottles", when: "January & July", ship: "Pickup only", custom: false, href: `${SITE}/clubs/SIMPLY-CV` },
];
const PERKS = ["Discounted flights and glasses at both tasting rooms", "Members-only events and first priority on ticketed events", "New releases and club-exclusive wines", "Discounts on everything, online and in the tasting rooms"];
const SHIP_STATES = "AZ, CA, CO, FL (approved zip codes), MN, MO, OR, TX, WA, WI and DC";

const STORY = [
  ["1981", "Parker and Mary Carlson plant their first vines on four acres in East Orchard Mesa above Palisade."],
  ["1988", "The winery opens in a 1930s fruit packing shed, making wine from local grapes and fruit from Palisade and Delta County."],
  ["2011", "Garrett Portra starts working at Carlson Vineyards, hoping to open a winery of his own someday."],
  ["2015", "Garrett buys the winery, and the two families stay friends to this day."],
];

const PRESS = ["National Geographic Traveler", "Sunset", "The New York Times", "Los Angeles Times", "The Denver Post", "USA Today", "5280", "Forbes", "Robert Parker Wine Advocate"];

// ---------------------------------------------------------------- Motifs
function Mesa({ className = "" }) {
  // Mount Garfield and the Book Cliffs above the Palisade vineyards: flat top, eroded ribs below.
  return (
    <svg className={`mesa ${className}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path className="mesa-back" d="M0 70 L120 64 L190 40 L420 34 L470 52 L560 48 L610 26 L900 22 L950 44 L1080 40 L1130 30 L1340 28 L1440 46 L1440 120 L0 120Z" />
      <path className="mesa-front" d="M0 92 L80 88 L140 70 L180 78 L230 62 L300 60 L340 74 L400 70 L460 84 L540 82 L600 66 L640 72 L700 58 L820 56 L860 70 L920 68 L980 82 L1060 80 L1110 64 L1160 70 L1220 60 L1320 58 L1370 72 L1440 70 L1440 120 L0 120Z" />
      <path className="mesa-rows" d="M0 106 H1440 M0 114 H1440" />
    </svg>
  );
}

function Crescent({ className = "" }) {
  // The open "C" from the Carlson Vineyards logo.
  return (
    <svg className={`crescent ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <path d="M150 38 A80 80 0 1 0 160 150 A64 64 0 1 1 150 38Z" />
    </svg>
  );
}

// ---------------------------------------------------------------- Sections
function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["#visit", "Visit"], ["#wines", "Wines"], ["#club", "Wine Club"], ["#story", "Our Story"], ["#wren-quinn", "Wren Quinn"]];
  return (
    <header className={`site-header${solid || open ? " is-solid" : ""}`}>
      <div className="wrap header-row">
        <a href="#top" className="brand" aria-label={`${COMPANY} home`}>
          <span className="logo-plate"><img src={LOGO} alt="Carlson Vineyards logo" /></span>
          <span className="brand-name">Carlson<small>Vineyards · Palisade</small></span>
        </a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-account" href={LOGIN} target="_blank" rel="noopener noreferrer">Log in</a>
          <a className="nav-shop" href={CART} target="_blank" rel="noopener noreferrer"><ShoppingBag size={16} /> Cart</a>
        </nav>
        <button type="button" className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-img" src={PHOTO.hero} alt="Carlson's Palisade vineyard in winter with Mount Garfield behind" />
      <div className="hero-shade" />
      <div className="wrap hero-inner">
        <p className="hero-kicker">Family-owned winery · Palisade, Colorado · Since 1988</p>
        <h1>Why make drinking wine <em>complicated?</em></h1>
        <p className="lede">Friendly, affordable, unpretentious wines from Grand Valley grapes and Palisade fruit, poured daily at the winery and on Main Street in Grand Junction.</p>
        <div className="hero-actions">
          <a className="btn btn-peach" href={SHOP} target="_blank" rel="noopener noreferrer"><ShoppingBag size={18} /> Shop wines</a>
          <a className="btn btn-ghost" href="#visit">Plan a visit <ArrowRight size={18} /></a>
        </div>
      </div>
      <div className="ribbon" aria-label="Award">
        <Star size={16} fill="currentColor" />
        <span>Voted Best Winery<br /><strong>Daily Sentinel 2016–2020</strong></span>
      </div>
      <Mesa className="hero-mesa" />
    </section>
  );
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="wrap">
        <div className="visit-head">
          <p className="eyebrow">Open daily · no reservations needed</p>
          <h2>Two tasting rooms, <em>one easy pour.</em></h2>
          <p>Wine by the bottle, glass or tasting flight. Seating fits groups of up to six, so larger groups may sit at separate tables.</p>
        </div>
        <div className="visit-grid">
          {LOCATIONS.map((l) => (
            <article key={l.name} className="loc">
              <img src={l.img} alt={`${COMPANY} ${l.name}`} loading="lazy" />
              <div className="loc-body">
                <p className="loc-town">{l.town}</p>
                <h3>{l.name}</h3>
                <p className="loc-addr"><MapPin size={16} /> {l.address}</p>
                <dl className="loc-hours">{l.hours.map(([d, h]) => <div key={d}><dt>{d}</dt><dd>{h}</dd></div>)}</dl>
                <p className="loc-note"><Clock size={14} /> {l.note}</p>
                <div className="loc-actions">
                  <a href={l.tel}><Phone size={15} /> {l.phone}</a>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(l.map)}`} target="_blank" rel="noopener noreferrer">Directions <ArrowUpRight size={15} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wines() {
  return (
    <section className="wines" id="wines">
      <Crescent className="wines-crescent" />
      <div className="wrap">
        <div className="wines-head">
          <div>
            <p className="eyebrow light">The flight board</p>
            <h2>Pour yourself <em>a favorite.</em></h2>
          </div>
          <img className="flight-photo" src={PHOTO.flight} alt="A tasting flight being poured at Carlson Vineyards" loading="lazy" />
        </div>
        <div className="wine-grid">
          {WINES.map((w) => (
            <a key={w.name} className="wine" href={w.href} target="_blank" rel="noopener noreferrer">
              {w.tag && <span className="wine-tag">{w.tag}</span>}
              <div className="bottle"><img src={w.img} alt={`${w.name} bottle`} loading="lazy" /></div>
              <div className="wine-info">
                <p className="wine-style">{w.style}</p>
                <h3>{w.name} <span>{w.vintage}</span></h3>
                <p>{w.note}</p>
                <div className="wine-buy"><strong>{w.price}</strong><span>Shop <ArrowUpRight size={15} /></span></div>
              </div>
            </a>
          ))}
        </div>
        <div className="shop-links">
          <span>Shop all</span>
          {SHOP_LINKS.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
        </div>
        <p className="ship-note">We currently ship to {SHIP_STATES}. Someone 21+ must sign for every delivery.</p>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <p className="eyebrow center">From our customers</p>
        <h2 id="reviews-title" className="center">In their <em>own words.</em></h2>
        <div className="review-grid">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="review">
              <blockquote>“{r.text}”</blockquote>
              <figcaption><strong>{r.name}</strong><span>on {r.wine} · review on carlsonvineyards.com</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Club() {
  return (
    <section className="club" id="club">
      <div className="wrap">
        <div className="club-head">
          <div>
            <p className="eyebrow">Wine clubs</p>
            <h2>No fee to join. <em>Pick your pour.</em></h2>
          </div>
          <p>Commit to one year of releases, then cancel any time. Customize your wines, and skip shipping by picking up at either tasting room. Benefits start the day you join.</p>
        </div>
        <div className="club-grid">
          {CLUBS.map((c) => (
            <article key={c.name} className={`club-card${c.featured ? " is-featured" : ""}`}>
              {c.featured && <span className="club-flag">Best value</span>}
              <h3>{c.name}</h3>
              <p className="club-discount"><strong>{c.discount}</strong> off club orders &amp; purchases</p>
              <ul>
                <li>{c.bottles} per order</li>
                <li>{c.when}</li>
                <li>{c.ship}</li>
                <li>{c.custom ? "Customizable" : "Not customizable"}</li>
              </ul>
              <a className="btn btn-wine" href={c.href} target="_blank" rel="noopener noreferrer">Join {c.name}</a>
            </article>
          ))}
        </div>
        <div className="perks">
          <ul>{PERKS.map((p) => <li key={p}>{p}</li>)}</ul>
          <div className="perks-help">
            <p>Already a member? <a href={LOGIN} target="_blank" rel="noopener noreferrer">Log in to edit your next order</a>. The pick-list opens 30 days before each release.</p>
            <p>Questions: <a href={`mailto:${CLUB_EMAIL}`}>{CLUB_EMAIL}</a> · call or text <a href="tel:+19706409455">{CLUB_PHONE}</a> · <a href={CLUB_POLICIES} target="_blank" rel="noopener noreferrer">Membership policies</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="story">
      <div className="wrap story-grid">
        <div className="story-photos">
          <figure className="snap snap-a"><img src={PHOTO.hauling} alt="Hauling grapes at Carlson Vineyards in 1988" loading="lazy" /><figcaption>Hauling grapes, 1988</figcaption></figure>
          <figure className="snap snap-b"><img src={PHOTO.founders} alt="Garrett Portra and Parker Carlson sharing a glass" loading="lazy" /><figcaption>Garrett &amp; Parker</figcaption></figure>
        </div>
        <div>
          <p className="eyebrow">Our story</p>
          <h2>A home hobby <em>that took over the house.</em></h2>
          <ol className="story-line">{STORY.map(([y, t]) => <li key={y}><span>{y}</span><p>{t}</p></li>)}</ol>
          <blockquote className="parker">“Our idea was to craft fine wines that people enjoyed drinking, that were affordable, friendly, and unpretentious.”<cite>— Parker Carlson, founder</cite></blockquote>
        </div>
      </div>
    </section>
  );
}

function WrenQuinn() {
  return (
    <section className="wq" id="wren-quinn">
      <div className="wrap wq-grid">
        <div className="wq-mark"><Heart size={34} /></div>
        <div>
          <p className="eyebrow light">The Wren Quinn Project</p>
          <h2>Every Wren Quinn bottle <em>gives back.</em></h2>
          <p>Named for Garrett's daughters, Josephine Wren and Madeline Quinn. Every bottle in the Wren Quinn series adds to a fund, and each month we choose a different local cause, nonprofit or neighbor to support.</p>
          <blockquote>“I started the Wren Quinn Project with the belief that we couldn't have a successful business without a successful community around us.”<cite>— Garrett Portra, owner &amp; winemaker</cite></blockquote>
          <a className="btn btn-peach" href={`${SITE}/About-Us/Wren-Quinn-Project`} target="_blank" rel="noopener noreferrer">See who we've supported <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

function Press() {
  return (
    <section className="press" aria-label="Awards and press">
      <div className="wrap press-row">
        <div className="press-award">
          <Star size={22} fill="currentColor" />
          <div><strong>“Best of the West”</strong><span>Voted Best Winery by Daily Sentinel readers, 2016, 2017, 2018, 2019 &amp; 2020</span></div>
        </div>
        <div className="press-list">
          <span>As featured in</span>
          <p>{PRESS.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <Mesa className="contact-mesa" />
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow light">Say hello</p>
          <h2>See you <em>in Palisade.</em></h2>
          <dl className="contact-list">
            <div><dt>Winery</dt><dd>461 35 Road, Palisade, CO 81526<br /><a href={PHONE_HREF}>{PHONE}</a> · open daily 10–6</dd></div>
            <div><dt>Downtown</dt><dd>545 Main Street, Grand Junction, CO 81501<br /><a href="tel:+19704245827">(970) 424-5827</a> · Mon–Sat 12–8, Sun 12–6</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
          </dl>
        </div>
        <div className="map"><iframe title="Map to Carlson Vineyards" src={`https://maps.google.com/maps?q=${encodeURIComponent("Carlson Vineyards, 461 35 Rd, Palisade, CO 81526")}&z=13&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <span className="logo-plate big"><img src={LOGO} alt="Carlson Vineyards logo" loading="lazy" /></span>
        <div className="footer-links">
          <a href={SHOP} target="_blank" rel="noopener noreferrer">Shop</a>
          <a href={CLUB_PAGE} target="_blank" rel="noopener noreferrer">Wine Club</a>
          <a href={`${SITE}/Events`} target="_blank" rel="noopener noreferrer">Events</a>
          <a href={`${SITE}/Recipes`} target="_blank" rel="noopener noreferrer">Recipes</a>
          <a href={`${SITE}/About-Us/Trade--Press`} target="_blank" rel="noopener noreferrer">Trade &amp; Press</a>
          <a href="https://www.facebook.com/CarlsonVineyards/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/carlsonvineyards/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <a className="footer-phone" href={PHONE_HREF}><Phone size={16} /> {PHONE}</a>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {COMPANY}. Please enjoy responsibly; 21+ only. Independent concept · not for official use. Current site: <a href={ORIGINAL}>carlsonvineyards.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Visit />
        <Wines />
        <Reviews />
        <Club />
        <Story />
        <WrenQuinn />
        <Press />
        <Contact />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
