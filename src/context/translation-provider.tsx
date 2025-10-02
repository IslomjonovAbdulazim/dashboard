import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { Language, getTranslations, type Translations } from '@/i18n';

interface TranslationContextType {
  t: Translations;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function TranslationProvider({ 
  children, 
  defaultLanguage = 'uz' // Default to Uzbek as requested
}: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if there's a saved language preference
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || defaultLanguage;
  });

  const [t, setT] = useState<Translations>(() => getTranslations(language));

  // Update translations when language changes
  useEffect(() => {
    setT(getTranslations(language));
    localStorage.setItem('app-language', language);
  }, [language]);

  const value: TranslationContextType = {
    t,
    language,
    setLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}