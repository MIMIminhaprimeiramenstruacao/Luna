import React, { useState } from 'react';
import { DayLog, FlowLevel } from '../types';

export const CalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // Store detailed logs indexed by "YYYY-M-D"
  const [dayLogs, setDayLogs] = useState<Record<string, DayLog>>({});
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const getLogKey = (day: number) => `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setSelectedDay(1); // Reset selection to day 1 when changing months
  };

  const updateLog = (key: string, updates: Partial<DayLog>) => {
    setDayLogs(prev => {
      const current = prev[key] || { hasPeriod: false };
      const updated = { ...current, ...updates };
      
      // If turning off period, remove flow
      if (updates.hasPeriod === false) {
        delete updated.flow;
      }
      // If setting flow, ensure period is true
      if (updates.flow) {
        updated.hasPeriod = true;
      }

      // If object is empty/false, we could remove key, but keeping it simple
      return { ...prev, [key]: updated };
    });
  };

  const renderDays = () => {
    const days = [];
    // Empty slots for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const key = getLogKey(d);
      const log = dayLogs[key];
      const isPeriod = log?.hasPeriod;
      const isSelected = selectedDay === d;
      
      let bgClass = 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/30';
      
      if (isPeriod) {
        if (log.flow === 'heavy') bgClass = 'bg-rose-600 text-white shadow-md';
        else if (log.flow === 'medium') bgClass = 'bg-rose-400 text-white shadow-md';
        else bgClass = 'bg-rose-300 text-white shadow-sm'; // light or undefined
      }

      if (isSelected) {
        bgClass += ' ring-2 ring-rose-500 ring-offset-2 dark:ring-offset-gray-800 font-bold';
      }

      days.push(
        <button
          key={d}
          onClick={() => handleDayClick(d)}
          className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all relative ${bgClass}`}
        >
          {d}
          {log?.hadCramps && (
            <span className="absolute -top-1 -right-1 text-[10px]">⚡</span>
          )}
        </button>
      );
    }
    return days;
  };

  const currentLogKey = getLogKey(selectedDay);
  const currentLog = dayLogs[currentLogKey] || { hasPeriod: false };

  return (
    <div className="pb-24">
      {/* Calendar Card */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-sm border border-rose-100 dark:border-rose-900 mb-6 transition-colors">
        <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">Meu Ciclo 📅</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Toque em um dia para anotar detalhes.</p>
        
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-2xl">
          <button onClick={() => changeMonth(-1)} className="p-2 text-rose-500 hover:bg-rose-200 dark:hover:bg-rose-900 rounded-full">◀</button>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 capitalize">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button onClick={() => changeMonth(1)} className="p-2 text-rose-500 hover:bg-rose-200 dark:hover:bg-rose-900 rounded-full">▶</button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
            <span key={i} className="text-xs font-bold text-rose-400">{d}</span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-3">
          {renderDays()}
        </div>
      </div>
      
      {/* Editor Panel for Selected Day */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-lg border border-rose-50 dark:border-rose-900 animate-fade-in transition-colors">
         <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
              Dia {selectedDay} de {monthNames[currentDate.getMonth()]}
            </h3>
            {currentLog.hasPeriod && (
              <button 
                onClick={() => updateLog(currentLogKey, { hasPeriod: false, flow: undefined, hadCramps: false })}
                className="text-xs text-red-400 hover:text-red-600 underline"
              >
                Limpar dia
              </button>
            )}
         </div>

         <div className="space-y-6">
            {/* Flow Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Como está o fluxo?</label>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => updateLog(currentLogKey, { flow: 'light', hasPeriod: true })}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${currentLog.flow === 'light' 
                    ? 'bg-rose-100 border-rose-400 text-rose-600 dark:bg-rose-900 dark:border-rose-500 dark:text-rose-200' 
                    : 'border-gray-100 dark:border-rose-950/50 hover:bg-gray-50 dark:hover:bg-rose-900/20 text-gray-500'}`}
                >
                  <span className="text-xl">💧</span>
                  <span className="text-xs font-bold">Leve</span>
                </button>

                <button 
                  onClick={() => updateLog(currentLogKey, { flow: 'medium', hasPeriod: true })}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${currentLog.flow === 'medium' 
                    ? 'bg-rose-100 border-rose-400 text-rose-600 dark:bg-rose-900 dark:border-rose-500 dark:text-rose-200' 
                    : 'border-gray-100 dark:border-rose-950/50 hover:bg-gray-50 dark:hover:bg-rose-900/20 text-gray-500'}`}
                >
                  <span className="text-xl">💧💧</span>
                  <span className="text-xs font-bold">Médio</span>
                </button>

                <button 
                  onClick={() => updateLog(currentLogKey, { flow: 'heavy', hasPeriod: true })}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${currentLog.flow === 'heavy' 
                    ? 'bg-rose-100 border-rose-400 text-rose-600 dark:bg-rose-900 dark:border-rose-500 dark:text-rose-200' 
                    : 'border-gray-100 dark:border-rose-950/50 hover:bg-gray-50 dark:hover:bg-rose-900/20 text-gray-500'}`}
                >
                  <span className="text-xl">💧💧💧</span>
                  <span className="text-xs font-bold">Intenso</span>
                </button>
              </div>
            </div>

            {/* Symptoms / Cramps */}
            <div>
               <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Sintomas</label>
               <button
                  onClick={() => updateLog(currentLogKey, { hadCramps: !currentLog.hadCramps })}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${
                    currentLog.hadCramps
                    ? 'bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200'
                    : 'border-gray-100 dark:border-rose-950/50 hover:bg-gray-50 dark:hover:bg-rose-900/20 text-gray-500'
                  }`}
               >
                  <span className="text-2xl">⚡</span>
                  <span className="font-bold">Senti Cólica</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};