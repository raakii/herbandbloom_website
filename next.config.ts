/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  
  // REMOVE this line for Vercel deployment
  // output: 'export',
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Keep this for image optimization
  images: {
    unoptimized: true,
  },
  
  reactStrictMode: false,
  
  // REMOVE these static-specific configs
  // trailingSlash: true,
  // generateBuildId: async () => {
  //   return 'static-build-' + Date.now();
  // },
};

export default nextConfig;