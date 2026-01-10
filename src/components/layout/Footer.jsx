import React from 'react';
import { THEME } from '../../constants/theme';

const Footer = ({ darkMode, name }) => {
  return (
    <footer className="py-8 text-center border-t" 
            style={{ 
              backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg, 
              borderColor: darkMode ? `${THEME.dark.paragraph}20` : '#e5e7eb' 
            }}>
      <p className="text-sm opacity-60" 
         style={{ color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph }}>
        © {new Date().getFullYear()} {name}. Creado con React & Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;
