'use client';

/**
 * Puter.js AI Wrapper for Resume Analysis
 * Uses free Gemini API from Puter.js - no API key required
 */

// Define available models from Puter.js
export type PuterAiModel =
    | 'gemini-3-flash-preview'
    | 'gemini-3-pro-preview'
    | 'gemini-2.5-pro'
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite'
    | 'gemini-2.0-flash'
    | 'gemini-2.0-flash-lite'
    | 'gemini-1.5-flash';

// Type for Puter global object
declare global {
    interface Window {
        puter?: {
            ai: {
                chat: (prompt: string, imageUrl?: string, options?: { model: string }) => Promise<any>;
            };
        };
    }
}

// Load Puter.js script dynamically
let puterLoaded = false;
let puterLoadPromise: Promise<void> | null = null;

export function loadPuterJS(): Promise<void> {
    if (puterLoaded && window.puter) {
        return Promise.resolve();
    }

    if (puterLoadPromise) {
        return puterLoadPromise;
    }

    puterLoadPromise = new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.puter) {
            puterLoaded = true;
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://js.puter.com/v2/';
        script.async = true;
        script.onload = () => {
            puterLoaded = true;
            resolve();
        };
        script.onerror = () => {
            reject(new Error('Failed to load Puter.js'));
        };
        document.head.appendChild(script);
    });

    return puterLoadPromise;
}

// Resume data structure
export interface ParsedResumeData {
    personal: {
        name: string;
        role: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        description: string;
    };
    experience: {
        company: string;
        role: string;
        date: string;
        description: string;
    }[];
    education: {
        institution: string;
        degree: string;
        date: string;
        description?: string;
    }[];
    projects: {
        name: string;
        description: string;
        technologies: string;
        link?: string;
    }[];
    skills: string;
}

// Prompt for resume analysis
const RESUME_ANALYSIS_PROMPT = `You are an expert resume parser. Analyze the provided resume image and extract the information into a structured JSON format.

Extract the following sections:
- Personal Details (name, role, email, phone, location, website, and a professional summary/objective as description)
- Work Experience (company, role, dates, description)
- Education (institution, degree, dates, description)
- Projects (name, description, technologies used, and a link)
- Skills (as a single comma-separated string)

IMPORTANT: Return ONLY valid JSON without any markdown formatting or code blocks. The JSON structure must be:
{
  "personal": {
    "name": "string",
    "role": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "website": "string",
    "description": "string"
  },
  "experience": [{"company": "string", "role": "string", "date": "string", "description": "string"}],
  "education": [{"institution": "string", "degree": "string", "date": "string", "description": "string"}],
  "projects": [{"name": "string", "description": "string", "technologies": "string", "link": "string"}],
  "skills": "comma-separated skills string"
}

If a section is not found, return an empty array or empty string. Maintain the original language of the resume.`;

// Parse AI response to structured data
function parseAIResponse(response: any): ParsedResumeData {
    // Handle different response formats from Puter.js
    let responseText: string;

    if (typeof response === 'string') {
        responseText = response;
    } else if (response?.message?.content) {
        // Format: { message: { content: "..." } }
        responseText = response.message.content;
    } else if (response?.text) {
        // Format: { text: "..." }
        responseText = response.text;
    } else if (response?.content) {
        // Format: { content: "..." }
        responseText = response.content;
    } else if (typeof response === 'object') {
        // Try to stringify if it's already parsed JSON
        try {
            responseText = JSON.stringify(response);
        } catch {
            throw new Error('Unexpected response format from AI');
        }
    } else {
        console.error('Unknown response format:', response);
        throw new Error('Unexpected response format from AI');
    }

    // Remove markdown code blocks if present
    let cleanResponse = responseText.trim();

    // Remove ```json and ``` markers
    if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.slice(7);
    } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.slice(3);
    }

    if (cleanResponse.endsWith('```')) {
        cleanResponse = cleanResponse.slice(0, -3);
    }

    cleanResponse = cleanResponse.trim();

    try {
        const parsed = JSON.parse(cleanResponse);

        // Validate and ensure all required fields exist
        return {
            personal: {
                name: parsed.personal?.name || '',
                role: parsed.personal?.role || '',
                email: parsed.personal?.email || '',
                phone: parsed.personal?.phone || '',
                location: parsed.personal?.location || '',
                website: parsed.personal?.website || '',
                description: parsed.personal?.description || '',
            },
            experience: Array.isArray(parsed.experience) ? parsed.experience.map((exp: any) => ({
                company: exp.company || '',
                role: exp.role || '',
                date: exp.date || '',
                description: exp.description || '',
            })) : [],
            education: Array.isArray(parsed.education) ? parsed.education.map((edu: any) => ({
                institution: edu.institution || '',
                degree: edu.degree || '',
                date: edu.date || '',
                description: edu.description || '',
            })) : [],
            projects: Array.isArray(parsed.projects) ? parsed.projects.map((proj: any) => ({
                name: proj.name || '',
                description: proj.description || '',
                technologies: proj.technologies || '',
                link: proj.link || '',
            })) : [],
            skills: parsed.skills || '',
        };
    } catch (error) {
        console.error('Failed to parse AI response:', error);
        console.error('Raw response:', response);
        console.error('Response type:', typeof response);
        throw new Error('Failed to parse AI response. Please try again.');
    }
}

// Main function to analyze resume with Puter.js
export async function analyzeResumeWithPuter(
    imageDataUri: string,
    model: PuterAiModel = 'gemini-2.5-flash'
): Promise<ParsedResumeData> {
    // Load Puter.js if not already loaded
    await loadPuterJS();

    if (!window.puter) {
        throw new Error('Puter.js failed to initialize');
    }

    try {
        // Call Puter AI with image
        const response = await window.puter.ai.chat(
            RESUME_ANALYSIS_PROMPT,
            imageDataUri,
            { model }
        );

        // Parse the response
        return parseAIResponse(response);
    } catch (error: any) {
        console.error('Puter AI error:', error);
        throw new Error(error.message || 'Failed to analyze resume with AI');
    }
}
