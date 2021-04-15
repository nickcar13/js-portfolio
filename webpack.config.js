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
  //modulo para configurar otros paquetes en este caso babel
  module: {
    //reglas para un objeto
    rules: [
      //objeto para babel
      {
        //nos permite saber que extenciones vamos a usar (se trabaja con expresiones regulares)
        test: /\.m?js$/, //utiliza cualquier extencion .mjs o .js
        //excluir algunos archivos
        exclude: /node_modules/,
        //usar el loader
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
