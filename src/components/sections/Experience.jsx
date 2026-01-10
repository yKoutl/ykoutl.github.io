import React from 'react';
import { Briefcase } from 'lucide-react';
import { THEME } from '../../constants/theme';
import SectionTitle from '../common/SectionTitle';

const Experience = ({ darkMode, experience }) => {
  const bgStyle = { backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg };
  const textHeadStyle = { color: darkMode ? THEME.dark.headline : THEME.light.headline };
  const textParaStyle = { color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph };

  return (
    <section id="experience" className="py-20" style={bgStyle}>
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle id="exp-title" darkMode={darkMode}>Experiencia Laboral</SectionTitle>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5"
             style={{ '--tw-before-bg': darkMode ? THEME.dark.stroke : '#ccc' }}>
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -ml-px" style={{ backgroundColor: darkMode ? `${THEME.dark.paragraph}40` : '#e5e7eb' }}></div>

          {experience.map((job, index) => (
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
  );
};

export default Experience;
