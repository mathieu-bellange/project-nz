/**
 * @author: mbellange
 */
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  entry: {
    main: './client/app',
    vendor: './client/vendor',
    polyfills: './client/polyfills'
  },

  resolve: {
    extensions: ['.js', '.css'],
    modules: [helpers.root('client'), helpers.root('public'), helpers.root('node_modules')]
  },

  module: {

    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader'
          }
        ]
      },

      {
        test: /\.js$/,
        exclude: [/node_modules/, /config/, /server/, /public/],
        use: 'babel-loader'
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              alias: {
                '../fonts': 'font-awesome/fonts',
                './images': 'images'
              }
            }
          },
          'postcss-loader'
        ]
      },

      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('client/index.html')]
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]

  },

  plugins: [
    new ExtractTextPlugin('app.css'),

    new CommonsChunkPlugin({
      names: ['vendor']
    })
  ],

  node: {
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
