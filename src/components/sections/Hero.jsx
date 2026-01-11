import React, { useState } from "react";
import { Code2, Mail, Download, ChevronDown, Github } from "lucide-react";
import { THEME } from "../../constants/theme";
import WavingHand from "../common/WavingHand";

const Hero = ({ darkMode, profile, scrollToSection, currentTheme }) => {
  const [showCVModal, setShowCVModal] = useState(false);
  
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);
  const textHeadStyle = {
    color: theme.headline,
  };
  const textParaStyle = {
    color: theme.paragraph,
  };
  const btnStyle = {
    backgroundColor: theme.button,
    color: theme.buttonText,
  };
  
  const handleDownloadCV = (e) => {
    e.preventDefault();
    setShowCVModal(true);
  };

  return (
    <section
      id="home"
      className="pt-20 lg:pt-32 pb-16 lg:pb-24 px-0 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div
          className="inline-block p-2 px-4 rounded-full font-semibold text-sm mb-6 animate-fade-in-up border"
          style={{
            backgroundColor: `${theme.button}20`,
            color: theme.button,
            borderColor: `${theme.button}40`,
          }}
        >
          Hola, bienvenido a mi portafolio
        </div>

        <h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          style={textHeadStyle}
        >
          Soy{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.button}, ${theme.secondary || theme.button})`,
            }}
          >
            {profile.name}
          </span>
        </h1>

        <p
          className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
          style={textParaStyle}
        >
          {profile.role}. {profile.tagline}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90 hover:translate-y-[-2px]"
            style={btnStyle}
          >
            <Code2 size={20} />
            Ver Proyectos
          </button>

          <button
            onClick={handleDownloadCV}
            className="px-8 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg border hover:translate-y-[-2px]"
            style={{
              backgroundColor: theme.card,
              color: theme.headline,
              borderColor: "transparent",
            }}
          >
            <Download size={20} />
            Descargar CV
          </button>
          <a
            href="https://github.com/yKoutl"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg border hover:translate-y-[-2px]"
            style={{
              backgroundColor: theme.card,
              color: theme.headline,
              borderColor: "transparent",
            }}
          >
            <Github size={20} />
            GitHub
          </a>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3.5 rounded-lg font-semibold border transition-all flex items-center justify-center gap-2 hover:bg-opacity-5"
            style={{
              backgroundColor: "transparent",
              borderColor: theme.paragraph,
              color: theme.headline,
            }}
          >
            <Mail size={20} />
            Contactarme
          </button>
        </div>

        <div
          className="mt-16 animate-bounce cursor-pointer"
          style={{
            color: theme.paragraph,
          }}
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown size={32} className="mx-auto" />
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        width="100%"
        className="-mt-1 sm:-mt-36"
      >
        <path fill={theme.button}>
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
      M0,32L21.8,42.7C43.6,53,87,75,131,85.3C174.5,96,218,96,262,133.3C305.5,171,349,245,393,256C436.4,267,480,213,524,181.3C567.3,149,611,139,655,149.3C698.2,160,742,192,785,186.7C829.1,181,873,139,916,128C960,117,1004,139,1047,170.7C1090.9,203,1135,245,1178,250.7C1221.8,256,1265,224,1309,186.7C1352.7,149,1396,107,1418,85.3L1440,64L1440,320L0,320Z;

      M0,64L21.8,90.7C43.6,117,87,171,131,181.3C174.5,192,218,160,262,154.7C305.5,149,349,171,393,176C436.4,181,480,171,524,165.3C567.3,160,611,160,655,176C698.2,192,742,224,785,218.7C829.1,213,873,171,916,149.3C960,128,1004,128,1047,144C1090.9,160,1135,192,1178,202.7C1221.8,213,1265,203,1309,176C1352.7,149,1396,107,1418,90.7L1440,80L1440,320L0,320Z;

      M0,32L21.8,42.7C43.6,53,87,75,131,85.3C174.5,96,218,96,262,133.3C305.5,171,349,245,393,256C436.4,267,480,213,524,181.3C567.3,149,611,139,655,149.3C698.2,160,742,192,785,186.7C829.1,181,873,139,916,128C960,117,1004,139,1047,170.7C1090.9,203,1135,245,1178,250.7C1221.8,256,1265,224,1309,186.7C1352.7,149,1396,107,1418,85.3L1440,64L1440,320L0,320Z
      "
          />
        </path>
      </svg>

      {/* Modal de CV en actualización */}
      {showCVModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCVModal(false)}
          />
          <div 
            className="relative max-w-md w-full p-6 rounded-xl shadow-2xl text-center animate-scale-in"
            style={{ backgroundColor: theme.card }}
          >
            <div 
              className="text-5xl mb-4"
              style={{ color: theme.button }}
            >
              📄
            </div>
            <h3 
              className="text-2xl font-bold mb-3"
              style={{ color: theme.headline }}
            >
              CV en actualización
            </h3>
            <p 
              className="mb-6"
              style={{ color: theme.paragraph }}
            >
              Por el momento mi CV está siendo actualizado. Pronto estará disponible para descargar.
            </p>
            <button
              onClick={() => setShowCVModal(false)}
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: theme.button,
                color: theme.buttonText,
              }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
