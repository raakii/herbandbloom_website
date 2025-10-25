// Configuration WhatsApp
// Remplacez ces valeurs par vos vraies clés

export const WHATSAPP_CONFIG = {
    // Option 1: WhatsApp Business API (Recommandé)
    BUSINESS_API: {
        TOKEN: 'your_whatsapp_business_token', // Token de votre compte WhatsApp Business
        PHONE_NUMBER_ID: 'your_phone_number_id', // ID de votre numéro de téléphone
        ADMIN_PHONE: '+221XXXXXXXXX', // Votre numéro WhatsApp (avec indicatif pays)
        WEBHOOK_VERIFY_TOKEN: 'your_webhook_verify_token' // Token de vérification webhook
    },
    
    // Option 2: Twilio WhatsApp API
    TWILIO: {
        ACCOUNT_SID: 'your_twilio_account_sid',
        AUTH_TOKEN: 'your_twilio_auth_token',
        FROM_WHATSAPP: 'whatsapp:+14155238886', // Numéro Twilio WhatsApp
        ADMIN_PHONE: 'whatsapp:+221XXXXXXXXX' // Votre numéro WhatsApp
    },
    
    // Option 3: Service webhook simple (Gratuit)
    WEBHOOK: {
        WEBHOOK_URL: 'https://your-webhook-url.com/send-whatsapp',
        ADMIN_PHONE: '+221XXXXXXXXX' // Votre numéro WhatsApp
    }
};

// Instructions pour configurer WhatsApp :
// 
// OPTION 1 - WhatsApp Business API (Recommandé) :
// 1. Créez un compte WhatsApp Business : https://business.whatsapp.com/
// 2. Configurez l'API : https://developers.facebook.com/docs/whatsapp/cloud-api
// 3. Récupérez votre Access Token et Phone Number ID
// 4. Remplacez les valeurs ci-dessus
//
// OPTION 2 - Twilio WhatsApp :
// 1. Créez un compte Twilio : https://www.twilio.com/
// 2. Activez WhatsApp Sandbox : https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
// 3. Récupérez votre Account SID et Auth Token
// 4. Remplacez les valeurs ci-dessus
//
// OPTION 3 - Webhook simple :
// 1. Créez un service webhook qui peut envoyer des messages WhatsApp
// 2. Utilisez des services comme : https://www.callmebot.com/ ou https://wa.me/
// 3. Configurez l'URL de votre webhook
// 4. Remplacez les valeurs ci-dessus
