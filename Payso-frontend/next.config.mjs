/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config) => {
    // Exclude test files from being bundled
    config.module.rules.push({
      test: /node_modules\/thread-stream\/test/,
      use: 'ignore-loader',
    })
    
    // Exclude all test files and problematic modules
    config.module.rules.push({
      test: /\.test\.(js|ts|mjs)$/,
      use: 'ignore-loader',
    })
    
    // Exclude specific problematic modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
    }
    
    // Add fallback for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    
    return config
  },
}

export default nextConfig
