import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Save, LogOut, Loader2 } from 'lucide-react';
import { DATA as INITIAL_DATA } from '../../constants/data';

const Dashboard = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("portfolioData");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setSaving(true);
    try {
      const parsed = JSON.parse(jsonText);
      setData(parsed);
      localStorage.setItem("portfolioData", JSON.stringify(parsed));
      
      setTimeout(() => {
        setSaving(false);
        alert("¡Cambios guardados localmente!");
      }, 800);
    } catch (e) {
      alert("Error: El formato JSON no es válido.");
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-mono">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Settings className="text-orange-500" />
            <h1 className="text-lg md:text-xl font-bold tracking-tight">
              Editor de Contenido <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300 ml-2">Modo Local</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSave} 
              disabled={saving} 
              className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition-all ${
                saving ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 shadow-lg'
              }`}
            >
              {saving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
              <span className="hidden sm:inline">{saving ? "Guardando..." : "Guardar Cambios"}</span>
            </button>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors shadow-lg"
            >
              <LogOut size={18}/>
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Editor Area */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full flex flex-col h-[calc(100vh-80px)]">
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col flex-1 shadow-2xl">
          <div className="bg-gray-900 px-4 py-2 text-xs text-gray-400 flex justify-between items-center border-b border-gray-700">
            <span>database.json</span>
            <span className="text-orange-400">JSON Editable</span>
          </div>
          <textarea 
            value={jsonText} 
            onChange={(e) => setJsonText(e.target.value)}
            className="flex-1 w-full bg-[#0d1117] text-[#c9d1d9] p-4 outline-none resize-none text-sm leading-relaxed font-mono"
            spellCheck="false"
          />
        </div>
        <p className="text-center text-gray-500 text-xs mt-4">
          Tip: Edita el texto JSON directamente. Los cambios se guardarán en tu navegador.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
