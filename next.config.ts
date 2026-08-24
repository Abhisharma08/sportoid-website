import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  poweredByHeader: false, // Prevent X-Powered-By header leakage
  compress: true, // Enable gzip and brotli compression
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  turbopack: {
    root: path.resolve(__dirname),
    ignoreIssue: [
      {
        path: '**/sanity/lib/useActiveReleases*',
        title: "Export default doesn't exist in target module",
      },
      {
        path: '**/sanity/lib/validationUtils*',
        title: "Export default doesn't exist in target module",
      },
    ],
  },
};

export default nextConfig;
