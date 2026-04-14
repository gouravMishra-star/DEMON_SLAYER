/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Allow dev HMR when opening the app from another device on the LAN (e.g. phone). */
  allowedDevOrigins: ["192.168.1.13"],
};

export default nextConfig;
