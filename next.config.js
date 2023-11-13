/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Modify the Webpack configuration here
    // Example: Add a custom loader
    config.module.rules.push({
      test: /\.custom$/,
      use: "custom-loader",
    });

    if (isServer) {
      // Modify the configuration for server-side rendering (SSR)
    } else {
      // Modify the configuration for client-side rendering (CSR)
    }

    return config;
  },
  images: {
    domains: ['dev8.sidat.digital'],
  },
};

module.exports = nextConfig;
