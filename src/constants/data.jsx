import React from 'react';
import { Code2, BarChart, Network, Database } from 'lucide-react';

// --- DATOS DEL PORTAFOLIO ---
export const DATA = {
  profile: {
    name: "Raul Quintana",
    alias: "ykoutl",
    role: "Programador Junior",
    tagline: "Estudiante de Ingeniería Informática enfocado en el desarrollo web y gestión de bases de datos.",
    about: "Soy un profesional técnico que disfruta profundizando en cómo funcionan las cosas. Mi enfoque combina la lógica estructurada del desarrollo de software con la precisión analítica de la ciencia de datos. Actualmente, estoy obsesionado con la infraestructura de redes y la ciberseguridad, buscando esa intersección donde el hardware se encuentra con el algoritmo.",
    email: "raulquintanazinc@gmail.com",
    phone: "+51 982-109-407",
    location: "2000 Av 26 de Noviembre, Villa María del Triunfo",
    github: "https://github.com/yKoutl",
    linkedin: "https://linkedin.com",
    cv: "/mi-curriculum.pdf" 
  },
  
  education: [
    {
      id: 1,
      degree: "Ingeniería Informática",
      institution: "Universidad Ricardo Palma | Lima",
      period: "2022 - ACTUAL",
      location: "Av. Alfredo Benavides 5440, Santiago de Surco 15039",
      description: "Beca de Rendimiento Académico (2023 - 2025) - Facultad de Ingeniería Informática",
      image: "https://i.postimg.cc/GpFDrz8q/urp.png",
      website: "https://www.urp.edu.pe/"
    },
    {
      id: 2,
      degree: "Taller de Computación e Informática",
      institution: "INET BIRF | Lima",
      period: "2016 - 2020",
      location: "Dirección: Av. 28 de Julio s.n, Villa María del Triunfo 15817",
      image: "https://i.postimg.cc/1tyqz6Ds/Peru-Birf.jpg",
      website: "https://eptrepublicadelecuador.weebly.com/historia.html"
    }
  ],
  
  skills: [
    { 
      category: "Ofimática avanzada", 
      icon: <Code2 size={20} />, 
      skills: ["Excel (macros y VBA)", "PowerPoint", "Canva", "Power BI"],
      level: "Avanzado"
    },
    { 
      category: "Programación", 
      icon: <BarChart size={20} />, 
      skills: ["Java", "Python", "Visual Studio (C#)", "C++", "JavaScript"],
      level: "Avanzado"
    },
    { 
      category: "Bases de datos", 
      icon: <Database size={20} />, 
      skills: ["MySQL", "MongoDB", "SQL Server", "Oracle", "PL/SQL"],
      level: "Intermedio"
    },
    { 
      category: "Diseño web", 
      icon: <Network size={20} />, 
      skills: ["HTML5", "CSS3", "Node.js"],
      level: "Intermedio"
    },
    { 
      category: "Frameworks", 
      icon: <Code2 size={20} />, 
      skills: ["Next.js", "Astro", "React", "Angular", "etc"],
      level: "Intermedio"
    }
  ],
  
  experience: [
    {
      id: 1,
      role: "Junior WordPress Developer",
      company: "iSecurity I-SEC",
      companyUrl: "https://i-sec.us/",
      period: "JULIO, 2025 - OCT. 2025",
      type: "Remoto",
      image: "https://i.postimg.cc/KjRh7qtK/security.png",
      description: "Desarrollo y diseño del sitio web corporativo en WordPress, creación de páginas y formularios de contacto, implementación completa de páginas del sitio, optimización de diseño responsive con HTML, CSS, JS. Actualización del directorio activo de la empresa, administración de dominio activo federado.",
      tags: ["WordPress", "HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
      id: 2,
      role: "Practicante pre-profesional Desarrollador de Aplicaciones",
      company: "NOS PLANET S.A.C",
      companyUrl: "https://nosplanet.org/",
      period: "NOV. 2025 - ACTUALIDAD",
      type: "Remoto",
      image: "https://i.postimg.cc/CxmytpJt/NOS-PLANET-DE-VERDAD.png",
      description: "Apoyo en el desarrollo frontend de aplicación móvil con React Native, realizando maquetación de interfaces, diseño de vistas de usuario e integración con Google Maps.",
      tags: ["React Native", "JavaScript", "Google Maps API", "Mobile Development"]
    }
  ],
  
  projects: [
    {
      id: 1,
      title: "Sistema Web Gestión Académica y Pagos - Colegio Virgen de la Natividad",
      description: "Desarrollo de un sistema web para la gestión académica y pagos del alumnado del Colegio Virgen de la Natividad, Lima Perú, 2024",
      tags: ["Angular 18", "Tailwind CSS", "Angular Material", "Frontend"],
      link: "https://vn-front-web.vercel.app/",
      github: "https://github.com/yKoutl/gastonrodrig/virgen-natividad-web",
      image: "https://i.postimg.cc/G3Gmf9Dm/virgen-natividad.png",
      color: "from-[#ff8906] to-[#f25f4c]",
      year: "2024-2025",
      role: "Frontend Developer"
    },
    {
      id: 2,
      title: "App Móvil de Primeros Auxilios con IA",
      description: "Desarrollo de App Móvil de Primeros Auxilios con Integración de Asistente IA y Geolocalización para Atención Inmediata de Emergencias, 2025",
      tags: ["React Native", "Expo", "JavaScript", "IA", "Geolocation"],
      link: "https://github.com/yKoutl/AppGuiaAuxilios",
      github: "https://github.com/yKoutl/AppGuiaAuxilios",
      image: "https://i.postimg.cc/YCpfXhXS/app-auxilios.png",
      color: "from-[#e53170] to-[#f25f4c]",
      year: "2025",
      role: "Full Stack Mobile Developer"
    },
    {
      id: 3,
      title: "Aplicativo Móvil Gestión de Reciclaje 'Recycle'",
      description: "Desarrollo de Aplicativo Móvil de Gestión de Reciclaje 'Recycle' para Nos Planet S.A.C, 2025",
      tags: ["React Native", "Expo", "JavaScript", "Sustainability", "Mobile"],
      link: "https://github.com/yKoutl/ChethhSito/Recycle-Front-App",
      github: "https://github.com/yKoutl/ChethhSito/Recycle-Front-App",
      image: "https://i.postimg.cc/gjX89pv8/recycle-images.png",
      color: "from-[#ff8906] to-[#e53170]",
      year: "2025",
      role: "Full Stack Mobile Developer"
    },
    {
      id: 4,
      title: "Sistema Web Operativo Empresa Level Music Corp S.A.C.",
      description: 'Desarrollo de sistema Web y Móvil para Mejorar Eficiencia Operativa de la Empresa "Level Music Corp S.A.C", 2025',
      tags: ["React", "Redux", "Firebase", "Material-UI", "Vite", "Vercel"],
      link: "https://level-music.vercel.app/",
      github: "https://github.com/yKoutl/gastonrodrig/level-music-web",
      image: "https://i.postimg.cc/26qVyw3X/level-music.png",
      color: "from-[#3da9fc] to-[#ff8906]",
      year: "2025",
      role: "Full Stack Developer"
    },
    {
      id: 5,
      title: "VectorStudio - Plataforma de Restauración y Vectorización con IA",
      description: "Desarrollo de una aplicación web SPA para el procesamiento avanzado de imágenes digitales, integrando modelos de inteligencia artificial para la restauración, escalado y conversión a vectores en tiempo real.",
      tags: ["React", "IA", "Image Processing", "SPA", "Tailwind CSS"],
      link: "#",
      github: "#",
      color: "from-gray-400 to-gray-600",
      year: "2026",
      role: "Frontend Developer",
      inDevelopment: true,
      location: "Lima, Perú"
    },
    {
      id: 6,
      title: "VANTAGE SaaS - Plataforma de Gestión Empresarial",
      description: "Desarrollo de una interfaz web de alto impacto y arquitectura de componentes para la suite de gestión empresarial VANTAGE. Implementación de un diseño estilo Studio (Editorial), optimización de rendimiento (Core Web Vitals) y desarrollo modular con React y Tailwind CSS para el mercado B2B global.",
      tags: ["React", "Tailwind CSS", "SaaS", "B2B", "UI Design"],
      link: "#",
      github: "#",
      color: "from-gray-400 to-gray-600",
      year: "2026",
      role: "Frontend Developer & UI Designer",
      inDevelopment: true,
      location: "Lima, Perú"
    }
  ],
  
  achievements: [
    {
      title: "Beca de Rendimiento Académico",
      organization: "Universidad Ricardo Palma",
      period: "2023 - 2025",
      description: "Facultad de Ingeniería Informática"
    }
  ]
};
