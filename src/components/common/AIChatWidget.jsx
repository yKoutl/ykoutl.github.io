import React, { useState, useEffect, useRef } from 'react';
import { X, Bot, Send, Sparkles } from 'lucide-react';
import { THEME } from '../../constants/theme';

const AIChatWidget = ({ darkMode, data, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy el asistente virtual de Raul. Pregúntame sobre sus proyectos, habilidades o experiencia. ✨' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');
  const [messageCount, setMessageCount] = useState(() => {
    return parseInt(sessionStorage.getItem('chat_message_count') || '0');
  });
  const messagesEndRef = useRef(null);
  const MAX_MESSAGES = 10;
  
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const messages = [
      '¡Hola! Habla conmigo 👋',
      '¿Tienes alguna pregunta? 🤔',
      'Pregúntame sobre los proyectos 🚀',
      '¿Necesitas más información? 💼',
      'Estoy aquí para ayudarte ✨',
      '¿Quieres conocer las tecnologías que uso? 💻',
      'Puedo contarte sobre mi experiencia 👨‍💻',
      '¿Curiosidad sobre cómo hice este sitio? 🎨',
      '¡Pregúntame lo que quieras! 💬',
      '¿Quieres saber sobre mis proyectos? 🔧',
      'Hablemos de desarrollo web 🌐',
      '¿Buscas información de contacto? 📧'
    ];
    
    const showRandomMessage = () => {
      if (!isOpen) {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setRandomMessage(randomMsg);
        setShowMessage(true);
        
        setTimeout(() => {
          setShowMessage(false);
        }, 4000);
      }
    };
    
    const interval = setInterval(showRandomMessage, 15000);
    const timeout = setTimeout(showRandomMessage, 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  const getResponse = (question) => {
    const lowerQ = question.toLowerCase();
    
    // Preguntas sobre proyectos
    if (lowerQ.includes('proyecto') || lowerQ.includes('trabajo') || lowerQ.includes('realizaste') || lowerQ.includes('hiciste')) {
      const projects = data.projects?.map(p => `• ${p.title}: ${p.description}`).join('\n') || 'Varios proyectos interesantes';
      return `Aquí están algunos de mis proyectos destacados:\n\n${projects}`;
    }
    
    // Preguntas sobre tecnologías/habilidades
    if (lowerQ.includes('tecnolog') || lowerQ.includes('habilidad') || lowerQ.includes('lenguaje') || lowerQ.includes('framework') || lowerQ.includes('domina')) {
      const skills = data.skills?.map(s => s.name).join(', ') || 'React, JavaScript, Node.js, y más';
      return `Mis habilidades técnicas incluyen: ${skills}`;
    }
    
    // Preguntas sobre experiencia
    if (lowerQ.includes('experiencia') || lowerQ.includes('trabajo') || lowerQ.includes('empresa') || lowerQ.includes('puesto')) {
      const exp = data.experience?.[0];
      if (exp) {
        return `Actualmente trabajo como ${exp.position} en ${exp.company}. ${exp.description}`;
      }
      return 'Tengo experiencia en desarrollo web full-stack.';
    }
    
    // Preguntas sobre educación
    if (lowerQ.includes('estudi') || lowerQ.includes('universidad') || lowerQ.includes('carrera') || lowerQ.includes('educación')) {
      const edu = data.education?.[0];
      if (edu) {
        return `Estudié ${edu.degree} en ${edu.institution}. ${edu.description || ''}`;
      }
      return 'Tengo formación en desarrollo de software.';
    }
    
    // Cómo construyó este proyecto
    if (lowerQ.includes('construiste') || lowerQ.includes('hiciste este') || lowerQ.includes('portafolio') || lowerQ.includes('esta página') || lowerQ.includes('este sitio')) {
      return `Este portafolio está construido con:\n\n• React 19 + Vite para una experiencia rápida\n• Tailwind CSS para estilos modernos\n• Lucide Icons para iconografía\n• Animaciones CSS personalizadas\n• Chat bot interactivo con lógica personalizada\n• Sistema de temas claro/oscuro\n• Diseño completamente responsive\n\n¡Todo desarrollado desde cero! 🚀`;
    }
    
    // Contacto
    if (lowerQ.includes('contacto') || lowerQ.includes('email') || lowerQ.includes('correo') || lowerQ.includes('hablar') || lowerQ.includes('contactar')) {
      return `Puedes contactarme a través de:\n\n📧 Email: ${data.profile?.email || 'Disponible en la sección de contacto'}\n💼 LinkedIn: ${data.profile?.social?.linkedin || 'Ver sección de contacto'}\n\n¡Estaré encantado de conversar!`;
    }
    
    // Quién es
    if (lowerQ.includes('quién eres') || lowerQ.includes('quien eres') || lowerQ.includes('sobre ti') || lowerQ.includes('cuéntame') || lowerQ.includes('presentate')) {
      return `Soy ${data.profile?.name || 'Raul'}, ${data.profile?.role || 'desarrollador'}. ${data.profile?.tagline || 'Apasionado por crear experiencias web increíbles.'}\n\n${data.profile?.bio || 'Me encanta resolver problemas con código y diseñar interfaces intuitivas.'}`;
    }
    
    // Saludos
    if (lowerQ.includes('hola') || lowerQ.includes('hi') || lowerQ.includes('buenas') || lowerQ.includes('hey')) {
      return '¡Hola! 👋 ¿En qué puedo ayudarte? Puedo contarte sobre mis proyectos, habilidades, experiencia o cómo construí este portafolio.';
    }
    
    // Respuesta por defecto con sugerencias
    return `No estoy seguro de cómo responder eso. Puedes preguntarme sobre:\n\n• Mis proyectos y trabajos 💼\n• Tecnologías que domino 🚀\n• Mi experiencia laboral 👨‍💻\n• Cómo construí este portafolio 🎨\n• Información de contacto 📧\n\n¿Qué te gustaría saber?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    // Usar API solo para los primeros 10 mensajes
    if (messageCount < MAX_MESSAGES) {
      try {
        const apiKey = "AIzaSyC2c18APL9peAbr4Mdv-E4GVP7Pno7slt8";
        const systemPrompt = `
          Eres un asistente virtual profesional para el portafolio de Raul Quintana.
          Responde preguntas basándote EXCLUSIVAMENTE en estos datos:
          ${JSON.stringify(data)}
          Responde en español de manera concisa y amigable.
        `;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt + "\n\nPregunta: " + userInput }] }]
            })
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Error en API");
        }

        const botReply = resData.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar eso.";
        setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);
        
        // Incrementar contador después de respuesta exitosa
        const newCount = messageCount + 1;
        setMessageCount(newCount);
        sessionStorage.setItem('chat_message_count', newCount.toString());

      } catch (error) {
        // Fallback a respuestas locales si falla la API
        const botReply = getResponse(userInput);
        setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Después de 10 mensajes, mostrar límite alcanzado
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: `Has alcanzado el límite de ${MAX_MESSAGES} mensajes con IA por sesión. 🙏\n\nPuedes contactarme directamente en: ${data.profile?.email || 'la sección de contacto'} para conversar más.` 
        }]);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <>
      {/* Mensaje aleatorio */}
      {showMessage && !isOpen && (
        <div 
          className="fixed bottom-24 right-6 px-4 py-3 rounded-xl shadow-xl animate-in slide-in-from-bottom-5 fade-in z-50"
          style={{ 
            backgroundColor: theme.card,
            color: theme.paragraph,
            borderLeft: `4px solid ${theme.button}`
          }}
        >
          {randomMessage}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 z-50 flex items-center justify-center"
        style={{ 
          backgroundColor: theme.button, 
          color: theme.buttonText,
          boxShadow: `0 8px 32px ${theme.button}60`
        }}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-80 md:w-96 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border transition-all animate-in slide-in-from-bottom-10 fade-in duration-300"
          style={{ 
            backgroundColor: theme.card, 
            borderColor: `${theme.paragraph}20`,
            height: '500px',
            maxHeight: '80vh'
          }}
        >
          {/* Header */}
          <div className="p-4 flex items-center gap-3 border-b" 
               style={{ backgroundColor: theme.bg, borderColor: `${theme.paragraph}20` }}>
            <div className="p-2 rounded-full" style={{ backgroundColor: `${theme.button}20` }}>
              <Sparkles size={18} style={{ color: theme.button }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: theme.headline }}>Asistente IA</h3>
              <p className="text-xs opacity-70" style={{ color: theme.paragraph }}>Powered by Gemini</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}
                  style={{ 
                    backgroundColor: msg.role === 'user' ? theme.button : theme.bg,
                    color: msg.role === 'user' ? theme.buttonText : theme.paragraph
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs opacity-50 ml-4">Escribiendo...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t" style={{ borderColor: `${theme.paragraph}20` }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta algo..."
                className="flex-1 p-2 rounded-lg text-sm focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: theme.bg,
                  color: theme.paragraph,
                  '--tw-ring-color': theme.button
                }}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: theme.button, color: theme.buttonText }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
