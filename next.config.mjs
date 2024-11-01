/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure HMR is enabled
    config.devServer = {
      hot: true,
    };
    return config;
  },
};

export default nextConfig;
