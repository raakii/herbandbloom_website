'use client';

import { useLanguage } from '../context/LanguageContext';
import * as enTranslations from '../i18n/en';
import * as frTranslations from '../i18n/fr';

export function useTranslations() {
    const { language } = useLanguage();
    
    const translations = {
        en: enTranslations,
        fr: frTranslations
    };

    return translations[language];
} 