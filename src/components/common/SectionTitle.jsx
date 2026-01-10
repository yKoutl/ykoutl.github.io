import React from 'react';
import { THEME } from '../../constants/theme';

const SectionTitle = ({ children, id, darkMode, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  
  return (
    <div className="flex flex-col items-center mb-12">
      <h2 id={id} className="text-3xl md:text-4xl font-bold mb-4 relative z-10" style={{ color: theme.headline }}>
        {children}
      </h2>
      <div className="w-20 h-1.5 rounded-full" style={{ backgroundColor: theme.button }}></div>
    </div>
  );
};

export default SectionTitle;
