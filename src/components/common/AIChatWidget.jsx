import React, { useState, useEffect, useRef } from 'react';
import { X, Bot, Send, Sparkles, Loader2 } from 'lucide-react';
import { THEME } from '../../constants/theme';

const AIChatWidget = ({ darkMode, data, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy el asistente virtual de Raul. Pregúntame sobre sus proyectos, habilidades o experiencia. ✨' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userApiKey, setUserApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef(null);
  
  const theme = currentTheme || (darkMode ? THEME.dark : THEME.light);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const apiKey = userApiKey || ""; 

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `
        Eres un asistente virtual profesional para el portafolio de Raul Quintana.
        Responde preguntas basándote EXCLUSIVAMENTE en estos datos:
        ${JSON.stringify(data)}
        Responde en español de manera concisa.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt + "\n\nPregunta: " + input }] }]
          })
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        if (resData.error?.status === 'INVALID_ARGUMENT' || resData.error?.code === 400 || resData.error?.code === 403) {
            throw new Error("API Key inválida");
        }
        throw new Error("Error en Gemini");
      }

      const botReply = resData.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar eso.";
      setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error de conexión. Verifica tu API Key." }]);
      if (error.message.includes("API Key")) setShowKeyInput(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-50 flex items-center justify-center"
        style={{ 
          backgroundColor: theme.button, 
          color: theme.buttonText,
          boxShadow: `0 0 20px ${theme.button}60`
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
             {showKeyInput && (
                <div className="p-3 rounded-lg text-xs mb-4 border border-red-200 bg-red-50 text-red-800">
                    <p className="font-bold mb-1">Configuración:</p>
                    <input 
                        type="password" 
                        placeholder="API Key de Gemini..." 
                        className="w-full p-2 rounded border border-red-200 mb-2"
                        value={userApiKey}
                        onChange={(e) => setUserApiKey(e.target.value)}
                    />
                    <button onClick={() => setShowKeyInput(false)} className="w-full py-1 bg-red-100 hover:bg-red-200 rounded font-bold">Guardar</button>
                </div>
            )}

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
