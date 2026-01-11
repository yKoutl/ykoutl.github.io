import React from 'react';
import { Briefcase, ExternalLink, MapPin } from 'lucide-react';
import { THEME } from '../../constants/theme';
import SectionTitle from '../common/SectionTitle';
import AnimatedBackground from '../common/AnimatedBackground';

const Experience = ({ darkMode, experience, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  const bgStyle = { backgroundColor: theme.bg };
  const textHeadStyle = { color: theme.headline };
  const textParaStyle = { color: theme.paragraph };

  return (
    <section id="experience" className="py-20 relative" style={bgStyle}>
      <AnimatedBackground darkMode={darkMode} currentTheme={theme} sectionId="experience" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionTitle id="exp-title" darkMode={darkMode} currentTheme={theme}>Experiencia Laboral</SectionTitle>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5"
             style={{ '--tw-before-bg': theme.stroke }}>
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -ml-px" style={{ backgroundColor: `${theme.paragraph}40` }}></div>

          {experience.map((job) => (
            <div key={job.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon Marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10"
                   style={{ backgroundColor: theme.button, borderColor: theme.bg, color: '#fff' }}>
                <Briefcase size={16} />
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl shadow-md hover:shadow-lg transition-all border"
                   style={{ 
                     backgroundColor: theme.card,
                     borderColor: `${theme.button}20`
                   }}>
                
                {/* Company Logo */}
                {job.image && (
                  <div className="mb-4  rounded-lg overflow-hidden" style={{ backgroundColor: `${theme.button}10` }}>
                    <img 
                      src={job.image} 
                      alt={job.company}
                      className="w-full  object-cover rounded-[10px]  "

                    />
                  </div>
                )}
                
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-lg" style={textHeadStyle}>{job.role}</h3>
                    <time className="text-xs font-medium px-2 py-1 rounded whitespace-nowrap" 
                          style={{ backgroundColor: `${theme.button}20`, color: theme.button }}>
                      {job.period}
                    </time>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    {job.companyUrl ? (
                      <a 
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold hover:underline flex items-center gap-1"
                        style={{ color: theme.button }}
                      >
                        {job.company}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <div className="text-base font-semibold" style={{ color: theme.button }}>
                        {job.company}
                      </div>
                    )}
                    {job.type && (
                      <span className="text-xs px-2 py-0.5 rounded-full" 
                            style={{ backgroundColor: `${theme.paragraph}20`, color: theme.paragraph }}>
                        <MapPin size={10} className="inline mr-1" />
                        {job.type}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm leading-relaxed opacity-90 mb-3" style={textParaStyle}>
                  {job.description}
                </p>
                
                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 rounded-md font-medium"
                        style={{ 
                          backgroundColor: `${theme.button}15`, 
                          color: theme.button 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
