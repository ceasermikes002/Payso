/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', 'framer-motion', '@reown/appkit', '@walletconnect'],
  },
  // Configure Turbopack compatibility
  turbopack: {},
  webpack: (config) => {
    // Add comprehensive test file exclusions
    const testPatterns = [
      /node_modules\/.*\/test\./,
      /node_modules\/.*\/tests\./,
      /node_modules\/.*\/__tests__\./,
      /node_modules\/thread-stream/,
      /testActions/,
      /clients\/decorators\/test/,
      /_esm\/clients\/decorators\/test/,
    ];

    testPatterns.forEach(pattern => {
      config.module.rules.push({
        test: pattern,
        use: 'ignore-loader',
      });
    });

    // Add fallbacks for problematic modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
      'testActions': false,
      'thread-stream': false,
    };

    return config;
  },
};

export default nextConfig;