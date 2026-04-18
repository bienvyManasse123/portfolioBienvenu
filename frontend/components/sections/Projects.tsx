"use client"
import { useState } from "react"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import ProjectCard from "@/components/ui/ProjectCard"
import { PROJECTS } from "@/lib/constants"
 
const FILTERS = ["All", "UI/UX Design", "Web Design", "Full Stack"] as const
type Filter = typeof FILTERS[number]
 
// Composant filtre avec effet hover style Aceternity (spotlight)
function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
 
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 20px",
        borderRadius: 50,   // border-radius 50 comme demandé
        border: active
          ? "1.5px solid #00e676"
          : hovered
            ? "1.5px solid rgba(0,230,118,0.4)"
            : "1.5px solid rgba(255,255,255,0.08)",
        background: active
          ? "rgba(0,230,118,0.12)"
          : hovered
            ? "rgba(0,230,118,0.05)"
            : "transparent",
        color: active ? "#00e676" : hovered ? "rgba(0,230,118,0.8)" : "#8b949e",
        fontSize: 13, fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered && !active ? "translateY(-1px)" : "translateY(0)",
        letterSpacing: "0.02em",
        // Effet de glow sur l'actif
        boxShadow: active ? "0 0 16px rgba(0,230,118,0.15)" : "none",
      }}
    >
      {label}
    </button>
  )
}
 
export default function Projects() {
  const [active, setActive] = useState<Filter>("All")
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active)
 
  return (
    <section id="work" style={{
      position: "relative", background: "#161b22", padding: "40px 80px", overflow: "hidden",
    }}>
      <FloatingShapes variant="dark2" opacity={0.6} />
 
      <div style={{ position: "relative", zIndex: 2 }}>
 
        {/* Titre centré avec lignes déco */}
        <FadeInView>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionTitle label="Projets" />
          </div>
        </FadeInView>
 
        {/* Filtres centrés sous le titre */}
        <FadeInView delay={100}>
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 8, flexWrap: "wrap",
            marginBottom: 48,
          }}>
            {FILTERS.map(filter => (
              <FilterBtn
                key={filter}
                label={filter}
                active={active === filter}
                onClick={() => setActive(filter)}
              />
            ))}
          </div>
        </FadeInView>
 
        {/* Grille projets */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {filtered.map((project, i) => (
            <FadeInView key={project.id} delay={i * 100}>
              <ProjectCard project={project} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
 
// ── Composant titre de section avec lignes déco ─────────────
// Exporté pour être réutilisé dans toutes les sections
export function SectionTitle({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 0 }}>
      {sub && (
        <p style={{
          fontSize: 11, color: "#00e676", letterSpacing: "0.18em",
          textTransform: "uppercase", marginBottom: 10,
        }}>
          {sub}
        </p>
      )}
      {/* Titre avec lignes avant/après */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ flex: 1, maxWidth: 80, height: 1, background: "linear-gradient(to right, transparent, rgba(0,230,118,0.4))" }} />
        <h2 style={{ fontSize: 34, fontWeight: 700, whiteSpace: "nowrap" }}>{label}</h2>
        <div style={{ flex: 1, maxWidth: 80, height: 1, background: "linear-gradient(to left, transparent, rgba(0,230,118,0.4))" }} />
      </div>
    </div>
  )
}