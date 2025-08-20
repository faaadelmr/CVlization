'use server';
/**
 * @fileOverview An AI flow to analyze a resume image and extract structured data.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PersonalInfoSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  role: z.string().describe('The job title or role of the person (e.g., Frontend Developer).'),
  email: z.string().describe('The email address.'),
  phone: z.string().describe('The phone number.'),
  location: z.string().describe('The city and state or country.'),
  website: z.string().describe('The personal website or portfolio URL.').optional(),
  description: z.string().describe("A professional summary or objective statement from the resume.").optional(),
});

const ExperienceSchema = z.object({
  company: z.string().describe('The name of the company.'),
  role: z.string().describe('The job title or role.'),
  date: z.string().describe('The start and end dates of the employment.'),
  description: z.string().describe('A description of the responsibilities and achievements.'),
});

const EducationSchema = z.object({
  institution: z.string().describe('The name of the educational institution.'),
  degree: z.string().describe('The degree or certification obtained.'),
  date: z.string().describe('The start and end dates of the education.'),
  description: z.string().describe('Any additional details about the education.').optional(),
});

const AnalyzeResumeOutputSchema = z.object({
  personal: PersonalInfoSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.string().describe('A comma-separated list of skills.'),
  references: z.string().describe('Information about references, or a statement like "Available upon request."'),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;


const AnalyzeResumeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "An image of a resume, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;


export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: { schema: AnalyzeResumeInputSchema },
  output: { schema: AnalyzeResumeOutputSchema },
  prompt: `You are an expert resume parser. Analyze the provided resume image and extract the information into a structured JSON format.

Extract the following sections:
- Personal Details (name, role, email, phone, location, website, and a professional summary/objective as description)
- Work Experience (company, role, dates, description)
- Education (institution, degree, dates, description)
- Skills (as a single comma-separated string)
- References

Pay close attention to formatting the extracted text correctly, especially for descriptions which may contain bullet points. Maintain the original language of the resume.

Resume Image: {{media url=photoDataUri}}`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a structured response from the AI.');
    }
    return output;
  }
);
