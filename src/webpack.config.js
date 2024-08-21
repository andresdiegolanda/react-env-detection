const webpack = require('webpack');

module.exports = {
  // other webpack configurations
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV || 'development'),
    }),
  ],
};
