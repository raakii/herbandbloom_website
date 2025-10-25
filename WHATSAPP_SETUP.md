# Configuration WhatsApp pour Herb & Bloom

## Fonctionnalités ajoutées

✅ **Export Excel automatique** : Chaque commande est automatiquement exportée en fichier Excel
✅ **Notifications WhatsApp** : Options pour recevoir des notifications sur WhatsApp

## Configuration WhatsApp

### Option 1 : WhatsApp Business API (Recommandé - Professionnel)

**Avantages :**
- Intégration officielle WhatsApp
- Messages fiables et rapides
- Pas de limite de messages
- Interface professionnelle

**Configuration :**
1. Créez un compte WhatsApp Business : https://business.whatsapp.com/
2. Configurez l'API : https://developers.facebook.com/docs/whatsapp/cloud-api
3. Récupérez votre Access Token et Phone Number ID
4. Mettez à jour `src/app/config/whatsapp.js` :

```javascript
BUSINESS_API: {
    TOKEN: 'your_actual_token_here',
    PHONE_NUMBER_ID: 'your_phone_number_id_here',
    ADMIN_PHONE: '+221XXXXXXXXX', // Votre numéro WhatsApp
    WEBHOOK_VERIFY_TOKEN: 'your_webhook_verify_token'
}
```

**Coût :** ~$0.05 par message

### Option 2 : Twilio WhatsApp (Simple et fiable)

**Avantages :**
- Configuration simple
- Documentation excellente
- Support client réactif
- Intégration facile

**Configuration :**
1. Créez un compte Twilio : https://www.twilio.com/
2. Activez WhatsApp Sandbox : https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
3. Récupérez votre Account SID et Auth Token
4. Mettez à jour `src/app/config/whatsapp.js` :

```javascript
TWILIO: {
    ACCOUNT_SID: 'your_twilio_account_sid',
    AUTH_TOKEN: 'your_twilio_auth_token',
    FROM_WHATSAPP: 'whatsapp:+14155238886',
    ADMIN_PHONE: 'whatsapp:+221XXXXXXXXX'
}
```

**Coût :** ~$0.005 par message

### Option 3 : Webhook simple (Gratuit)

**Avantages :**
- Gratuit
- Configuration simple
- Pas de compte API nécessaire

**Configuration :**
1. Créez un service webhook qui peut envoyer des messages WhatsApp
2. Utilisez des services comme :
   - https://www.callmebot.com/
   - https://wa.me/
   - Votre propre service webhook
3. Mettez à jour `src/app/config/whatsapp.js` :

```javascript
WEBHOOK: {
    WEBHOOK_URL: 'https://your-webhook-url.com/send-whatsapp',
    ADMIN_PHONE: '+221XXXXXXXXX'
}
```

**Coût :** Gratuit (avec limitations)

## Fonctionnement actuel

**Si WhatsApp n'est pas configuré :**
- Le système ouvre automatiquement WhatsApp Web avec un message pré-rempli
- Vous pouvez copier-coller le message et l'envoyer manuellement

**Si WhatsApp est configuré :**
- Les notifications sont envoyées automatiquement
- Vous recevez un message WhatsApp avec tous les détails de la commande

## Message WhatsApp envoyé

```
🛍️ *Nouvelle commande Herb & Bloom*

📋 *Détails de la commande :*
• ID: CMD-1234567890
• Client: Jean Dupont
• Email: jean@example.com
• Téléphone: +221123456789
• Adresse: 123 Rue Example, Dakar, Sénégal

🛒 *Articles commandés :*
• Bloom&Grow Hair Oil (50ml) - Qty: 2 - 20 000 FCFA
• Bloom & Butter Hair Cream (150ml) - Qty: 1 - 5 000 FCFA

💰 *Total: 25 000 FCFA*

📅 *Date: 15/12/2024*

---
Herb & Bloom - Commandes automatiques
```

## Fichiers Excel générés

Chaque commande génère automatiquement un fichier Excel avec :
- Date et ID de commande
- Informations client complètes
- Détails des articles
- Total de la commande

**Nom du fichier :** `Commande_CMD-1234567890_2024-12-15.xlsx`

## Prochaines étapes

1. **Choisissez votre option WhatsApp** (Business API recommandé)
2. **Configurez votre compte** selon l'option choisie
3. **Mettez à jour** `src/app/config/whatsapp.js` avec vos vraies clés
4. **Testez** en passant une commande

## Support

Si vous avez des questions sur la configuration :
- WhatsApp Business API : https://developers.facebook.com/docs/whatsapp/cloud-api
- Twilio WhatsApp : https://www.twilio.com/docs/whatsapp
- Documentation complète : Voir les commentaires dans les fichiers de configuration
