"use client"
// Contact.tsx — Formulaire connecté au backend FastAPI
// Remplace la simulation (setTimeout) par un vrai appel API
// Gère les états : idle → loading → success/error

import { useState } from "react"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import SectionTitle from "@/components/ui/SectionTitle"
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants"
import { sendContact } from "@/lib/api"
import { useLang } from "@/components/providers/LangProvider"

function Field({ label, icon, name, type="text", value, onChange, placeholder, required }: {
  label: string; icon: React.ReactNode; name: string; type?: string
  value: string; onChange: (e: any) => void; placeholder: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{
        display:"flex", alignItems:"center", gap:6,
        fontSize:11, fontWeight:600, letterSpacing:"0.1em",
        textTransform:"uppercase",
        color: focused?"#00e676":"#8b949e",
        marginBottom:8, transition:"color 0.2s",
      }}>
        {icon}{label}
      </label>
      <input type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{
          width:"100%", padding:"13px 16px",
          background: focused?"rgba(0,230,118,0.04)":"#1c2333",
          border:`1.5px solid ${focused?"#00e676":"rgba(255,255,255,0.07)"}`,
          borderRadius:10, color:"#fff", fontSize:14,
          outline:"none", transition:"all 0.25s ease", fontFamily:"inherit",
          boxShadow: focused?"0 0 0 4px rgba(0,230,118,0.08)":"none",
        }}
      />
    </div>
  )
}

function InfoCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  const [h, setH] = useState(false)
  return (
    <a href={href} target="_blank" style={{ textDecoration:"none" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      <div style={{
        display:"flex", alignItems:"center", gap:14,
        padding:"16px 20px", borderRadius:12,
        background: h?"rgba(0,230,118,0.06)":"rgba(255,255,255,0.03)",
        border:`1px solid ${h?"rgba(0,230,118,0.3)":"rgba(255,255,255,0.07)"}`,
        transition:"all 0.25s ease",
        transform: h?"translateX(6px)":"translateX(0)",
        marginBottom:12,
      }}>
        <div style={{
          width:42, height:42, borderRadius:"50%",
          background:"rgba(0,230,118,0.1)", border:"1px solid rgba(0,230,118,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#00e676", flexShrink:0, transition:"all 0.25s",
          transform: h?"scale(1.1)":"scale(1)",
        }}>{icon}</div>
        <div style={{ minWidth:0 }}>
          <p style={{ fontSize:11, color:"#8b949e", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:2 }}>{label}</p>
          <p style={{ fontSize:14, color:h?"#00e676":"#c9d1d9", transition:"color 0.2s", fontWeight:500, wordBreak:"break-all" }}>{value}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={h?"#00e676":"rgba(255,255,255,0.2)"} strokeWidth="2"
          style={{ marginLeft:"auto", flexShrink:0, transition:"all 0.2s", transform:h?"translate(2px,-2px)":"translate(0,0)" }}>
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </div>
    </a>
  )
}

export default function Contact() {
  const { t } = useLang()
  const [form, setForm]           = useState({ name:"", email:"", subject:"", message:"" })
  const [status, setStatus]       = useState<"idle"|"loading"|"success"|"error">("idle")
  const [errorMsg, setErrorMsg]   = useState("")
  const [submitH, setSubmitH]     = useState(false)
  const [msgFocused, setMsgFoc]   = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const { data, error } = await sendContact({
      name:    form.name,
      email:   form.email,
      subject: form.subject || undefined,
      message: form.message,
    })

    if (error || !data?.success) {
      setStatus("error")
      setErrorMsg(error || t.contact.errorFallback)
      return
    }

    setStatus("success")
    setForm({ name:"", email:"", subject:"", message:"" })
  }

  const isLoading = status === "loading"

  return (
    <section id="contact" style={{
      position:"relative", background:"#161b22",
      padding:"40px 80px", overflow:"hidden",
    }}>
      <FloatingShapes variant="dark2" opacity={0.55}/>
      <div style={{ position:"relative", zIndex:2 }}>
        <FadeInView>
          <div style={{ marginBottom:64 }}>
            <SectionTitle label={t.contact.title} sub={t.contact.sub}/>
          </div>
        </FadeInView>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
          gap:48, alignItems:"start",
        }}>
          {/* ── Gauche ── */}
          <FadeInView direction="left">
            <div>
              <div style={{
                background:"rgba(0,230,118,0.05)",
                border:"1px solid rgba(0,230,118,0.15)",
                borderRadius:16, padding:"24px", marginBottom:28,
              }}>
                <div style={{ fontSize:28, marginBottom:12 }}>👋</div>
                <p style={{ fontSize:18, fontWeight:700, marginBottom:8, lineHeight:1.4 }}>
                  {t.contact.cardTitle}<br/>
                  <span style={{ color:"#00e676" }}>{t.contact.cardHighlight}</span>
                </p>
                <p style={{ fontSize:14, color:"#8b949e", lineHeight:1.7 }}>
                  {t.contact.cardText}
                </p>
              </div>
              <InfoCard
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                label="Email" value={EMAIL} href={`mailto:${EMAIL}`}
              />
              <InfoCard
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                label="LinkedIn" value="linkedin.com/in/bienvyManasse123" href={LINKEDIN_URL}
              />
              <InfoCard
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>}
                label="GitHub" value="github.com/bienvyManasse123" href={GITHUB_URL}
              />
              
            </div>
          </FadeInView>

          {/* ── Droite : formulaire ── */}
          <FadeInView direction="right" delay={150}>
            {status === "success" ? (
              <div style={{
                textAlign:"center", padding:"60px 40px",
                background:"rgba(0,230,118,0.05)",
                border:"1px solid rgba(0,230,118,0.2)",
                borderRadius:20,
              }}>
                <div style={{
                  width:72, height:72, borderRadius:"50%",
                  background:"rgba(0,230,118,0.15)",
                  border:"2px solid rgba(0,230,118,0.4)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 20px", fontSize:32,
                }}>✓</div>
                <h3 style={{ fontSize:22, fontWeight:700, marginBottom:10 }}>{t.contact.successTitle}</h3>
                <p style={{ fontSize:14, color:"#8b949e", lineHeight:1.7 }}>
                  {t.contact.successText}
                </p>
                <button onClick={()=>setStatus("idle")} style={{
                  marginTop:24, padding:"10px 24px", borderRadius:50,
                  border:"1px solid rgba(0,230,118,0.3)",
                  background:"transparent", color:"#00e676",
                  fontSize:13, cursor:"pointer",
                }}>
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background:"rgba(255,255,255,0.02)",
                border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:20, padding:"36px 32px",
                display:"flex", flexDirection:"column", gap:22,
              }}>
                {/* Erreur API */}
                {status === "error" && (
                  <div style={{
                    padding:"12px 16px", borderRadius:10,
                    background:"rgba(239,68,68,0.08)",
                    border:"1px solid rgba(239,68,68,0.25)",
                    color:"#fca5a5", fontSize:13,
                  }}>
                    ⚠ {errorMsg}
                  </div>
                )}

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <Field label={t.contact.fields.name} name="name" value={form.name} onChange={onChange}
                    placeholder={t.contact.placeholders.name} required
                    icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  />
                  <Field label={t.contact.fields.email} name="email" type="email" value={form.email} onChange={onChange}
                    placeholder={t.contact.placeholders.email} required
                    icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                  />
                </div>
                <Field label={t.contact.fields.subject} name="subject" value={form.subject} onChange={onChange}
                  placeholder={t.contact.placeholders.subject}
                  icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                />
                <div>
                  <label style={{
                    display:"flex", alignItems:"center", gap:6, fontSize:11,
                    fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase",
                    color:msgFocused?"#00e676":"#8b949e", marginBottom:8, transition:"color 0.2s",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {t.contact.fields.message}
                  </label>
                  <textarea name="message" value={form.message} onChange={onChange}
                    placeholder={t.contact.placeholders.message} required rows={5}
                    onFocus={()=>setMsgFoc(true)} onBlur={()=>setMsgFoc(false)}
                    style={{
                      width:"100%", padding:"13px 16px",
                      background:msgFocused?"rgba(0,230,118,0.04)":"#1c2333",
                      border:`1.5px solid ${msgFocused?"#00e676":"rgba(255,255,255,0.07)"}`,
                      borderRadius:10, color:"#fff", fontSize:14,
                      outline:"none", resize:"vertical", transition:"all 0.25s ease",
                      fontFamily:"inherit",
                      boxShadow:msgFocused?"0 0 0 4px rgba(0,230,118,0.08)":"none",
                    }}
                  />
                </div>

                <button type="submit" disabled={isLoading}
                  onMouseEnter={()=>setSubmitH(true)}
                  onMouseLeave={()=>setSubmitH(false)}
                  style={{
                    padding:"14px 32px", borderRadius:50,
                    border:"1.5px solid #00e676",
                    background:submitH?"#00e676":"transparent",
                    color:submitH?"#fff":"#00e676",
                    fontSize:14, fontWeight:700,
                    cursor:isLoading?"not-allowed":"pointer",
                    transition:"all 0.28s cubic-bezier(0.4,0,0.2,1)",
                    transform:submitH&&!isLoading?"translateY(-2px)":"translateY(0)",
                    boxShadow:submitH&&!isLoading?"0 10px 28px rgba(0,230,118,0.25)":"none",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                    opacity:isLoading?0.7:1,
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{
                        width:16, height:16, borderRadius:"50%",
                        border:"2px solid rgba(0,230,118,0.3)",
                        borderTopColor:"#00e676",
                        animation:"spin 0.7s linear infinite", display:"inline-block",
                      }}/>
                      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                      {t.contact.loading}
                    </>
                  ) : (
                    <>
                      {t.contact.submit}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeInView>
        </div>
      </div>
    </section>
  )
}