/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/dhd1suzc5/**",
    }],
    unoptimized: true,
  },
  async rewrites() {
    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
    return [{ source: "/api/:path*", destination: `${API}/api/:path*` }];
  },
};
