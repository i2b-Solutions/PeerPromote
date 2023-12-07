const path = require('path');

module.exports = function override(config, env) {
  // Change the output filename in production build
  if (env === 'production') {
    config.output.filename = 'static/js/[name].[contenthash:8].js';
  }

  return config;
};