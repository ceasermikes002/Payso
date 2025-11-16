import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', '@reown/appkit', '@walletconnect'],
  },
  // Empty Turbopack config to satisfy Next.js 16
  turbopack: {},
  webpack: (config, { webpack }) => {
    // Add comprehensive test file exclusions
    const testPatterns = [
      /node_modules\/.*\/test\./,
      /node_modules\/.*\/tests\./,
      /node_modules\/.*\/__tests__\./,
      /node_modules\/thread-stream\/test/,
      /node_modules\/viem\/.*\/test\./,
      /node_modules\/viem\/_esm\/.*\/test\./,
      /node_modules\/viem\/_esm\/clients\/decorators\/test\.js/,
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

    // Add NormalModuleReplacementPlugin to replace problematic viem imports
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /viem\/_esm\/clients\/decorators\/test\.js$/,
        path.resolve(__dirname, './lib/viem-test-mock.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /viem\/_esm\/clients\/decorators\/test$/,
        path.resolve(__dirname, './lib/viem-test-mock.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /\.\/clients\/decorators\/test\.js$/,
        path.resolve(__dirname, './lib/viem-test-mock.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /\.\/clients\/decorators\/test$/,
        path.resolve(__dirname, './lib/viem-test-mock.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /\.\/decorators\/test\.js$/,
        path.resolve(__dirname, './lib/viem-test-mock.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /\.\/decorators\/test$/,
        path.resolve(__dirname, './lib/viem-test-mock.js')
      )
    );

    // Add fallbacks for problematic modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
      'testActions': false,
      'thread-stream': false,
      'viem/clients/decorators/test': false,
      'viem/_esm/clients/decorators/test': false,
      './clients/decorators/test': false,
      './decorators/test': false,
    };

    // Add aliases for missing test modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'viem/_esm/clients/decorators/test.js': path.resolve(__dirname, './lib/viem-test-mock.js'),
      'viem/_esm/clients/decorators/test': path.resolve(__dirname, './lib/viem-test-mock.js'),
      './clients/decorators/test.js': path.resolve(__dirname, './lib/viem-test-mock.js'),
      './clients/decorators/test': path.resolve(__dirname, './lib/viem-test-mock.js'),
      './decorators/test.js': path.resolve(__dirname, './lib/viem-test-mock.js'),
      './decorators/test': path.resolve(__dirname, './lib/viem-test-mock.js'),
      './test.mjs': false,
      '../test.mjs': false,
    };

    // Fix externals configuration - use array format
    if (!Array.isArray(config.externals)) {
      config.externals = config.externals ? [config.externals] : [];
    }
    config.externals.push('thread-stream');
    config.externals.push('viem/clients/decorators/test');

    return config;
  },
};

export default nextConfig;