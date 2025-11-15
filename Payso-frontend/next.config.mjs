import webpackConfig from './webpack.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix: Add empty turbopack config to acknowledge Turbopack in Next.js 16
  experimental: {
    turbopack: {}, // Changed from 'turbo: undefined'
  },
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
                'desm'
              ];
              
              for (const module of problematicModules) {
                if (resolveData.request.includes(module)) {
                  // Return false to exclude this module
                  return false;
                }
              }
            }
            return resolveData;
          });
        });
      }
    }
    
    config.plugins.push(new ExcludeProblematicModulesPlugin());
    
    // Completely exclude thread-stream and related test packages
    config.resolve.alias = {
      ...config.resolve.alias,
      'thread-stream': require('path').resolve('./thread-stream-mock.js'),
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
    };
    
    // Add module rules to exclude problematic packages
    config.module.rules.unshift({
      test: /node_modules\/thread-stream/,
      use: 'ignore-loader',
    });
    
    config.module.rules.unshift({
      test: /node_modules\/tap/,
      use: 'ignore-loader',
    });
    
    config.module.rules.unshift({
      test: /node_modules\/tape/,
      use: 'ignore-loader',
    });
    
    config.module.rules.unshift({
      test: /node_modules\/why-is-node-running/,
      use: 'ignore-loader',
    });
    
    config.module.rules.unshift({
      test: /node_modules\/desm/,
      use: 'ignore-loader',
    });
    
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
};

export default nextConfig;