import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { THEME } from '../../constants/theme';

const Navbar = ({ darkMode, setDarkMode, isMenuOpen, setIsMenuOpen, activeSection, scrollToSection, alias }) => {
  const navLinks = [
    { name: 'Inicio', id: 'home' },
    { name: 'Sobre Mí', id: 'about' },
    { name: 'Experiencia', id: 'experience' },
    { name: 'Proyectos', id: 'projects' },
    { name: 'Contacto', id: 'contact' },
  ];

  return (
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
            &lt;{alias} /&gt;
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
  );
};

export default Navbar;
