// api.ts — Tous les appels vers le backend FastAPI
//
// Centraliser ici = un seul endroit à modifier si l'URL change
// NEXT_PUBLIC_ = variable accessible côté client (navigateur)
// Sans NEXT_PUBLIC_ = seulement côté serveur (SSR)

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// ── Types ─────────────────────────────────────────────────

export interface ContactPayload {
  name:     string
  email:    string
  subject?: string
  message:  string
}

export interface ContactApiResponse {
  success: boolean
  message: string
}

// ── Helpers ───────────────────────────────────────────────

/**
 * Wrapper fetch avec gestion d'erreur centralisée
 * Retourne { data, error } — jamais de throw non géré
 */
async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<{ data: T | null; error: string | null }> {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })
  
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
  
        // FastAPI retourne parfois detail comme tableau (erreurs Pydantic)
        // et parfois comme string (erreurs manuelles)
        let message = `Erreur ${res.status}`
  
        if (body?.detail) {
          if (typeof body.detail === "string") {
            // Erreur simple : { detail: "message" }
            message = body.detail
          } else if (Array.isArray(body.detail)) {
            // Erreur Pydantic : { detail: [{ msg: "...", loc: [...] }] }
            message = body.detail
              .map((err: any) => err.msg)
              .join(", ")
          }
        }
  
        return { data: null, error: message }
      }
  
      const data = await res.json()
      return { data, error: null }
  
    } catch (err) {
      console.error("Erreur API:", err)
      return { data: null, error: "Impossible de contacter le serveur." }
    }
}

// ── Endpoints ─────────────────────────────────────────────

/**
 * Envoie le formulaire de contact au backend
 * Le backend valide, sauvegarde en BDD et envoie l'email
 */
export async function sendContact(
  payload: ContactPayload,
): Promise<{ data: ContactApiResponse | null; error: string | null }> {
  return fetchAPI<ContactApiResponse>("/api/contact", {
    method: "POST",
    body:   JSON.stringify(payload),
  })
}

/**
 * Vérifie que l'API backend est accessible
 * Utilisé optionnellement au chargement de la page contact
 */
export async function checkHealth(): Promise<boolean> {
  const { data } = await fetchAPI<{ status: string }>("/api/health")
  return data?.status === "ok"
}