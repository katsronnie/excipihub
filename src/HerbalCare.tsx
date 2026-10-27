import { useEffect, useMemo, useState, type ReactNode } from "react";

interface Supplier {
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  responseTime: string;
}

interface Product {
  id: number;
  name: string;
  benefit: string;
  description: string;
  price: number;
  category: string;
  image: string;
  gallery: string[];
  supplier: Supplier;
}

const CATEGORIES = [
  "Immune Support", "Digestive Health", "Respiratory Care", "Pain Relief", "Men's Health",
  "Women's Health", "Skin Care", "Stress & Relaxation", "General Wellness",
] as const;

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Moringa Capsules",
    benefit: "Boosts immunity & energy",
    description: "Moringa is a nutrient-rich leaf packed with vitamins, minerals, and antioxidants that support energy, stamina, and daily immune defense.",
    price: 25000,
    category: "Immune Support",
    image: "/images/moringa.png",
    gallery: ["/images/moringa.png", "/images/hero.png", "/images/black-seed.png", "/images/garlic.png"],
    supplier: {
      name: "Sarah Nakato",
      company: "Green Valley Herbs Ltd.",
      phone: "+256 772 111 222",
      email: "sales@greenvalleyherbs.ug",
      location: "Kampala, Uganda",
      responseTime: "Replies within 30 minutes",
    },
  },
  {
    id: 2,
    name: "Artemisia Tea",
    benefit: "Fights malaria & boosts immunity",
    description: "This herbal tea combines tradition with wellness, helping support the body’s natural defenses and promoting comfort during busy or demanding days.",
    price: 18000,
    category: "Immune Support",
    image: "/images/artemisia.png",
    gallery: ["/images/artemisia.png", "/images/lemon-balm.png", "/images/moringa.png"],
    supplier: {
      name: "Joseph Kabuye",
      company: "Atlas Botanicals",
      phone: "+256 701 324 980",
      email: "hello@atlasbotanicals.ug",
      location: "Masaka, Uganda",
      responseTime: "Replies within 1 hour",
    },
  },
  {
    id: 3,
    name: "Ginger Capsules",
    benefit: "Relieves nausea & improves digestion",
    description: "A gentle digestive aid designed to reduce nausea and support a calmer, healthier stomach after meals or during travel.",
    price: 20000,
    category: "Digestive Health",
    image: "/images/ginger.png",
    gallery: ["/images/ginger.png", "/images/hero.png", "/images/turmeric.png"],
    supplier: {
      name: "Martha Lwasa",
      company: "WellRoot Organics",
      phone: "+256 759 877 221",
      email: "care@wellrootorganics.ug",
      location: "Jinja, Uganda",
      responseTime: "Replies within 45 minutes",
    },
  },
  {
    id: 4,
    name: "Echinacea Tincture",
    benefit: "Supports immune system",
    description: "Echinacea tincture is valued for its immune-supporting profile and is often used during seasonal change and high-demand weeks.",
    price: 22000,
    category: "Immune Support",
    image: "/images/echinacea.png",
    gallery: ["/images/echinacea.png", "/images/moringa.png", "/images/black-seed.png"],
    supplier: {
      name: "Anita Lund",
      company: "Sunrise Herbal Co.",
      phone: "+256 788 888 005",
      email: "orders@sunriseherbal.co.ug",
      location: "Entebbe, Uganda",
      responseTime: "Replies within 2 hours",
    },
  },
  {
    id: 5,
    name: "Turmeric Powder",
    benefit: "Reduces inflammation & pain",
    description: "Curcumin-rich turmeric helps support joint comfort, a healthy inflammatory response, and overall wellness in daily routines.",
    price: 15000,
    category: "Pain Relief",
    image: "/images/turmeric.png",
    gallery: ["/images/turmeric.png", "/images/joint-balm.png", "/images/hero.png"],
    supplier: {
      name: "Derrick Mutebi",
      company: "Harvest & Bloom Ltd.",
      phone: "+256 774 432 911",
      email: "support@harvestbloom.ug",
      location: "Mbale, Uganda",
      responseTime: "Replies within 1 hour",
    },
  },
  {
    id: 6,
    name: "Balm for Joint Pain",
    benefit: "Relieves joint & muscle pain",
    description: "This warming herbal balm is crafted to soothe sore muscles and stiff joints after exercise, long workdays, or everyday movement.",
    price: 28000,
    category: "Pain Relief",
    image: "/images/joint-balm.png",
    gallery: ["/images/joint-balm.png", "/images/turmeric.png", "/images/garlic.png"],
    supplier: {
      name: "Beatrice Auma",
      company: "VitaHerb Care",
      phone: "+256 703 555 117",
      email: "ops@vitaherbcare.ug",
      location: "Arua, Uganda",
      responseTime: "Replies within 30 minutes",
    },
  },
  {
    id: 7,
    name: "Senna Leaves",
    benefit: "Relieves constipation",
    description: "A traditional digestive support ingredient used to encourage regular bowel movement and ease occasional constipation gently.",
    price: 12000,
    category: "Digestive Health",
    image: "/images/senna.png",
    gallery: ["/images/senna.png", "/images/ginger.png", "/images/hero.png"],
    supplier: {
      name: "John Kizza",
      company: "Nature Source Uganda",
      phone: "+256 782 222 440",
      email: "info@naturesourceug.com",
      location: "Fort Portal, Uganda",
      responseTime: "Replies within 2 hours",
    },
  },
  {
    id: 8,
    name: "Garlic Capsules",
    benefit: "Supports heart health",
    description: "Garlic is known for its heart-friendly profile and is a simple way to support circulation and overall cardiovascular wellbeing.",
    price: 17000,
    category: "General Wellness",
    image: "/images/garlic.png",
    gallery: ["/images/garlic.png", "/images/moringa.png", "/images/lemon-balm.png"],
    supplier: {
      name: "Patricia Ssebulime",
      company: "Pure Leaf Uganda",
      phone: "+256 794 609 401",
      email: "buy@pureleafug.com",
      location: "Gulu, Uganda",
      responseTime: "Replies within 1 hour",
    },
  },
  {
    id: 9,
    name: "Black Seed Oil",
    benefit: "Boosts immunity & overall health",
    description: "Black seed oil is a time-tested herbal remedy with a rich profile that supports immunity, daily vitality, and a balanced wellness routine.",
    price: 30000,
    category: "General Wellness",
    image: "/images/black-seed.png",
    gallery: ["/images/black-seed.png", "/images/echinacea.png", "/images/hero.png"],
    supplier: {
      name: "Hassan Okello",
      company: "Midland Herbal Supply",
      phone: "+256 712 890 765",
      email: "orders@midlandherbal.ug",
      location: "Lira, Uganda",
      responseTime: "Replies within 20 minutes",
    },
  },
  {
    id: 10,
    name: "Lemon Balm Tea",
    benefit: "Calms mind & reduces stress",
    description: "Slow down with a comforting lemon balm tea that helps support relaxation, emotional balance, and a calmer evening routine.",
    price: 16000,
    category: "Stress & Relaxation",
    image: "/images/lemon-balm.png",
    gallery: ["/images/lemon-balm.png", "/images/artemisia.png", "/images/black-seed.png"],
    supplier: {
      name: "Grace Nansubuga",
      company: "Calm Valley Wellness",
      phone: "+256 750 234 899",
      email: "hello@calmvalleywellness.ug",
      location: "Mbarara, Uganda",
      responseTime: "Replies within 40 minutes",
    },
  },
];

const ugx = (n: number) => `UGX ${n.toLocaleString("en-US")}`;

function Icon({ children, size = 24 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const LeafIcon = ({ size }: { size?: number }) => <Icon size={size}><path d="M5 19c0-8 5-14 15-15 0 10-5 15-13 15" /><path d="M5 19c3-5 6-8 10-10" /></Icon>;
const SearchIcon = () => <Icon><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></Icon>;
const UserIcon = () => <Icon size={28}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></Icon>;
const ChevronIcon = () => <Icon size={16}><path d="m9 6 6 6-6 6" /></Icon>;
const ArrowIcon = () => <Icon size={18}><path d="M4 12h16M14 6l6 6-6 6" /></Icon>;
const TruckIcon = () => <Icon size={30}><path d="M2 6h12v10H2zM14 10h4l4 3v3h-8" /><circle cx="7" cy="18" r="1.8" /><circle cx="18" cy="18" r="1.8" /></Icon>;
const ShieldIcon = () => <Icon size={30}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></Icon>;
const HeadsetIcon = () => <Icon size={30}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></Icon>;

const css = `
:root{--g:#0b7a35;--g-d:#085c28;--g-l:#e6f0e2;--ink:#12361f;--muted:#5d6d62;--line:#dfe6df;--bg:#f8fbf7;--card:#fff;--soft:#f3f8f2}
a,button{transition:all .2s ease}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:'Segoe UI',system-ui,-apple-system,sans-serif}
img{display:block;max-width:100%}
button,input{font:inherit}
button{cursor:pointer}
a{text-decoration:none}
:focus-visible{outline:3px solid #f2b705;outline-offset:2px}
.wrap{max-width:1400px;margin:0 auto;padding:0 16px}
.hc-top{display:flex;align-items:center;gap:28px;padding:14px 0}
.brand{display:flex;align-items:center;gap:10px;color:var(--g);text-decoration:none}
.logo{height:80px;width:auto;mix-blend-mode:multiply;display:block}
.hc-search{flex:1;display:flex;max-width:640px;margin:0 auto;border:1.5px solid var(--line);border-radius:8px;overflow:hidden;background:#fff}
.hc-search input{flex:1;border:0;padding:12px 18px;font-size:16px;min-width:0;background:transparent}
.hc-search button{background:var(--g);color:#fff;border:0;width:62px;display:grid;place-items:center}
.acts{display:flex;align-items:center;gap:28px}
.act{display:flex;align-items:center;gap:10px;background:none;border:0;font-weight:600;color:var(--ink)}
nav.hc-nav{background:var(--g);color:#fff}
nav.hc-nav .wrap{display:flex;align-items:center}
nav.hc-nav a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;padding:16px 30px}
nav.hc-nav a.on{background:#17a14a;border-radius:8px;margin:5px 0}
.deliv{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:14px}
.deliv strong{display:block;font-size:16px}
.main{display:grid;grid-template-columns:250px 1fr;gap:18px;margin-top:14px}
.side{background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 10px;align-self:start}
.side h2{display:flex;align-items:center;gap:10px;font-size:20px;margin:6px 10px 10px;color:var(--ink)}
.cat{display:flex;align-items:center;gap:14px;width:100%;background:none;border:0;border-radius:8px;padding:12px 10px;text-align:left;color:var(--ink);font-size:15px}
.cat svg:first-child{color:var(--g)}
.cat .chev{margin-left:auto;color:var(--muted)}
.cat:hover,.cat[aria-pressed=true]{background:var(--g-l)}
.cat[aria-pressed=true]{font-weight:700}
.hero{display:grid;grid-template-columns:1fr 290px;border-radius:12px;overflow:hidden;background:var(--g-l)}
.hero-l{position:relative;min-height:280px;padding:22px 30px;background:radial-gradient(circle at 78% 55%,#c7dfa8 0,#e5efd7 45%,#f1f6ea 100%)}
.hero-l h1{font-size:clamp(30px,4.2vw,50px);line-height:1.02;margin:0 0 12px;max-width:9.5em;color:#0b4a1f;font-weight:800}
.hero-l p{margin:0 0 20px;color:var(--g);font-size:20px;font-weight:500}
.hero-art{position:absolute;right:0;top:0;height:100%;width:62%;object-fit:cover;object-position:left center;pointer-events:none;-webkit-mask-image:linear-gradient(to right,transparent,#000 22%);mask-image:linear-gradient(to right,transparent,#000 22%)}
.hero-l h1,.hero-l p,.shop-now{position:relative;z-index:1}
.shop-now{display:inline-flex;align-items:center;gap:10px;background:var(--g);color:#fff;border:0;border-radius:10px;padding:13px 26px;font-size:20px;font-weight:600}
.shop-now:hover,.add:hover,.primary-btn:hover,.secondary-btn:hover,.back-btn:hover{filter:brightness(.96)}
.perks{padding:20px 26px;display:flex;flex-direction:column;justify-content:space-around;gap:10px}
.perk{display:flex;align-items:center;gap:14px;font-size:19px;font-weight:600;line-height:1.2;color:#1a3d26}
.perk i{flex:none;width:54px;height:54px;border-radius:50%;background:var(--g);color:#fff;display:grid;place-items:center}
.sec-h{display:flex;justify-content:space-between;align-items:center;margin:20px 0 10px}
.sec-h h2{margin:0;font-size:22px}
.sec-h button{display:flex;align-items:center;gap:6px;background:none;border:0;color:var(--g);font-weight:600}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.card{background:#fff;border:1px solid var(--line);border-radius:6px;padding:5px;display:flex;flex-direction:column}
.pic{width:100%;height:130px;border-radius:4px;object-fit:cover;display:block}
.card h3{font-size:14.5px;margin:10px 6px 2px}
.card p{font-size:12.5px;color:var(--muted);margin:0 6px;min-height:34px}
.price{font-weight:700;color:var(--g-d);font-size:15px;margin:6px 6px 8px}
.add{margin:auto 6px 6px;background:var(--g);color:#fff;border:0;border-radius:4px;padding:8px;font-size:13px;font-weight:600}
.empty{grid-column:1/-1;padding:30px;border:1.5px dashed var(--line);border-radius:8px;color:var(--muted);background:#fff}
.trust{margin-top:22px;background:var(--g-l);border-top:1px solid var(--line)}
.trust .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:18px 16px}
.t{display:flex;align-items:center;gap:14px;color:var(--g)}
.t strong{display:block;color:var(--ink);font-size:15px}
.t span{font-size:13px;color:var(--muted)}
.detail-page{padding:20px 0 40px}
.detail-header{display:flex;align-items:center;justify-content:space-between;gap:18px;padding-bottom:14px}
.back-btn{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--line);color:var(--ink);padding:10px 16px;border-radius:999px;font-weight:600}
.detail-shell{display:grid;grid-template-columns:1.1fr 1fr;gap:26px;padding-top:10px}
.detail-gallery{background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:0 12px 28px rgba(14,53,27,.06)}
.detail-main{width:100%;height:420px;object-fit:cover;border-radius:12px;background:var(--soft)}
.thumb-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:12px}
.thumb{padding:0;border:2px solid transparent;border-radius:10px;overflow:hidden;background:#fff;aspect-ratio:1/1}
.thumb.active{border-color:var(--g)}
.thumb img{width:100%;height:100%;object-fit:cover}
.detail-info{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px;box-shadow:0 12px 28px rgba(14,53,27,.06)}
.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:11px;font-weight:700;color:var(--g);margin:0 0 12px}
.detail-info h1{margin:0;font-size:clamp(2rem,3vw,3rem);color:var(--ink)}
.detail-price{margin-top:16px;font-size:2rem;font-weight:800;color:var(--g-d)}
.detail-description{margin:18px 0 0;color:var(--muted);font-size:1.05rem;line-height:1.7}
.detail-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
.primary-btn,.secondary-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:10px;padding:14px 18px;font-weight:700}
.primary-btn{background:var(--g);color:#fff}
.secondary-btn{background:var(--g-l);color:var(--ink);border:1px solid var(--line)}
.supplier-panel{margin-top:28px;border-top:1px solid var(--line);padding-top:22px}
.supplier-panel h2{margin:0 0 16px;font-size:1.3rem}
.supplier-panel ul{list-style:none;padding:0;margin:0;display:grid;gap:12px}
.supplier-panel li{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--soft)}
.supplier-panel li span{color:var(--muted)}
.supplier-panel li strong{color:var(--ink);text-align:right}
@media(max-width:1100px){.grid{grid-template-columns:repeat(3,1fr)}.hero{grid-template-columns:1fr}.perks{flex-direction:row;flex-wrap:wrap}.detail-shell{grid-template-columns:1fr}}
@media(max-width:820px){.main{grid-template-columns:1fr}.hc-top{flex-wrap:wrap;gap:14px}.hc-search{order:3;flex-basis:100%;max-width:none}.acts{margin-left:auto}.deliv{display:none}.grid{grid-template-columns:repeat(2,1fr)}.trust .wrap{grid-template-columns:repeat(2,1fr)}.hero-art{width:50%;opacity:.55}nav.hc-nav a{padding:14px 16px;font-size:16px}.side{display:none}.detail-main{height:320px}.detail-header{flex-wrap:wrap}} 
@media(max-width:480px){.logo{height:56px}.act span{display:none}.thumb-row{grid-template-columns:repeat(2,minmax(0,1fr))}.detail-actions{flex-direction:column}.primary-btn,.secondary-btn{width:100%}}
`;

export default function HerbalCare() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) => (!category || p.category === category) && (!q || `${p.name} ${p.benefit}`.toLowerCase().includes(q))
    );
  }, [query, category]);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) ?? null;

  useEffect(() => {
    setActiveImage(0);
  }, [selectedProductId]);

  const jumpToProducts = () => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });

  if (selectedProduct) {
    return (
      <>
        <style>{css}</style>
        <div className="detail-page">
          <header className="wrap detail-header">
            <button className="back-btn" type="button" onClick={() => setSelectedProductId(null)}>
              <ArrowIcon /> Back to products
            </button>
            <a className="brand" href="#top" aria-label="HerbalCare home">
              <img className="logo" src="/images/logo.png" alt="HerbalCare, Natural Healing, Better Living" />
            </a>
          </header>

          <main className="wrap detail-shell">
            <section className="detail-gallery">
              <img className="detail-main" src={selectedProduct.gallery[activeImage] ?? selectedProduct.gallery[0]} alt={selectedProduct.name} />
              <div className="thumb-row">
                {selectedProduct.gallery.slice(0, 5).map((image, index) => (
                  <button
                    key={`${selectedProduct.id}-${index}`}
                    type="button"
                    className={`thumb ${index === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img src={image} alt={`${selectedProduct.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            </section>

            <section className="detail-info">
              <p className="eyebrow">{selectedProduct.category}</p>
              <h1>{selectedProduct.name}</h1>
              <div className="detail-price">{ugx(selectedProduct.price)}</div>
              <p className="detail-description">{selectedProduct.description}</p>

              <div className="detail-actions">
                <a
                  className="primary-btn"
                  href={`mailto:${selectedProduct.supplier.email}?subject=${encodeURIComponent(`Enquiry about ${selectedProduct.name}`)}&body=${encodeURIComponent(`Hello ${selectedProduct.supplier.name},\n\nI am interested in ${selectedProduct.name}. Please share availability and ordering details.\n\nThank you.`)}`}
                >
                  Contact Supplier
                </a>
                <a className="secondary-btn" href={`tel:${selectedProduct.supplier.phone.replace(/\s+/g, "")}`}>
                  Call Supplier
                </a>
              </div>

              <div className="supplier-panel">
                <h2>Supplier details</h2>
                <ul>
                  <li><span>Supplier</span><strong>{selectedProduct.supplier.company}</strong></li>
                  <li><span>Contact person</span><strong>{selectedProduct.supplier.name}</strong></li>
                  <li><span>Phone</span><strong>{selectedProduct.supplier.phone}</strong></li>
                  <li><span>Email</span><strong>{selectedProduct.supplier.email}</strong></li>
                  <li><span>Location</span><strong>{selectedProduct.supplier.location}</strong></li>
                  <li><span>Response time</span><strong>{selectedProduct.supplier.responseTime}</strong></li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      <header className="wrap hc-top">
        <a className="brand" href="#top" aria-label="HerbalCare home">
          <img className="logo" src="/images/logo.png" alt="HerbalCare, Natural Healing, Better Living" />
        </a>
        <form className="hc-search" role="search" onSubmit={(e) => { e.preventDefault(); jumpToProducts(); }}>
          <input aria-label="Search for herbal medicines" placeholder="Search for herbal medicines..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" aria-label="Search"><SearchIcon /></button>
        </form>
        <div className="acts">
          <button className="act" type="button"><UserIcon /><span>Login / Register</span></button>
        </div>
      </header>

      <nav className="hc-nav" aria-label="Main">
        <div className="wrap">
          <a className="on" href="#top" onClick={() => { setCategory(null); setQuery(""); }}>Home</a>
          <a href="#featured">Shop</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <div className="deliv"><TruckIcon /><div><strong>Fast &amp; Reliable Delivery</strong>Across the country</div></div>
        </div>
      </nav>

      <div className="wrap main" id="top">
        <aside className="side" aria-label="Shop by category">
          <h2><LeafIcon size={26} />Shop by Category</h2>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="cat" aria-pressed={category === c} onClick={() => { setCategory(category === c ? null : c); jumpToProducts(); }}>
              <LeafIcon size={22} /><span>{c}</span><span className="chev"><ChevronIcon /></span>
            </button>
          ))}
        </aside>

        <main>
          <section className="hero">
            <div className="hero-l">
              <h1>Nature's Medicine for a Healthier You</h1>
              <p>Pure &nbsp;•&nbsp; Natural &nbsp;•&nbsp; Effective</p>
              <button className="shop-now" type="button" onClick={jumpToProducts}>Shop Now <ArrowIcon /></button>
              <img className="hero-art" src="/images/hero.png" alt="" />
            </div>
            <div className="perks">
              <div className="perk"><i><LeafIcon size={28} /></i>100% Natural Ingredients</div>
              <div className="perk"><i><ShieldIcon /></i>Safe &amp; Trusted</div>
              <div className="perk"><i><LeafIcon size={28} /></i>Supports Your Wellbeing</div>
            </div>
          </section>

          <section id="featured">
            <div className="sec-h">
              <h2>{category ?? "Featured Herbal Medicines"}</h2>
              <button type="button" onClick={() => { setCategory(null); setQuery(""); }}>View All <ArrowIcon /></button>
            </div>
            <div className="grid">
              {visible.length === 0 && <div className="empty">No products match your search. Clear the search or choose another category.</div>}
              {visible.map((p) => (
                <article className="card" key={p.id}>
                  <img className="pic" src={p.image} alt={p.name} loading="lazy" />
                  <h3>{p.name}</h3>
                  <p>{p.benefit}</p>
                  <div className="price">{ugx(p.price)}</div>
                  <button className="add" type="button" onClick={() => setSelectedProductId(p.id)}>Contact Supplier</button>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="trust" id="contact">
        <div className="wrap">
          <div className="t"><TruckIcon /><div><strong>Free Delivery</strong><span>on orders over UGX 100,000</span></div></div>
          <div className="t"><ShieldIcon /><div><strong>Secure Payments</strong><span>Mobile Money &amp; Card</span></div></div>
          <div className="t"><LeafIcon size={30} /><div><strong>100% Natural</strong><span>Herbal Products</span></div></div>
          <div className="t"><HeadsetIcon /><div><strong>Customer Support</strong><span>+256 700 123 456</span></div></div>
        </div>
      </footer>
    </>
  );
}
