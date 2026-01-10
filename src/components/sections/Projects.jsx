import React from 'react';
import { Code2, Github, ExternalLink } from 'lucide-react';
import { THEME } from '../../constants/theme';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';

const Projects = ({ darkMode, projects }) => {
  const textHeadStyle = { color: darkMode ? THEME.dark.headline : THEME.light.headline };
  const textParaStyle = { color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph };

  return (
    <section id="projects" className="py-20" style={{ backgroundColor: darkMode ? `${THEME.dark.card}20` : `${THEME.light.card}30` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle id="proj-title" darkMode={darkMode}>Proyectos Destacados</SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group h-full flex flex-col" darkMode={darkMode}>
              <div className={`h-48 p-6 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${project.color}`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <Code2 size={64} className="text-white/80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2 transition-colors" 
                    style={{ color: darkMode ? THEME.dark.headline : THEME.light.headline }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 flex-grow opacity-90" style={textParaStyle}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2 py-1 rounded border"
                          style={{ 
                            backgroundColor: darkMode ? THEME.dark.bg : THEME.light.bg,
                            color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph,
                            borderColor: darkMode ? `${THEME.dark.paragraph}30` : `${THEME.light.paragraph}30`
                          }}>
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto">
                  <a href={project.github} className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-colors"
                     style={{ color: darkMode ? THEME.dark.paragraph : THEME.light.paragraph }}>
                    <Github size={16} /> Código
                  </a>
                  <a href={project.link} className="flex items-center gap-1 text-sm font-medium hover:underline"
                     style={{ color: darkMode ? THEME.dark.button : THEME.light.button }}>
                    <ExternalLink size={16} /> Demo Live
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
