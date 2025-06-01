/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration existante
  devIndicators: false,
  
  // ACTIVEZ output: 'export' pour forcer la compilation de toutes les pages
  output: 'export',
  
  // Désactive temporairement ESLint pendant la compilation
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Désactive la vérification des types TypeScript pendant la compilation
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuration pour les images (obligatoire avec output: 'export')
  images: {
    unoptimized: true,
  },
  
  // Désactive le mode strict
  reactStrictMode: false,
  
  // Configuration pour forcer la génération statique
  trailingSlash: true,
  
  // Assure-vous que toutes les pages sont compilées statiquement
  generateBuildId: async () => {
    return 'static-build-' + Date.now();
  },
};

export default nextConfig;