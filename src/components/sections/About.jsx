import React from 'react';
import { Github, Linkedin, Mail, User } from 'lucide-react';
import { THEME } from '../../constants/theme';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';

const About = ({ darkMode, profile, skills, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  const textHeadStyle = { color: theme.headline };
  const textParaStyle = { color: theme.paragraph };

  return (
    <section id="about" className="py-16" style={{ backgroundColor: `${theme.card}50` }}>
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle id="about-title" darkMode={darkMode} currentTheme={theme}>Sobre Mí & Habilidades</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div>
            <div className="flex items-center gap-2 mb-4 font-bold uppercase tracking-wider text-sm" style={{ color: theme.button }}>
              <User size={18} />
              <span>Perfil Profesional</span>
            </div>
            <h3 className="text-3xl font-bold mb-6 leading-tight" style={textHeadStyle}>
              Construyendo el puente entre <span style={{ color: currentTheme.button }}>Datos</span> e Infraestructura.
            </h3>
            <p className="text-lg leading-relaxed mb-6" style={textParaStyle}>
              {profile.about}
            </p>
            <div className="flex gap-4">
              {[
                { link: profile.github, icon: <Github size={24} /> },
                { link: profile.linkedin, icon: <Linkedin size={24} /> },
                { link: `mailto:${profile.email}`, icon: <Mail size={24} /> }
              ].map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-full transition-colors hover:opacity-80"
                   style={{ backgroundColor: theme.card, color: theme.button }}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

         {/* Skills Grid */}
          <div className="grid gap-6">
            {skills.map((category, idx) => (
              <div key={idx} className="p-6 rounded-xl border backdrop-blur-sm"
                   style={{ 
                     backgroundColor: `${theme.card}80`,
                     borderColor: `${theme.paragraph}20`
                   }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.button}20`, color: theme.button }}>
                    {category.icon}
                  </div>
                  <h4 className="font-bold text-lg" style={textHeadStyle}>{category.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 rounded-full text-sm font-medium border"
                          style={{ 
                            backgroundColor: theme.bg,
                            color: theme.paragraph,
                            borderColor: `${theme.paragraph}30`
                          }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
