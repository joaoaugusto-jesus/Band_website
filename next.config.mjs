/** @type {import('next').NextConfig} */
const nextConfig = {
    // Conditionally add output based on environment
    ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),

    images: {
      domains: ['res.cloudinary.com'], // Allow external images
      unoptimized: true, // Ensures images work without Next.js optimization in static export
    },
  };
  
  export default nextConfig;
