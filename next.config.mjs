/** @type {import('next').NextConfig} */
const nextConfig = {
    // Conditionally add output based on environment
    ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  };
  
  export default nextConfig;
