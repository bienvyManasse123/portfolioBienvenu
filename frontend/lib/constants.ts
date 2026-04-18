// constants.ts — toutes les données statiques du portfolio
// C'est ici qu'on change les infos personnelles, projets, compétences
// Plus tard ces données viendront du backend FastAPI
 
import { Project, Skill, NavLink, Stat } from "@/types"
 
export const SITE_NAME = "Manassé"
export const SITE_TITLE = "Développeur Full Stack"
export const SITE_DESCRIPTION =
  "Passionné par la création d'applications web performantes et élégantes. Spécialisé React & FastAPI."
 
export const GITHUB_URL   = "https://github.com"
export const LINKEDIN_URL = "https://linkedin.com"
export const EMAIL        = "bienvenue.emailmsg@gmail.com"
export const CV_URL       = "/cv-alex.pdf"  // mettre le PDF dans /public
 
// ─── Navigation ───────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]
 
// ─── Stats section About ──────────────────────────────────
export const STATS: Stat[] = [
  { value: "16+", label: "Years of Experience" },
  { value: "215+", label: "Projects Completed" },
  { value: "97+", label: "Happy Clients" },
]
 
// ─── Projets ──────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Build For Adventure",
    description: "Plateforme e-commerce pour équipements outdoor avec gestion des stocks et paiements intégrés.",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github_url: "https://github.com",
    demo_url: "https://demo.example.com",
    image_url: "",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Mano App",
    description: "Application mobile de mise en relation entre artisans et particuliers. Design system complet.",
    stack: ["React Native", "FastAPI", "TypeScript"],
    github_url: "https://github.com",
    demo_url: "https://demo.example.com",
    image_url: "",
    featured: true,
    category: "UI/UX Design",
  },
  {
    id: 3,
    title: "Living Advisor",
    description: "Dashboard intelligent pour améliorer la qualité de vie avec IA et recommandations personnalisées.",
    stack: ["Next.js", "Python", "OpenAI API"],
    github_url: "https://github.com",
    demo_url: "https://demo.example.com",
    image_url: "",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 4,
    title: "Headhunter Platform",
    description: "Outil de recrutement avec matching automatique entre candidats et offres d'emploi.",
    stack: ["Vue.js", "Django", "Redis", "Docker"],
    github_url: "https://github.com",
    demo_url: "https://demo.example.com",
    image_url: "",
    featured: false,
    category: "Web Design",
  },
]
 
// ─── Compétences ──────────────────────────────────────────
export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 90, category: "Frontend" },
  { name: "TypeScript",      level: 85, category: "Frontend" },
  { name: "Tailwind CSS",    level: 88, category: "Frontend" },
  { name: "FastAPI",         level: 82, category: "Backend" },
  { name: "Python",          level: 80, category: "Backend" },
  { name: "PostgreSQL",      level: 75, category: "Backend" },
  { name: "Docker",          level: 70, category: "DevOps" },
  { name: "Git / GitHub",    level: 92, category: "Tools" },
]
 
// ─── Services ─────────────────────────────────────────────
export const SERVICES = [
  {
    icon: "◈",
    count: "198",
    title: "UI & UX Design",
    description: "Création d'interfaces élégantes centrées sur l'expérience utilisateur. Wireframes, prototypes et design system.",
  },
  {
    icon: "⬡",
    count: "32",
    title: "Graphic Design",
    description: "Identité visuelle, logo, charte graphique. Du brief créatif au rendu final prêt à l'emploi.",
  },
  {
    icon: "⬕",
    count: "112",
    title: "Web Design",
    description: "Sites web responsive et performants. De la maquette au code, en passant par l'optimisation SEO.",
  },
]