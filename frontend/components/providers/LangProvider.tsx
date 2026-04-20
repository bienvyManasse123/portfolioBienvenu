"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { translations, type Lang } from "@/lib/i18n/translations"

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (typeof translations)[Lang]
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("FR")

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio_lang")
    if (saved === "FR" || saved === "EN") {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("portfolio_lang", lang)
    document.documentElement.lang = lang === "FR" ? "fr" : "en"
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang]
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside LangProvider")
  return ctx
}
