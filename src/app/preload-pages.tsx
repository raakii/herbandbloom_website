'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PreloadAllPages() {
  const router = useRouter();

  useEffect(() => {
    // Fonction pour précharger TOUTES les pages de votre application
    const preloadAllRoutes = async () => {
      console.log('🚀 Démarrage du préchargement de toutes les pages...');
      
      // Liste complète de toutes vos routes
      const routes = [
        '/'
        // Routes dynamiques - ajoutez tous les IDs que vous avez
  
      ];

      // Préchargement séquentiel avec délai pour éviter de surcharger le navigateur
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        try {
          // Utilise la méthode prefetch de Next.js
          await router.prefetch(route);
          console.log(`✅ Page préchargée: ${route}`);
          
          // Petit délai entre chaque préchargement
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.warn(`⚠️ Erreur lors du préchargement de ${route}:`, error);
        }
      }
      
      console.log('🎉 Préchargement terminé ! Navigation instantanée activée.');
    };

    // Attendre un court délai avant de commencer le préchargement
    const timer = setTimeout(() => {
      preloadAllRoutes();
    }, 1000); // Attendre 1 seconde après le chargement initial

    return () => clearTimeout(timer);
  }, [router]);

  // Ce composant n'affiche rien
  return null;
}