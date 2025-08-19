// src/ai/flows/recommend-template.ts
'use server';
/**
 * @fileOverview A resume template recommendation AI agent.
 *
 * - recommendTemplate - A function that recommends resume templates based on skills.
 * - RecommendTemplateInput - The input type for the recommendTemplate function.
 * - RecommendTemplateOutput - The return type for the recommendTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTemplateInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma separated list of skills that the user possesses.'),
});
export type RecommendTemplateInput = z.infer<typeof RecommendTemplateInputSchema>;

const RecommendTemplateOutputSchema = z.object({
  templateRecommendation: z.string().describe('The recommended resume template based on the skills provided.'),
  additionalSkills: z.string().describe('A comma separated list of additional relevant skills the user might include.'),
});
export type RecommendTemplateOutput = z.infer<typeof RecommendTemplateOutputSchema>;

export async function recommendTemplate(input: RecommendTemplateInput): Promise<RecommendTemplateOutput> {
  return recommendTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendTemplatePrompt',
  input: {schema: RecommendTemplateInputSchema},
  output: {schema: RecommendTemplateOutputSchema},
  prompt: `You are an expert career advisor specializing in resume building.

You will use the user's provided skills to recommend a resume template that best highlights those skills. You will also suggest additional relevant skills the user might include to improve their resume.

Skills: {{{skills}}}
`,
});

const recommendTemplateFlow = ai.defineFlow(
  {
    name: 'recommendTemplateFlow',
    inputSchema: RecommendTemplateInputSchema,
    outputSchema: RecommendTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
