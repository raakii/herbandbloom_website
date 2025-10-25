// Configuration des identifiants administrateur
// IMPORTANT: Changez ces identifiants en production !

export const ADMIN_CONFIG = {
    // Identifiants de connexion
    USERNAME: 'admin',
    PASSWORD: 'herbandbloom2024', // CHANGEZ CE MOT DE PASSE !
    
    // Configuration de session
    SESSION_DURATION_HOURS: 24, // Durée de la session en heures
    
    // Messages
    MESSAGES: {
        LOGIN_SUCCESS: 'Connexion réussie !',
        LOGIN_ERROR: 'Nom d\'utilisateur ou mot de passe incorrect',
        SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',
        LOGOUT_SUCCESS: 'Déconnexion réussie',
        LOGOUT_CONFIRM: 'Êtes-vous sûr de vouloir vous déconnecter ?'
    }
};

// Instructions pour changer les identifiants :
// 1. Modifiez USERNAME et PASSWORD ci-dessus
// 2. Redémarrez l'application
// 3. Utilisez les nouveaux identifiants pour vous connecter

// Recommandations de sécurité :
// - Utilisez un mot de passe fort (minimum 12 caractères)
// - Incluez des lettres majuscules, minuscules, chiffres et symboles
// - Changez régulièrement le mot de passe
// - Ne partagez jamais ces identifiants
// - En production, utilisez une authentification plus sécurisée (JWT, OAuth, etc.)
