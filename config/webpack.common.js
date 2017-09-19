/**
 * @author: mbellange
 */

const webpack = require('webpack');
const path = require('path');
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * PostCSS plugins
 */
 const precss = require('precss');
 const cssnext = require('postcss-cssnext');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  entry: {
  /*  polyfills: './src/polyfills',
    vendor: './src/vendor',*/
    main: [
      'react-hot-loader/patch',
      './public/main'
    ]
  },

  resolve: {
    extensions: ['.js', '.json', '.css'],
    modules: [helpers.root('public'), helpers.root('node_modules')]
  },

  module: {

    rules: [

      {
        test: /\.js$/,
        exclude: [/node_modules/, /config/, /server/],
        use: 'babel-loader'
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('public/index.html')]
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
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
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname,
        // A temporary workaround for `scss-loader`
        // https://github.com/jtangelder/sass-loader/issues/298
        output: {
          path: helpers.root('dist/public')
        },
        postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
          precss,
          cssnext
        ]
        // ...other configs that used to directly on `modules.exports`
      }
    }),
    new ExtractTextPlugin('vendor.css'),

    /*new CommonsChunkPlugin({
      names: ['polyfills', 'vendor']
    })*/
  ],

  node: {
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
