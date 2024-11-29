import { ref } from 'vue';
import OpenAI from 'openai';

const isGenerating = ref(false);
const error = ref<string | null>(null);

export const useAI = () => {
  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
  });

  const generateResponse = async (message: string, context: any) => {
    isGenerating.value = true;
    error.value = null;

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a helpful vacation rental property manager assistant. 
            You should respond in French.
            Current booking context:
            - Guest Name: ${context.guest}
            - Check-in: ${context.arrival}
            - Check-out: ${context.departure}
            - Property ID: ${context.propertyId}
            - Room ID: ${context.roomId}
            
            Be professional, friendly, and provide accurate information based on the context.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        model: 'gpt-3.5-turbo',
      });

      return completion.choices[0]?.message?.content || null;
    } catch (e) {
      error.value = "Failed to generate AI response";
      console.error('Error generating AI response:', e);
      return null;
    } finally {
      isGenerating.value = false;
    }
  };

  return {
    isGenerating,
    error,
    generateResponse
  };
};