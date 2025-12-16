import React, { useState } from 'react';
import { Note, Emotion } from '../types';
import { EditIcon, TrashIcon } from './Icons';

export const JournalSection: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedMood, setSelectedMood] = useState<Emotion | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSaveNote = () => {
    if (!inputText.trim() && !selectedMood) return;

    if (editingId) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...note, content: inputText, mood: selectedMood || note.mood } 
          : note
      ));
      setEditingId(null);
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        content: inputText,
        mood: selectedMood ? selectedMood : Emotion.CALM
      };
      setNotes([newNote, ...notes]);
    }
    
    // Reset form
    setInputText('');
    setSelectedMood(null);
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setInputText(note.content);
    // Try to find the matching enum value for the stored mood emoji
    const emotionValue = Object.values(Emotion).find(e => e === note.mood) || Emotion.CALM;
    setSelectedMood(emotionValue);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setInputText('');
    setSelectedMood(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
  };

  return (
    <div className="pb-24">
      <div className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-sm border border-rose-100 dark:border-rose-900 mb-6 transition-colors">
        <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
          {editingId ? 'Editar Anotação ✏️' : 'Meu Diário 📒'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {editingId ? 'Faça seus ajustes abaixo:' : 'Como você está se sentindo hoje? Escreva aqui.'}
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selecione seu humor:</label>
          <div className="flex justify-between bg-rose-50 dark:bg-rose-950/30 p-3 rounded-2xl">
            {Object.values(Emotion).map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedMood(emoji)}
                className={`text-2xl p-2 rounded-full transition-transform ${selectedMood === emoji ? 'bg-white dark:bg-dark-card shadow-md scale-125' : 'hover:scale-110'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escreva sobre o seu dia..."
          className="w-full p-4 rounded-xl border border-rose-200 dark:border-rose-800 focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none resize-none h-32 mb-3 bg-gray-50 dark:bg-black/20 text-gray-700 dark:text-gray-100"
        />

        <div className="flex gap-2">
          {editingId && (
            <button
              onClick={cancelEditing}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={handleSaveNote}
            className="flex-1 py-3 bg-rose-400 text-white font-bold rounded-xl shadow-md active:bg-rose-500 transition-colors"
          >
            {editingId ? 'Atualizar ✨' : 'Salvar Anotação ✨'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center text-gray-400 dark:text-gray-500 py-10">
            <p>Nenhuma anotação ainda...</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={`bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border-l-4 border-rose-300 dark:border-rose-500 relative transition-colors ${editingId === note.id ? 'ring-2 ring-rose-300 ring-offset-2 dark:ring-offset-gray-900' : ''}`}>
               <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2">
                    <span className="text-2xl">{note.mood}</span>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{note.date}</span>
                 </div>
                 <div className="flex gap-2">
                   <button 
                     onClick={() => startEditing(note)} 
                     className="text-gray-300 dark:text-gray-500 hover:text-blue-400 p-1"
                     title="Editar"
                   >
                     <EditIcon className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => deleteNote(note.id)} 
                     className="text-gray-300 dark:text-gray-500 hover:text-red-400 p-1"
                     title="Excluir"
                   >
                     <TrashIcon className="w-4 h-4" />
                   </button>
                 </div>
               </div>
               <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};