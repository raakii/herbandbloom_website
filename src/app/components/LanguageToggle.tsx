'use client';

import { useLanguage } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();
    const translations = useTranslations();

    return (
        <button
            onClick={toggleLanguage}
            className="language-toggle"
            aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
            style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                marginLeft: '15px',
                marginTop: '12px'
            }}
        >
            {language === 'en' ? translations.language_toggle_fr : translations.language_toggle_en}
        </button>
    );
} 