import type { Language } from './types';

export type TranslationKey =
    | 'profile'
    | 'about'
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'projects'
    | 'contact'
    | 'workHistory'
    | 'expertise'
    | 'portfolio';

type Translations = {
    [key in Language]: {
        [k in TranslationKey]: string;
    };
};

export const translations: Translations = {
    en: {
        profile: 'Profile',
        about: 'About',
        summary: 'Summary',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
        workHistory: 'Work History',
        expertise: 'Expertise',
        portfolio: 'Portfolio',
    },
    id: {
        profile: 'Profil',
        about: 'Tentang',
        summary: 'Ringkasan',
        experience: 'Pengalaman',
        education: 'Pendidikan',
        skills: 'Keahlian',
        projects: 'Proyek',
        contact: 'Kontak',
        workHistory: 'Riwayat Kerja',
        expertise: 'Keahlian',
        portfolio: 'Portofolio',
    },
};

export function t(language: Language, key: TranslationKey): string {
    return translations[language][key];
}
