import React, { useState, useEffect } from 'react';
import { THEME } from '../constants/theme';
import { DATA as INITIAL_DATA } from '../constants/data';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import AIChatWidget from '../components/common/AIChatWidget';
import WelcomeModal from '../components/common/WelcomeModal';

const PortfolioScreen = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [lightTheme, setLightTheme] = useState(() => {
    return localStorage.getItem('lightTheme') || 'light';
  });
  const [darkTheme, setDarkTheme] = useState(() => {
    return localStorage.getItem('darkTheme') || 'darkOrange';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  // Cargar datos desde localStorage o usar los iniciales
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("portfolioData");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  // Manejo del tema global
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = THEME[darkTheme].bg;
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = THEME[lightTheme].bg;
    }
  }, [darkMode, darkTheme, lightTheme]);

  // Guardar preferencias de temas
  useEffect(() => {
    localStorage.setItem('lightTheme', lightTheme);
    localStorage.setItem('darkTheme', darkTheme);
  }, [lightTheme, darkTheme]);

  // Mostrar modal de bienvenida cada vez que se actualiza la página si no ha dado like
  useEffect(() => {
    const hasLiked = localStorage.getItem('portfolio_liked');
    if (!hasLiked) {
      // Esperar un poco antes de mostrar el modal
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Recargar datos cuando cambie localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("portfolioData");
      if (saved) {
        setData(JSON.parse(saved));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const currentTheme = darkMode ? THEME[darkTheme] : THEME[lightTheme];
  const bgStyle = { backgroundColor: currentTheme.bg };

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans" style={bgStyle}>
      {/* Modal de bienvenida */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        profile={data.profile}
        theme={currentTheme}
      />
      
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        lightTheme={lightTheme}
        setLightTheme={setLightTheme}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        alias={data.profile.alias}
      />
      
      <Hero darkMode={darkMode} profile={data.profile} scrollToSection={scrollToSection} currentTheme={currentTheme} />
      <About darkMode={darkMode} profile={data.profile} skills={data.skills} currentTheme={currentTheme} />
      <Experience darkMode={darkMode} experience={data.experience} currentTheme={currentTheme} />
      <Projects darkMode={darkMode} projects={data.projects} currentTheme={currentTheme} />
      <Contact darkMode={darkMode} profile={data.profile} currentTheme={currentTheme} />
      <Footer darkMode={darkMode} name={data.profile.name} currentTheme={currentTheme} />
      
      <AIChatWidget darkMode={darkMode} data={data} currentTheme={currentTheme} />
    </div>
  );
};

export default PortfolioScreen;
