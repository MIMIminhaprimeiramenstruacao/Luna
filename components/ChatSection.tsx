import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { SendIcon, TrashIcon } from './Icons';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'model',
  text: 'Oie! Eu sou a Luna, sua amiga virtual. 🌙 Posso te ajudar com dúvidas sobre seu corpo, sentimentos ou o ciclo menstrual. O que você quer saber hoje?',
  timestamp: Date.now()
};

export const ChatSection: React.FC = () => {
  // Inicialização imediata com mensagem padrão para renderização instantânea
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Flag para garantir que não sobrescrevamos o localStorage antes de carregar
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Carrega o histórico de forma assíncrona após a montagem
  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedMessages = localStorage.getItem('luna_chat_history');
        if (savedMessages) {
          const parsed = JSON.parse(savedMessages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      } catch (error) {
        console.error('Error parsing chat history:', error);
      } finally {
        // Marca como carregado para liberar o salvamento
        setIsHistoryLoaded(true);
      }
    };

    loadHistory();
  }, []);

  // Salva no localStorage apenas se o histórico já foi carregado
  useEffect(() => {
    if (isHistoryLoaded) {
      localStorage.setItem('luna_chat_history', JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages, isHistoryLoaded]);

  // Rola para baixo quando começa a carregar para mostrar o indicador de digitação
  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Prepara o histórico para contexto (últimas 6 mensagens)
    const history = messages.slice(-6).map(m => `${m.role === 'user' ? 'Usuária' : 'Luna'}: ${m.text}`);
    
    const responseText = await sendMessageToGemini(history, userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Tem certeza que deseja limpar a conversa?')) {
      const resetMessage = { ...WELCOME_MESSAGE, timestamp: Date.now() };
      setMessages([resetMessage]);
      localStorage.removeItem('luna_chat_history');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="bg-white dark:bg-dark-card p-4 rounded-3xl shadow-sm border border-rose-100 dark:border-rose-900 mb-4 shrink-0 transition-colors flex justify-between items-start">
         <div>
            <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400">Chat com a Luna ✨</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tire suas dúvidas em um espaço seguro.</p>
         </div>
         <button 
            onClick={handleClearHistory}
            className="p-2 text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-colors"
            title="Limpar conversa"
         >
            <TrashIcon className="w-5 h-5" />
         </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 px-2 pb-4 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-colors ${
                msg.role === 'user'
                  ? 'bg-rose-400 text-white rounded-br-none'
                  : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-rose-900/50 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Visual Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fade-in w-full">
            <div className="bg-white dark:bg-dark-card p-4 rounded-2xl rounded-bl-none shadow-sm border border-rose-100 dark:border-rose-900/50 flex items-center gap-3">
              <div className="flex space-x-1.5 h-4 items-center">
                <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium animate-pulse">Luna está digitando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white dark:bg-dark-card p-2 rounded-2xl shadow-lg border border-rose-100 dark:border-rose-900 flex items-center gap-2 mt-2 shrink-0 transition-colors">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite sua pergunta..."
          className="flex-1 p-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          className="p-3 bg-rose-400 text-white rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-500 transition-colors min-w-[3rem] flex items-center justify-center"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};