/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Redirections pour SEO : rediriger www.ras-energies.com vers ras-energies.com (domaine canonique)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ras-energies.com',
          },
        ],
        destination: 'https://ras-energies.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
