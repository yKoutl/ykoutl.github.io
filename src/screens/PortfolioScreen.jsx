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

const PortfolioScreen = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Cargar datos desde localStorage o usar los iniciales
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("portfolioData");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

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

  const bgStyle = { backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg };

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans" style={bgStyle}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        alias={data.profile.alias}
      />
      
      <Hero darkMode={darkMode} profile={data.profile} scrollToSection={scrollToSection} />
      <About darkMode={darkMode} profile={data.profile} skills={data.skills} />
      <Experience darkMode={darkMode} experience={data.experience} />
      <Projects darkMode={darkMode} projects={data.projects} />
      <Contact darkMode={darkMode} profile={data.profile} />
      <Footer darkMode={darkMode} name={data.profile.name} />
      
      <AIChatWidget darkMode={darkMode} data={data} />
    </div>
  );
};

export default PortfolioScreen;
