import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Admin image uploads allow 5MB files. The limit applies to the whole
      // multipart body, so leave headroom for boundaries and part headers —
      // otherwise a genuine 5MB file is rejected by the framework before our
      // own (friendlier) size check ever runs.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
