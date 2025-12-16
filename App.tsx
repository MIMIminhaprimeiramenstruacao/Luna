import React, { useState, useEffect } from 'react';
import { Screen, Reminder } from './types';
import { LearnSection } from './components/LearnSection';
import { CalendarSection } from './components/CalendarSection';
import { JournalSection } from './components/JournalSection';
import { ChatSection } from './components/ChatSection';
import { QuizSection } from './components/QuizSection';
import { LoginScreen } from './components/LoginScreen';
import { HomeIcon, BookOpenIcon, CalendarIcon, HeartIcon, SunIcon, MoonIcon, DropletIcon, PuzzleIcon, EditIcon } from './components/Icons';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Amiga'); // Default name
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', label: 'Beber Água', type: 'water', active: false },
    { id: '2', label: 'Troca', type: 'pad', active: false },
    { id: '3', label: 'Humor', type: 'mood', active: false },
    { id: '4', label: 'Diário', type: 'journal', active: true },
    { id: '5', label: 'Fazer Quiz', type: 'quiz', active: true },
  ]);

  // Toast Notification State
  const [toast, setToast] = useState<{ visible: boolean; message: string; icon: React.ReactNode } | null>(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Login
  const handleLogin = (name: string) => {
    // Capitalize first letter
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    setUserName(formattedName);
    setIsLoggedIn(true);
  };

  const showToast = (type: string) => {
    let message = '';
    let icon = null;

    switch (type) {
      case 'water':
        message = 'Lembrete de hidratação ativado! 💧';
        icon = <DropletIcon className="w-5 h-5 text-blue-400" />;
        break;
      case 'pad':
        message = 'Vou te lembrar de trocar o absorvente! 🌸';
        // Usando DropletIcon em vermelho para representar o ciclo de forma sutil
        icon = <DropletIcon className="w-5 h-5 text-rose-500" />;
        break;
      case 'mood':
        message = 'Monitoramento de humor ligado! 😊';
        icon = <HeartIcon className="w-5 h-5 text-pink-400" />;
        break;
      case 'journal':
        message = 'Diário pronto para seus segredos! 📒';
        icon = <EditIcon className="w-5 h-5 text-yellow-500" />;
        break;
      case 'quiz':
        message = 'Modo Quiz ativado! Vamos aprender? 🧠';
        icon = <PuzzleIcon className="w-5 h-5 text-purple-400" />;
        break;
      default:
        return;
    }

    setToast({ visible: true, message, icon });

    // Hide after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Toggle Reminder
  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => {
      if (r.id === id) {
        const isActive = !r.active;
        // Trigger toast only when turning ON
        if (isActive) {
          showToast(r.type);
        }
        return { ...r, active: isActive };
      }
      return r;
    }));
  };

  const getReminderIcon = (type: string) => {
    switch(type) {
      case 'water': return <DropletIcon className="w-6 h-6 text-blue-400" />;
      case 'pad': return <DropletIcon className="w-6 h-6 text-rose-500" />;
      case 'mood': return <HeartIcon className="w-6 h-6 text-pink-400" />;
      case 'journal': return <EditIcon className="w-6 h-6 text-yellow-500" />;
      case 'quiz': return <PuzzleIcon className="w-6 h-6 text-purple-400" />;
      default: return null;
    }
  };

  const renderContent = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return (
          <div className="space-y-6 pb-24 animate-fade-in relative">
            
            {/* Header/Welcome Card */}
            <div className="bg-gradient-to-r from-rose-300 to-pink-300 dark:from-rose-800 dark:to-pink-800 p-8 rounded-3xl text-white shadow-lg shadow-rose-200 dark:shadow-none transition-all">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">Olá, {userName}! 🌸</h1>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isDarkMode ? <SunIcon className="w-5 h-5 text-yellow-300" /> : <MoonIcon className="w-5 h-5 text-white" />}
                </button>
              </div>
              <p className="opacity-90">Bem-vinda ao seu espaço seguro. Como você está se sentindo hoje?</p>
            </div>

            {/* Reminders Widget */}
            <div className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-sm border border-rose-50 dark:border-rose-900 transition-colors">
              <h3 className="font-bold text-rose-500 dark:text-rose-400 mb-4">Lembretes de Autocuidado ✨</h3>
              <div className="flex justify-between gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar px-1">
                {reminders.map(rem => (
                  <button 
                    key={rem.id}
                    onClick={() => toggleReminder(rem.id)}
                    className={`min-w-[80px] flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-500 ease-in-out transform ${
                      rem.active 
                      ? 'bg-rose-100 border-rose-300 text-rose-600 dark:bg-rose-900/40 dark:border-rose-700 dark:text-rose-300 scale-105 shadow-md' 
                      : 'bg-gray-50 border-gray-100 text-gray-400 dark:bg-black/20 dark:border-rose-950 dark:text-gray-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 scale-100 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className={`mb-1 transition-all duration-500 ${rem.active ? 'scale-110' : 'grayscale opacity-70 scale-100'}`}>
                      {getReminderIcon(rem.type)}
                    </div>
                    <span className="text-[10px] font-bold text-center leading-tight">{rem.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setCurrentScreen(Screen.LEARN)} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 flex flex-col items-center gap-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors group">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📖</span>
                <span className="font-bold text-gray-700 dark:text-gray-200">Aprender</span>
              </button>
              <button onClick={() => setCurrentScreen(Screen.CALENDAR)} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 flex flex-col items-center gap-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors group">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📅</span>
                <span className="font-bold text-gray-700 dark:text-gray-200">Calendário</span>
              </button>
              <button onClick={() => setCurrentScreen(Screen.JOURNAL)} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 flex flex-col items-center gap-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors group">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📒</span>
                <span className="font-bold text-gray-700 dark:text-gray-200">Diário</span>
              </button>
              <button onClick={() => setCurrentScreen(Screen.QUIZ)} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-rose-50 dark:border-rose-900 flex flex-col items-center gap-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors group">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🧩</span>
                <span className="font-bold text-gray-700 dark:text-gray-200">Quiz</span>
              </button>
            </div>

            {/* Chat Banner (Alternative entry) */}
            <button onClick={() => setCurrentScreen(Screen.CHAT)} className="w-full bg-rose-400 dark:bg-rose-900/50 p-5 rounded-3xl shadow-md text-white flex items-center justify-between transition-colors hover:brightness-105 active:scale-[0.98]">
               <div className="text-left">
                  <p className="font-bold text-lg">Conversar com a Luna</p>
                  <p className="text-sm opacity-90">Tire suas dúvidas agora!</p>
               </div>
               <span className="text-3xl animate-pulse">✨</span>
            </button>
          </div>
        );
      case Screen.LEARN:
        return <LearnSection />;
      case Screen.CALENDAR:
        return <CalendarSection />;
      case Screen.JOURNAL:
        return <JournalSection />;
      case Screen.CHAT:
        return <ChatSection />;
      case Screen.QUIZ:
        return <QuizSection />;
      default:
        return null;
    }
  };

  const NavItem = ({ screen, icon, label }: { screen: Screen; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setCurrentScreen(screen)}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
        currentScreen === screen 
          ? 'text-rose-500 dark:text-rose-400' 
          : 'text-gray-400 dark:text-gray-500 hover:text-rose-300 dark:hover:text-rose-300'
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />;
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#FFF1F2] dark:bg-[#1F1717] relative shadow-2xl overflow-hidden transition-colors duration-300">
      
      {/* Toast Notification Overlay */}
      {toast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] animate-[bounce_0.5s_ease-in-out] w-full max-w-xs flex justify-center pointer-events-none">
          <div className="bg-white dark:bg-dark-card px-4 py-3 rounded-2xl shadow-xl border border-rose-200 dark:border-rose-800 flex items-center gap-3 w-auto">
            <div className="bg-rose-50 dark:bg-rose-900/50 p-2 rounded-full shrink-0">
               {toast.icon}
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200 leading-tight">
              {toast.message}
            </span>
          </div>
        </div>
      )}

      {/* Header Area (mostly for spacing in this design, content has its own headers) */}
      <div className="h-4"></div>

      {/* Main Content Area */}
      <main className="px-5 h-full overflow-y-auto custom-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-dark-card border-t border-rose-100 dark:border-rose-950 h-20 pb-2 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 transition-colors">
        <div className="flex justify-around items-center h-full px-2">
          <NavItem screen={Screen.HOME} icon={<HomeIcon className="w-6 h-6" />} label="Início" />
          <NavItem screen={Screen.LEARN} icon={<BookOpenIcon className="w-6 h-6" />} label="Guia" />
          
          {/* Center Chat Button - Pop out style */}
          <div className="relative -top-6">
             <button 
               onClick={() => setCurrentScreen(Screen.CHAT)}
               className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-[#FFF1F2] dark:border-[#1F1717] transition-all ${currentScreen === Screen.CHAT ? 'bg-rose-500 scale-110' : 'bg-rose-400 hover:scale-105'}`}
             >
               <span className="text-2xl">✨</span>
             </button>
          </div>

          <NavItem screen={Screen.CALENDAR} icon={<CalendarIcon className="w-6 h-6" />} label="Ciclo" />
          <NavItem screen={Screen.JOURNAL} icon={<HeartIcon className="w-6 h-6" />} label="Diário" />
        </div>
      </div>
    </div>
  );
};

export default App;