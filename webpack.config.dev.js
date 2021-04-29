const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
    filename: '[name].[contenthash].js',
    //salida del module de assets
    assetModuleFilename: 'assets/images/[hash][ext]',
  },
  //indicando que modo es
  mode: 'development',
  //iniciando el modo watch
  // watch: true,
  //extensiones a trabajar
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    },
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
      //objeto de reglas para css
      {
        //test de archivos a usar
        test: /\.css|.styl$/i,
        //plugins a usar y loaders, aca se instanciaria los loades de los preprocesadores en caso de usarlos
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            //limite del tamaño del archivo, si lo tiene o false si no es asi
            limit: 10000,
            //mimetipe el tipo de dato a usar
            mimetype: 'application/font-woff',
            //nombre del archivo de salida que respeta el nombre y ext original
            name: '[name].[contenthash].[ext]',
            //salida del archivo final
            outputPath: './assets/fonts/',
            //path a seguir desde css para encontrar las fonts en dist
            publicPath: './fonts/',
            esModule: false,
          },
        },
      },
    ],
  },
  //la creacion de los objetos con las configuraciones de los plugins
  plugins: [
    //genera el objeto de configuracion para html
    new HtmlWebpackPlugin({
      //inject nos habilita para que webpack pueda insertar informacion en el html
      inject: true,
      //template html a usar
      template: './public/index.html',
      //salida
      filename: './index.html',
    }),
    //instancia de css
    new MiniCssExtractPlugin({
      //nombre de salida del archivo
      filename: 'assets/[name].[contenthash].css',
    }),
    //instancia de variables de entorno
    new Dotenv({
      //path donde encontrara el archivo
      path: path.resolve(__dirname, '.env'),
    }),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3006,
    open: true,
  },
};
