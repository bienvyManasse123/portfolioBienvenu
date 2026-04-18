// Button — composant bouton réutilisable
// variant "primary" = fond vert (bouton principal du template)
// variant "outline" = bordure verte (bouton secondaire)
// On le réutilise partout : Hero, About, Contact...
 
import Link from "next/link"
 
interface ButtonProps {
  children: React.ReactNode
  href?: string           // si href → rendu comme <Link>
  onClick?: () => void
  variant?: "primary" | "outline"
  className?: string
  type?: "button" | "submit"
}
 
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    borderRadius: 4,
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    border: "2px solid #00e676",
  }
 
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "#00e676", color: "#000" },
    outline: { background: "transparent", color: "#00e676" },
  }
 
  const style = { ...baseStyle, ...variants[variant] }
 
  if (href) {
    return (
      <Link href={href} style={style} className={className}>
        {children}
      </Link>
    )
  }
 
  return (
    <button type={type} onClick={onClick} style={style} className={className}>
      {children}
    </button>
  )
}