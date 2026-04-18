// SectionTitle — titre de section centré avec lignes décoratives vertes avant/après
// Utilisé dans TOUTES les sections pour un style cohérent
 
interface SectionTitleProps {
    label: string
    sub?: string   // petit texte au-dessus en vert (ex: "Let me introduce myself")
  }
   
  export default function SectionTitle({ label, sub }: SectionTitleProps) {
    return (
      <div style={{ textAlign: "center", marginBottom: 0 }}>
        {sub && (
          <p style={{
            fontSize: 11, color: "#00e676", letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: 12,
          }}>
            {sub}
          </p>
        )}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 18,
        }}>
          {/* Ligne gauche — fondue vers la droite */}
          <div style={{
            flex: 1, maxWidth: 100, height: 3,
            background: "linear-gradient(to right, transparent, rgba(0,230,118,0.45))",
          }} />
          <h2 style={{
            fontSize: 34, fontWeight: 700,
            whiteSpace: "nowrap", color: "#fff",
          }}>
            {label}
          </h2>
          {/* Ligne droite — fondue vers la gauche */}
          <div style={{
            flex: 1, maxWidth: 100, height: 3,
            background: "linear-gradient(to left, transparent, rgba(0,230,118,0.45))",
          }} />
        </div>
      </div>
    )
  }