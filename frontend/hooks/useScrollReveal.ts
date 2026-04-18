// useScrollReveal — hook réutilisable basé sur IntersectionObserver
// Retourne un ref à attacher à un élément + un boolean "isVisible"
// Alternative légère à FadeInView quand on veut plus de contrôle
 
import { useEffect, useRef, useState } from "react"
 
interface UseScrollRevealOptions {
  threshold?: number   // % de l'élément visible avant déclenchement (0.0 à 1.0)
  once?: boolean       // true = animation une seule fois, false = à chaque passage
}
 
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )
 
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])
 
  return { ref, isVisible }
}