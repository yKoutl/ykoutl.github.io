import React from 'react';
import { THEME } from '../../constants/theme';

const Footer = ({ darkMode, name, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  
  return (
    <footer className="py-8 text-center border-t" 
            style={{ 
              backgroundColor: theme.bg, 
              borderColor: `${theme.paragraph}20`
            }}>
      <p className="text-sm opacity-60" 
         style={{ color: theme.paragraph }}>
        © {new Date().getFullYear()} {name}. Creado con React & Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;
