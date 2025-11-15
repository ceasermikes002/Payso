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
  // Empty Turbopack config to satisfy Next.js 16
  turbopack: {},
  webpack: (config) => {
    // Add comprehensive test file exclusions
    const testPatterns = [
      /node_modules\/.*\/test\./,
      /node_modules\/.*\/tests\./,
      /node_modules\/.*\/__tests__\./,
      /node_modules\/thread-stream\/test/,
      /node_modules\/motion-dom\/.*\/test\./,
      /node_modules\/motion-dom\/.*\/test\.mjs/,
      /node_modules\/viem\/.*\/test\./,
      /node_modules\/viem\/_esm\/.*\/test\./,
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
      'motion-dom/test': false,
      'motion-dom/value/types/test': false,
      'viem/clients/decorators/test': false,
    };

    // Add aliases for missing test modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'motion-dom/value/types/test.mjs': false,
      'motion-dom/dist/es/value/types/test.mjs': false,
      'viem/_esm/clients/decorators/test.js': false,
      './test.mjs': false,
      '../test.mjs': false,
    };

    // Fix externals configuration - use array format
    if (!Array.isArray(config.externals)) {
      config.externals = config.externals ? [config.externals] : [];
    }
    config.externals.push('thread-stream');
    config.externals.push('motion-dom/value/types/test');
    config.externals.push('viem/clients/decorators/test');

    return config;
  },
};

export default nextConfig;