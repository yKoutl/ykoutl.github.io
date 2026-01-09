import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  BarChart, 
  Network, 
  Database,
  Briefcase,
  User,
  Send,
  Download,
  Moon, 
  Sun, 
  Menu, 
  X,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Loader2,
  Bot
} from 'lucide-react';

// --- CONFIGURACIÓN DE COLORES (HAPPY HUES: VIBRANT & HIGH CONTRAST) ---
const THEME = {
  light: {
    bg: "#eff0f3",        
    card: "#ffffff",      
    headline: "#0d0d0d",  
    paragraph: "#2a2a2a", 
    button: "#ff8e3c",    
    buttonText: "#0d0d0d",
    stroke: "#0d0d0d",    
    secondary: "#ffffff", 
  },
  dark: {
    bg: "#0f0e17",        
    card: "#1a1a24",      
    headline: "#fffffe",  
    paragraph: "#a7a9be", 
    button: "#ff8906",    
    buttonText: "#fffffe",
    stroke: "#000000",    
    secondary: "#f25f4c", 
  }
};

// --- DATOS DEL PORTAFOLIO ---
const DATA = {
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

// --- COMPONENTES INTERNOS ---

const SectionTitle = ({ children, id, darkMode }) => (
  <div className="flex flex-col items-center mb-12">
    <h2 id={id} className="text-3xl md:text-4xl font-bold mb-4 relative z-10" style={{ color: darkMode ? THEME.dark.headline : THEME.light.headline }}>
      {children}
    </h2>
    <div className="w-20 h-1.5 rounded-full" style={{ backgroundColor: darkMode ? THEME.dark.button : THEME.light.button }}></div>
  </div>
);

const Card = ({ children, className = "", darkMode }) => (
  <div 
    className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${className}`}
    style={{ 
      backgroundColor: darkMode ? THEME.dark.card : THEME.light.card,
      borderColor: 'transparent',
      boxShadow: darkMode ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }}
  >
    {children}
  </div>
);

// --- COMPONENTE DE CHAT CON GEMINI ---
const AIChatWidget = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy el asistente virtual de Raul. Pregúntame sobre sus proyectos, habilidades o experiencia. ✨' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userApiKey, setUserApiKey] = useState(''); // Estado para la API Key del usuario
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Manejo de la API Key:
  // Se usa el valor ingresado por el usuario o una cadena vacía (el entorno inyectará la clave si está disponible).
  // Se eliminó la referencia a 'import.meta' para evitar errores de compilación en ciertos entornos.
  const apiKey = userApiKey || "";

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prompt del Sistema: Le damos contexto sobre el portafolio
      const systemPrompt = `
        Eres un asistente virtual profesional y amable para el portafolio de Raul Quintana.
        Tu objetivo es responder preguntas sobre Raul basándote EXCLUSIVAMENTE en los siguientes datos JSON.
        Si te preguntan algo que no está en los datos, di amablemente que no tienes esa información.
        Responde en español de manera concisa.
        
        DATOS DEL PORTAFOLIO:
        ${JSON.stringify(DATA)}
      `;

      // Llamada a la API de Gemini
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: systemPrompt + "\n\nPregunta del usuario: " + input }]
            }]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Si hay error (ej: falta API Key), mostramos input de API Key
        if (data.error?.status === 'INVALID_ARGUMENT' || data.error?.code === 400 || data.error?.code === 403) {
            throw new Error("API Key inválida o faltante.");
        }
        throw new Error("Error en la respuesta de Gemini");
      }

      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude procesar eso.";
      setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Hubo un error al conectar con mi cerebro digital 🧠. Por favor verifica tu API Key." }]);
      if (error.message.includes("API Key")) {
        setShowKeyInput(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const currentTheme = darkMode ? THEME.dark : THEME.light;

  return (
    <>
      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-50 flex items-center justify-center"
        style={{ 
          backgroundColor: currentTheme.button, 
          color: currentTheme.buttonText,
          boxShadow: `0 0 20px ${currentTheme.button}60`
        }}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Ventana de Chat */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-80 md:w-96 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border transition-all animate-in slide-in-from-bottom-10 fade-in duration-300"
          style={{ 
            backgroundColor: currentTheme.card, 
            borderColor: darkMode ? `${THEME.dark.paragraph}20` : '#e5e7eb',
            height: '500px',
            maxHeight: '80vh'
          }}
        >
          {/* Header */}
          <div className="p-4 flex items-center gap-3 border-b" 
               style={{ backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg, borderColor: darkMode ? `${THEME.dark.paragraph}20` : '#e5e7eb' }}>
            <div className="p-2 rounded-full" style={{ backgroundColor: `${currentTheme.button}20` }}>
              <Sparkles size={18} style={{ color: currentTheme.button }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: currentTheme.headline }}>Asistente IA de Raul</h3>
              <p className="text-xs opacity-70" style={{ color: currentTheme.paragraph }}>Powered by Gemini ✨</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {showKeyInput && (
                <div className="p-3 rounded-lg text-xs mb-4 border border-red-200 bg-red-50 text-red-800">
                    <p className="font-bold mb-1">Configuración requerida:</p>
                    <p className="mb-2">Para que el chat funcione en tu entorno local, necesitas una API Key de Google Gemini.</p>
                    <input 
                        type="password" 
                        placeholder="Pega tu API Key aquí..." 
                        className="w-full p-2 rounded border border-red-200"
                        value={userApiKey}
                        onChange={(e) => setUserApiKey(e.target.value)}
                    />
                    <button 
                        onClick={() => setShowKeyInput(false)}
                        className="mt-2 w-full py-1 bg-red-100 hover:bg-red-200 rounded text-red-800 font-semibold"
                    >
                        Guardar y Reintentar
                    </button>
                    <p className="mt-2 text-[10px] opacity-70">Nota: Esta clave solo se guarda en la memoria de tu navegador.</p>
                </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'rounded-tr-none' 
                      : 'rounded-tl-none'
                  }`}
                  style={{ 
                    backgroundColor: msg.role === 'user' ? currentTheme.button : (darkMode ? THEME.dark.bg : '#f3f4f6'),
                    color: msg.role === 'user' ? currentTheme.buttonText : (darkMode ? THEME.dark.paragraph : THEME.light.paragraph)
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl rounded-tl-none flex items-center gap-2" 
                     style={{ backgroundColor: darkMode ? THEME.dark.bg : '#f3f4f6' }}>
                  <Loader2 size={16} className="animate-spin" style={{ color: currentTheme.paragraph }} />
                  <span className="text-xs opacity-70" style={{ color: currentTheme.paragraph }}>Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t" style={{ borderColor: darkMode ? `${THEME.dark.paragraph}20` : '#e5e7eb' }}>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta algo..."
                className="flex-1 p-2 rounded-lg text-sm focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: darkMode ? THEME.dark.bg : '#f9fafb',
                  color: currentTheme.paragraph,
                  '--tw-ring-color': currentTheme.button
                }}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: currentTheme.button, color: currentTheme.buttonText }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Helpers de estilos dinámicos
  const bgStyle = { backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg };
  const textHeadStyle = { color: darkMode ? THEME.dark.headline : THEME.light.headline };
  const textParaStyle = { color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph };
  const btnStyle = { backgroundColor: darkMode ? THEME.dark.button : THEME.light.button, color: darkMode ? THEME.dark.buttonText : THEME.light.buttonText };
  
  // Manejo del tema global
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = THEME.dark.bg;
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = THEME.light.bg;
    }
  }, [darkMode]);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navLinks = [
    { name: 'Inicio', id: 'home' },
    { name: 'Sobre Mí', id: 'about' },
    { name: 'Experiencia', id: 'experience' },
    { name: 'Proyectos', id: 'projects' },
    { name: 'Contacto', id: 'contact' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans" style={bgStyle}>
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 backdrop-blur-md border-b transition-colors duration-300"
           style={{ 
             backgroundColor: darkMode ? `${THEME.dark.bg}dd` : `${THEME.light.bg}dd`,
             borderColor: darkMode ? `${THEME.dark.paragraph}20` : `${THEME.light.paragraph}20` 
           }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex-shrink-0 font-bold text-2xl tracking-tighter cursor-pointer font-mono hover:scale-105 transition-transform" 
              onClick={() => scrollToSection('home')}
              style={{ color: darkMode ? THEME.dark.button : THEME.light.button }}
            >
              &lt;{DATA.profile.alias} /&gt;
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm font-medium transition-colors hover:-translate-y-0.5"
                    style={{ 
                      color: activeSection === link.id 
                        ? (darkMode ? THEME.dark.button : THEME.light.button) 
                        : (darkMode ? THEME.dark.paragraph : THEME.light.paragraph) 
                    }}
                  >
                    {link.name}
                  </button>
                ))}
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full transition-colors"
                  style={{ 
                    backgroundColor: darkMode ? THEME.dark.card : THEME.light.card,
                    color: darkMode ? THEME.dark.button : THEME.light.button
                  }}
                  aria-label="Toggle Theme"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full"
                style={{ backgroundColor: darkMode ? THEME.dark.card : THEME.light.card, color: darkMode ? THEME.dark.button : THEME.light.button }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                style={{ color: darkMode ? THEME.dark.headline : THEME.light.headline }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-b shadow-xl"
               style={{ backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg, borderColor: darkMode ? `${THEME.dark.paragraph}20` : `${THEME.light.paragraph}20` }}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
                  style={{ color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-20 lg:pt-32 pb-16 lg:pb-24 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block p-2 px-4 rounded-full font-semibold text-sm mb-6 animate-fade-in-up border"
               style={{ 
                 backgroundColor: darkMode ? `${THEME.dark.button}20` : `${THEME.light.button}10`,
                 color: darkMode ? THEME.dark.button : THEME.light.button,
                 borderColor: darkMode ? `${THEME.dark.button}40` : `${THEME.light.button}20`
               }}>
            👋 Hola, bienvenido a mi portafolio
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6" style={textHeadStyle}>
            Soy <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${darkMode ? THEME.dark.button : THEME.light.button}, ${darkMode ? THEME.dark.secondary : THEME.light.button})` }}>{DATA.profile.name}</span>
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed" style={textParaStyle}>
            {DATA.profile.role}. {DATA.profile.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90 hover:translate-y-[-2px]"
              style={btnStyle}
            >
              <Code2 size={20} />
              Ver Proyectos
            </button>
            
            <a 
              href={DATA.profile.cv}
              download
              className="px-8 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg border hover:translate-y-[-2px]"
              style={{ 
                backgroundColor: darkMode ? THEME.dark.card : THEME.light.headline,
                color: darkMode ? THEME.dark.headline : THEME.light.bg,
                borderColor: 'transparent'
              }}
            >
              <Download size={20} />
              Descargar CV
            </a>

            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 rounded-lg font-semibold border transition-all flex items-center justify-center gap-2 hover:bg-opacity-5"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: darkMode ? THEME.dark.paragraph : '#ccc',
                color: darkMode ? THEME.dark.headline : THEME.light.headline
              }}
            >
              <Mail size={20} />
              Contactarme
            </button>
          </div>

          <div className="mt-16 animate-bounce" style={{ color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph }}>
            <ChevronDown size={32} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* ABOUT & SKILLS SECTION */}
      <section id="about" className="py-16" style={{ backgroundColor: darkMode ? `${THEME.dark.card}50` : `${THEME.light.card}50` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle id="about-title" darkMode={darkMode}>Sobre Mí & Habilidades</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <div>
              <div className="flex items-center gap-2 mb-4 font-bold uppercase tracking-wider text-sm" style={{ color: darkMode ? THEME.dark.button : THEME.light.button }}>
                <User size={18} />
                <span>Perfil Profesional</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 leading-tight" style={textHeadStyle}>
                Construyendo el puente entre <span style={{ color: darkMode ? THEME.dark.button : THEME.light.button }}>Datos</span> e Infraestructura.
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={textParaStyle}>
                {DATA.profile.about}
              </p>
              <div className="flex gap-4">
                {[
                  { link: DATA.profile.github, icon: <Github size={24} /> },
                  { link: DATA.profile.linkedin, icon: <Linkedin size={24} /> },
                  { link: `mailto:${DATA.profile.email}`, icon: <Mail size={24} /> }
                ].map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" 
                     className="p-2 rounded-full transition-colors hover:opacity-80"
                     style={{ backgroundColor: darkMode ? THEME.dark.card : THEME.light.card, color: darkMode ? THEME.dark.button : THEME.light.button }}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid gap-6">
              {DATA.skills.map((category, idx) => (
                <Card key={idx} className="p-6" darkMode={darkMode}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: darkMode ? `${THEME.dark.button}20` : `${THEME.light.button}20`, color: darkMode ? THEME.dark.button : THEME.light.button }}>
                      {category.icon}
                    </div>
                    <h4 className="font-bold text-lg" style={textHeadStyle}>{category.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 rounded-full text-sm font-medium border"
                            style={{ 
                              backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg,
                              color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph,
                              borderColor: darkMode ? `${THEME.dark.paragraph}30` : `${THEME.light.paragraph}30`
                            }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20" style={bgStyle}>
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle id="exp-title" darkMode={darkMode}>Experiencia Laboral</SectionTitle>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5"
               style={{ '--tw-before-bg': darkMode ? THEME.dark.stroke : '#ccc' }}>
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -ml-px" style={{ backgroundColor: darkMode ? `${THEME.dark.paragraph}40` : '#e5e7eb' }}></div>

            {DATA.experience.map((job, index) => (
              <div key={job.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Icon Marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10"
                     style={{ backgroundColor: darkMode ? THEME.dark.button : THEME.light.button, borderColor: darkMode ? THEME.dark.bg : THEME.light.bg, color: '#fff' }}>
                  <Briefcase size={16} />
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl shadow-md hover:shadow-lg transition-all border"
                     style={{ 
                       backgroundColor: darkMode ? THEME.dark.card : THEME.light.card,
                       borderColor: darkMode ? 'transparent' : 'transparent'
                     }}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h3 className="font-bold text-lg" style={textHeadStyle}>{job.role}</h3>
                    <time className="text-sm font-medium px-2 py-1 rounded" style={{ backgroundColor: darkMode ? `${THEME.dark.button}20` : `${THEME.light.button}20`, color: darkMode ? THEME.dark.button : THEME.light.button }}>{job.period}</time>
                  </div>
                  <div className="text-base font-medium mb-2" style={textParaStyle}>{job.company}</div>
                  <p className="text-sm leading-relaxed opacity-90" style={textParaStyle}>
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20" style={{ backgroundColor: darkMode ? `${THEME.dark.card}20` : `${THEME.light.card}30` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle id="proj-title" darkMode={darkMode}>Proyectos Destacados</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DATA.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group h-full flex flex-col" darkMode={darkMode}>
                <div className={`h-48 p-6 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${project.color}`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <Code2 size={64} className="text-white/80 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 transition-colors" 
                      style={{ color: darkMode ? THEME.dark.headline : THEME.light.headline }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 flex-grow opacity-90" style={textParaStyle}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2 py-1 rounded border"
                            style={{ 
                              backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg,
                              color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph,
                              borderColor: darkMode ? `${THEME.dark.paragraph}30` : `${THEME.light.paragraph}30`
                            }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <a href={project.github} className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-colors"
                       style={{ color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph }}>
                      <Github size={16} /> Código
                    </a>
                    <a href={project.link} className="flex items-center gap-1 text-sm font-medium hover:underline"
                       style={{ color: darkMode ? THEME.dark.button : THEME.light.button }}>
                      <ExternalLink size={16} /> Demo Live
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20" style={bgStyle}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionTitle id="contact-title" darkMode={darkMode}>Hablemos</SectionTitle>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={textParaStyle}>
            Disponible para colaboraciones y nuevas oportunidades profesionales.
          </p>

          <Card className="max-w-xl mx-auto p-8" darkMode={darkMode}>
            <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1" style={textParaStyle}>Nombre</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                  style={{ 
                    backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg,
                    borderColor: darkMode ? `${THEME.dark.paragraph}30` : '#ccc',
                    color: darkMode ? THEME.dark.headline : THEME.light.headline,
                    '--tw-ring-color': darkMode ? THEME.dark.button : THEME.light.button
                  }}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={textParaStyle}>Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                  style={{ 
                    backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg,
                    borderColor: darkMode ? `${THEME.dark.paragraph}30` : '#ccc',
                    color: darkMode ? THEME.dark.headline : THEME.light.headline,
                    '--tw-ring-color': darkMode ? THEME.dark.button : THEME.light.button
                  }}
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={textParaStyle}>Mensaje</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                  style={{ 
                    backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg,
                    borderColor: darkMode ? `${THEME.dark.paragraph}30` : '#ccc',
                    color: darkMode ? THEME.dark.headline : THEME.light.headline,
                    '--tw-ring-color': darkMode ? THEME.dark.button : THEME.light.button
                  }}
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              <button className="w-full py-3 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                      style={btnStyle}>
                <Send size={18} /> Enviar Mensaje
              </button>
            </form>
          </Card>

          <div className="mt-12 flex justify-center gap-8">
            <a href={`mailto:${DATA.profile.email}`} className="flex flex-col items-center gap-2 transition-colors hover:opacity-80" style={textParaStyle}>
              <div className="p-4 rounded-full shadow-sm" style={{ backgroundColor: darkMode ? THEME.dark.card : THEME.light.card }}>
                <Mail size={24} />
              </div>
              <span className="text-sm font-medium">Email</span>
            </a>
            <a href={DATA.profile.linkedin} className="flex flex-col items-center gap-2 transition-colors hover:opacity-80" style={textParaStyle}>
              <div className="p-4 rounded-full shadow-sm" style={{ backgroundColor: darkMode ? THEME.dark.card : THEME.light.card }}>
                <Linkedin size={24} />
              </div>
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t" style={{ backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg, borderColor: darkMode ? `${THEME.dark.paragraph}20` : '#e5e7eb' }}>
        <p className="text-sm opacity-60" style={textParaStyle}>
          © {new Date().getFullYear()} {DATA.profile.name}. Creado con React & Tailwind CSS.
        </p>
      </footer>

      {/* WIDGET DE CHAT IA */}
      <AIChatWidget darkMode={darkMode} />
    </div>
  );
}
