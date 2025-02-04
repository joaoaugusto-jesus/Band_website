/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Allow external images
    unoptimized: true, // Ensures images work without Next.js optimization in static export
  },
};

export default nextConfig;
