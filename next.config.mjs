/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ja',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
