import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PageLoader from "@/components/animations/PageLoader"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { LangProvider } from "@/components/providers/LangProvider"
 
export const metadata: Metadata = {
  title: "BM — Développeur Full Stack",
  description: "Portfolio de développeur Full Stack spécialisé React & FastAPI. Basé à Madagascar.",
  keywords: ["développeur", "full stack", "react", "fastapi", "portfolio", "madagascar"],
  authors: [{ name: "BM" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "BM — Développeur Full Stack",
    description: "Portfolio de développeur Full Stack spécialisé React & FastAPI.",
    type: "website",
  },
}
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>
        <LangProvider>
          <PageLoader />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </LangProvider>
      </body>
    </html>
  )
}