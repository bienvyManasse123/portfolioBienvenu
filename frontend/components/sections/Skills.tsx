"use client"
import SectionTitle from "@/components/ui/SectionTitle"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import { SKILLS } from "@/lib/constants"
 
const categories = ["Frontend", "Backend", "DevOps", "Tools"] as const
 
export default function Skills() {
  return (
    <section id="skills" style={{
      position: "relative", background: "#0d1117", padding: "40px 80px", overflow: "hidden",
    }}>
      <FloatingShapes variant="dark" opacity={0.6} />
 
      <div style={{ position: "relative", zIndex: 2 }}>
        <FadeInView>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <SectionTitle label="Compétences" sub="Mes outils" />
          </div>
        </FadeInView>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {categories.map((cat, ci) => {
            const catSkills = SKILLS.filter(s => s.category === cat)
            if (!catSkills.length) return null
            return (
              <FadeInView key={cat} delay={ci * 120}>
                <div style={{ background: "#161b22", borderRadius: 12, padding: 28, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: "#00e676", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                    {cat}
                  </h3>
                  {catSkills.map((skill, i) => (
                    <div key={skill.name} style={{ marginBottom: i < catSkills.length - 1 ? 18 : 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{skill.name}</span>
                        <span style={{ fontSize: 12, color: "#00e676" }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${skill.level}%`,
                          background: "#00e676", borderRadius: 2,
                          transition: "width 1.2s ease 0.3s",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}