# Configuration EmailJS pour Herb & Bloom

## Étapes pour configurer l'envoi d'emails automatiques

### 1. Créer un compte EmailJS
1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit
3. Connectez votre service email (Gmail, Outlook, etc.)

### 2. Configurer le service email
1. Dans le dashboard EmailJS, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur email (Gmail recommandé)
4. Suivez les instructions pour connecter votre compte
5. Notez le **Service ID** généré service_fx3wx7p

### 3. Créer les templates d'email

#### Template pour le client (Confirmation de commande)
1. Allez dans "Email Templates"
2. Créez un nouveau template
3. Utilisez ce contenu :

**Sujet :** Confirmation de votre commande Herb & Bloom

**Contenu :**
```
Bonjour {{to_name}},

Merci pour votre commande chez Herb & Bloom !

Détails de votre commande :
- Numéro de commande : {{order_id}}
- Date : {{order_date}}
- Total : {{order_total}} FCFA

Articles commandés :
{{order_items}}

Informations de livraison :
{{customer_name}}
{{customer_address}}
{{customer_city}}, {{customer_country}}

Nous traiterons votre commande dans les plus brefs délais.

Cordialement,
L'équipe Herb & Bloom
```

4. Notez le **Template ID**

#### Template pour l'admin (Notification de nouvelle commande)
1. Créez un autre template
2. Utilisez ce contenu :

**Sujet :** Nouvelle commande Herb & Bloom - {{order_id}}

**Contenu :**
```
Nouvelle commande reçue !

Client : {{customer_name}}
Email : {{customer_email}}
Téléphone : {{customer_phone}}

Adresse de livraison :
{{customer_address}}
{{customer_city}}, {{customer_country}}

Articles commandés :
{{order_items}}

Total : {{order_total}} FCFA
Date : {{order_date}}
Numéro de commande : {{order_id}}
```

4. Notez le **Template ID**

### 4. Obtenir la clé publique
1. Allez dans "Account" > "General"
2. Copiez votre **Public Key**

### 5. Configurer le fichier de configuration
1. Ouvrez `src/app/config/email.js`
2. Remplacez les valeurs par vos vraies clés :

```javascript
export const EMAIL_CONFIG = {
    SERVICE_ID: 'votre_service_id_ici',
    TEMPLATE_ID_CUSTOMER: 'votre_template_client_ici',
    TEMPLATE_ID_ADMIN: 'votre_template_admin_ici',
    PUBLIC_KEY: 'votre_cle_publique_ici',
    ADMIN_EMAIL: 'votre_email@herbandbloom.com'
};
```

### 6. Installer la dépendance
```bash
npm install @emailjs/browser
```

### 7. Tester
1. Lancez votre application
2. Passez une commande test
3. Vérifiez que vous recevez les emails

## Variables disponibles dans les templates

- `{{to_name}}` : Nom du client
- `{{to_email}}` : Email du client
- `{{customer_name}}` : Nom complet du client
- `{{customer_email}}` : Email du client
- `{{customer_phone}}` : Téléphone du client
- `{{customer_address}}` : Adresse du client
- `{{customer_city}}` : Ville du client
- `{{customer_country}}` : Pays du client
- `{{order_total}}` : Total de la commande
- `{{order_items}}` : Liste des articles
- `{{order_date}}` : Date de la commande
- `{{order_id}}` : Numéro de commande
- `{{admin_name}}` : Nom de l'admin (pour le template admin)

## Limites du plan gratuit EmailJS
- 200 emails/mois
- 2 services email
- Templates illimités

Pour plus d'emails, considérez un plan payant.
