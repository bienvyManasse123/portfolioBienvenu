"use client"
import SectionTitle from "@/components/ui/SectionTitle"
import { useState } from "react"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import Button from "@/components/ui/Button"
import { STATS, EMAIL, CV_URL, ABOUT_ME_DESCRIPTION } from "@/lib/constants"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"
 
 
function HoverPhoto() {
  const [h, setH] = useState(false)
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ position: "relative", flexShrink: 0, minWidth: 260, minHeight: 400 }}
    >
      
      {/* Cercle rotatif pointillé — identique au Hero */}
      <div style={{
        position: "absolute", inset: -30, borderRadius: "50%",
        border: "1px dashed rgba(0,230,118,0.18)",
        animation: "spinSlow 28s linear infinite",
      }}/>

      

      {/* Halo vert qui grossit au hover */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 360, height: 360, borderRadius: "50%",
        background: "rgba(0,230,118,0.09)",
        transition: "all 0.4s ease",
        transform: h
          ? "translate(-50%,-50%) scale(1.1)"
          : "translate(-50%,-50%) scale(1)",
      }}/>

      {/* Photo */}
      <div style={{
        position: "relative", zIndex: 1,
        width: 280, height: 380,
        borderRadius: "50% 50% 50% 50% / 40% 40% 40% 40%",
        background: "#1c2333",
        border: `2px solid ${h ? "rgba(0,230,118,0.5)" : "rgba(0,230,118,0.2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: h ? "scale(1.05) translateY(-8px)" : "scale(1) translateY(0)",
        boxShadow: h
          ? "10px 42px 64px rgba(0,230,118,0.18), 0 0 10px 0 rgba(0,230,118,0.25)"
          : "none",
      }}>
        {/* <span style={{ fontSize: 80, opacity: 0.22 }}>👤</span> */}
        <img src="/images/i.jpeg" alt="Bienvenu" style={{width:"100%",height:"100%",objectFit:"cover"}} />
        {/* → remplace par : <img src="/images/photo.png" ... /> */}
      </div>
    </div>
  )
}

// ── Bouton About avec border-radius 50 et hover ───────────
function AboutBtn({
  href, variant, children,
}: { href: string; variant: "primary" | "outline"; children: React.ReactNode }) {
  const [h, setH] = useState(false)
  const isPrimary = variant === "primary"
  return (
    <Link
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "11px 26px", borderRadius: 50,          // border-radius 50 comme demandé
        border: "1.5px solid #00e676",
        background: isPrimary
          ? (h ? "#00e676" : "#00e676")
          : (h ? "rgba(0,230,118,0.1)" : "transparent"),
        color: isPrimary ? "#000" : (h ? "#00e676" : "#00e676"),
        fontSize: 13, fontWeight: 700,
        textDecoration: "none", letterSpacing: "0.05em",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        boxShadow: h
          ? isPrimary
            ? "0 10px 28px rgba(0,230,118,0.3)"
            : "0 6px 20px rgba(0,230,118,0.15)"
          : "none",
        opacity: isPrimary && h ? 0.9 : 1,
      }}
    >
      {children}
    </Link>
  )
}
 
export default function About() {
  const { t } = useLang()
  return (
    <section id="about" style={{
      position: "relative",
      background: "#161b22",
      padding: "30px 100px",
      // overflow: "hidden",   // important pour que les shapes ne débordent pas
    }}>
      {/* Shapes en background — variant dark2 pour les sections #161b22 */}
      {/* <FloatingShapes variant="dark2" opacity={0.7} /> */}
 
      <div style={{
        position: "relative", zIndex: 2,  // au-dessus des shapes
        display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap",
      }}>
 
        {/* Colonne gauche : photo + stats */}
        <FadeInView direction="left" style={{ flex: 1, minWidth: 280 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Photo avec hover */}
            <HoverPhoto />
 
            {/* Bulles de stats flottantes */}
            {STATS.map((stat, i) => {
              const positions = [
                { top: "8%",  right: -40 },
                { bottom: "22%", left: -40 },
                { bottom: "4%", right: -20 },
              ]
              return (
                <div key={stat.label} style={{
                  position: "absolute", ...positions[i],
                  background: "#0d1117",
                  border: "1px solid rgba(0,230,118,0.25)",
                  borderRadius: "50%",
                  width: 90, height: 90,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  zIndex: 3,
                }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#00e676" }}>{stat.value}</span>
                  <span style={{ fontSize: 9, color: "#8b949e", textAlign: "center", lineHeight: 1.2, padding: "0 8px" }}>
                    {t.about.stats[i] ?? stat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </FadeInView>
 
        {/* Colonne droite : texte */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <FadeInView delay={100}>
            <SectionTitle label={t.about.title} />
          </FadeInView>
          <FadeInView delay={200}>
            <p style={{ fontSize: 14, color: "#8b949e", lineHeight: 1.8, marginTop: 40, marginBottom: 24 }}>
              {t.about.description}
            </p>
          </FadeInView>
          
 
          <FadeInView delay={400}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop:40 }}>
              <AboutBtn href={`mailto:${EMAIL}`} variant="primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {t.about.hireMe}
              </AboutBtn>
              <AboutBtn href={CV_URL} variant="outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                {t.about.downloadCv}
              </AboutBtn>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}