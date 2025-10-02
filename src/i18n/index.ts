import { createContext, useContext } from 'react';
import { uzbekTranslations, englishTranslations, type Translations } from './translations';

// Language type
export type Language = 'en' | 'uz';

// Translation context
export const TranslationContext = createContext<{
  t: Translations;
  language: Language;
  setLanguage: (lang: Language) => void;
}>({
  t: uzbekTranslations, // Default to Uzbek as requested
  language: 'uz',
  setLanguage: () => {},
});

// Hook to use translations
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Get translations for a language
export const getTranslations = (language: Language): Translations => {
  return language === 'uz' ? uzbekTranslations : englishTranslations;
};

// Export translations
export { uzbekTranslations, englishTranslations };
export type { Translations };