import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Palette } from 'lucide-react';
import { THEME } from '../../constants/theme';

const Navbar = ({ darkMode, setDarkMode, lightTheme, setLightTheme, darkTheme, setDarkTheme, isMenuOpen, setIsMenuOpen, activeSection, scrollToSection, alias }) => {
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  const currentTheme = darkMode ? THEME[darkTheme] : THEME[lightTheme];
  
  const lightThemes = [
    { key: 'light', name: 'Naranja', color: '#ff8e3c' },
    { key: 'lightGray', name: 'Gris-Rosa', color: '#078080' },
    { key: 'lightBlue', name: 'Azul', color: '#3da9fc' },
    { key: 'lightTeal', name: 'Turquesa', color: '#faae2b' },
  ];
  
  const darkThemes = [
    { key: 'darkOrange', name: 'Naranja', color: '#ff8906' },
    { key: 'darkBrown', name: 'Marrón', color: '#ffc0ad' },
    { key: 'darkTeal', name: 'Turquesa', color: '#f9bc60' },
    { key: 'darkNavy', name: 'Azul Marino', color: '#eebbc3' },
  ];
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
           backgroundColor: `${currentTheme.bg}dd`,
           borderColor: `${currentTheme.paragraph}20` 
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex-shrink-0 font-bold text-2xl tracking-tighter cursor-pointer font-mono hover:scale-105 transition-transform" 
            onClick={() => scrollToSection('home')}
            style={{ color: currentTheme.button }}
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
                    color: activeSection === link.id ? currentTheme.button : currentTheme.paragraph
                  }}
                >
                  {link.name}
                </button>
              ))}
              <div className="relative">
                <button 
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className="p-2 rounded-full transition-colors"
                  style={{ 
                    backgroundColor: currentTheme.card,
                    color: currentTheme.button
                  }}
                  aria-label="Cambiar Paleta"
                >
                  <Palette size={20} />
                </button>
                
                {showThemeSelector && (
                  <div className="absolute right-0 mt-2 p-2 rounded-lg shadow-xl border"
                       style={{ 
                         backgroundColor: currentTheme.card,
                         borderColor: `${currentTheme.paragraph}30`
                       }}>
                    {(darkMode ? darkThemes : lightThemes).map((theme) => (
                      <button
                        key={theme.key}
                        onClick={() => {
                          if (darkMode) {
                            setDarkTheme(theme.key);
                          } else {
                            setLightTheme(theme.key);
                          }
                          setShowThemeSelector(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:opacity-80 transition-opacity w-full"
                        style={{
                          backgroundColor: (darkMode ? darkTheme === theme.key : lightTheme === theme.key) ? `${theme.color}20` : 'transparent'
                        }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.color }}
                        />
                        <span style={{ color: currentTheme.paragraph }}>{theme.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full transition-colors"
                style={{ 
                  backgroundColor: currentTheme.card,
                  color: currentTheme.button
                }}
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setShowThemeSelector(!showThemeSelector)}
              className="p-2 rounded-full"
              style={{ backgroundColor: currentTheme.card, color: currentTheme.button }}
            >
              <Palette size={20} />
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full"
              style={{ backgroundColor: currentTheme.card, color: currentTheme.button }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              style={{ color: currentTheme.headline }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-b shadow-xl"
             style={{ backgroundColor: currentTheme.bg, borderColor: `${currentTheme.paragraph}20` }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
                style={{ color: currentTheme.paragraph }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Selector de temas mobile */}
      {showThemeSelector && (
        <div className="md:hidden border-b shadow-xl"
             style={{ backgroundColor: currentTheme.card, borderColor: `${currentTheme.paragraph}30` }}>
          <div className="px-4 py-3">
            <p className="text-sm font-medium mb-2" style={{ color: currentTheme.headline }}>Paleta de Colores</p>
            <div className="space-y-2">
              {(darkMode ? darkThemes : lightThemes).map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => {
                    if (darkMode) {
                      setDarkTheme(theme.key);
                    } else {
                      setLightTheme(theme.key);
                    }
                    setShowThemeSelector(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded w-full hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: (darkMode ? darkTheme === theme.key : lightTheme === theme.key) ? `${theme.color}20` : 'transparent'
                  }}
                >
                  <div 
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span style={{ color: currentTheme.paragraph }}>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
