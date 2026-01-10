import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Contraseña incorrecta (Pista: admin123)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 font-sans">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div className="flex justify-center mb-6 text-orange-500">
          <Lock size={48} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Panel de Administración</h2>
        <p className="text-gray-400 text-center text-sm mb-6">Acceso exclusivo</p>
        
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm text-center border border-red-500/50">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-orange-500 outline-none transition-colors text-white" 
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-bold rounded transition-all transform hover:scale-[1.02]"
          >
            Entrar
          </button>
        </form>
        <button 
          onClick={() => navigate('/')} 
          className="w-full mt-6 text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          ← Regresar al Portafolio
        </button>
      </div>
    </div>
  );
};

export default Login;
