"use client"
import { useState } from "react"
import Link from "next/link"
import { SITE_NAME, GITHUB_URL, LINKEDIN_URL, EMAIL, NAV_LINKS, NUM_TEL } from "@/lib/constants"
import { useLang } from "@/components/providers/LangProvider"
 
function SocialIcon({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
  const [h, setH] = useState(false)
  return (
    <a href={href} target="_blank" title={label} style={{ textDecoration:"none" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      <div style={{
        width:40, height:40, borderRadius:"50%",
        border:`1px solid ${h?"rgba(0,230,118,0.5)":"rgba(255,255,255,0.1)"}`,
        background: h?"rgba(0,230,118,0.1)":"transparent",
        display:"flex", alignItems:"center", justifyContent:"center",
        color: h?"#00e676":"#8b949e",
        transition:"all 0.22s ease",
        transform: h?"translateY(-3px)":"translateY(0)",
      }}>
        {children}
      </div>
    </a>
  )
}
 
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [h, setH] = useState(false)
  return (
    <Link href={href} style={{ textDecoration:"none" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      <span style={{
        fontSize:14, color: h?"#00e676":"#8b949e",
        transition:"all 0.2s ease",
        display:"flex", alignItems:"center", gap:6,
        paddingLeft: h?6:0,
      }}>
        {h && <span style={{ color:"#00e676", fontSize:10 }}>▶</span>}
        {children}
      </span>
    </Link>
  )
}
 
export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLang()
  const navItems = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.contact, href: "#contact" },
  ]
 
  return (
    <footer style={{ background:"#0d1117", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
 
      {/* ── Corps footer : 3 colonnes ── */}
      <div style={{
        padding:"56px 80px 32px",
        display:"grid",
        gridTemplateColumns:"1.8fr 1fr 1fr",
        background:"linear-gradient(135deg, rgba(0,230,118,0.08) 0%, transparent 60%)",
        gap:48,
      }}>
 
        {/* Col 1 : Identité + logo SVG BM */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            {/* Logo SVG BM — identique au favicon */}
            <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="14" fill="#0d1117" stroke="rgba(0,230,118,0.2)" strokeWidth="1"/>
              <rect x="8" y="14" width="3" height="36" rx="1.5" fill="#00e676"/>
              <text x="13" y="46" fontFamily="Inter,system-ui,sans-serif" fontSize="30" fontWeight="800" fill="#ffffff" letterSpacing="-1">B</text>
              <text x="34" y="46" fontFamily="Inter,system-ui,sans-serif" fontSize="30" fontWeight="800" fill="#00e676" letterSpacing="-1">M</text>
              <circle cx="56" cy="52" r="3" fill="#00e676" opacity="0.8"/>
            </svg>
            <span style={{ fontWeight:700, fontSize:17 }}>{SITE_NAME}</span>
          </div>
          <p style={{ fontSize:14, color:"#8b949e", lineHeight:1.8, maxWidth:280, marginBottom:24 }}>
            {t.footer.tagline}
          </p>
          
        </div>
 
        {/* Col 2 : Navigation */}
        <div>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#fff", marginBottom:20 }}>
            {t.footer.navigation}
          </p>
          <nav style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {navItems.map(link => (
              <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
            ))}
          </nav>
        </div>
 
        {/* Col 3 : Réseaux sociaux alignés verticalement */}
        <div>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#fff", marginBottom:20 }}>
            {t.footer.social}
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { href: `mailto:${EMAIL}`, label: "Email",
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              { href: LINKEDIN_URL, label: "LinkedIn",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { href: GITHUB_URL, label: "GitHub",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },              
            ].map(social => (
              <SocialRow key={social.label} href={social.href} label={social.label} icon={social.icon}/>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── Bas footer ── */}
      <div style={{
        padding:"20px 80px 28px",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:12,
        background:"linear-gradient(135deg, rgba(0,230,118,0.05) 0%, transparent 60%)",
      }}>
        <p style={{ fontSize:13, color:"#8b949e" }}>
          © {year} {SITE_NAME}
        </p>
        <p style={{ fontSize:13, color:"#8b949e" }}>
          {t.footer.contactLabel} {NUM_TEL}
        </p>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.2)" }}>
          {t.footer.designedBy}{" "}
          <span style={{ color:"rgba(0,230,118,0.5)" }}>{SITE_NAME}</span>
        </p>
      </div>
    </footer>
  )
}
 
// Ligne réseau social verticale (col 3)
function SocialRow({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [h, setH] = useState(false)
  return (
    <a href={href} target="_blank" style={{ textDecoration:"none" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      <div style={{
        display:"flex", alignItems:"center", gap:12,
        transition:"all 0.2s ease",
        transform: h?"translateX(6px)":"translateX(0)",
      }}>
        <div style={{
          width:36, height:36, borderRadius:"50%",
          border:`1px solid ${h?"rgba(0,230,118,0.4)":"rgba(255,255,255,0.08)"}`,
          background: h?"rgba(0,230,118,0.08)":"transparent",
          display:"flex", alignItems:"center", justifyContent:"center",
          color: h?"#00e676":"#8b949e",
          transition:"all 0.2s ease", flexShrink:0,
        }}>
          {icon}
        </div>
        <span style={{ fontSize:14, color: h?"#00e676":"#8b949e", transition:"color 0.2s", fontWeight: h?500:400 }}>
          {label}
        </span>
      </div>
    </a>
  )
}