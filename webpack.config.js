const path = require('path');

/** @type {import('webpack').Configuration} */
//objeto de configuracion
module.exports = {
  // punto de acceso
  entry: './src/index.js',
  //punto de salida
  output: {
    //path nos indica el directorio de salida
    path: path.resolve(__dirname, 'dist'),
    //nombre del archivo de salida
    filename: 'main.js',
  },
  //extensiones a trabajar
  resolve: {
    extensions: ['.js'],
  },
};
