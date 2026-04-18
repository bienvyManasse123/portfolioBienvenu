"use client"
// PageLoader pro — écran de chargement avec barre de progression,
// pourcentage qui monte, et nom du site qui apparaît lettre par lettre
 
import { useEffect, useState } from "react"
 
export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
 
  useEffect(() => {
    // Monte la barre de 0 à 100 en ~1.4s
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        // Accélère au début, ralentit vers la fin (effet naturel)
        return p < 60 ? p + 4 : p + 2
      })
    }, 28)
 
    // Fade out après que la barre soit pleine
    const fadeTimer = setTimeout(() => setFadeOut(true), 1700)
    const removeTimer = setTimeout(() => setVisible(false), 2200)
 
    return () => { clearInterval(interval); clearTimeout(fadeTimer); clearTimeout(removeTimer) }
  }, [])
 
  if (!visible) return null
 
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0d1117",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 0,
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? "translateY(-30px)" : "translateY(0)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
 
      {/* Logo animé */}
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: "#00e676",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 28, color: "#000",
        marginBottom: 40,
        animation: "logoAppear 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}>
        BM
      </div>
 
      {/* Nom du site */}
      <p style={{
        fontSize: 13, fontWeight: 500, letterSpacing: "0.3em",
        color: "#8b949e", textTransform: "uppercase",
        marginBottom: 32,
        animation: "fadeUp 0.5s ease 0.2s both",
      }}>
        Portfolio
      </p>
 
      {/* Barre de progression */}
      <div style={{
        width: 200, height: 1,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 1, overflow: "hidden",
        marginBottom: 12,
        animation: "fadeUp 0.4s ease 0.1s both",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "#00e676",
          borderRadius: 1,
          transition: "width 0.03s linear",
          boxShadow: "0 0 8px rgba(0,230,118,0.6)",
        }} />
      </div>
 
      {/* Pourcentage */}
      <p style={{
        fontSize: 11, color: "#00e676",
        fontWeight: 600, letterSpacing: "0.1em",
        fontVariantNumeric: "tabular-nums",
        animation: "fadeUp 0.4s ease 0.15s both",
      }}>
        {Math.min(progress, 100)}%
      </p>
 
      <style>{`
        @keyframes logoAppear {
          from { opacity: 0; transform: scale(0.6) rotate(-10deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}