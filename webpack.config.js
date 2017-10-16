var path = require('path')
var webpack = require('webpack')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    library:'vue-elucidate',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  externals: {
    vue: 'vue'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin("style.css"),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
}