"use client"
import { useState } from "react"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import SectionTitle from "@/components/ui/SectionTitle"
import { SERVICES } from "@/lib/constants"
import { useLang } from "@/components/providers/LangProvider"
 
// Icônes SVG propres par service
const SERVICE_ICONS = [
  // UI/UX
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    <path d="M7 8h.01M10 8h4M7 11h2M11 11h2M15 11h.01"/>
  </svg>,
  // Graphic Design
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="13.5" r="2.5"/>
    <circle cx="17.5" cy="17.5" r="2.5"/>
    <path d="M11 6.5H4v7M13.5 9v5.5M15.5 17.5H8"/>
  </svg>,
  // Web Design
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/>
    <path d="M12 12L16 8"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M6.3 17.7a8 8 0 0 1 0-11.4"/>
    <path d="M17.7 6.3a8 8 0 0 1 1.8 8.2"/>
  </svg>,
]
 
// Couleurs d'accent par carte
const CARD_ACCENTS = ["#00e676", "#7c6af7", "#38bdf8"]
 
function ServiceCard({
  service,
  index,
  title,
  description,
}: {
  service: typeof SERVICES[0]
  index: number
  title: string
  description: string
}) {
  const [hovered, setHovered] = useState(false)
  const accent = CARD_ACCENTS[index] ?? "#00e676"
  const isFeatured = index === 0
 
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        padding: "36px 30px",
        background: isFeatured
          ? `linear-gradient(135deg, rgba(0,230,118,0.12) 0%, rgba(0,230,118,0.04) 100%)`
          : "rgba(28,35,51,0.8)",
        border: `1px solid ${hovered ? accent : (isFeatured ? "rgba(0,230,118,0.3)" : "rgba(255,255,255,0.07)")}`,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px ${accent}22`
          : "none",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Halo de fond au hover */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}/>
 
      {/* Compteur discret */}
      {/* <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: hovered ? accent : "rgba(255,255,255,0.2)",
        marginBottom: 16, transition: "color 0.3s",
      }}>
        {service.count} projets
      </p> */}
 
      {/* Icône dans un badge */}
      <div style={{
        width: 60, height: 60, borderRadius: 16,
        background: `${accent}15`,
        border: `1px solid ${accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent,
        marginBottom: 22,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
      }}>
        {SERVICE_ICONS[index]}
      </div>
 
      {/* Titre */}
      <h3 style={{
        fontSize: 20, fontWeight: 700, marginBottom: 12,
        color: hovered ? "#fff" : (isFeatured ? "#fff" : "#e6edf3"),
        transition: "color 0.2s",
      }}>
        {title}
      </h3>
 
      {/* Description */}
      <p style={{
        fontSize: 13, color: "#8b949e", lineHeight: 1.75,
        marginBottom: 24,
      }}>
        {description}
      </p>
 
      {/* Ligne de tags
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Conception", "Design", "Livraison"].map(tag => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 600,
            padding: "3px 10px", borderRadius: 50,
            background: `${accent}10`,
            border: `1px solid ${accent}25`,
            color: accent,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transition: "background 0.2s",
          }}>
            {tag}
          </span>
        ))}
      </div> */}
 
      {/* Flèche en bas à droite au hover */}
      <div style={{
        position: "absolute", bottom: 24, right: 24,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translate(0,0)" : "translate(4px, 4px)",
        transition: "all 0.3s ease",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={accent} strokeWidth="2" strokeLinecap="round">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </div>
    </div>
  )
}
 
export default function Services() {
  const { t } = useLang()
  return (
    <section id="services" style={{
      position: "relative", background: "#0d1117",
      padding: "35px 80px", overflow: "hidden",
    }}>
      <FloatingShapes variant="dark" opacity={0.65} />
 
      <div style={{ position: "relative", zIndex: 2 }}>
        <FadeInView>
          <div style={{ marginBottom: 56 }}>
            <SectionTitle label={t.services.title} sub={t.services.sub} />
          </div>
        </FadeInView>
 
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {SERVICES.map((service, i) => (
            <FadeInView key={service.title} delay={i * 150}>
              <ServiceCard
                service={service}
                index={i}
                title={t.services.items[i]?.title ?? service.title}
                description={t.services.items[i]?.description ?? service.description}
              />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}