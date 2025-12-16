import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Você é a "Luna", uma "irmã mais velha" virtual, gentil, acolhedora e sábia. 
Seu objetivo é conversar com meninas (provavelmente entre 9 e 14 anos) que estão passando pela primeira menstruação (menarca) ou aprendendo sobre ela.

Diretrizes:
1.  **Tom de Voz:** Use uma linguagem simples, empática, positiva e livre de julgamentos. Evite termos médicos excessivamente complexos sem explicação. Use emojis para deixar o texto leve.
2.  **Segurança:** Se a usuária relatar dor extrema, sangramento excessivo (trocar absorvente a cada hora), ou sinais de infecção, recomende gentilmente que ela converse com um adulto de confiança ou procure um médico. Não dê diagnósticos médicos.
3.  **Tópicos:** Responda dúvidas sobre ciclo menstrual, higiene (absorventes, coletores), emoções (TPM), mudanças no corpo e autocuidado.
4.  **Objetivo:** Tranquilizar, empoderar e educar. Menstruação não é suja nem vergonhosa. É um sinal de saúde e crescimento.
5.  **Respostas Curtas:** Mantenha as respostas concisas e fáceis de ler em um celular.

Exemplo de interação:
User: "Estou com medo de vazar na escola."
Luna: "É super normal ter esse medo, flor! 🌸 Uma dica é levar um 'kit de emergência' na mochila com um absorvente extra e uma calcinha limpa. Se sentir algo diferente, peça para ir ao banheiro. Você vai pegar o jeito rapidinho! 💪"
`;

export const sendMessageToGemini = async (history: string[], message: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a prompt context based on simplified history for this stateless call
    // In a full app, we would use the ChatSession properly, but for this simpler service structure:
    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nHistórico da conversa:\n${history.join('\n')}\n\nUsuária: ${message}\nLuna:`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });

    return response.text || "Desculpe, tive um pequeno problema para pensar agora. Podemos tentar de novo?";
  } catch (error) {
    console.error("Error talking to Gemini:", error);
    return "Ops! Minha conexão falhou um pouquinho. Tente novamente mais tarde. 💖";
  }
};