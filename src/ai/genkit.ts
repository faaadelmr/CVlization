import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { gemini25FlashLite, gemini20Flash, gemini20FlashLite, gemini15Pro } from '@genkit-ai/googleai';

// Export the plugin for use with different models
export const googleAiPlugin = googleAI();

export const ai = genkit({
  plugins: [googleAiPlugin],
  model: 'googleai/gemini-2.5-flash', // Default model
});

// Model type for type safety
export type AiModel = 'gemini-2.5-flash' | 'gemini-2.0-flash' | 'gemini-2.0-flash-lite' | 'gemini-1.5-pro';

// Export functions to get the specific models
export const getGeminiModel = (modelName: AiModel) => {
  switch (modelName) {
    case 'gemini-2.5-flash':
      return gemini25FlashLite;
    case 'gemini-2.0-flash':
      return gemini20Flash;
    case 'gemini-2.0-flash-lite':
      return gemini20FlashLite;
    case 'gemini-1.5-pro':
      return gemini15Pro; // Best for vision/multimodal (images & PDFs)
    default:
      return gemini25FlashLite;
  }
};
