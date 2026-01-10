import React from 'react';
import { Code2, BarChart, Network, Database } from 'lucide-react';

// --- DATOS DEL PORTAFOLIO ---
export const DATA = {
  profile: {
    name: "Raul Quintana",
    alias: "ykoutl",
    role: "Programador | Analista de Datos",
    tagline: "Arquitectura de redes, código eficiente y decisiones basadas en datos.",
    about: "Soy un profesional técnico que disfruta profundizando en cómo funcionan las cosas. Mi enfoque combina la lógica estructurada del desarrollo de software con la precisión analítica de la ciencia de datos. Actualmente, estoy obsesionado con la infraestructura de redes y la ciberseguridad, buscando esa intersección donde el hardware se encuentra con el algoritmo.",
    email: "contacto@ejemplo.com",
    github: "https://github.com/ykoutl",
    linkedin: "https://linkedin.com",
    cv: "/mi-curriculum.pdf" 
  },
  skills: [
    { category: "Desarrollo", icon: <Code2 size={20} />, skills: ["Python", "React.js", "C++", "Bash Scripting", "Git"] },
    { category: "Data Science", icon: <BarChart size={20} />, skills: ["Power BI", "Pandas & NumPy", "SQL Avanzado", "Tableau", "Data Cleaning"] },
    { category: "Redes & Sec", icon: <Network size={20} />, skills: ["Modelo OSI", "Packet Tracer", "Subnetting", "Wireshark", "Firewalls"] },
    { category: "Infraestructura", icon: <Database size={20} />, skills: ["Linux Admin", "Docker", "PostgreSQL", "MongoDB", "AWS Basics"] }
  ],
  experience: [
    {
      id: 1,
      role: "Desarrollador & Analista",
      company: "Tech Solutions Inc.",
      period: "2022 - Presente",
      description: "Optimización de plataformas web críticas reduciendo tiempos de carga en un 40%. Implementación de dashboards analíticos para monitorizar KPIs de usuario en tiempo real."
    },
    {
      id: 2,
      role: "Full Stack Freelance",
      company: "Proyectos Independientes",
      period: "2020 - 2022",
      description: "Desarrollo de soluciones a medida para PYMES, desde la configuración del servidor y base de datos hasta la interfaz de usuario final."
    }
  ],
  projects: [
    {
      id: 1,
      title: "Corporate Analytics Dashboard",
      description: "Sistema centralizado de inteligencia de negocios. Ingesta datos de múltiples fuentes API y visualiza tendencias financieras críticas.",
      tags: ["React", "D3.js", "Firebase", "Node.js"],
      link: "#",
      github: "#",
      color: "from-[#ff8906] to-[#f25f4c]" 
    },
    {
      id: 2,
      title: "NLP Sentiment Engine",
      description: "Pipeline de procesamiento de lenguaje natural que clasifica feedback de clientes automáticamente con una precisión del 89%.",
      tags: ["Python", "TensorFlow", "FastAPI", "Pandas"],
      link: "#",
      github: "#",
      color: "from-[#e53170] to-[#f25f4c]" 
    },
    {
      id: 3,
      title: "Secure Network Sim",
      description: "Diseño de arquitectura de red empresarial segura simulada, implementando segmentación VLAN, ACLs estrictas y redundancia OSPF.",
      tags: ["Cisco", "Packet Tracer", "Network Sec", "VLANs"],
      link: "#",
      github: "#",
      color: "from-[#ff8906] to-[#e53170]" 
    }
  ]
};
