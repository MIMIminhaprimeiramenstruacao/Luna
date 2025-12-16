import React, { useState } from 'react';

interface Topic {
  id: string;
  title: string;
  emoji: string;
  content: string;
}

const topics: Topic[] = [
  {
    id: '1',
    title: 'O que é o ciclo menstrual?',
    emoji: '🔄',
    content: "Imagine que seu corpo tem uma casinha especial chamada útero. Todo mês, ele se prepara para receber um bebê, criando uma 'caminha' fofinha de sangue e tecidos. Se não tem bebê, o corpo não precisa dessa caminha, então ela se desmancha e sai pela vagina. Isso é a menstruação! É um ciclo natural que acontece mais ou menos a cada 28 dias."
  },
  {
    id: '2',
    title: 'O que esperar da primeira vez?',
    emoji: '🩸',
    content: "A primeira menstruação (menarca) pode ser só uma manchinha marrom na calcinha ou um sangue vermelho vivo. Pode vir com um pouco de cólica (uma dorzinha na barriga) ou dor nas costas. Não se assuste! É super normal o ciclo ser meio bagunçado no começo. Pode vir num mês e falhar no outro."
  },
  {
    id: '3',
    title: 'Higiene e Cuidados',
    emoji: '🚿',
    content: "Você pode usar absorventes externos (aqueles que colam na calcinha), internos, calcinhas menstruais ou coletores. O importante é trocar a cada 4 a 6 horas para evitar cheirinhos e bactérias. Tome banho normalmente, a água morna até ajuda a aliviar as cólicas! Lave a região íntima apenas com água ou sabonete neutro, e só por fora, tá?"
  },
  {
    id: '4',
    title: 'Montanha-russa de Emoções',
    emoji: '🎢',
    content: "Sentir vontade de chorar vendo comercial de margarina? Ficar irritada do nada? É a tal da TPM (Tensão Pré-Menstrual). Os hormônios mudam no seu corpo e mexem com o humor. Seja gentil com você mesma, descanse, coma um chocolatinho e saiba que passa logo!"
  },
  {
    id: '6',
    title: 'Alimentação e Ciclo',
    emoji: '🥗',
    content: "O que você come pode ajudar nas cólicas e no inchaço! 😋\n\n**O que ajuda:**\n• **Bananas e folhas verdes:** Ricos em nutrientes que relaxam os músculos.\n• **Chás quentinhos:** Camomila ou gengibre acalmam.\n• **Chocolate meio amargo:** Um pedacinho ajuda no humor!\n• **Muita água:** Ajuda a desinchar.\n\n**Evite se puder:** Muito sal (inchaço), cafeína e refrigerantes, que podem piorar a dorzinha."
  },
  {
    id: '5',
    title: 'FAQ: Perguntas Frequentes',
    emoji: '❓',
    content: "**Dói muito?** Pode causar desconforto (cólica), mas se doer muito a ponto de não conseguir brincar ou estudar, fale com seus pais.\n\n**Todo mundo vai saber?** Não! Ninguém consegue perceber só de olhar para você.\n\n**Posso fazer esporte?** Sim! Fazer exercícios ajuda a liberar endorfina, que melhora a dor e o humor."
  }
];

export const LearnSection: React.FC = () => {
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  const toggleTopic = (id: string) => {
    setOpenTopic(openTopic === id ? null : id);
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-sm border border-rose-100 dark:border-rose-900 mb-6 transition-colors">
        <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">Biblioteca da Luna 📚</h2>
        <p className="text-gray-600 dark:text-gray-300">Aqui você aprende tudo sobre como seu corpo funciona, sem segredos!</p>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm overflow-hidden border border-rose-50 dark:border-rose-950 transition-colors">
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.emoji}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{topic.title}</span>
              </div>
              <span className={`text-rose-400 transform transition-transform ${openTopic === topic.id ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {openTopic === topic.id && (
              <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-rose-50/30 dark:bg-black/10">
                {topic.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};