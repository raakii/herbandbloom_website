'use client';

import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../context/LanguageContext';

interface OrderButtonProps {
    className?: string;
    onClick?: () => void;
}

export default function OrderButton({ className = '', onClick }: OrderButtonProps) {
    const translations = useTranslations();
    const { language } = useLanguage();

    const handleWhatsAppClick = () => {
        const phoneNumber = "+221776588190";
        const message = language === 'en' 
            ? translations.order_message
            : translations.order_message_fr;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    };

    return (
        <button
            onClick={onClick || handleWhatsAppClick}
            className={`btn btn-font-sm btn-lg btn-primary text-uppercase mt-2 ${className}`}
            style={{
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}
        >
            {translations.order_now}
        </button>
    );
} 