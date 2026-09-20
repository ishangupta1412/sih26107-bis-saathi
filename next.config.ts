import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 hours
  },

  async redirects() {
    return [
      // Legacy / wrong URL aliases — permanent 308 redirects
      { source: '/pathways', destination: '/pathway', permanent: true },
      { source: '/mark-check', destination: '/checker', permanent: true },
      { source: '/assistant', destination: '/chat', permanent: true },
      { source: '/offices-finder', destination: '/offices', permanent: true },
      { source: '/report', destination: '/complaint', permanent: true },
      { source: '/grievance', destination: '/complaint', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: "/emblem.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/bis_logo.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Security headers for all routes
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
