
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-3'],
          },
        },
      },
    ],
  },
  devServer: {
    proxy: {
      '*': {
        target: 'http://localhost:4000',
      },
    },
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: '8080',
      proxy: 'http://localhost:4000'
    }),
  ],
};

