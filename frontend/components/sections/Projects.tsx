"use client"
import { useState, useRef, useEffect } from "react"
import FadeInView from "@/components/animations/FadeInView"
import FloatingShapes from "@/components/animations/FloatingShapes"
import ProjectCard from "@/components/ui/ProjectCard"
import SectionTitle from "@/components/ui/SectionTitle"
import { PROJECTS } from "@/lib/constants"
import { useLang } from "@/components/providers/LangProvider"
 
type Filter = "All" | "Full Stack" | "Mobile" | "UI/UX Design"
const FILTER_VALUES: Filter[] = ["All", "Full Stack", "Mobile", "UI/UX Design"]
 
const INITIAL_VISIBLE = 6

function useTyper(words: string[], speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let t: ReturnType<typeof setTimeout>

    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx((i) => i + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx((i) => i - 1)
      }, speed / 2)
    } else {
      t = setTimeout(() => {
        setDeleting(false)
        setWordIdx((i) => (i + 1) % words.length)
      }, 2000)
    }

    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}
 
function FilterBar({
  active,
  onChange,
  labels,
}: {
  active: Filter
  onChange: (f: Filter) => void
  labels: Record<Filter, string>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, width: 0, visible: false })
 
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const container = containerRef.current
    if (!container) return
    const btnRect = e.currentTarget.getBoundingClientRect()
    const contRect = container.getBoundingClientRect()
    setSpotlight({ x: btnRect.left - contRect.left, width: btnRect.width, visible: true })
  }
 
  return (
    <div ref={containerRef} onMouseLeave={() => setSpotlight(s => ({ ...s, visible: false }))}
      style={{
        position: "relative", display: "inline-flex", alignItems: "center",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 50, padding: "5px", gap: 2,
      }}>
      <div style={{
        position: "absolute", top: 5, height: "calc(100% - 10px)",
        left: spotlight.x + 5, width: spotlight.width - 10,
        background: "rgba(0,230,118,0.10)", borderRadius: 50,
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        opacity: spotlight.visible ? 1 : 0,
        pointerEvents: "none", zIndex: 0,
      }}/>
      {FILTER_VALUES.map(filter => {
        const isActive = active === filter
        return (
          <button key={filter} onClick={() => onChange(filter)} onMouseEnter={handleMouseEnter}
            style={{
              position: "relative", zIndex: 1,
              padding: "9px 22px", borderRadius: 50,
              border: isActive ? "1.5px solid #00e676" : "1.5px solid transparent",
              background: isActive ? "rgba(0,230,118,0.12)" : "transparent",
              color: isActive ? "#00e676" : "#8b949e",
              fontSize: 13, fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s, background 0.2s",
              boxShadow: isActive ? "0 0 14px rgba(0,230,118,0.18)" : "none",
              letterSpacing: "0.02em", whiteSpace: "nowrap",
            }}>
            {labels[filter]}
          </button>
        )
      })}
    </div>
  )
}
 
// ── Bouton "Voir plus" avec animation pulse ────────────────
function ShowMoreBtn({
  onClick,
  count,
  prefix,
  suffix,
  buttonLabel,
}: {
  onClick: () => void
  count: number
  prefix: string
  suffix: string
  buttonLabel: string
}) {
  const [h, setH] = useState(false)
  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(0,230,118,0); }
        }
        @keyframes arrowBounceDown {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(4px); }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 48 }}>
        {/* Texte indicateur */}
        <p style={{ fontSize: 13, color: "#8b949e", letterSpacing: "0.05em" }}>
          {prefix} <span style={{ color: "#00e676", fontWeight: 700 }}>{count}</span> {suffix}
        </p>
        {/* Bouton */}
        <button
          onClick={onClick}
          onMouseEnter={() => setH(true)}
          onMouseLeave={() => setH(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "13px 32px", borderRadius: 50,
            border: "1.5px solid #00e676",
            background: h ? "#00e676" : "transparent",
            color: h ? "#000" : "#00e676",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
            transform: h ? "translateY(-3px)" : "translateY(0)",
            animation: !h ? "pulseGlow 2s ease-in-out infinite" : "none",
            letterSpacing: "0.04em",
          }}
        >
          {buttonLabel}
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            style={{ animation: !h ? "arrowBounceDown 1.2s ease-in-out infinite" : "none" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </button>
      </div>
    </>
  )
}
 
function EmptyProjectsState({ text }: { text: string }) {
  const typed = useTyper([text], 100, 1000)

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <div
        style={{
          marginTop: 18,
          padding: "18px 0",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, minHeight: 36 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 28,
              fontWeight: 700,
              color: "#00e676",
              letterSpacing: "0.02em",
            }}
          >
            {typed}
          </span>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "2em",
              background: "#00e676",
              marginLeft: 3,
              verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }}
          />
        </p>
      </div>
    </>
  )
}

export default function Projects() {
  const { t } = useLang()
  const [active, setActive]     = useState<Filter>("All")
  const [showAll, setShowAll]   = useState(false)
  const filterLabels: Record<Filter, string> = {
    All: t.projects.filters.all,
    "Full Stack": t.projects.filters.fullStack,
    Mobile: t.projects.filters.mobile,
    "UI/UX Design": t.projects.filters.uiux,
  }
 
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active)
  const localizedFiltered = filtered.map((project) => {
    const localized = t.projects.items[project.id as keyof typeof t.projects.items]
    if (!localized) return project
    return {
      ...project,
      title: localized.title,
      description: localized.description,
    }
  })
  const visible  = showAll ? localizedFiltered : localizedFiltered.slice(0, INITIAL_VISIBLE)
  const hidden   = filtered.length - INITIAL_VISIBLE
 
  // Reset showAll quand on change de filtre
  useEffect(() => setShowAll(false), [active])
 
  return (
    <section id="work" style={{
      position: "relative", background: "#161b22",
      padding: "35px 80px", overflow: "hidden",
    }}>
      <FloatingShapes variant="dark2" opacity={0.6}/>
 
      <div style={{ position: "relative", zIndex: 2 }}>
        <FadeInView>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <SectionTitle label={t.projects.title}/>
          </div>
        </FadeInView>
 
        <FadeInView delay={100}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 52 }}>
            <FilterBar active={active} onChange={f => setActive(f)} labels={filterLabels} />
          </div>
        </FadeInView>
 
        {/* Grille projets */}
        {filtered.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 28,
          }}>
            {visible.map((project, i) => (
              <FadeInView key={project.id} delay={(i % INITIAL_VISIBLE) * 100}>
                <ProjectCard project={project}/>
              </FadeInView>
            ))}
          </div>
        ) : (
          <FadeInView key={active} delay={80}>
            <EmptyProjectsState text={t.projects.empty} />
          </FadeInView>
        )}
 
        {/* Bouton voir plus — affiché seulement si > 6 projets ET pas encore tout affiché */}
        {!showAll && hidden > 0 && (
          <ShowMoreBtn
            onClick={() => setShowAll(true)}
            count={hidden}
            prefix={t.projects.moreTextPrefix}
            suffix={t.projects.moreTextSuffix}
            buttonLabel={t.projects.showAllBtn}
          />
        )}
 
        {/* Message quand tout est affiché */}
        {showAll && hidden > 0 && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p style={{ fontSize: 13, color: "#8b949e" }}>
              {t.projects.allShownPrefix} <span style={{ color: "#00e676", fontWeight: 700 }}>{filtered.length}</span> {t.projects.allShownSuffix}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}