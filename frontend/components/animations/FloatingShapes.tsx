// FloatingShapes — formes géométriques décoratives animées
// Accepte un prop "variant" pour adapter les formes selon la section
// Toutes les animations sont en CSS pur via les classes définies dans globals.css
 
interface FloatingShapesProps {
    variant?: "hero" | "dark" | "dark2"  // dark = #0d1117, dark2 = #161b22
    opacity?: number
  }
   
  export default function FloatingShapes({ variant = "hero", opacity = 1 }: FloatingShapesProps) {
    const color = "#00e676"
   
    return (
      <div style={{
        position: "absolute", inset: 0,
        overflow: "hidden", pointerEvents: "none", zIndex: 1,
        opacity,
      }}>
   
        {/* ── Grille de points haut droit ── */}
        <div className="animate-floatC" style={{
          position: "absolute", top: 40, right: 40,
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: 10, opacity: 0.22,
        }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: color }} />
          ))}
        </div>
   
        {/* ── Grille de points bas gauche ── */}
        <div className="animate-floatB" style={{
          position: "absolute", bottom: 60, left: 30,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10, opacity: 0.18,
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: color }} />
          ))}
        </div>
   
        {/* ── Triangle haut gauche ── */}
        <div className="animate-floatA" style={{
          position: "absolute", top: 80, left: 40,
          width: 0, height: 0,
          borderLeft: "14px solid transparent",
          borderRight: "14px solid transparent",
          borderBottom: `24px solid ${color}`,
          opacity: 0.2,
        }} />
   
        {/* ── Triangle bas droit (retourné) ── */}
        <div className="animate-floatD" style={{
          position: "absolute", bottom: 100, right: 100,
          width: 0, height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: `20px solid ${color}`,
          opacity: 0.15,
        }} />
   
        {/* ── Cercle outline haut droit ── */}
        <div className="animate-floatC" style={{
          position: "absolute", top: 120, right: 200,
          width: 50, height: 50, borderRadius: "50%",
          border: `2px solid ${color}`, opacity: 0.2,
        }} />
   
        {/* ── Grand cercle bas gauche ── */}
        <div className="animate-floatB" style={{
          position: "absolute", bottom: 80, left: 120,
          width: 80, height: 80, borderRadius: "50%",
          border: `1.5px solid ${color}`, opacity: 0.1,
        }} />
   
        {/* ── Hexagone milieu gauche ── */}
        <div className="animate-floatB" style={{
          position: "absolute", top: "38%", left: 50,
          width: 38, height: 44,
          background: color, opacity: 0.1,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }} />
   
        {/* ── Grand hexagone droit (fond très doux) ── */}
        <div className="animate-spinSlow" style={{
          position: "absolute", top: "10%", right: 80,
          width: 90, height: 104,
          background: color, opacity: 0.06,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }} />
   
        {/* ── Hexagone milieu droit ── */}
        <div className="animate-floatA" style={{
          position: "absolute", top: "55%", right: 60,
          width: 28, height: 32,
          background: color, opacity: 0.12,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }} />
   
        {/* ── Carré rotatif bas gauche ── */}
        <div className="animate-floatB" style={{
          position: "absolute", bottom: 160, left: 80,
          width: 18, height: 18,
          border: `2px solid ${color}`, opacity: 0.2,
          transform: "rotate(45deg)",
        }} />
   
        {/* ── Carré rotatif haut centre ── */}
        <div className="animate-floatD" style={{
          position: "absolute", top: 160, left: "45%",
          width: 12, height: 12,
          border: `2px solid ${color}`, opacity: 0.15,
          transform: "rotate(45deg)",
        }} />
   
        {/* ── Lignes ondulées ── */}
        <svg className="animate-floatC" style={{
          position: "absolute", bottom: 180, left: 20, opacity: 0.18,
        }} width="90" height="30" viewBox="0 0 90 30" fill="none">
          <path d="M0 15 Q10 5 20 15 Q30 25 40 15 Q50 5 60 15 Q70 25 80 15 Q85 10 90 15"
            stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
   
        {/* ── Deuxième ligne ondulée ── */}
        <svg className="animate-floatA" style={{
          position: "absolute", top: 200, right: 30, opacity: 0.12,
        }} width="70" height="24" viewBox="0 0 70 24" fill="none">
          <path d="M0 12 Q8 4 16 12 Q24 20 32 12 Q40 4 48 12 Q56 20 64 12 Q67 8 70 12"
            stroke={color} strokeWidth="1.2" fill="none" />
        </svg>
   
        {/* ── Halo vert derrière la photo (hero seulement) ── */}
        {variant === "hero" && (
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "50%", height: "100%",
            background: `radial-gradient(ellipse at 70% 40%, rgba(0,230,118,0.09) 0%, transparent 65%)`,
          }} />
        )}
      </div>
    )
  }