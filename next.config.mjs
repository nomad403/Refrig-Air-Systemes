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
  // Redirections pour SEO : rediriger vers www.ras-energies.com
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'ras-energies.com',
          },
        ],
        destination: 'https://www.ras-energies.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
