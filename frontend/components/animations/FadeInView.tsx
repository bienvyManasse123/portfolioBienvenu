"use client"
import { useEffect, useRef, useState } from "react"
 
interface FadeInViewProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "left" | "right"
  className?: string
  style?: React.CSSProperties
}
 
export default function FadeInView({
  children, delay = 0, direction = "up", className = "", style = {},
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
 
  const getInitialTransform = () => {
    if (direction === "up")    return "translateY(40px)"
    if (direction === "left")  return "translateX(-40px)"
    if (direction === "right") return "translateX(40px)"
    return "translateY(40px)"
  }
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])
 
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0)" : getInitialTransform(),
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}