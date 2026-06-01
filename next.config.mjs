/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ui-avatars.com",
      "i.pravatar.cc",
      "images.unsplash.com",
      "randomuser.me",
    ],
  },
};

export default nextConfig;