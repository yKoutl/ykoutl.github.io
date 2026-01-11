import React from 'react';
import { GraduationCap, MapPin, ExternalLink } from 'lucide-react';
import { THEME } from '../../constants/theme';
import SectionTitle from '../common/SectionTitle';
import AnimatedBackground from '../common/AnimatedBackground';

const Education = ({ darkMode, education, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  const bgStyle = { backgroundColor: theme.bg };
  const textHeadStyle = { color: theme.headline };
  const textParaStyle = { color: theme.paragraph };

  return (
    <section id="education" className="py-20 relative overflow-hidden" style={bgStyle}>
      <AnimatedBackground darkMode={darkMode} currentTheme={theme} />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionTitle id="edu-title" darkMode={darkMode} currentTheme={theme}>Formación Académica</SectionTitle>
        
        <div className="space-y-6">
          {education.map((edu) => (
            <div 
              key={edu.id} 
              className="rounded-xl shadow-md hover:shadow-lg transition-all border overflow-hidden"
              style={{ 
                backgroundColor: theme.card,
                borderColor: `${theme.button}20`
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Institution Logo - Left Side */}
                {edu.image && (
                  <div className="md:w-48 flex-shrink-0" style={{ backgroundColor: `${theme.button}10` }}>
                    <img 
                      src={edu.id === 1 ? "https://i.postimg.cc/SsTxpt4v/urp-falc.jpg" : edu.image}
                      srcSet={edu.id === 1 ? "https://i.postimg.cc/SsTxpt4v/urp-falc.jpg 640w, https://i.postimg.cc/GpFDrz8q/urp.png 768w" : undefined}
                      sizes={edu.id === 1 ? "(max-width: 768px) 100vw, 192px" : undefined}
                      alt={edu.institution}
                      className="w-full h-48 md:h-full object-cover rounded-[-200px] p-4"
                    />
                  </div>
                )}
                
                {/* Content - Right Side */}
                <div className="flex-1 p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div 
                      className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                      style={{ backgroundColor: `${theme.button}20`, color: theme.button }}
                    >
                      <GraduationCap size={24} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-xl" style={textHeadStyle}>
                          {edu.degree}
                        </h3>
                        <time 
                          className="text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap" 
                          style={{ backgroundColor: `${theme.button}20`, color: theme.button }}
                        >
                          {edu.period}
                        </time>
                      </div>
                      
                      <div className="mb-2">
                        <div className="text-base font-semibold mb-1" style={{ color: theme.button }}>
                          {edu.institution}
                        </div>
                        {edu.location && (
                          <div className="text-sm flex items-center gap-1 opacity-80" style={textParaStyle}>
                            <MapPin size={14} />
                            {edu.location}
                          </div>
                        )}
                      </div>
                      
                      {edu.description && (
                        <p className="text-sm leading-relaxed mb-3" style={textParaStyle}>
                          {edu.description}
                        </p>
                      )}
                      
                      {edu.website && (
                        <a
                          href={edu.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm hover:underline"
                          style={{ color: theme.button }}
                        >
                          Visitar sitio web
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
