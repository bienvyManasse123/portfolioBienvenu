"use client"
import SectionTitle from "@/components/ui/SectionTitle"
import { useState } from "react"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import Button from "@/components/ui/Button"
import { STATS, EMAIL, CV_URL } from "@/lib/constants"
 
 
function HoverPhoto() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 300, height: 360,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        background: "#1c2333",
        border: `2px solid ${hovered ? "rgba(0,230,118,0.45)" : "rgba(0,230,118,0.2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "scale(1.04) translateY(-6px)" : "scale(1) translateY(0)",
        boxShadow: hovered ? "0 24px 50px rgba(0,230,118,0.15)" : "none",
      }}
    >
      <span style={{ fontSize: 80, opacity: 0.25 }}>👤</span>
    </div>
  )
}
 
export default function About() {
  return (
    <section id="about" style={{
      position: "relative",
      background: "#161b22",
      padding: "30px 80px",
      overflow: "hidden",   // important pour que les shapes ne débordent pas
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
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>
        </FadeInView>
 
        {/* Colonne droite : texte */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <FadeInView delay={100}>
            <SectionTitle label="About me" />
          </FadeInView>
          <FadeInView delay={200}>
            <p style={{ fontSize: 14, color: "#8b949e", lineHeight: 1.8, marginTop: 50, marginBottom: 24 }}>
              Développeur passionné, je me spécialise dans la création d'interfaces
              élégantes et d'API robustes. Mon approche combine esthétique soignée
              et code de qualité pour livrer des produits qui impressionnent autant qu'ils performent.
            </p>
          </FadeInView>
          <FadeInView delay={300}>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Contact</p>
            <p style={{ fontSize: 14, color: "#8b949e", marginBottom: 6 }}>N'hésite pas à me contacter !</p>
            <p style={{ fontSize: 14, color: "#00e676", marginBottom: 28 }}>{EMAIL}</p>
          </FadeInView>
          <FadeInView delay={400}>
            <div style={{ display: "flex", gap: 12 }}>
              <Button href={`mailto:${EMAIL}`} variant="primary">Hire Me</Button>
              <Button href={CV_URL} variant="outline">Download CV</Button>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}