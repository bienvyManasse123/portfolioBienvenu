"use client"
import SectionTitle from "@/components/ui/SectionTitle"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import { SERVICES } from "@/lib/constants"
 
export default function Services() {
  return (
    <section id="services" style={{
      position: "relative", background: "#0d1117", padding: "40px 80px", overflow: "hidden",
    }}>
      <FloatingShapes variant="dark" opacity={0.65} />
 
      <div style={{ position: "relative", zIndex: 2 }}>
        <FadeInView>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <SectionTitle label="Services" sub="What I will do for you" />
          </div>
        </FadeInView>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {SERVICES.map((service, i) => (
            <FadeInView key={service.title} delay={i * 150}>
              <div style={{
                padding: 36, borderRadius: 12,
                background: i === 0 ? "#00e676" : "#161b22",
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                transition: "transform 0.3s ease",
                height: "100%",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
              >
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 32, opacity: 0.8 }}>{service.icon}</span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, color: i === 0 ? "rgba(0,0,0,0.6)" : "#8b949e" }}>
                  {service.count} Projects
                </p>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: i === 0 ? "#000" : "#fff" }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: i === 0 ? "rgba(0,0,0,0.7)" : "#8b949e" }}>
                  {service.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}