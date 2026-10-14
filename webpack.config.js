const fs = require('fs');
const path = require('path');

// Emit the HTML and icon alongside the bundle, including during development.
class StaticAssetsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('StaticAssetsPlugin', (compilation) => {
      ['index.html', 'favicon.png'].forEach((filename) => {
        const content = fs.readFileSync(path.resolve(__dirname, filename));
        compilation.assets[filename] = {
          source: () => content,
          size: () => content.length,
        };
      });
    });
  }
}

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-3'],
          },
        },
      },
    ],
  },
  plugins: [new StaticAssetsPlugin()],
};
