const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');


module.exports = {
  entry: {
    main: "./src/scripts/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/ // исключает папку node_modules
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        // Означает, что:
        inject: false, // стили НЕ нужно прописывать внутри тегов
        hash: false, // считать хеш
         // откуда брать образец для сравнения с текущим видом проекта
         // имя выходного файла, то есть того, что окажется в папке dist после сборки
      }),
      new WebpackMd5Hash()
  ]
};
