import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { en } from '@/i18n/en';
import { ro } from '@/i18n/ro';
import type { Translations } from '@/i18n/en';

type Language = 'en' | 'ro';

interface LanguageContextValue {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANG_KEY = 'read_swap_lang';

const translations: Record<Language, Translations> = { en, ro };

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem(LANG_KEY);
        return (saved === 'en' || saved === 'ro') ? saved : 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem(LANG_KEY, lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
    return ctx;
}
