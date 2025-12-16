import React, { useState } from 'react';
import { SunIcon, MoonIcon } from './Icons';

interface LoginProps {
  onLogin: (username: string) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export const LoginScreen: React.FC<LoginProps> = ({ onLogin, toggleDarkMode, isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginAttempt = () => {
    // Validação estrita: requer usuário 'luna' e senha '1234'
    if (username.toLowerCase().trim() === 'luna' && password === '1234') {
      onLogin('Luna');
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLoginAttempt();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF1F2] dark:bg-[#1F1717] transition-colors p-6">
      <div className="w-full max-w-sm bg-white dark:bg-dark-card rounded-3xl shadow-xl overflow-hidden border border-rose-100 dark:border-rose-900 animate-fade-in">
        
        {/* Header decorativo */}
        <div className="bg-gradient-to-r from-rose-300 to-pink-300 dark:from-rose-800 dark:to-pink-800 p-8 text-center relative">
          <div className="absolute top-4 right-4">
             <button 
                onClick={toggleDarkMode} 
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-white"
              >
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
          </div>
          <div className="w-20 h-20 bg-white/30 rounded-full mx-auto flex items-center justify-center mb-3 backdrop-blur-sm">
            <span className="text-4xl">🌙</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Luna</h1>
          <p className="text-rose-50 dark:text-rose-200 opacity-90 text-sm">Seu espaço seguro.</p>
        </div>

        {/* Formulário */}
        <div className="p-8 space-y-4">
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">Usuário</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyPress}
              placeholder="Digite seu usuário..."
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-rose-900/50 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua senha..."
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-rose-900/50 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
            />
          </div>

          {error && (
            <div className="animate-shake">
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-900/50">
                {error}
              </p>
            </div>
          )}

          <div className="pt-2">
            <button 
              onClick={handleLoginAttempt}
              className="w-full py-4 bg-rose-400 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-200 dark:shadow-none transition-transform active:scale-95"
            >
              Entrar
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 opacity-70">
              Dica: usuário <strong>luna</strong> / senha <strong>1234</strong>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};