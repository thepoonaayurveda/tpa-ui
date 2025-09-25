/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your existing image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.thepoonaayurveda.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "stage.api.thepoonaayurveda.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Netlify deployment configuration
  trailingSlash: false,

  // Keep your experimental features
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
};

module.exports = nextConfig;
