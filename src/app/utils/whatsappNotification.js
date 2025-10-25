import { WHATSAPP_CONFIG } from '../config/whatsapp';

// Fonction pour envoyer une notification WhatsApp
export const sendWhatsAppNotification = async (orderData, cartItems) => {
    try {
        const { WHATSAPP_CONFIG } = await import('../config/whatsapp');
        
        // Message WhatsApp
        const message = `🛍️ *Nouvelle commande Herb & Bloom*

📋 *Détails de la commande :*
• ID: ${orderData.order_id}
• Client: ${orderData.customer_name}
• Email: ${orderData.customer_email}
• Téléphone: ${orderData.customer_phone}
• Adresse: ${orderData.customer_address}, ${orderData.customer_city}, ${orderData.customer_country}

🛒 *Articles commandés :*
${cartItems.map(item => 
    `• ${item.product} (${item.size}) - Qty: ${item.quantity} - ${(item.price * item.quantity).toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA`
).join('\n')}

💰 *Total: ${orderData.order_total} FCFA*

📅 *Date: ${orderData.order_date}*

---
Herb & Bloom - Commandes automatiques`;

        // Essayer différentes méthodes selon la configuration
        if (WHATSAPP_CONFIG.BUSINESS_API.TOKEN !== 'your_whatsapp_business_token') {
            return await sendViaBusinessAPI(message);
        } else if (WHATSAPP_CONFIG.TWILIO.ACCOUNT_SID !== 'your_twilio_account_sid') {
            return await sendViaTwilio(message);
        } else if (WHATSAPP_CONFIG.WEBHOOK.WEBHOOK_URL !== 'https://your-webhook-url.com/send-whatsapp') {
            return await sendViaWebhook(message);
        } else {
            console.log('WhatsApp non configuré. Message à envoyer:', message);
            return { success: false, message: 'WhatsApp non configuré' };
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi WhatsApp:', error);
        return { success: false, error: error.message };
    }
};

// Méthode 1: WhatsApp Business API
const sendViaBusinessAPI = async (message) => {
    const { BUSINESS_API } = WHATSAPP_CONFIG;
    
    const response = await fetch(`https://graph.facebook.com/v17.0/${BUSINESS_API.PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${BUSINESS_API.TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: BUSINESS_API.ADMIN_PHONE.replace('+', ''),
            type: 'text',
            text: { body: message }
        })
    });

    const result = await response.json();
    return { success: response.ok, result };
};

// Méthode 2: Twilio WhatsApp
const sendViaTwilio = async (message) => {
    const { TWILIO } = WHATSAPP_CONFIG;
    
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO.ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(`${TWILIO.ACCOUNT_SID}:${TWILIO.AUTH_TOKEN}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            From: TWILIO.FROM_WHATSAPP,
            To: TWILIO.ADMIN_PHONE,
            Body: message
        })
    });

    const result = await response.json();
    return { success: response.ok, result };
};

// Méthode 3: Webhook simple
const sendViaWebhook = async (message) => {
    const { WEBHOOK } = WHATSAPP_CONFIG;
    
    const response = await fetch(WEBHOOK.WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: WEBHOOK.ADMIN_PHONE,
            message: message
        })
    });

    const result = await response.json();
    return { success: response.ok, result };
};

// Fonction simple pour ouvrir WhatsApp Web avec un message pré-rempli
export const openWhatsAppWithMessage = (orderData, cartItems) => {
    const message = `🛍️ Nouvelle commande Herb & Bloom

ID: ${orderData.order_id}
Client: ${orderData.customer_name}
Email: ${orderData.customer_email}
Téléphone: ${orderData.customer_phone}
Total: ${orderData.order_total} FCFA

Articles:
${cartItems.map(item => 
    `• ${item.product} (${item.size}) - Qty: ${item.quantity}`
).join('\n')}

Date: ${orderData.order_date}`;

    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Ouvrir WhatsApp Web avec le message
    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    return { success: true, message: 'WhatsApp ouvert avec le message' };
};
