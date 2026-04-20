"use client"
import { useEffect, useState } from "react"
import FloatingShapes from "@/components/animations/FloatingShapes"
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"
 
/* ── Typer Effect ─────────────────────────────────────── */
function useTyper(words: string[], speed = 75, pause = 2000) {
  const [display, setDisplay]   = useState("")
  const [wordIdx, setWordIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)
 
  useEffect(() => {
    const current = words[wordIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(i=>i+1) }, speed)
    } else if (!deleting && charIdx > current.length) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { setDisplay(current.slice(0, charIdx-1)); setCharIdx(i=>i-1) }, speed/2)
    } else {
      t = setTimeout(() => {
        setDeleting(false)
        setWordIdx(i => (i + 1) % words.length)
      }, 2000)
    }
    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words, speed, pause])
 
  return display
}
 
/* ── Bouton social border-radius 50 ─────────────────── */
function SocialBtn({ href, icon }: { href: string; icon: "github"|"linkedin" }) {
  const [h, setH] = useState(false)
  return (
    <Link href={href} target="_blank"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        width:46, height:46,
        borderRadius:"50%",          // border-radius 50 comme demandé
        border:`1.5px solid ${h ? "#00e676" : "rgba(255,255,255,0.12)"}`,
        background: h ? "rgba(0,230,118,0.1)" : "transparent",
        display:"flex", alignItems:"center", justifyContent:"center",
        textDecoration:"none", color: h ? "#00e676" : "#8b949e",
        transition:"all 0.28s cubic-bezier(0.4,0,0.2,1)",
        transform: h ? "translateY(-4px) scale(1.08)" : "translateY(0) scale(1)",
        boxShadow: h ? "0 8px 20px rgba(0,230,118,0.2)" : "none",
      }}
    >
      {icon==="github" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )}
    </Link>
  )
}
 
/* ── ScrollIndicator animé ───────────────────────────── */
function ScrollIndicator({ label }: { label: string }) {
  return (
    <>
      <style>{`
        @keyframes scrollDrop {
          0%   { opacity:0; transform: translateY(-6px); }
          40%  { opacity:1; }
          80%  { opacity:0; transform: translateY(8px); }
          100% { opacity:0; transform: translateY(8px); }
        }
        @keyframes lineGrow {
          0%,100% { transform: scaleY(0.4); opacity:0.3; }
          50%      { transform: scaleY(1);   opacity:1; }
        }
        @keyframes chevronFall {
          0%   { opacity:0; transform: translateY(-4px); }
          50%  { opacity:1; }
          100% { opacity:0; transform: translateY(6px); }
        }
      `}</style>
 
      <div className="hero-scroll-indicator" style={{
        position:"absolute", bottom:1, left:"50%",
        transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:4,
        animation:"pageReveal 0.6s ease 1.4s both",
      }}>
        {/* Souris SVG animée */}
        <div style={{
          width:22, height:34,
          borderRadius:11,
          border:"1.5px solid rgba(0,230,118,0.4)",
          display:"flex", justifyContent:"center",
          paddingTop:5,
          marginBottom:4,
        }}>
          {/* Dot qui descend dans la souris */}
          <div style={{
            width:3, height:6, borderRadius:2,
            background:"#00e676",
            animation:"scrollDrop 1.8s ease-in-out infinite",
          }}/>
        </div>
 
        {/* Ligne verticale pulsée */}
        <div style={{
          width:1, height:28,
          background:"#00e676",
          transformOrigin:"top",
          animation:"lineGrow 1.8s ease-in-out infinite",
          opacity:0.5,
        }}/>
 
        {/* Chevrons qui tombent un par un */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:1 }}>
          {[0,1,2].map(i => (
            <svg key={i} width="12" height="7" viewBox="0 0 12 7" fill="none"
              style={{ animation:`chevronFall 1.8s ease-in-out ${i*0.2}s infinite` }}>
              <path d="M1 1l5 5 5-5" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ))}
        </div>
 
        <p style={{
          fontSize:9, color:"#8b949e",
          letterSpacing:"0.15em", textTransform:"uppercase",
          marginTop:4,
        }}>{label}</p>
      </div>
    </>
  )
}
 
/* ── Hero principal ──────────────────────────────────── */
export default function Hero() {
  const { t } = useLang()
  const typed   = useTyper([...t.hero.typed], 100, 1000)
  const [cvH, setCvH]   = useState(false)
  const [imgH, setImgH] = useState(false)
 
  return (
    <section id="hero" className="hero-section" style={{
      position:"relative", minHeight:"90vh",
      background:"#0d1117",
      display:"flex", alignItems:"center",
      padding:"80px 80px 0", overflow:"hidden",
    }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto !important;
            padding: 108px 20px 36px !important;
          }
          .hero-content {
            gap: 28px !important;
            justify-content: center !important;
          }
          .hero-left {
            min-width: 100% !important;
            max-width: 100% !important;
            text-align: center;
          }
          .hero-left p {
            max-width: 100% !important;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-photo-wrap {
            display: none !important;
          }
          .hero-photo-card {
            width: 220px !important;
            height: 290px !important;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
      <FloatingShapes variant="hero"/>
 
      <div className="hero-content" style={{
        position:"relative", zIndex:2,
        display:"flex", alignItems:"center",
        justifyContent:"space-between",
        width:"100%", gap:60,
        flexWrap:"wrap",
      }}>
 
        {/* ── Gauche ── */}
        <div className="hero-left" style={{ flex:1, minWidth:280, maxWidth:540 }}>
 
          {/* Badge available */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            padding:"6px 16px", borderRadius:50,
            border:"1px solid rgba(0,230,118,0.35)",
            background:"rgba(0,230,118,0.06)",
            marginBottom:20,
            animation:"pageReveal 0.5s ease 0.1s both",
          }}>
            <span style={{
              width:7, height:7, borderRadius:"50%", background:"#00e676",
              animation:"ping 1.5s ease-in-out infinite",
              display:"inline-block",
            }}/>
            <span style={{ fontSize:12, color:"#00e676", fontWeight:500 }}>
              {t.hero.available}
            </span>
            <style>{`@keyframes ping{0%{box-shadow:0 0 0 0 rgba(0,230,118,.5)}70%{box-shadow:0 0 0 8px rgba(0,230,118,0)}100%{box-shadow:0 0 0 0 rgba(0,230,118,0)}}`}</style>
          </div>
 
          <p style={{
            fontSize:13, fontWeight:500, letterSpacing:"0.12em",
            color:"#8b949e", textTransform:"uppercase", marginBottom:10,
            animation:"pageReveal 0.5s ease 0.2s both",
          }}>{t.hero.intro}</p>
 
          {/* Typer */}
          <h1 style={{
            fontSize:"clamp(30px,4.5vw,46px)",
            fontWeight:800, lineHeight:1.15, marginBottom:24,
            animation:"pageReveal 0.6s ease 0.3s both",
            minHeight:"1.4em",
          }}>
            <span style={{ color:"#00e676" }}>{typed}</span>
            <span style={{
              display:"inline-block", width:3, height:"0.8em",
              background:"#00e676", marginLeft:3, verticalAlign:"middle",
              animation:"blink 1s step-end infinite",
            }}/>
            <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
          </h1>
 
          <p style={{
            fontSize:15, color:"#8b949e", lineHeight:1.8,
            maxWidth:550, marginBottom:36,
            animation:"pageReveal 0.6s ease 0.5s both",
          }}>
            {t.hero.description}
          </p>
 
          {/* Boutons */}
          <div className="hero-actions" style={{
            display:"flex", gap:12, alignItems:"center", flexWrap:"wrap",
            animation:"pageReveal 0.6s ease 0.7s both",
          }}>
            <Link href={CV_URL}
              onMouseEnter={()=>setCvH(true)} onMouseLeave={()=>setCvH(false)}
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"12px 26px", borderRadius:50,
                border:"1.5px solid #00e676",
                background: cvH ? "#00e676" : "transparent",
                color: cvH ? "#000" : "#00e676",
                fontSize:13, fontWeight:700,
                textDecoration:"none", letterSpacing:"0.05em",
                transition:"all 0.28s cubic-bezier(0.4,0,0.2,1)",
                transform: cvH ? "translateY(-3px)" : "translateY(0)",
                boxShadow: cvH ? "0 10px 28px rgba(0,230,118,0.28)" : "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              {t.hero.downloadCv}
            </Link>
 
            <SocialBtn href={GITHUB_URL}   icon="github"   />
            <SocialBtn href={LINKEDIN_URL} icon="linkedin" />
          </div>
        </div>
 
        {/* ── Photo ── */}
        <div
          className="hero-photo-wrap"
          onMouseEnter={()=>setImgH(true)} onMouseLeave={()=>setImgH(false)}
          style={{
            position:"relative", flexShrink:0,
            animation:"pageReveal 0.8s ease 0.4s both",
          }}
        >
          {/* Cercle rotatif décoratif */}
          <div style={{
            position:"absolute", inset:-20, borderRadius:"50%",
            border:"1px dashed rgba(0,230,118,0.18)",
            animation:"spinSlow 28s linear infinite",
          }}/>
          {/* Halo vert */}
          <div style={{
            position:"absolute", top:"50%", left:"50%",
            width:310, height:310, borderRadius:"50%",
            background:"rgba(0,230,118,0.09)",
            transition:"all 0.4s ease",
            transform: imgH
              ? "translate(-50%,-50%) scale(1.1)"
              : "translate(-50%,-50%) scale(1)",
          }}/>
          {/* Image */}
          <div className="hero-photo-card" style={{
            position:"relative", zIndex:1,
            width:270, height:350,
            borderRadius:"50% 50% 50% 50% / 40% 40% 40% 40%",
            background:"#1c2333",
            border:`2px solid ${imgH ? "rgba(0,230,118,0.5)" : "rgba(0,230,118,0.2)"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            overflow:"hidden",
            transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
            transform: imgH ? "scale(1.05) translateY(-8px)" : "scale(1) translateY(0)",
            boxShadow: imgH
              ? "0 32px 64px rgba(0,230,118,0.18), 0 0 0 1px rgba(0,230,118,0.25)"
              : "none",
          }}>
            {/* <span style={{ fontSize:80, opacity:0.22 }}>👤</span> */}
            <img src="/images/i.jpeg" alt="Bienvenu" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </div>
      </div>
 
      {/* Scroll indicator vivant */}
      <ScrollIndicator label={t.hero.scroll} />
    </section>
  )
}