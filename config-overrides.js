const {alias, configPaths} = require('react-app-rewire-alias')

module.exports = function override(config, env) {

  alias(configPaths())(config)

  // Change the output filename in production build
  if (env === 'production') {
    config.output.filename = 'static/js/[name].[contenthash:8].js';
  }

  return config;
};