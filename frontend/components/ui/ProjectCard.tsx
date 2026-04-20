"use client"
import { useState } from "react"
import Badge from "./Badge"
import { Project } from "@/types"
import Link from "next/link"
 
export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const [btnH, setBtnH]       = useState(false)
  const [demoH, setDemoH]     = useState(false)
  const hasGithub = !!project.github_url
  const hasDemo   = !!project.demo_url
 
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#1c2333",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(0,230,118,0.25)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,230,118,0.15)"
          : "0 4px 16px rgba(0,0,0,0.2)",
        display: "flex", flexDirection: "column",
        // cursor selon dispo du repo
        cursor: hasGithub ? "pointer" : "not-allowed",
      }}
    >
      {/* ── Image ── */}
      <div style={{
        position: "relative", height: 200,
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
        overflow: "hidden", flexShrink: 0,
      }}>
        {!project.image_url && (
          <div style={{ position: "absolute", inset: 0 }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(0,230,118,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}/>
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontSize:64,fontWeight:900,color:"rgba(0,230,118,0.06)",filter:"blur(1px)",userSelect:"none" }}>
                {project.title.slice(0,2).toUpperCase()}
              </span>
            </div>
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <div style={{
                width:56,height:56,borderRadius:14,
                background:"rgba(0,230,118,0.1)",border:"1px solid rgba(0,230,118,0.2)",
                display:"flex",alignItems:"center",justifyContent:"center",
                transition:"all 0.35s ease",
                transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
            </div>
          </div>
        )}
        {project.image_url && (
          <img src={project.image_url} alt={project.title} style={{
            width:"100%",height:"100%",objectFit:"cover",
            transition:"transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}/>
        )}
        <div style={{
          position:"absolute",inset:0,
          background:"linear-gradient(to top, rgba(13,17,23,0.8) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0, transition:"opacity 0.35s ease",
        }}/>
        <div style={{ position:"absolute",top:12,left:12, padding:"4px 12px",borderRadius:50,
          background:"rgba(0,230,118,0.12)",border:"1px solid rgba(0,230,118,0.25)",
          fontSize:11,fontWeight:600,color:"#00e676",letterSpacing:"0.05em" }}>
          {project.category}
        </div>
 
        {/* Icône cadenas si repo privé — visible au hover */}
        {!hasGithub && (
          <div style={{
            position:"absolute",top:12,right:12,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition:"all 0.3s ease",
          }}>
            <div style={{
              display:"flex",alignItems:"center",gap:5,
              padding:"5px 12px",borderRadius:50,
              background:"rgba(13,17,23,0.85)",
              border:"1px solid rgba(255,255,255,0.15)",
              color:"rgba(255,255,255,0.4)",
              fontSize:11,fontWeight:600,
              backdropFilter:"blur(8px)",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Privé
            </div>
          </div>
        )}
 
        {hasDemo && (
          <div style={{
            position:"absolute",top:12,right:12,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition:"all 0.3s ease",
          }}>
            <Link href={project.demo_url!} target="_blank"
              onMouseEnter={()=>setDemoH(true)} onMouseLeave={()=>setDemoH(false)}
              style={{
                display:"flex",alignItems:"center",gap:5,
                padding:"5px 12px",borderRadius:50,
                background:demoH?"#00e676":"rgba(13,17,23,0.85)",
                border:"1px solid rgba(0,230,118,0.4)",
                color:demoH?"#000":"#00e676",
                fontSize:11,fontWeight:600,textDecoration:"none",
                transition:"all 0.2s ease",backdropFilter:"blur(8px)",
              }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live demo
            </Link>
          </div>
        )}
      </div>
 
      {/* ── Contenu ── */}
      <div style={{ padding:"22px 22px 20px",display:"flex",flexDirection:"column",flex:1 }}>
        <h3 style={{ fontSize:17,fontWeight:700,marginBottom:8,color:hovered?"#00e676":"#fff",transition:"color 0.25s ease" }}>
          {project.title}
        </h3>
        <p style={{ fontSize:13,color:"#8b949e",lineHeight:1.7,marginBottom:16,flex:1 }}>
          {project.description}
        </p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:18 }}>
          {project.stack.map(tech => <Badge key={tech} label={tech}/>)}
        </div>
        <div style={{ height:1,background:hovered?"rgba(0,230,118,0.15)":"rgba(255,255,255,0.05)",marginBottom:16,transition:"background 0.3s ease" }}/>
 
        {/* Bouton unique */}
        <div style={{ cursor: hasGithub ? "pointer" : "not-allowed" }}>
          <Link
            href={hasGithub ? project.github_url! : "#"}
            target={hasGithub ? "_blank" : undefined}
            onClick={e => { if (!hasGithub) e.preventDefault() }}
            onMouseEnter={() => { if (hasGithub) setBtnH(true) }}
            onMouseLeave={() => setBtnH(false)}
            style={{
              display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,
              padding:"10px 20px",borderRadius:50,
              border: hasGithub
                ? `1.5px solid ${btnH?"#00e676":"rgba(0,230,118,0.3)"}`
                : "1.5px solid rgba(255,255,255,0.08)",
              background: hasGithub
                ? (btnH?"rgba(0,230,118,0.12)":"transparent")
                : "rgba(255,255,255,0.03)",
              color: hasGithub ? (btnH?"#00e676":"#8b949e") : "rgba(255,255,255,0.2)",
              fontSize:12,fontWeight:600,textDecoration:"none",
              transition:"all 0.25s cubic-bezier(0.4,0,0.2,1)",
              transform: btnH&&hasGithub ? "translateY(-2px)" : "translateY(0)",
              // cursor stop si privé
              cursor: hasGithub ? "pointer" : "not-allowed",
              letterSpacing:"0.03em",
            }}
          >
            {hasGithub ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Voir le code
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Repo privé
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}