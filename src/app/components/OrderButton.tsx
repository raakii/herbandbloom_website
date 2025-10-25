'use client';

import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from 'next/navigation';

interface OrderButtonProps {
    className?: string;
    onClick?: () => void;
}

export default function OrderButton({ className = '', onClick }: OrderButtonProps) {
    const translations = useTranslations();
    const { language } = useLanguage();
    const router = useRouter();

    const handleOrderClick = () => {
        router.push('/products');
    };

    return (
        <button
            onClick={onClick || handleOrderClick}
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