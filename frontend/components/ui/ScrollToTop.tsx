"use client"
import { useEffect, useState } from "react"
 
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
 
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
 
  const scrollTop = () => {
    setClicked(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => setClicked(false), 600)
  }
 
  return (
    <>
      <style>{`
        @keyframes breathe {
          0%,100% { transform: scale(1);    box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 0 0 0 rgba(0,230,118,0.25); }
          50%      { transform: scale(1.12); box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 0 0 10px rgba(0,230,118,0); }
        }
        @keyframes bounceIn {
          0%  { opacity:0; transform: scale(0.4) translateY(20px); }
          60% { transform: scale(1.1) translateY(-3px); }
          100%{ opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes arrowBounce {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-4px); }
        }
      `}</style>
 
      <button
        onClick={scrollTop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Retour en haut"
        style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 900,
          width: 50, height: 50, borderRadius: "50%",
          border: `1.5px solid ${hovered ? "#00e676" : "rgba(0,230,118,0.4)"}`,
          background: hovered ? "#00e676" : "rgba(13,17,23,0.88)",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "all" : "none",
          // Respire quand on ne survole pas, hover prend le dessus sinon
          animation: visible && !hovered ? "breathe 2.2s ease-in-out infinite" : "none",
          transform: hovered ? "scale(1.15) translateY(-3px)" : undefined,
          transition: "background 0.25s, border-color 0.25s, transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: hovered ? "0 10px 28px rgba(0,230,118,0.35)" : undefined,
        }}
      >
        <svg
          width="18" height="18" viewBox="0 0 24 24"
          fill="none"
          stroke={hovered ? "#000" : "#00e676"}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            animation: hovered ? "arrowBounce 0.55s ease infinite" : "none",
            transition: "stroke 0.2s",
          }}
        >
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </>
  )
}