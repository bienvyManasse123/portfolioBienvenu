"use client"
import { useState } from "react"
import SectionTitle from "@/components/ui/SectionTitle"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import { SKILLS } from "@/lib/constants"
import { useLang } from "@/components/providers/LangProvider"
 
const categories = ["Frontend", "Backend", "IA", "DevOps", "Sgbd", "Quality"] as const
 
export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const { t } = useLang()

  return (
    <section
  id="skills"
  style={{
    position: "relative",
    background: "#0d1117",
    padding: "40px 80px",
    overflow: "hidden",
  }}
>
  <FloatingShapes variant="dark" opacity={0.6} />

  <div style={{ position: "relative", zIndex: 2 }}>
    <FadeInView>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <SectionTitle label={t.skills.title} sub={t.skills.sub} />
      </div>
    </FadeInView>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 32,
      }}
    >
      {categories.map((cat, ci) => {
        const catSkills = SKILLS.filter((s) => s.category === cat);
        if (!catSkills.length) return null;
        return (
          <FadeInView key={cat} delay={ci * 120}>
            <div
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                background: "rgba(22, 27, 34, 0.4)",
                borderRadius: 12,
                padding: 28,
                height: "100%", // Assure que les cards ont la même hauteur sur une ligne
                border:
                  hoveredCategory === cat
                    ? "1px solid rgba(0,230,118,0.3)"
                    : "1px solid rgba(255,255,255,0.02)",
                transform: hoveredCategory === cat ? "translateY(-10px)" : "translateY(0)",
                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease",
              }}
            >
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#00e676",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {cat}
              </h3>

              {/* Nouveau conteneur pour la liste de skills */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 12px", // Espace entre les lignes et les mots
                  lineHeight: "1.6",
                }}
              >
                {catSkills.map((skill, i) => (
                  <span key={skill.name} style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {skill.name}
                    </span>
                    {/* Affiche le point seulement si ce n'est pas le dernier élément */}
                    {i < catSkills.length - 1 && (
                      <span
                        style={{
                          marginLeft: 12,
                          color: "#00e676",
                          fontSize: 14,
                          opacity: 0.6,
                        }}
                      >
                        •
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </FadeInView>
        );
      })}
    </div>
  </div>
</section>
  )
}