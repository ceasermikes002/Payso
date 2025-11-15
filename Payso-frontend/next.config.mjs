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
  // Remove experimental turbopack config to avoid conflicts
  // Configure webpack as fallback
  webpack: (config, { isServer }) => {
    // Create a custom plugin to handle problematic modules
    class ExcludeProblematicModulesPlugin {
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('ExcludeProblematicModulesPlugin', (nmf) => {
          nmf.hooks.beforeResolve.tap('ExcludeProblematicModulesPlugin', (resolveData) => {
            if (resolveData.request) {
              const problematicModules = [
                'thread-stream',
                'tap',
                'tape', 
                'why-is-node-running',
                'desm',
                'testActions',
                './decorators/test.js',
                './clients/decorators/test.js'
              ];
              
              for (const module of problematicModules) {
                if (resolveData.request.includes(module)) {
                  // Return false to exclude this module (bailing hook behavior)
                  return false;
                }
              }
            }
            // For bailing hooks, don't return the object, just don't return false
          });
        });
      }
    }
    
    config.plugins.push(new ExcludeProblematicModulesPlugin());
    
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
                        emit: () => false,
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
    
    // Completely exclude problematic modules and create aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      'thread-stream': mockPath,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
      // Mock testActions imports
      'testActions': false,
      './decorators/test.js': false,
      './clients/decorators/test.js': false,
      // Mock viem test imports
      '@reown/appkit-controllers/node_modules/@walletconnect/utils/node_modules/viem/_esm/clients/decorators/test.js': false,
      '@walletconnect/utils/node_modules/viem/_esm/clients/decorators/test.js': false,
      'viem/_esm/clients/decorators/test.js': false,
    };
    
    // Add comprehensive module rules to exclude problematic packages
    const ignorePatterns = [
      /node_modules\/thread-stream/,
      /node_modules\/tap/,
      /node_modules\/tape/,
      /node_modules\/why-is-node-running/,
      /node_modules\/desm/,
      // WalletConnect and Viem test files
      /node_modules\/@reown\/.*\/test\./,
      /node_modules\/@walletconnect\/.*\/test\./,
      /node_modules\/viem\/.*\/test\./,
      /node_modules\/.*\/test\.js$/,
      /node_modules\/.*\/test\.mjs$/,
      /node_modules\/.*\/test\.ts$/,
      // Specific test decorator files
      /clients\/decorators\/test\.js$/,
      /clients\/decorators\/test\.mjs$/,
      /clients\/decorators\/test\.ts$/,
      /_esm\/clients\/decorators\/test\.js$/,
      /_esm\/clients\/decorators\/test\.mjs$/,
      /_esm\/clients\/decorators\/test\.ts$/,
      // Test actions
      /testActions/,
      /test-actions/,
      // Test directories
      /\/test\//,
      /\/tests\//,
      /\/__tests__\//,
      /\/spec\//,
      /\/specs\//
    ];
    
    ignorePatterns.forEach(pattern => {
      config.module.rules.unshift({
        test: pattern,
        use: 'ignore-loader',
      });
    });
    
    // Add specific rules for problematic Web3 imports
    config.module.rules.unshift({
      test: /node_modules\/@reown\/appkit-controllers\/node_modules\/@walletconnect\/utils\/node_modules\/viem\/.*\/test\.js$/,
      use: 'ignore-loader',
    });
    
    config.module.rules.unshift({
      test: /node_modules\/@walletconnect\/.*\/test\.js$/,
      use: 'ignore-loader',
    });
    
    config.module.rules.unshift({
      test: /viem\/.*\/test\.js$/,
      use: 'ignore-loader',
    });
    
    config.module.rules.unshift({
      test: /clients\/decorators\/test\.js$/,
      use: 'ignore-loader',
    });
    
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          walletconnect: {
            test: /[\\/]node_modules[\\/](@walletconnect|@reown)[\\/]/,
            name: 'walletconnect',
            chunks: 'all',
            priority: 10,
          },
        },
      },
    };
    
    // Disable webpack cache to reduce bundle size
    config.cache = false;
    
    // Exclude all test files
    config.module.rules.push({
      test: /\.test\.(js|ts|mjs)$/,
      use: 'ignore-loader',
    });
    
    // Exclude test directories
    config.module.rules.push({
      test: /test\//,
      use: 'ignore-loader',
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
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['@rainbow-me/rainbowkit', 'wagmi', 'viem'],
  },
};

export default nextConfig;