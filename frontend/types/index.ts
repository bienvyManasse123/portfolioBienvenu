// Types TypeScript partagés dans tout le projet
// On les définit une fois ici, on les importe partout
 
export interface Project {
    id: number
    title: string
    description: string
    stack: string[]
    github_url?: string
    demo_url?: string
    image_url?: string
    featured: boolean
    category: "UI/UX Design" | "Branding" | "Web Design" | "Full Stack"
  }
   
  export interface Skill {
    name: string
    level: number // 0-100
    category: "Frontend" | "Backend" | "DevOps" | "Tools"
  }
   
  export interface NavLink {
    label: string
    href: string
  }
   
  export interface Stat {
    value: string
    label: string
  }