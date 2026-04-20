// constants.ts — toutes les données statiques du portfolio
// C'est ici qu'on change les infos personnelles, projets, compétences
// Plus tard ces données viendront du backend FastAPI
 
import { Project, Skill, NavLink, Stat } from "@/types"
 
export const SITE_NAME = "Manassé"
export const SITE_TITLE = "Développeur Full Stack"
export const SITE_DESCRIPTION = "Passionné par la création d'applications web performantes et élégantes. Spécialisé React & FastAPI."

export const ABOUT_ME_DESCRIPTION = ""
 
export const GITHUB_URL   = "https://github.com/bienvyManasse123"
export const LINKEDIN_URL = "https://linkedin.com/in/bienvyManasse123"
export const EMAIL        = "bienvenue.emailmsg@gmail.com"
export const CV_URL = "/CV_RAMAROKOTO_BIENVENU.pdf"
export const NUM_TEL = "+ 261 34 97 120 72"
 
// ─── Navigation ───────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Hello", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
]
 
// ─── Stats section About ──────────────────────────────────
export const STATS: Stat[] = [
  { value: "3+", label: "Years of Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "7+", label: "Happy Clients" },
]
 
// ─── Projets ──────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "SMARTMATCH AI",
    description: "Permet aux recruteurs d'automatiser le tri et le classement des candidatures, d'analyser la cohérence des parcours professionnels par IA, et de faciliter la prise de décision collaborative pour identifier les meilleurs talents sans biais.",
    stack: ["NextJs", "Framer Motion", "FastAPI", "LangChain", "Pydantic", "PyMuPDF", "JWT", "Redis + Celery", "PostgreSQL", "Anthropic Claude API"],
    // github_url: "https://github.com",
    // demo_url: "https://demo.example.com",
    image_url: "",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Plateforme de Voyage Personnalisés et d'Exploration Touristique",
    description: "Permet aux utilisateurs de planifier et de réserver des voyages personnalisés, d'explorer des destinations touristiques, et de partager leurs expériences de voyage.",
    stack: ["React + vite", "Material UI", "Symfony", "API PlatForm", "LexikJWT", "MySql", "Stripe API", "Google Maps API"],
    // github_url: "https://github.com",
    // demo_url: "https://demo.example.com",
    image_url: "",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 3,
    title: "Gestion des étudiants",
    description: "Application mobile de gestion des étudiants — notes, moyennes, statistiques et visualisations graphiques.",
    stack: ["Flutter", "FastAPI", "Pydantic", "PostgreSQL", "SQLAlchemy", "fl_chart"],
    github_url: "https://github.com/bienvyManasse123/studentManagement",
    // demo_url: "https://demo.example.com",
    image_url: "",
    featured: true,
    category: "Mobile",
  },
  {
    id: 4,
    title: "HealthPal",
    description: "Permet aux patients de rechercher et de localiser les médecins les plus proches, de consulter une IA via un chatbot intelligent pour évaluer leur situation de santé, et de réserver des rendez-vous en direct avec des praticiens disponibles.",
    stack: ["React + vite", "Django & OpenAI API", "PostgreSQL", "JWT", "Socket.io", "Leaflet"],
    // github_url: "https://github.com/bienvyManasse123/androidProject",
    // demo_url: "https://demo.example.com",
    image_url: "",
    featured: true,
    category: "Full Stack",
  },
  {
    id: 5,
    title: "Location Service",
    description: "Permet aux entreprises et particuliers de planifier et de réserver du matériel de chantier, d'explorer un catalogue d'équipements spécialisés, et de gérer leurs contrats de location en temps réel.",
    stack: ["React", "Node.js & Express", "MySQL & Prisma"],
    github_url: "https://github.com/Loharanontsoanael/perso-project",
    // demo_url: "https://demo.example.com",
    image_url: "",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 6,
    title: "Gestion de vente des voitures",
    description: "Permet aux concessionnaires et clients de planifier et de réserver des essais routiers, d'explorer un catalogue de véhicules neufs et d'occasion, et de gérer l'intégralité du processus de vente et d'immatriculation.",
    stack: ["Android studio", "Spring Boot", "MySQL"],
    github_url: "https://github.com/bienvyManasse123/androidProject",
    // demo_url: "https://demo.example.com",
    image_url: "",
    featured: false,
    category: "Mobile",
  },
  
]
 
// ─── Compétences ──────────────────────────────────────────
export const SKILLS: Skill[] = [

  // Frontend Categories
  { name: "React / Next.js", level: 80, category: "Frontend" },
  { name: "Tailwind CSS",    level: 80, category: "Frontend" },
  { name: "Material UI",    level: 80, category: "Frontend" },
  { name: "Framer Motion",    level: 80, category: "Frontend" },
  { name: "TypeScript",      level: 70, category: "Frontend" },
  { name: "VueJS",      level: 70, category: "Frontend" },
  { name: "Flutter",      level: 70, category: "Frontend" },
  { name: "Android Studio",      level: 70, category: "Frontend" },

  // Backend Categories
  { name: "Symfony", level: 80, category: "Backend" },
  { name: "API PlatForm", level: 80, category: "Backend" },
  { name: "Laravel", level: 80, category: "Backend" },
  { name: "Django", level: 80, category: "Backend" },
  { name: "FastAPI", level: 82, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "Node JS & Express", level: 80, category: "Backend" },
  { name: "Rest API", level: 80, category: "Backend" },
  { name: "Spring Boot", level: 80, category: "Backend" },
  
  // IA Categories
  { name: "OpenAI Vision", level: 80, category: "IA" },
  { name: "OpenAI API", level: 80, category: "IA" },
  { name: "Anthropic API", level: 80, category: "IA" },
  { name: "LangChain", level: 80, category: "IA" },
  { name: "Groq Cloud API", level: 80, category: "IA" },
  { name: "Hugging Face Inference API", level: 80, category: "IA" }, // Pour accéder à plus de 100 000 modèles Open Source spécialisés

  // Sgbd categories
  { name: "PostgreSQL",      level: 75, category: "Sgbd" },
  { name: "MySQL",      level: 75, category: "Sgbd" },
  { name: "Mongo DB",      level: 70, category: "Sgbd" },
  { name: "Redis",      level: 70, category: "Sgbd" },

  // DevOps Catégories
  { name: "Docker / Docker Compose", level: 70, category: "DevOps" },
  { name: "Git / GitHub / GitHub actions", level: 92, category: "DevOps" },
  { name: "Kubernetes", level: 70, category: "DevOps" },
  { name: "GCP", level: 70, category: "DevOps" },
  { name: "AWS", level: 70, category: "DevOps" },

  // Quality Categories
  { name: "Adaptabilité",    level: 92, category: "Quality" },
  { name: "LeaderShip",    level: 92, category: "Quality" },
  { name: "Esprit critique",    level: 92, category: "Quality" },
  { name: "Esprit d'équite",    level: 92, category: "Quality" },
  { name: "Rigueur",    level: 92, category: "Quality" },
]
 
// ─── Services ─────────────────────────────────────────────
export const SERVICES = [

  {
    icon: "⬕",
    // count: "7",
    title: "Web Developement",
    description: "Sites web responsive et performants, de la maquette au déploiement. J'intègre l'IA au cœur de vos applications pour transformer l'expérience utilisateur en moteur de performance.",
  },
  {
    icon: "◈",
    // count: "5",
    title: "UI & UX Design",
    description: "Création d'interfaces élégantes centrées sur l'expérience utilisateur. Je transforme vos concepts en interfaces élégantes où chaque interaction est pensée pour l'utilisateur.",
  },
  {
    icon: "⬡",
    // count: "32",
    title: "Optimisation & Performance",
    description: "Je redonne de la vitesse à vos plateformes. En affinant votre code et en exploitant l'IA, je transforme vos systèmes existants en outils ultra-rapides, fluides et adaptés à votre croissance.",
  },
  
]