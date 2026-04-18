// page.tsx — Page principale du portfolio
// Assemble toutes les sections dans l'ordre du template :
// Hero → About → Services → Projects → Skills → Contact
// Les WaveDivider créent les transitions fluides entre les fonds sombres
 
import Hero     from "@/components/sections/Hero"
import About    from "@/components/sections/About"
import Services from "@/components/sections/Services"
import Projects from "@/components/sections/Projects"
import Skills   from "@/components/sections/Skills"
import Contact  from "@/components/sections/Contact"
import WaveDivider from "@/components/animations/WaveDivider"
 
export default function HomePage() {
  return (
    <>
      {/* 1. Hero — fond #0d1117 */}
      <Hero />
 
      {/* Transition Hero → About */}
      <WaveDivider colorFrom="#0d1117" colorTo="#161b22" />
 
      {/* 2. About — fond #161b22 */}
      <About />
 
      {/* Transition About → Services */}
      <WaveDivider colorFrom="#161b22" colorTo="#0d1117" />
 
      {/* 3. Services — fond #0d1117 */}
      <Services />
 
      {/* Transition Services → Portfolio */}
      <WaveDivider colorFrom="#0d1117" colorTo="#161b22" />
 
      {/* 4. Portfolio — fond #161b22 */}
      <Projects />
 
      {/* Transition Portfolio → Skills */}
      <WaveDivider colorFrom="#161b22" colorTo="#0d1117" />
 
      {/* 5. Skills — fond #0d1117 */}
      <Skills />
 
      {/* Transition Skills → Contact */}
      <WaveDivider colorFrom="#0d1117" colorTo="#161b22" />
 
      {/* 6. Contact — fond #161b22 */}
      <Contact />
    </>
  )
}