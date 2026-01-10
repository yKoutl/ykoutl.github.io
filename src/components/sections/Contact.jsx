import React from 'react';
import { Mail, Linkedin, Send } from 'lucide-react';
import { THEME } from '../../constants/theme';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';

const Contact = ({ darkMode, profile, currentTheme }) => {
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  const bgStyle = { backgroundColor: theme.bg };
  const textParaStyle = { color: theme.paragraph };
  const btnStyle = { backgroundColor: theme.button, color: theme.buttonText };

  return (
    <section id="contact" className="py-20" style={bgStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%">
        <path fill={theme.button}>
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            calcMode="linear"
            values="
      M0,96L16,106.7C32,117,64,139,96,170.7C128,203,160,245,192,234.7C224,224,256,160,288,117.3C320,75,352,53,384,85.3C416,117,448,203,480,208C512,213,544,139,576,144C608,149,640,235,672,229.3C704,224,736,128,768,80C800,32,832,32,864,64C896,96,928,160,960,176C992,192,1024,160,1056,165.3C1088,171,1120,213,1152,229.3C1184,245,1216,235,1248,229.3C1280,224,1312,224,1344,213.3C1376,203,1408,181,1424,170.7L1440,160L1440,0L0,0Z;

      M0,120L16,128C32,136,64,152,96,181.3C128,211,160,256,192,245.3C224,235,256,171,288,128C320,85,352,64,384,96C416,128,448,213,480,218.7C512,224,544,160,576,154.7C608,149,640,224,672,218.7C704,213,736,149,768,112C800,75,832,64,864,96C896,128,928,171,960,186.7C992,203,1024,192,1056,192C1088,192,1120,213,1152,224C1184,235,1216,235,1248,224C1280,213,1312,192,1344,181.3C1376,171,1408,171,1424,165.3L1440,160L1440,0L0,0Z;

      M0,96L16,106.7C32,117,64,139,96,170.7C128,203,160,245,192,234.7C224,224,256,160,288,117.3C320,75,352,53,384,85.3C416,117,448,203,480,208C512,213,544,139,576,144C608,149,640,235,672,229.3C704,224,736,128,768,80C800,32,832,32,864,64C896,96,928,160,960,176C992,192,1024,160,1056,165.3C1088,171,1120,213,1152,229.3C1184,245,1216,235,1248,229.3C1280,224,1312,224,1344,213.3C1376,203,1408,181,1424,170.7L1440,160L1440,0L0,0Z
      "
          />
        </path>
      </svg>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <SectionTitle id="contact-title" darkMode={darkMode} currentTheme={theme}>Hablemos</SectionTitle>
        <p className="text-xl mb-10 max-w-2xl mx-auto" style={textParaStyle}>
          Disponible para colaboraciones y nuevas oportunidades profesionales.
        </p>

        <Card className="max-w-xl mx-auto p-8" darkMode={darkMode} currentTheme={theme}>
          <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1" style={textParaStyle}>Nombre</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{ 
                  backgroundColor: theme.bg,
                  borderColor: `${theme.paragraph}30`,
                  color: theme.headline,
                  '--tw-ring-color': theme.button
                }}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={textParaStyle}>Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{ 
                  backgroundColor: theme.bg,
                  borderColor: `${theme.paragraph}30`,
                  color: theme.headline,
                  '--tw-ring-color': theme.button
                }}
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={textParaStyle}>Mensaje</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all"
                style={{ 
                  backgroundColor: theme.bg,
                  borderColor: `${theme.paragraph}30`,
                  color: theme.headline,
                  '--tw-ring-color': theme.button
                }}
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>
            <button className="w-full py-3 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                    style={btnStyle}>
              <Send size={18} /> Enviar Mensaje
            </button>
          </form>
        </Card>

        <div className="mt-12 flex justify-center gap-8">
          <a href={`mailto:${profile.email}`} className="flex flex-col items-center gap-2 transition-colors hover:opacity-80" style={textParaStyle}>
            <div className="p-4 rounded-full shadow-sm" style={{ backgroundColor: theme.card }}>
              <Mail size={24} />
            </div>
            <span className="text-sm font-medium">Email</span>
          </a>
          <a href={profile.linkedin} className="flex flex-col items-center gap-2 transition-colors hover:opacity-80" style={textParaStyle}>
            <div className="p-4 rounded-full shadow-sm" style={{ backgroundColor: theme.card }}>
              <Linkedin size={24} />
            </div>
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
