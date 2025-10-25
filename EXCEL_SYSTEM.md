# Système Excel pour Herb & Bloom

## Fonctionnalités

✅ **Ajout automatique des commandes** : Chaque commande est automatiquement ajoutée au fichier Excel
✅ **Sauvegarde locale** : Les commandes sont stockées dans le navigateur
✅ **Export complet** : Possibilité d'exporter toutes les commandes
✅ **Page d'administration** : Interface pour gérer les commandes
✅ **Statistiques** : Nombre de commandes et chiffre d'affaires

## Comment ça fonctionne

### 1. **Lors d'une commande**
- La commande est automatiquement ajoutée au fichier Excel
- Un fichier `Commandes_Herb_Bloom_YYYY-MM-DD.xlsx` est téléchargé
- La commande est sauvegardée localement dans le navigateur

### 2. **Structure du fichier Excel**
```
Date | ID Commande | Nom Client | Email | Téléphone | Adresse | Ville | Pays | Total | Articles
```

### 3. **Page d'administration** (`/admin`)
- **Statistiques** : Nombre total de commandes, commandes du jour, chiffre d'affaires
- **Export** : Télécharger toutes les commandes en Excel
- **Actualiser** : Mettre à jour la liste
- **Supprimer** : Vider toutes les commandes (attention, irréversible)

## Utilisation

### Pour les clients
- Rien à faire, tout est automatique
- Chaque commande génère un fichier Excel

### Pour l'administrateur
1. **Accédez à** `/admin` depuis le menu de navigation
2. **Consultez les statistiques** sur le tableau de bord
3. **Exportez régulièrement** vos commandes pour sauvegarde
4. **Surveillez** les nouvelles commandes

## Avantages

- **Automatique** : Aucune intervention manuelle nécessaire
- **Persistant** : Les commandes sont sauvegardées localement
- **Complet** : Toutes les informations de commande sont incluses
- **Organisé** : Fichier Excel structuré et professionnel
- **Sécurisé** : Données stockées localement, pas de serveur externe

## Fichiers générés

### Nom du fichier
`Commandes_Herb_Bloom_2024-12-15.xlsx`

### Contenu
- **Feuille** : "Commandes Herb & Bloom"
- **Colonnes** : Date, ID, Client, Email, Téléphone, Adresse, Ville, Pays, Total, Articles
- **Format** : Excel standard, compatible avec tous les tableurs

## Sauvegarde recommandée

1. **Exportez régulièrement** vos commandes via la page admin
2. **Sauvegardez** les fichiers Excel sur votre ordinateur
3. **Archivez** les anciens fichiers pour garder un historique

## Sécurité

- **Données locales** : Stockées uniquement dans le navigateur
- **Pas de serveur** : Aucune donnée envoyée à des serveurs externes
- **Contrôle total** : Vous gardez le contrôle de vos données

## Dépannage

### Si les commandes ne s'affichent pas
1. Vérifiez que JavaScript est activé
2. Videz le cache du navigateur
3. Vérifiez la console pour les erreurs

### Si l'export ne fonctionne pas
1. Vérifiez que le navigateur autorise les téléchargements
2. Essayez un autre navigateur
3. Vérifiez l'espace disque disponible

## Support

Pour toute question ou problème :
1. Consultez la console du navigateur (F12)
2. Vérifiez que tous les fichiers sont présents
3. Testez avec une commande simple

---

**Note** : Ce système fonctionne entièrement côté client. Aucune donnée n'est envoyée à des serveurs externes, garantissant la confidentialité de vos commandes.
