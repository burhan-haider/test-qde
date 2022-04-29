const webpack = require('webpack');

module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer"),
            fs: false,
          },
        },
      },
      plugins: {
        add: [
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
        ],
      },
    },
  };