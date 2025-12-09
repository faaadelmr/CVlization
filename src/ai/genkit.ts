import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { gemini25FlashLite, gemini20Flash } from '@genkit-ai/googleai';

// Export the plugin for use with different models
export const googleAiPlugin = googleAI();

export const ai = genkit({
  plugins: [googleAiPlugin],
  model: 'googleai/gemini-2.5-flash', // Default model
});

// Export functions to get the specific models
export const getGeminiModel = (modelName: string) => {
  switch(modelName) {
    case 'gemini-2.5-flash':
      return gemini25FlashLite; // Use the correct model name
    case 'gemini-2.0-flash':
      return gemini20Flash;
    default:
      return gemini25FlashLite; // Default to gemini-2.5-flash
  }
};
