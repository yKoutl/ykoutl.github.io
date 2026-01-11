import React from 'react';
import { Code2, Github, ExternalLink, Loader2 } from 'lucide-react';
import { THEME } from '../../constants/theme';
import SectionTitle from '../common/SectionTitle';

const Projects = ({ darkMode, projects, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  const textHeadStyle = { color: theme.headline };
  const textParaStyle = { color: theme.paragraph };

  return (
    <section id="projects" className="py-20" style={{ backgroundColor: `${theme.card}20` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle id="proj-title" darkMode={darkMode} currentTheme={theme}>Proyectos Destacados</SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`overflow-hidden rounded-xl border backdrop-blur-sm group h-full flex flex-col ${project.inDevelopment ? 'opacity-60' : ''}`}
              style={{ 
                backgroundColor: project.inDevelopment ? `${theme.paragraph}15` : `${theme.card}80`,
                borderColor: project.inDevelopment ? `${theme.paragraph}30` : `${theme.paragraph}20`
              }}
            >
              {/* Project Image or Gradient */}
              {project.inDevelopment ? (
                <div className="h-48 p-6 flex items-center justify-center relative overflow-hidden" 
                     style={{ backgroundColor: `${theme.paragraph}20` }}>
                  <div className="text-center z-10">
                    <Loader2 size={48} className="mx-auto mb-3 animate-spin" style={{ color: theme.paragraph, opacity: 0.5 }} />
                    <p className="font-bold text-sm mb-1" style={{ color: theme.paragraph }}>EN DESARROLLO</p>
                    <p className="text-xs opacity-60" style={{ color: theme.paragraph }}>{project.year}</p>
                  </div>
                </div>
              ) : project.image ? (
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              ) : (
                <div className={`h-48 p-6 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${project.color}`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <Code2 size={64} className="text-white/80 group-hover:scale-110 transition-transform duration-300" />
                </div>
              )}
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold transition-colors" 
                      style={{ color: theme.headline }}>
                    {project.title}
                  </h3>
                  {project.role && (
                    <span 
                      className="text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap"
                      style={{ 
                        backgroundColor: theme.button,
                        color: theme.buttonText
                      }}
                    >
                      {project.role}
                    </span>
                  )}
                </div>
                
                <p className="text-sm mb-4 flex-grow opacity-90" style={textParaStyle}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: theme.bg,
                            color: theme.paragraph,
                            borderColor: `${theme.paragraph}30`
                          }}>
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto">
                  {!project.inDevelopment ? (
                    <>
                      <a href={project.github} 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-colors"
                         style={{ color: theme.paragraph }}>
                        <Github size={16} /> Código
                      </a>
                      <a href={project.link} 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-1 text-sm font-medium hover:underline"
                         style={{ color: theme.button }}>
                        <ExternalLink size={16} /> {project.image ? 'Ver Proyecto' : 'Demo Live'}
                      </a>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm cursor-not-allowed"
                         style={{ backgroundColor: `${theme.paragraph}20`, color: theme.paragraph }}>
                      <Loader2 size={14} className="animate-spin" />
                      Próximamente {project.year}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;