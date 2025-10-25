# Système d'authentification Admin - Herb & Bloom

## 🔐 Protection de la page d'administration

La page `/admin` est maintenant protégée par un système d'authentification simple mais efficace.

## 🚀 Fonctionnalités

✅ **Authentification par login/mot de passe**
✅ **Session persistante** (24 heures)
✅ **Déconnexion sécurisée**
✅ **Protection contre l'accès non autorisé**
✅ **Interface utilisateur intuitive**

## 🔑 Identifiants par défaut

```
Nom d'utilisateur: admin
Mot de passe: herbandbloom2024
```

## 📝 Comment changer les identifiants

### 1. Modifier la configuration
Éditez le fichier `src/app/config/admin.js` :

```javascript
export const ADMIN_CONFIG = {
    USERNAME: 'votre_nouveau_utilisateur',
    PASSWORD: 'votre_nouveau_mot_de_passe_securise',
    // ...
};
```

### 2. Redémarrer l'application
```bash
npm run dev
```

### 3. Se connecter avec les nouveaux identifiants

## 🛡️ Sécurité

### Niveau de sécurité actuel
- **Authentification basique** : Login/mot de passe
- **Session persistante** : 24 heures
- **Stockage local** : SessionStorage (sécurisé côté client)
- **Protection des routes** : Redirection automatique si non authentifié

### Recommandations de sécurité

#### Pour un usage personnel/small business :
✅ **Suffisant** : Le système actuel est adapté

#### Pour un usage professionnel/entreprise :
⚠️ **Améliorations recommandées** :
- Authentification JWT
- Hachage des mots de passe
- Authentification à deux facteurs (2FA)
- Logs de connexion
- Limitation des tentatives de connexion

## 🔧 Configuration avancée

### Durée de session
```javascript
// Dans src/app/config/admin.js
SESSION_DURATION_HOURS: 24, // Changer la durée (en heures)
```

### Messages personnalisés
```javascript
MESSAGES: {
    LOGIN_SUCCESS: 'Connexion réussie !',
    LOGIN_ERROR: 'Identifiants incorrects',
    SESSION_EXPIRED: 'Session expirée',
    // ...
}
```

## 📱 Utilisation

### 1. Accès à l'administration
- Allez sur `/admin`
- Entrez vos identifiants
- Cliquez sur "Se connecter"

### 2. Gestion des commandes
- Consultez les statistiques
- Exportez les commandes
- Gérez les données

### 3. Déconnexion
- Cliquez sur le bouton "Déconnexion"
- Confirmez la déconnexion

## 🚨 Dépannage

### Problème : "Session expirée"
**Solution** : Reconnectez-vous avec vos identifiants

### Problème : "Identifiants incorrects"
**Solutions** :
1. Vérifiez l'orthographe
2. Vérifiez la configuration dans `admin.js`
3. Redémarrez l'application

### Problème : Page blanche après connexion
**Solutions** :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez que tous les fichiers sont présents
3. Redémarrez l'application

## 🔄 Améliorations futures possibles

### Niveau 1 - Améliorations simples
- [ ] Changer les identifiants via interface
- [ ] Historique des connexions
- [ ] Notifications de sécurité

### Niveau 2 - Sécurité avancée
- [ ] Authentification JWT
- [ ] Hachage des mots de passe
- [ ] Limitation des tentatives
- [ ] Logs détaillés

### Niveau 3 - Enterprise
- [ ] Authentification OAuth (Google, Microsoft)
- [ ] Authentification à deux facteurs
- [ ] Gestion des rôles utilisateurs
- [ ] Audit trail complet

## 📞 Support

En cas de problème :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez la configuration dans `admin.js`
3. Testez avec les identifiants par défaut
4. Redémarrez l'application

---

**Note de sécurité** : Ce système est conçu pour une utilisation simple et sécurisée. Pour des besoins de sécurité avancés, considérez l'implémentation d'une authentification plus robuste.
