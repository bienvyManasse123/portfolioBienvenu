// layout.tsx — Racine de l'application Next.js App Router
// Tout ce qui est ici s'applique à TOUTES les pages
// C'est ici qu'on met : les méta-données, la Navbar, le Footer, et le wrapper d'animation de chargement
 
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PageLoader from "@/components/animations/PageLoader"
import ScrollToTop from "@/components/ui/ScrollToTop"
 
// Méta-données SEO — apparaissent dans l'onglet du navigateur et sur Google
export const metadata: Metadata = {
  title: "Portfolio - Bienvenu Manassé",
  description: "Portfolio de développeur Full Stack spécialisé React & FastAPI. Découvrez mes projets et contactez-moi.",
  keywords: ["développeur", "full stack", "react", "fastapi", "portfolio"],
  authors: [{ name: "Bienvenu Manassé" }],
  openGraph: {
    title: "Bienvenu Manassé — Développeur Full Stack",
    description: "Portfolio de développeur Full Stack",
    type: "website",
  },
}
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>
        {/* PageLoader : animation de chargement au premier arrivée sur le site */}
        <PageLoader />
        {/* Navbar fixe en haut sur toutes les pages */}
        <Navbar />
        {/* Contenu de chaque page */}
        <main>{children}</main>
        {/* Footer en bas sur toutes les pages */}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}