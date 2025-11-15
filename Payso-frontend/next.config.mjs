import webpackConfig from './webpack.config.js';
import path from 'path';
import { writeFileSync } from 'fs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Mock file for thread-stream
    const mockContent = `
      export const createWriteStream = () => ({
        write: () => {},
        end: () => {},
        on: () => {},
        once: () => {},
        emit: () => {},
        addListener: () => {},
        removeListener: () => {},
        removeAllListeners: () => {},
        setMaxListeners: () => {},
        getMaxListeners: () => 10,
        listeners: () => [],
        rawListeners: () => [],
        listenerCount: () => 0,
        prependListener: () => {},
        prependOnceListener: () => {},
        eventNames: () => []
      });
      export default { createWriteStream };
    `;
    
    // Write mock file
    const mockPath = path.resolve('./thread-stream-mock.js');
    writeFileSync(mockPath, mockContent);

    // Create empty mock for test modules
    const testMockPath = path.resolve('./test-mock.js');
    writeFileSync(testMockPath, 'export default {}; export const testValueType = () => false; export const dropTransaction = () => {}; export const dumpState = () => {};');
    
    // Completely exclude problematic modules and create aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      'thread-stream': mockPath,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
      // Mock motion-dom test imports
      'motion-dom/dist/es/value/types/test.mjs': testMockPath,
      // Mock viem test imports
      'viem/_esm/actions/test/dropTransaction.js': testMockPath,
      'viem/_esm/actions/test/dumpState.js': testMockPath,
    };
    
    // Ignore loader for test files
    config.module.rules.unshift({
      test: /node_modules\/(motion-dom|framer-motion)\/.*\/test\.mjs$/,
      use: 'ignore-loader',
    });

    config.module.rules.unshift({
      test: /node_modules\/viem\/.*\/test\//,
      use: 'ignore-loader',
    });
    
    // Add comprehensive module rules to exclude problematic packages
    const ignorePatterns = [
      /node_modules\/thread-stream/,
      /node_modules\/tap/,
      /node_modules\/tape/,
      /node_modules\/why-is-node-running/,
      /node_modules\/desm/,
      /\/test\//,
      /\/tests\//,
      /\/__tests__\//,
      /\.test\.(js|ts|mjs)$/,
      /\.spec\.(js|ts|mjs)$/,
    ];
    
    ignorePatterns.forEach(pattern => {
      config.module.rules.unshift({
        test: pattern,
        use: 'ignore-loader',
      });
    });
    
    // Add fallback for Node.js modules that shouldn't be bundled
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      os: false,
      path: false,
      url: false,
      querystring: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      constants: false,
      timers: false,
      events: false,
      punycode: false,
      string_decoder: false,
      sys: false,
      buffer: false,
      process: false,
      console: false,
    };
    
    // Merge with external webpack config
    if (webpackConfig.resolve && webpackConfig.resolve.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...webpackConfig.resolve.alias
      };
    }
    
    if (webpackConfig.module && webpackConfig.module.rules) {
      config.module.rules = [
        ...webpackConfig.module.rules,
        ...config.module.rules
      ];
    }
    
    return config;
  },
  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', 'framer-motion'],
  },
};

export default nextConfig;