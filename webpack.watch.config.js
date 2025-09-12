// webpack.watch.config.js
module.exports = (config) => {
  config.watchOptions = {
    ...config.watchOptions,
    ignored: [/node_modules/, /\.git/, /dist/],
  };
  return config;
};
