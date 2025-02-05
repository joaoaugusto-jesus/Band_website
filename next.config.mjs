/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // Keep your Cloudinary settings
  },
  output: 'standalone', // Enables standalone build for SSR support
};

export default nextConfig;

