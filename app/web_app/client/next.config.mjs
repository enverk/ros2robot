/** @type {import('next').NextConfig} */
const nextConfig =  {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/login', // Ana sayfa isteklerini /app/login'e yönlendir
        },
      ];
    },
  };
  
export default nextConfig;
