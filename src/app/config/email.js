// Configuration EmailJS
// Remplacez ces valeurs par vos vraies clés EmailJS

export const EMAIL_CONFIG = {
    SERVICE_ID: 'service_2xcet27', // Service Gmail
    TEMPLATE_ID_CUSTOMER: 'template_mxd03xy', // Template pour le client
    TEMPLATE_ID_ADMIN: 'template_25grmg5', // Template pour l'admin
    PUBLIC_KEY: 'bppSRHxm9HfkagIGS', // Remplacez par votre clé publique EmailJS
    ADMIN_EMAIL: 'herbandbloom3@gmail.com' // Votre email pour recevoir les notifications
};

// Instructions pour configurer EmailJS :
// 1. Créez un compte sur https://www.emailjs.com/
// 2. Créez un service email (Gmail, Outlook, etc.)
// 3. Créez deux templates :
//    - Un pour la confirmation client
//    - Un pour la notification admin
// 4. Remplacez les valeurs ci-dessus par vos vraies clés
// 5. Installez la dépendance : npm install @emailjs/browser
