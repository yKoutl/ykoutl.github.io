import React from 'react';
import { THEME } from '../../constants/theme';

const SectionTitle = ({ children, id, darkMode }) => (
  <div className="flex flex-col items-center mb-12">
    <h2 id={id} className="text-3xl md:text-4xl font-bold mb-4 relative z-10" style={{ color: darkMode ? THEME.dark.headline : THEME.light.headline }}>
      {children}
    </h2>
    <div className="w-20 h-1.5 rounded-full" style={{ backgroundColor: darkMode ? THEME.dark.button : THEME.light.button }}></div>
  </div>
);

export default SectionTitle;
