"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { SITE_NAME, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants"
import { useLang } from "@/components/providers/LangProvider"
 
export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [activeSection, setActive]    = useState("hero")
  const [dark, setDark]               = useState(true)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string|null>(null)
  const { lang, setLang, t } = useLang()
 
  const navItems = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.contact, href: "#contact" },
  ]
 
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = ["hero","about","services","work","skills","contact"]
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(id); break }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
 
  // Ferme le menu si on clique en dehors
  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (menuOpen && !target.closest("#mobile-menu") && !target.closest("#burger")) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [menuOpen])
 
  return (
    <>
      <style>{`
        /* Underline slide-in/out sur les liens nav */
        .nav-link-line {
          position: absolute;
          bottom: -3px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          height: 2px; width: 70%;
          background: #00e676;
          border-radius: 2px;
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1),
                      opacity  0.28s ease;
          opacity: 0;
        }
        .nav-link:hover .nav-link-line,
        .nav-link.active .nav-link-line {
          transform: translateX(-50%) scaleX(1);
          opacity: 1;
        }
        .nav-link { position: relative; }
        .nav-link span.label {
          transition: color 0.22s ease;
        }
        .nav-link:hover span.label { color: #00e676 !important; }
 
        /* Menu mobile slide-down */
        @keyframes slideDown {
          from { opacity:0; transform: translateY(-12px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity:1; transform: translateY(0); }
          to   { opacity:0; transform: translateY(-12px); }
        }
 
        /* Burger lines */
        .burger-line {
          display: block; width: 22px; height: 2px;
          background: #8b949e; border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .burger-open .burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); background:#00e676; }
        .burger-open .burger-line:nth-child(2) { opacity:0; transform: scaleX(0); }
        .burger-open .burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background:#00e676; }
 
        /* Mobile link hover */
        .mobile-link { transition: all 0.2s ease; }
        .mobile-link:hover { color: #00e676 !important; padding-left: 24px !important; }
        .mobile-link::before {
          content:''; position:absolute; left:0; top:50%;
          transform:translateY(-50%) scaleX(0);
          width:3px; height:60%; background:#00e676; border-radius:2px;
          transition: transform 0.2s ease;
        }
        .mobile-link:hover::before { transform:translateY(-50%) scaleX(1); }
      `}</style>
 
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        padding:"0 48px", height:77,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(13,17,23,0.80)" : "transparent",
        backdropFilter: scrolled ? "blur(4px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition:"all 0.35s ease",
      }}>
 
        {/* Logo */}
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",zIndex:10}}>
          <svg width="38" height="38" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="14" fill="#0d1117"/>
            <rect x="8" y="14" width="3" height="36" rx="1.5" fill="#00e676"/>
            <text x="13" y="46" fontFamily="Inter,system-ui,sans-serif" fontSize="30" fontWeight="800" fill="#ffffff" letterSpacing="-1">B</text>
            <text x="34" y="46" fontFamily="Inter,system-ui,sans-serif" fontSize="30" fontWeight="800" fill="#00e676" letterSpacing="-1">M</text>
            <circle cx="56" cy="52" r="3" fill="#00e676" opacity="0.8"/>
          </svg>
          <span style={{fontWeight:700,color:"#fff",fontSize:16}}>{SITE_NAME}</span>
        </Link>
 
        {/* ── Desktop nav ── */}
        <div className="desktop-nav" style={{display:"flex",gap:4,alignItems:"center"}}>
          {navItems.map(link => {
            const id = link.href.replace("#","")
            const isActive = activeSection === id
            return (
              <Link
                key={link.label} href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
                style={{
                  fontSize:15, fontWeight:700,
                  textDecoration:"none", padding:"8px 14px",
                  display:"block",
                }}
              >
                <span className="label" style={{color: isActive ? "#00e676" : "#8b949e"}}>
                  {link.label}
                </span>
                <span className="nav-link-line" />
              </Link>
            )
          })}
        </div>
 
        {/* ── Droite : lang + dark + CTA + burger ── */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
 
          {/* Langue */}
          <button onClick={()=>setLang(lang==="FR"?"EN":"FR")} style={{
            display:"flex",alignItems:"center",gap:6,
            padding:"6px 12px",borderRadius:50,
            border:"1px solid rgba(255,255,255,0.12)",
            background:"transparent",color:"#8b949e",
            fontSize:12,fontWeight:600,cursor:"pointer",
            transition:"all 0.2s",letterSpacing:"0.05em",
          }}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.cssText+="border-color:#00e676;color:#00e676;"}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,0.12)";(e.currentTarget as HTMLButtonElement).style.color="#8b949e"}}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {lang}
          </button>
 
          {/* Dark/Light */}
          {/* <button onClick={()=>setDark(d=>!d)} style={{
            width:36,height:36,borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.12)",
            background:"transparent",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",
            transition:"all 0.2s",color:"#8b949e",
          }}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="#00e676";(e.currentTarget as HTMLButtonElement).style.color="#00e676"}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,0.12)";(e.currentTarget as HTMLButtonElement).style.color="#8b949e"}}
          >
            {dark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            )}
          </button> */}
 
          {/* CTA — caché sur mobile */}
          <Link href="#contact" className="cta-btn" style={{
            padding:"8px 20px",
            border:"1px solid #00e676",borderRadius:6,
            color:"#00e676",fontSize:12,fontWeight:700,
            textDecoration:"none",letterSpacing:"0.08em",
            textTransform:"uppercase",transition:"all 0.25s ease", borderRadius:50,
          }}
            onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background="#00e676";(e.currentTarget as HTMLAnchorElement).style.color="#000"}}
            onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background="transparent";(e.currentTarget as HTMLAnchorElement).style.color="#00e676"}}
          >
            {t.nav.cta}
          </Link>
 
          {/* ── Burger (mobile only) ── */}
          <button
            id="burger"
            onClick={()=>setMenuOpen(o=>!o)}
            className={menuOpen ? "burger-open" : ""}
            style={{
              display:"none",
              flexDirection:"column",gap:5,
              background:"transparent",border:"none",cursor:"pointer",padding:4,
              zIndex:10,
            }}
          >
            <span className="burger-line"/>
            <span className="burger-line"/>
            <span className="burger-line"/>
          </button>
        </div>
      </nav>
 
      {/* ── Menu mobile ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            position:"fixed", top:68, left:0, right:0, zIndex:999,
            background:"rgba(13,17,23,0.97)",
            backdropFilter:"blur(24px)",
            borderBottom:"1px solid rgba(0,230,118,0.12)",
            padding:"16px 0 24px",
            animation:"slideDown 0.3s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        >
          {navItems.map((link, i) => {
            const id = link.href.replace("#","")
            const isActive = activeSection === id
            return (
              <Link
                key={link.label} href={link.href}
                onClick={()=>setMenuOpen(false)}
                className="mobile-link"
                style={{
                  display:"block", position:"relative",
                  padding:"14px 32px",
                  fontSize:15, fontWeight:500,
                  textDecoration:"none",
                  color: isActive ? "#00e676" : "#c9d1d9",
                  borderLeft: isActive ? "3px solid #00e676" : "3px solid transparent",
                  transition:"all 0.2s ease",
                  animationDelay:`${i*40}ms`,
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    marginLeft:8, fontSize:11, color:"#00e676",
                    background:"rgba(0,230,118,0.1)",
                    padding:"2px 8px", borderRadius:20,
                  }}>{t.nav.active}</span>
                )}
              </Link>
            )
          })}
 
          {/* Séparateur */}
          <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"12px 32px"}}/>
 
          {/* Boutons bas de menu mobile */}
          <div className="mobile-bottom-actions" style={{display:"flex",gap:12,padding:"0 32px"}}>
            <button className="mobile-lang-btn" onClick={()=>{setLang(lang==="FR"?"EN":"FR");setMenuOpen(false)}} style={{
              flex:1,padding:"10px",borderRadius:50,
              border:"1px solid rgba(255,255,255,0.12)",
              background:"transparent",color:"#8b949e",fontSize:13,cursor:"pointer",
            }}>
              {lang==="FR"?"🌐 EN":"🌐 FR"}
            </button>
            <Link className="mobile-cta-btn" href="#contact" onClick={()=>setMenuOpen(false)} style={{
              flex:2,padding:"10px",borderRadius:6,
              background:"#00e676",color:"#000",
              textDecoration:"none",fontSize:13,fontWeight:700,
              textAlign:"center",letterSpacing:"0.05em",
            }}>
              {t.nav.cta}
            </Link>
          </div>
        </div>
      )}
 
      {/* CSS responsive */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .cta-btn     { display: none !important; }
          #burger      { display: flex !important; }
          nav          { padding: 0 20px !important; }
          .mobile-bottom-actions {
            display: grid !important;
            grid-template-columns: 1fr 1.4fr;
            align-items: stretch;
            gap: 10px !important;
            padding: 0 20px !important;
          }
          .mobile-lang-btn,
          .mobile-cta-btn {
            min-height: 44px;
            border-radius: 999px !important;
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            font-size: 12px !important;
            letter-spacing: 0.06em;
            transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          }
          .mobile-lang-btn {
            border: 1px solid rgba(0,230,118,0.35) !important;
            color: #00e676 !important;
            background: rgba(0,230,118,0.08) !important;
            font-weight: 700;
          }
          .mobile-cta-btn {
            background: linear-gradient(135deg, #00e676, #21f78a) !important;
            color: #05150c !important;
            box-shadow: 0 8px 18px rgba(0,230,118,0.25);
            font-weight: 800 !important;
            text-transform: uppercase;
          }
          .mobile-lang-btn:active,
          .mobile-cta-btn:active {
            transform: translateY(1px);
          }
        }
        @media (min-width: 769px) {
          #burger      { display: none !important; }
        }
      `}</style>
    </>
  )
}