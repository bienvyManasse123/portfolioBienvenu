export type Lang = "FR" | "EN"

export const translations = {
  FR: {
    nav: {
      home: "Accueil",
      about: "A propos",
      services: "Services",
      work: "Projets",
      contact: "Contact",
      cta: "Discutons",
      active: "actif",
    },
    hero: {
      available: "Disponible actuellement",
      intro: "Hello, je suis Bienvenu Manasse,",
      typed: ["Developpeur Full Stack & Integrateur IA.", "Designer UI/UX."],
      description:
        "Passionne par la creation d'applications web performantes et elegantes. Je mise sur l'IA et l'agilite du Cloud pour transformer vos idees en plateformes de haute performance. Base a Madagascar, je suis pret a collaborer sur vos projets a distance.",
      downloadCv: "Telecharger CV",
      scroll: "Scroll",
    },
    about: {
      title: "A propos de moi",
      description:
        "Diplome de l'Ecole Nationale d'Informatique de Madagascar et toujours passionne par l'informatique, j'ai acquis une solide formation qui m'a permis de developper des competences variees dans ce domaine. Mon portfolio presente une selection de mes projets, allant de la programmation au developpement web, en passant par l'intelligence artificielle et la gestion de bases de donnees. Chaque projet que vous decouvrirez ici reflete ma passion, mon engagement et ma capacite a resoudre des problemes complexes. Mon objectif est de continuer a innover et a fournir des solutions de haute qualite, que ce soit dans un cadre professionnel ou collaboratif. Je vous invite a explorer mes realisations et a me contacter pour toute collaboration ou opportunite professionnelle.",
      contactDirect: "Contact direct",
      hireMe: "Me recruter",
      downloadCv: "Telecharger CV",
      stats: ["Ans d'experience", "Projets termines", "Clients satisfaits"],
    },
    services: {
      title: "Services",
      sub: "Ce que je peux faire pour vous",
      items: [
        {
          title: "Developpement Web",
          description:
            "Sites web responsives et performants, de la maquette au deploiement. J'integre l'IA au coeur de vos applications pour transformer l'experience utilisateur en moteur de performance.",
        },
        {
          title: "UI & UX Design",
          description:
            "Creation d'interfaces elegantes centrees sur l'experience utilisateur. Je transforme vos concepts en interfaces elegantes ou chaque interaction est pensee pour l'utilisateur.",
        },
        {
          title: "Optimisation & Performance",
          description:
            "J'ameliore la vitesse de vos plateformes. En affinant votre code et en exploitant l'IA, je transforme vos systemes existants en outils rapides, fluides et adaptes a votre croissance.",
        },
      ],
    },
    skills: {
      title: "Competences",
      sub: "Mes outils",
    },
    projects: {
      title: "Projets",
      filters: {
        all: "Tous",
        fullStack: "Full Stack",
        mobile: "Mobile",
        uiux: "UI/UX Design",
      },
      empty: "Projet en cours...",
      moreTextPrefix: "Et",
      moreTextSuffix: "autres projets a decouvrir",
      showAllBtn: "Voir tous les projets",
      allShownPrefix: "Tous les",
      allShownSuffix: "projets sont affiches",
      items: {
        1: {
          title: "SMARTMATCH AI",
          description:
            "Permet aux recruteurs d'automatiser le tri et le classement des candidatures, d'analyser la coherence des parcours professionnels par IA, et de faciliter la prise de decision collaborative pour identifier les meilleurs talents sans biais.",
        },
        2: {
          title: "Plateforme de Voyage Personnalises et d'Exploration Touristique",
          description:
            "Permet aux utilisateurs de planifier et de reserver des voyages personnalises, d'explorer des destinations touristiques, et de partager leurs experiences de voyage.",
        },
        3: {
          title: "Gestion des etudiants",
          description:
            "Application mobile de gestion des etudiants, notes, moyennes, statistiques et visualisations graphiques.",
        },
        4: {
          title: "HealthPal",
          description:
            "Permet aux patients de rechercher et localiser les medecins les plus proches, de consulter une IA via un chatbot intelligent pour evaluer leur situation de sante, et de reserver des rendez-vous en direct.",
        },
        5: {
          title: "Location Service",
          description:
            "Permet aux entreprises et particuliers de planifier et reserver du materiel de chantier, d'explorer un catalogue d'equipements specialises, et de gerer leurs contrats de location en temps reel.",
        },
        6: {
          title: "Gestion de vente des voitures",
          description:
            "Permet aux concessionnaires et clients de planifier et reserver des essais routiers, d'explorer un catalogue de vehicules neufs et d'occasion, et de gerer tout le processus de vente.",
        },
        7: {
          title: "Gestion de vente des voitures",
          description:
            "Permet aux concessionnaires et clients de planifier et reserver des essais routiers, d'explorer un catalogue de vehicules neufs et d'occasion, et de gerer tout le processus de vente.",
        },
      },
    },
    contact: {
      title: "Contact",
      sub: "Parlons de ton projet",
      cardTitle: "Tu as une idee ?",
      cardHighlight: "Concretisons-la ensemble.",
      cardText:
        "Que ce soit pour un projet freelance, une collaboration ou juste pour dire bonjour, mon inbox est toujours ouvert. Je reponds generalement sous 24h.",
      successTitle: "Message envoye !",
      successText: "Merci pour ton message. Je te reviens dans les 24h.",
      sendAnother: "Envoyer un autre message",
      errorFallback: "Une erreur est survenue. Reessaie dans un moment.",
      fields: {
        name: "Ton nom",
        email: "Email",
        subject: "Sujet",
        message: "Message",
      },
      placeholders: {
        name: "Jean Dupont",
        email: "jean@email.com",
        subject: "Developpement d'une application web...",
        message: "Decris ton projet, tes besoins...",
      },
      loading: "Envoi en cours...",
      submit: "Envoyer le message",
    },
    footer: {
      tagline:
        "Developpeur Full Stack & Designer UI/UX base a Madagascar. Je transforme des idees en experiences digitales memorables.",
      navigation: "Navigation",
      social: "Reseaux sociaux",
      contactLabel: "Contact :",
      designedBy: "Designe & developpe par",
    },
  },
  EN: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      work: "Work",
      contact: "Contact",
      cta: "Let's Talk",
      active: "active",
    },
    hero: {
      available: "Available now",
      intro: "Hello, I'm Bienvenu Manasse,",
      typed: ["Full Stack Developer & AI Integrator", "UI/UX Designer."],
      description:
        "Passionate about building elegant and high-performance web applications. I leverage AI and cloud agility to turn ideas into robust digital platforms. Based in Madagascar, I am ready to collaborate remotely on your projects.",
      downloadCv: "Download CV",
      scroll: "Scroll",
    },
    about: {
      title: "About me",
      description:
        "Graduated from the National School of Computer Science of Madagascar and still deeply passionate about technology, I gained a strong academic foundation that helped me build versatile skills in this field. My portfolio showcases a selection of my projects, ranging from programming and web development to artificial intelligence and database management. Each project you will discover here reflects my passion, commitment, and ability to solve complex problems. My goal is to keep innovating and delivering high-quality solutions, whether in a professional or collaborative context. I invite you to explore my work and contact me for any collaboration or professional opportunity.",
      contactDirect: "Direct contact",
      hireMe: "Hire me",
      downloadCv: "Download CV",
      stats: ["Years of experience", "Completed projects", "Happy clients"],
    },
    services: {
      title: "Services",
      sub: "What I will do for you",
      items: [
        {
          title: "Web Development",
          description:
            "Responsive and high-performance websites from mockup to deployment. I bring AI into your apps to improve user experience and business outcomes.",
        },
        {
          title: "UI & UX Design",
          description:
            "Elegant user-centered interfaces. I transform concepts into polished designs where every interaction is intentional.",
        },
        {
          title: "Optimization & Performance",
          description:
            "I improve platform speed and reliability. By refining code and leveraging AI, I turn existing systems into fast and scalable products.",
        },
      ],
    },
    skills: {
      title: "Skills",
      sub: "My toolkit",
    },
    projects: {
      title: "Work",
      filters: {
        all: "All",
        fullStack: "Full Stack",
        mobile: "Mobile",
        uiux: "UI/UX Design",
      },
      empty: "Project in progress...",
      moreTextPrefix: "And",
      moreTextSuffix: "more projects to discover",
      showAllBtn: "Show all projects",
      allShownPrefix: "All",
      allShownSuffix: "projects are displayed",
      items: {
        1: {
          title: "SMARTMATCH AI",
          description:
            "Helps recruiters automate candidate sorting and ranking, analyze career consistency with AI, and support collaborative hiring decisions to identify top talent without bias.",
        },
        2: {
          title: "Personalized Travel and Tourism Exploration Platform",
          description:
            "Allows users to plan and book personalized trips, explore travel destinations, and share their travel experiences.",
        },
        3: {
          title: "Student Management",
          description:
            "Mobile app for student management with grades, averages, statistics, and chart visualizations.",
        },
        4: {
          title: "HealthPal",
          description:
            "Enables patients to find nearby doctors, consult an AI chatbot to assess their health situation, and book live appointments with available practitioners.",
        },
        5: {
          title: "Equipment Rental Service",
          description:
            "Allows businesses and individuals to schedule and book construction equipment, explore a specialized catalog, and manage rental contracts in real time.",
        },
        6: {
          title: "Car Sales Management",
          description:
            "Helps dealerships and clients schedule test drives, browse new and used vehicle catalogs, and manage the full sales workflow.",
        },
        7: {
          title: "Car Sales Management",
          description:
            "Helps dealerships and clients schedule test drives, browse new and used vehicle catalogs, and manage the full sales workflow.",
        },
      },
    },
    contact: {
      title: "Contact",
      sub: "Let's talk about your project",
      cardTitle: "Have an idea?",
      cardHighlight: "Let's build it together.",
      cardText:
        "Whether it is a freelance project, a collaboration, or just to say hello, my inbox is always open. I usually reply within 24 hours.",
      successTitle: "Message sent!",
      successText: "Thanks for your message. I will get back to you within 24h.",
      sendAnother: "Send another message",
      errorFallback: "Something went wrong. Please try again shortly.",
      fields: {
        name: "Your name",
        email: "Email",
        subject: "Subject",
        message: "Message",
      },
      placeholders: {
        name: "John Doe",
        email: "john@email.com",
        subject: "Web application development...",
        message: "Describe your project and your needs...",
      },
      loading: "Sending...",
      submit: "Send message",
    },
    footer: {
      tagline:
        "Full Stack Developer & UI/UX Designer based in Madagascar. I turn ideas into memorable digital experiences.",
      navigation: "Navigation",
      social: "Social links",
      contactLabel: "Contact:",
      designedBy: "Designed & developed by",
    },
  },
} as const
