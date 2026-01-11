import React, { useState } from 'react';
import { X, Heart, Download, Sparkles, Hand, Rocket, Briefcase } from 'lucide-react';
import personajeSVG from '../../assets/mi_personaje.svg';

const WelcomeModal = ({ isOpen, onClose, profile, theme }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCVModal, setShowCVModal] = useState(false);

  if (!isOpen) return null;

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      localStorage.setItem('portfolio_liked', 'true');
      // Aquí podrías hacer una llamada a tu API de estadísticas
    }
  };

  const handleDownloadCV = (e) => {
    e.preventDefault();
    setShowCVModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay con blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-scale-in"
        style={{ backgroundColor: theme.card }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all hover:rotate-90"
          style={{ 
            backgroundColor: `${theme.button}20`,
            color: theme.button 
          }}
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
          {/* Lado izquierdo - Personaje animado */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Círculo decorativo detrás */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse"
                style={{ backgroundColor: theme.button }}
              />
              
              {/* SVG del personaje */}
              <img 
                src={personajeSVG} 
                alt="Personaje animado"
                className="relative w-48 h-72 md:w-64 md:h-96 object-contain animate-float"
              />
              
              {/* Sparkles decorativos */}
              <Sparkles 
                className="absolute top-10 right-10 animate-ping"
                size={20}
                style={{ color: theme.button }}
              />
              <Sparkles 
                className="absolute bottom-20 left-5 animate-pulse"
                size={16}
                style={{ color: theme.secondary || theme.button }}
              />
            </div>
          </div>

          {/* Lado derecho - Contenido */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: theme.headline }}
              >
                ¡Hola! Soy <span 
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${theme.button}, ${theme.secondary || theme.button})`,
                  }}
                >
                  {profile.name}
                </span>
              </h2>
              <p 
                className="text-lg"
                style={{ color: theme.paragraph }}
              >
                {profile.role}
              </p>
            </div>

            <div 
              className="space-y-3 text-sm md:text-base"
              style={{ color: theme.paragraph }}
            >
              <p className="flex items-start gap-2">
                <Hand className="flex-shrink-0 mt-1" size={18} style={{ color: theme.button }} />
                <span>Bienvenido a mi portafolio digital, donde la pasión por el código se encuentra con el diseño.</span>
              </p>
              <p className="flex items-start gap-2">
                <Rocket className="flex-shrink-0 mt-1" size={18} style={{ color: theme.button }} />
                <span>Aquí encontrarás mis proyectos, experiencia y las tecnologías que domino. Cada proyecto cuenta una historia de aprendizaje y dedicación.</span>
              </p>
              <p className="flex items-start gap-2">
                <Briefcase className="flex-shrink-0 mt-1" size={18} style={{ color: theme.button }} />
                <span>Puedes descargar mi CV, explorar mis trabajos y contactarme directamente si estás interesado en colaborar.</span>
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {/* Botón Me Gusta */}
              <button
                onClick={handleLike}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg transform hover:scale-105 active:scale-95 ${
                  liked ? 'animate-bounce-once' : ''
                }`}
                style={{
                  backgroundColor: liked ? theme.button : `${theme.button}20`,
                  color: liked ? theme.buttonText : theme.button,
                  border: `2px solid ${theme.button}`,
                }}
              >
                <Heart 
                  size={20} 
                  fill={liked ? 'currentColor' : 'none'}
                  className={liked ? 'animate-ping-once' : ''}
                />
                {liked ? '¡Gracias!' : 'Me gusta'} {likeCount > 0 && `(${likeCount})`}
              </button>

              {/* Botón Descargar CV */}
              <button
                onClick={handleDownloadCV}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: theme.button,
                  color: theme.buttonText,
                }}
              >
                <Download size={20} />
                Descargar CV
              </button>
            </div>

            {/* Botón para cerrar y explorar */}
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg font-semibold transition-all border-2 hover:translate-y-[-2px]"
              style={{
                backgroundColor: 'transparent',
                borderColor: theme.paragraph,
                color: theme.headline,
              }}
            >
              Explorar portafolio →
            </button>
          </div>
        </div>
      </div>

      {/* Modal de CV en actualización */}
      {showCVModal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70"
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
    </div>
  );
};

export default WelcomeModal;
