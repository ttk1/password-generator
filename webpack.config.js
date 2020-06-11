const path = require('path');

module.exports = {
  entry: {
    index: './src/main.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: 'public',
    port: 3000
  },
  resolve: {
    extensions: ['.ts', '.tx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'ts-loader'
      },
    {
      test: /\.css?$/,
      use: ['style-loader', 'css-loader']
    }]
  }
};
