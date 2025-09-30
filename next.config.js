/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration simplifiée et stable pour éviter les erreurs de manifest
  
  // Configuration de build stable
  onDemandEntries: {
    // Durée de cache courte pour éviter les blocages
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Gestion des erreurs de fichiers
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Configuration webpack simplifiée
  webpack: (config, { dev }) => {
    if (dev) {
      // Configuration minimale pour éviter les erreurs de manifest
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  
  // Configuration pour les images SVG
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers pour les iframes YouTube
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig