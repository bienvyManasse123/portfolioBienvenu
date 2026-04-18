// ProjectCard — carte d'un projet dans la section Portfolio
// Affiche : image, titre, description courte, stack (badges), liens GitHub + Demo
// L'effet hover (scale) est géré en CSS via onMouseEnter/Leave
 
import Badge from "./Badge"
import Button from "./Button"
import { Project } from "@/types"
 
interface ProjectCardProps {
  project: Project
}
 
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      style={{
        background: "#1c2333",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "transform 0.3s ease, border-color 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"
        ;(e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,230,118,0.3)"
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
        ;(e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"
      }}
    >
      {/* Image du projet */}
      <div style={{
        height: 200, background: "#0d1117",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {project.image_url ? (
          <img src={project.image_url} alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          // Placeholder si pas d'image
          <div style={{ color: "rgba(0,230,118,0.3)", fontSize: 40 }}>{"</>"}</div>
        )}
      </div>
 
      {/* Contenu */}
      <div style={{ padding: "24px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{project.title}</h3>
        <p style={{ fontSize: 14, color: "#8b949e", lineHeight: 1.6, marginBottom: 16 }}>
          {project.description}
        </p>
 
        {/* Stack badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {project.stack.map(tech => <Badge key={tech} label={tech} />)}
        </div>
 
        {/* Liens */}
        <div style={{ display: "flex", gap: 10 }}>
          {project.github_url && (
            <Button href={project.github_url} variant="outline">
              GitHub
            </Button>
          )}
          {project.demo_url && (
            <Button href={project.demo_url} variant="primary">
              Demo live
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}