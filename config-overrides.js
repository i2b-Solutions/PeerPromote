const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
  // Configurar alias para facilitar la importación de rutas
  alias(configPaths())(config);

  // Cambiar el nombre del archivo de salida en la construcción de producción
  if (env === 'production') {
    config.output.filename = 'static/js/[name].[contenthash:8].js';
    // Establecer la URL base para la versión de producción
    config.output.publicPath = `${process.env.REACT_APP_PUBLIC_PATH}/`;
  }

  return config;
};
