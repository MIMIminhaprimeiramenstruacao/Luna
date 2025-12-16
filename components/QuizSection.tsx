import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "O que é a menstruação?",
    options: ["Um machucado interno", "O corpo limpando o útero", "Uma doença do sangue", "Excesso de xixi"],
    correctAnswer: 1,
    explanation: "Isso aí! O útero descama a 'caminha' que preparou e não usou. É super natural! 🩸"
  },
  {
    id: 2,
    question: "Quantos dias dura um ciclo menstrual médio?",
    options: ["10 dias", "15 dias", "28 dias", "40 dias"],
    correctAnswer: 2,
    explanation: "A média é 28 dias, mas pode variar entre 21 e 35 dias. Cada corpo é único! 📅"
  },
  {
    id: 3,
    question: "Qual o nome da primeira menstruação?",
    options: ["Menopausa", "Ovulação", "Menarca", "Puberdade"],
    correctAnswer: 2,
    explanation: "Menarca é o nome especial para sua primeira visitinha! 🎉"
  },
  {
    id: 4,
    question: "Pode lavar o cabelo menstruada?",
    options: ["Não, faz mal", "Sim, normalmente", "Só com água fria", "Só no último dia"],
    correctAnswer: 1,
    explanation: "Pode sim! Higiene é super importante e água quentinha relaxa. É um mito antigo dizer que não pode. 🚿"
  },
  {
    id: 5,
    question: "O que é TPM?",
    options: ["Tempo Para Meninas", "Tensão Pré-Menstrual", "Tudo Pelo Movimento", "Tontura Pós-Manhã"],
    correctAnswer: 1,
    explanation: "Tensão Pré-Menstrual! É quando os hormônios deixam a gente mais sensível antes da menstruação. 🎢"
  },
  {
    id: 6,
    question: "Pode praticar esportes menstruada?",
    options: ["Nunca!", "Só xadrez", "Sim, qualquer um", "Só natação"],
    correctAnswer: 2,
    explanation: "Com certeza! Exercícios liberam endorfina que ajuda a aliviar as cólicas. 🏃‍♀️"
  },
  {
    id: 7,
    question: "De quanto em quanto tempo devo trocar o absorvente?",
    options: ["A cada 12 horas", "Quando lembrar", "A cada 4 a 6 horas", "Uma vez ao dia"],
    correctAnswer: 2,
    explanation: "Para evitar cheirinhos e bactérias, o ideal é trocar a cada 4 a 6 horas, tá? ⏰"
  },
  {
    id: 8,
    question: "Menstruação é sangue sujo?",
    options: ["Sim, muito", "Não, é tecido e sangue limpo", "Depende do dia", "Sim, tem bactérias"],
    correctAnswer: 1,
    explanation: "Não! É apenas sangue e tecido do útero. Não é sujeira, é saúde! ❤️"
  },
  {
    id: 9,
    question: "O que ajuda a aliviar cólicas?",
    options: ["Comer muito sal", "Bolsa de água quente", "Beber refrigerante", "Ficar estressada"],
    correctAnswer: 1,
    explanation: "O calor da bolsa de água quente relaxa os músculos do útero e alivia a dor. 🔥"
  },
  {
    id: 10,
    question: "É normal a menstruação vir marrom no começo?",
    options: ["Sim, super normal", "Não, corre pro médico", "Significa infecção", "Nunca acontece"],
    correctAnswer: 0,
    explanation: "Sim! Sangue em pouca quantidade ou que demorou a sair pode ficar marrom. Sem pânico! 🤎"
  },
  {
    id: 11,
    question: "Onde o bebê cresce dentro da mãe?",
    options: ["No estômago", "No útero", "No intestino", "No ovário"],
    correctAnswer: 1,
    explanation: "No útero! É ele que se prepara todo mês (a menstruação) caso um bebê vá morar lá. 🏠"
  },
  {
    id: 12,
    question: "Chocolate ajuda na TPM?",
    options: ["Não, piora", "Sim, melhora o humor", "Só chocolate branco", "É indiferente"],
    correctAnswer: 1,
    explanation: "Sim! O chocolate (principalmente o meio amargo) ajuda a liberar serotonina, o hormônio da felicidade. 🍫"
  },
  {
    id: 13,
    question: "Pode andar descalça menstruada?",
    options: ["Sim, não tem problema", "Não, para o fluxo", "Não, dá cólica instantânea", "Não, dá gripe"],
    correctAnswer: 0,
    explanation: "Pode sim! O chão frio não tem ligação direta com seu útero. Mais um mito! 👣"
  },
  {
    id: 14,
    question: "O que são os ovários?",
    options: ["Guardam os óvulos", "Produzem o sangue", "Limpam o corpo", "Filtram água"],
    correctAnswer: 0,
    explanation: "Eles são como bolsinhas que guardam os óvulos. Temos dois, um de cada lado! 🥚"
  },
  {
    id: 15,
    question: "É vergonhoso comprar absorvente?",
    options: ["Sim, esconda!", "Não, é algo natural", "Só se for homem", "Sim, peça para outra pessoa"],
    correctAnswer: 1,
    explanation: "Jamais! Metade do mundo menstrua. É tão normal quanto comprar papel higiênico. 🛒"
  },
  {
    id: 16,
    question: "O ciclo irregular na adolescência é...",
    options: ["Um problema grave", "Raro", "Super comum", "Impossível"],
    correctAnswer: 2,
    explanation: "Super comum! O corpo está aprendendo a funcionar, pode levar até 2 anos para regular. 📉"
  },
  {
    id: 17,
    question: "Se vazar sangue na roupa, o que fazer?",
    options: ["Chorar e ir embora", "Amarrar casaco e trocar", "Nunca mais sair de casa", "Gritar"],
    correctAnswer: 1,
    explanation: "Acontece com todas! Amarre um casaco na cintura, peça ajuda e troque assim que der. 💪"
  },
  {
    id: 18,
    question: "O que é ovulação?",
    options: ["A saída do sangue", "A liberação do óvulo", "O fim do ciclo", "Dor de cabeça"],
    correctAnswer: 1,
    explanation: "É quando o ovário libera um óvulo para viajar até o útero. Acontece no meio do ciclo. 🥚"
  },
  {
    id: 19,
    question: "Pode entrar na piscina menstruada?",
    options: ["Não, a água fica vermelha", "Sim, com absorvente interno/coletor", "Sim, com absorvente comum", "Proibido"],
    correctAnswer: 1,
    explanation: "Pode sim! Usando absorvente interno ou coletor é super seguro e higiênico. 🏊‍♀️"
  },
  {
    id: 20,
    question: "Quanto sangue a gente perde por mês?",
    options: ["1 litro", "Um copo de 200ml", "Cerca de 2 a 3 colheres de sopa", "5 litros"],
    correctAnswer: 2,
    explanation: "Parece muito, mas é pouquinho! Geralmente entre 30ml a 80ml (algumas colheres). 🥄"
  },
  {
    id: 21,
    question: "O que é corrimento branco ou transparente?",
    options: ["Infecção grave", "Fluido natural de limpeza", "Resto de menstruação", "Doença"],
    correctAnswer: 1,
    explanation: "É o jeito do corpo se limpar sozinho e manter a vagina saudável. Se não coçar ou cheirar mal, é normal! ✨"
  },
  {
    id: 22,
    question: "Dormir ajuda na cólica?",
    options: ["Não", "Sim, o corpo relaxa", "Piora a dor", "Só se for de bruços"],
    correctAnswer: 1,
    explanation: "Sim! Descansar ajuda o corpo a lidar melhor com a inflamação e a dor. 😴"
  },
  {
    id: 23,
    question: "Pode comer comida azeda menstruada?",
    options: ["Não, corta o fluxo", "Sim, sem problemas", "Muda a cor do sangue", "Dá dor de barriga"],
    correctAnswer: 1,
    explanation: "Mito! Limão ou laranja não 'cortam' o sangue. Pode comer sua salada tranquila! 🍋"
  },
  {
    id: 24,
    question: "Quem menstrua?",
    options: ["Só mulheres adultas", "Meninas e mulheres", "Bebês", "Idosas"],
    correctAnswer: 1,
    explanation: "Meninas a partir da puberdade e mulheres até a menopausa. 👩‍🦰"
  },
  {
    id: 25,
    question: "O absorvente deve ser jogado...",
    options: ["No vaso sanitário", "Pela janela", "No lixo", "No chão"],
    correctAnswer: 2,
    explanation: "Sempre no lixo! No vaso ele entope o encanamento e polui a água. 🗑️"
  },
  {
    id: 26,
    question: "Se a cólica for muito forte e impedir de sair da cama...",
    options: ["É normal, aguenta", "Tome 10 remédios", "Procure um médico", "Coma doce"],
    correctAnswer: 2,
    explanation: "Cólica incapacitante não é normal. Vale a pena conversar com um ginecologista! 👩‍⚕️"
  },
  {
    id: 27,
    question: "O uso de absorvente causa perda da virgindade?",
    options: ["Sim", "Não, nada a ver", "Depende da marca", "Só o interno"],
    correctAnswer: 1,
    explanation: "Não! Virgindade é sobre relação sexual, não sobre produtos de higiene. O hímen é elástico. 🌸"
  },
  {
    id: 28,
    question: "Devemos usar sabonete perfumado na região íntima?",
    options: ["Sim, para ficar cheiroso", "Não, pode irritar", "Só no verão", "Sempre"],
    correctAnswer: 1,
    explanation: "Melhor não! Perfumes podem causar alergia. Água e sabonete neutro são os melhores amigos. 🧼"
  },
  {
    id: 29,
    question: "O que fazer se a menstruação atrasar 1 mês?",
    options: ["Desesperar", "Aguardar, pode ser estresse ou fase", "Tomar remédio", "Correr no hospital"],
    correctAnswer: 1,
    explanation: "No começo é super normal falhar. Estresse e alimentação também influenciam. Fique calma! 🧘‍♀️"
  },
  {
    id: 30,
    question: "Menstruar significa que...",
    options: ["Estou doente", "Posso engravidar", "Vou parar de crescer", "Virei adulta instantaneamente"],
    correctAnswer: 1,
    explanation: "Significa que seu corpo amadureceu e agora libera óvulos, ou seja, é possível engravidar. Proteja-se! 👶"
  },
  {
    id: 31,
    question: "Para que serve anotar as datas da menstruação?",
    options: ["Para gastar papel", "Para nada", "Para conhecer seu corpo", "Para os médicos verem"],
    correctAnswer: 2,
    explanation: "Anotar ajuda você a prever quando a próxima virá e entender seu próprio ritmo! 📝"
  },
  {
    id: 32,
    question: "É normal ter mais espinhas durante o ciclo?",
    options: ["Sim, por causa dos hormônios", "Não, é sujeira", "Só se comer chocolate", "Nunca acontece"],
    correctAnswer: 0,
    explanation: "Super normal! As alterações hormonais podem aumentar a oleosidade da pele. Lave o rosto direitinho! 🧼"
  },
  {
    id: 33,
    question: "Por quanto tempo posso ficar com absorvente interno?",
    options: ["12 horas", "O dia todo", "No máximo 8 horas", "24 horas"],
    correctAnswer: 2,
    explanation: "Para sua segurança e saúde, o ideal é trocar a cada 4 horas e nunca passar de 8 horas. ⏳"
  },
  {
    id: 34,
    question: "O que é um coletor menstrual?",
    options: ["Um remédio", "Um copinho de silicone reutilizável", "Um tipo de calcinha", "Um exame"],
    correctAnswer: 1,
    explanation: "É um copinho macio que coleta o sangue em vez de absorver. É ecológico e dura anos! ♻️"
  },
  {
    id: 35,
    question: "Como tirar mancha de sangue da calcinha?",
    options: ["Água fervendo", "Água fria e sabão", "Jogar fora", "Ferro de passar"],
    correctAnswer: 1,
    explanation: "Use água fria! A água quente 'cozinha' o sangue e fixa a mancha no tecido. 🧊"
  },
  {
    id: 36,
    question: "É normal se sentir inchada ou mais pesada?",
    options: ["Não, você engordou muito", "Sim, retenção de líquidos", "Significa gravidez", "Só se comer sal"],
    correctAnswer: 1,
    explanation: "Sim! O corpo retém mais líquido antes e durante a menstruação. Passa rapidinho! 🎈"
  },
  {
    id: 37,
    question: "Se o sangue ou corrimento tiver cheiro muito forte e ruim...",
    options: ["Passe perfume", "É normal", "Procure um médico", "Lave 10 vezes"],
    correctAnswer: 2,
    explanation: "Cheiro forte e desagradável pode ser sinal de infecção. É importante ver um médico. 👩‍⚕️"
  },
  {
    id: 38,
    question: "Posso conversar sobre menstruação com meu pai?",
    options: ["Nunca, é segredo", "Sim, é natural", "Só se a mãe deixar", "Ele vai rir"],
    correctAnswer: 1,
    explanation: "Claro que sim! Homens também precisam entender para apoiar as filhas, irmãs e amigas. 👨‍👧"
  },
  {
    id: 39,
    question: "Por que sinto mais fome na TPM?",
    options: ["Gula", "O corpo gasta mais energia", "Falta de educação", "Sono"],
    correctAnswer: 1,
    explanation: "Seu metabolismo acelera um pouquinho e os hormônios pedem energia. Alimente-se bem! 🍎"
  },
  {
    id: 40,
    question: "Existem calcinhas que absorvem a menstruação?",
    options: ["Não, isso não existe", "Sim, são laváveis", "Só descartáveis", "São de plástico"],
    correctAnswer: 1,
    explanation: "Sim! As calcinhas absorventes são tecnológicas, laváveis e substituem o absorvente. 🩲"
  },
  {
    id: 41,
    question: "O que comer para repor o ferro perdido no sangue?",
    options: ["Balas e doces", "Feijão e folhas verdes escuras", "Refrigerante", "Pão branco"],
    correctAnswer: 1,
    explanation: "Feijão, lentilha, espinafre e carnes ajudam a manter você forte e sem anemia! 💪"
  },
  {
    id: 42,
    question: "Para que servem os pelos pubianos?",
    options: ["Para incomodar", "Proteção contra bactérias", "Estética", "Nada"],
    correctAnswer: 1,
    explanation: "Eles funcionam como uma barreira de proteção natural para sua região íntima. 🛡️"
  },
  {
    id: 43,
    question: "Seios doloridos antes da menstruação é...",
    options: ["Doença grave", "Normal, efeito hormonal", "Crescimento instantâneo", "Alergia"],
    correctAnswer: 1,
    explanation: "É um sintoma comum da TPM devido à progesterona. O desconforto passa quando a menstruação chega. 🍒"
  },
  {
    id: 44,
    question: "Por que às vezes o intestino fica solto na menstruação?",
    options: ["Comida estragada", "Substâncias chamadas prostaglandinas", "Vírus", "Sorte"],
    correctAnswer: 1,
    explanation: "As mesmas substâncias que fazem o útero contrair podem afetar o intestino. É a famosa 'cólica intestinal'. 🚽"
  },
  {
    id: 45,
    question: "Estresse pode atrasar a menstruação?",
    options: ["Não, nada a ver", "Sim, influencia muito", "Só se for prova de matemática", "Adiciona dias"],
    correctAnswer: 1,
    explanation: "Sim! O estresse mexe com a parte do cérebro que controla os hormônios do ciclo. 🤯"
  },
  {
    id: 46,
    question: "Posso usar absorvente noturno durante o dia?",
    options: ["Proibido", "Sim, se o fluxo for intenso", "Não, cai", "Só em casa"],
    correctAnswer: 1,
    explanation: "Pode sim! Se você tem fluxo intenso e quer mais segurança, o noturno é ótimo. 🌙"
  },
  {
    id: 47,
    question: "A menstruação acontece para sempre?",
    options: ["Sim, até os 100 anos", "Não, para na menopausa", "Para aos 20 anos", "Nunca para"],
    correctAnswer: 1,
    explanation: "Ela para quando a mulher chega na menopausa, geralmente entre 45 e 55 anos. 👵"
  },
  {
    id: 48,
    question: "O que é um ginecologista?",
    options: ["Médico de coração", "Médico da saúde da mulher", "Médico de olhos", "Dentista"],
    correctAnswer: 1,
    explanation: "É o médico especialista em cuidar do útero, ovários, mamas e saúde íntima. 👩‍⚕️"
  },
  {
    id: 49,
    question: "Posso usar absorvente interno na primeira menstruação?",
    options: ["Não, perde a virgindade", "Sim, se sentir confortável", "Só depois dos 18", "É proibido"],
    correctAnswer: 1,
    explanation: "Pode sim! Não tem idade mínima, basta ler as instruções e se sentir relaxada para colocar. 🧘‍♀️"
  },
  {
    id: 50,
    question: "O que fazer se não tiver absorvente na hora?",
    options: ["Ir embora", "Pedir para amiga ou usar papel higiênico", "Chorar", "Usar folha de caderno"],
    correctAnswer: 1,
    explanation: "Peça ajuda! Se não der, faça um 'rolinho' com bastante papel higiênico até conseguir um. 🆘"
  }
];

export const QuizSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-card rounded-3xl shadow-lg border-2 border-rose-100 dark:border-rose-900 transition-colors h-full text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-4">Quiz Finalizado!</h2>
        <p className="text-xl text-gray-700 dark:text-gray-200 mb-6">
          Você acertou <span className="font-bold text-rose-500">{score}</span> de {questions.length} perguntas!
        </p>
        
        <div className="p-4 bg-rose-50 dark:bg-rose-900/30 rounded-2xl mb-8 w-full">
          <p className="text-gray-600 dark:text-gray-300">
            {score === 50 ? "Uau! Você é uma expert no assunto! 🌟" : 
             score > 35 ? "Mandou super bem! Já sabe quase tudo! 👏" : 
             "Ótimo começo! Continue aprendendo na seção Guia. 📚"}
          </p>
        </div>

        <button 
          onClick={restartQuiz}
          className="w-full py-4 bg-rose-400 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-md transition-all transform hover:scale-105"
        >
          Jogar Novamente 🔄
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-sm border border-rose-100 dark:border-rose-900 mb-6 transition-colors">
        <div className="flex justify-between items-center mb-2">
           <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400">Quiz da Luna 🧩</h2>
           <span className="text-sm font-bold bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300 px-3 py-1 rounded-full">
             {currentQuestionIndex + 1}/{questions.length}
           </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-rose-400 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-dark-card p-6 rounded-3xl shadow-lg border border-rose-50 dark:border-rose-950 transition-colors">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 min-h-[60px]">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let buttonStyle = "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-gray-700";
            
            if (isAnswered) {
               if (index === currentQuestion.correctAnswer) {
                 buttonStyle = "bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200";
               } else if (index === selectedAnswer) {
                 buttonStyle = "bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200";
               } else {
                 buttonStyle = "opacity-50 grayscale";
               }
            } else if (selectedAnswer === index) {
               buttonStyle = "bg-rose-100 border-rose-300";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-xl border-2 font-medium transition-all duration-200 ${buttonStyle}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className="mt-6 animate-fade-in">
            <div className={`p-4 rounded-xl mb-4 ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                : 'bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200'
            }`}>
              <p className="font-bold mb-1">
                {selectedAnswer === currentQuestion.correctAnswer ? '✨ Muito bem!' : 'Ops! 🙈'}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
            
            <button
              onClick={handleNextQuestion}
              className="w-full py-3 bg-rose-400 hover:bg-rose-500 text-white font-bold rounded-xl shadow-md transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta ➜' : 'Ver Resultado 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};