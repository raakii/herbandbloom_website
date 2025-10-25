'use client'
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../context/LanguageContext';

export default function WaitingListForm() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const translations = useTranslations();
    const { language } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            // Récupérer les emails existants
            const existingEmails = JSON.parse(localStorage.getItem('waiting_list_emails') || '[]');
            
            // Vérifier si l'email existe déjà
            if (existingEmails.includes(email)) {
                setMessage(language === 'en' 
                    ? 'This email is already on our waiting list!' 
                    : 'Cet email est déjà sur notre liste d\'attente !'
                );
                return;
            }

            // Ajouter le nouvel email
            const updatedEmails = [...existingEmails, {
                email: email,
                date: new Date().toISOString(),
                timestamp: Date.now()
            }];

            // Sauvegarder dans localStorage
            localStorage.setItem('waiting_list_emails', JSON.stringify(updatedEmails));

            // Message de succès
            setMessage(language === 'en' 
                ? 'Thank you! You have been added to our waiting list.' 
                : 'Merci ! Vous avez été ajouté à notre liste d\'attente.'
            );

            // Réinitialiser le formulaire
            setEmail('');

        } catch (error) {
            console.error('Erreur lors de l\'ajout à la liste d\'attente:', error);
            setMessage(language === 'en' 
                ? 'An error occurred. Please try again.' 
                : 'Une erreur s\'est produite. Veuillez réessayer.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
                <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row gap-3">
                    <div className="flex-grow-1">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder={language === 'en' ? translations.email_placeholder : translations.email_placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary px-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {language === 'en' ? 'Adding...' : 'Ajout en cours...'}
                            </>
                        ) : (
                            language === 'en' ? translations.join_waiting_list : translations.join_waiting_list
                        )}
                    </button>
                </form>
                
                {message && (
                    <div className={`mt-3 alert ${message.includes('error') || message.includes('erreur') ? 'alert-danger' : 'alert-success'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
