import React from 'react';
import { THEME } from '../../constants/theme';

const Card = ({ children, className = "", darkMode, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  
  return (
    <div 
      className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${className}`}
      style={{ 
        backgroundColor: theme.card,
        borderColor: 'transparent',
        boxShadow: darkMode ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
    >
      {children}
    </div>
  );
};

export default Card;
