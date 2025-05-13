import type { NextConfig } from "next";
import { NextRequest } from "next/server";

const nextConfig: NextConfig = {
  async headers() {
    const customHeaders = [
      {
        key: "Access-Control-Allow-Origin",
        value: "*",
      },
      {
        key: "Access-Control-Allow-Methods",
        value: "GET, POST, PUT, DELETE, OPTIONS",
      },
      {
        key: "Access-Control-Allow-Headers",
        value: "Content-Type, Authorization",
      },
    ];
    return [
      {
        source: "/:path*",
        headers: customHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tse3.mm.bing.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https", // Changed from http to https
        hostname: "images.news18.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "letsenhance.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
