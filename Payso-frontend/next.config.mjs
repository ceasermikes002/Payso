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

    // Create comprehensive mock for test modules with all viem test functions
    const testMockContent = `
      export default {};
      export const testValueType = () => false;
      export const dropTransaction = () => {};
      export const dumpState = () => {};
      export const getAutomine = () => {};
      export const getTxpoolContent = () => {};
      export const getTxpoolStatus = () => {};
      export const getTxpoolInspect = () => {};
      export const impersonateAccount = () => {};
      export const increaseTime = () => {};
      export const inspectTxpool = () => {};
      export const loadState = () => {};
      export const mine = () => {};
      export const removeBlockTimestampInterval = () => {};
      export const reset = () => {};
      export const revert = () => {};
      export const setAutomine = () => {};
      export const setBalance = () => {};
      export const setBlockGasLimit = () => {};
      export const setBlockTimestampInterval = () => {};
      export const setCode = () => {};
      export const setCoinbase = () => {};
      export const setIntervalMining = () => {};
      export const setLoggingEnabled = () => {};
      export const setMinGasPrice = () => {};
      export const setNextBlockBaseFeePerGas = () => {};
      export const setNextBlockTimestamp = () => {};
      export const setNonce = () => {};
      export const setRpcUrl = () => {};
      export const setStorageAt = () => {};
      export const snapshot = () => {};
      export const stopImpersonatingAccount = () => {};
    `;
    
    const testMockPath = path.resolve('./test-mock.js');
    writeFileSync(testMockPath, testMockContent);
    
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
      // Mock ALL viem test action imports
      'viem/_esm/actions/test/dropTransaction.js': testMockPath,
      'viem/_esm/actions/test/dumpState.js': testMockPath,
      'viem/_esm/actions/test/getAutomine.js': testMockPath,
      'viem/_esm/actions/test/getTxpoolContent.js': testMockPath,
      'viem/_esm/actions/test/getTxpoolStatus.js': testMockPath,
      'viem/_esm/actions/test/getTxpoolInspect.js': testMockPath,
      'viem/_esm/actions/test/impersonateAccount.js': testMockPath,
      'viem/_esm/actions/test/increaseTime.js': testMockPath,
      'viem/_esm/actions/test/inspectTxpool.js': testMockPath,
      'viem/_esm/actions/test/loadState.js': testMockPath,
      'viem/_esm/actions/test/mine.js': testMockPath,
      'viem/_esm/actions/test/removeBlockTimestampInterval.js': testMockPath,
      'viem/_esm/actions/test/reset.js': testMockPath,
      'viem/_esm/actions/test/revert.js': testMockPath,
      'viem/_esm/actions/test/setAutomine.js': testMockPath,
      'viem/_esm/actions/test/setBalance.js': testMockPath,
      'viem/_esm/actions/test/setBlockGasLimit.js': testMockPath,
      'viem/_esm/actions/test/setBlockTimestampInterval.js': testMockPath,
      'viem/_esm/actions/test/setCode.js': testMockPath,
      'viem/_esm/actions/test/setCoinbase.js': testMockPath,
      'viem/_esm/actions/test/setIntervalMining.js': testMockPath,
      'viem/_esm/actions/test/setLoggingEnabled.js': testMockPath,
      'viem/_esm/actions/test/setMinGasPrice.js': testMockPath,
      'viem/_esm/actions/test/setNextBlockBaseFeePerGas.js': testMockPath,
      'viem/_esm/actions/test/setNextBlockTimestamp.js': testMockPath,
      'viem/_esm/actions/test/setNonce.js': testMockPath,
      'viem/_esm/actions/test/setRpcUrl.js': testMockPath,
      'viem/_esm/actions/test/setStorageAt.js': testMockPath,
      'viem/_esm/actions/test/snapshot.js': testMockPath,
      'viem/_esm/actions/test/stopImpersonatingAccount.js': testMockPath,
      // Mock the test decorator file itself
      'viem/_esm/clients/decorators/test.js': testMockPath,
    };
    
    // Ignore loader for test files - must come BEFORE other rules
    config.module.rules.unshift({
      test: /node_modules\/@reown\/.*\/node_modules\/@walletconnect\/.*\/node_modules\/viem\/_esm\/clients\/decorators\/test\.js$/,
      use: 'ignore-loader',
    });

    config.module.rules.unshift({
      test: /node_modules\/@reown\/.*\/node_modules\/@walletconnect\/.*\/node_modules\/viem\/_esm\/actions\/test\//,
      use: 'ignore-loader',
    });

    config.module.rules.unshift({
      test: /node_modules\/(motion-dom|framer-motion)\/.*\/test\.mjs$/,
      use: 'ignore-loader',
    });

    config.module.rules.unshift({
      test: /node_modules\/.*\/viem\/_esm\/(actions|clients)\/test\//,
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