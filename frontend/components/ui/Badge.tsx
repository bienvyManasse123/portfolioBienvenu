// Badge — petite étiquette pour afficher les technologies d'un projet
// Ex: React, TypeScript, FastAPI...
 
interface BadgeProps {
    label: string
  }
   
  export default function Badge({ label }: BadgeProps) {
    return (
      <span style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        border: "1px solid rgba(0, 230, 118, 0.3)",
        color: "#00e676",
        background: "rgba(0, 230, 118, 0.07)",
        letterSpacing: "0.03em",
      }}>
        {label}
      </span>
    )
  }