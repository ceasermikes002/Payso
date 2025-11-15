// Additional webpack configuration to handle problematic modules
module.exports = {
  resolve: {
    alias: {
      'thread-stream': false,
      'tap': false,
      'tape': false,
      'why-is-node-running': false,
      'desm': false,
    }
  },
  module: {
    rules: [
      {
        test: /thread-stream/,
        use: 'ignore-loader'
      },
      {
        test: /tap/,
        use: 'ignore-loader'
      },
      {
        test: /tape/,
        use: 'ignore-loader'
      },
      {
        test: /why-is-node-running/,
        use: 'ignore-loader'
      },
      {
        test: /desm/,
        use: 'ignore-loader'
      }
    ]
  }
};