const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dirApp = path.join(__dirname, 'app')
const dirViews = path.join(__dirname, 'views')
const dirAssets = path.join(__dirname, 'assets')
const dirNode = path.join(__dirname, 'node_modules')
const dirStyles = path.join(__dirname, 'styles')

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  entry: [path.join(dirApp, 'index.js'), path.join(dirStyles, 'index.scss')],
  resolve: {
    modules: [dirApp, dirAssets, dirStyles, dirNode, dirViews]
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug/,
        loader: 'pug-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['dist'] }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './views/index.pug'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: './assets', to: './assets' }]
    }),
    new webpack.BannerPlugin({
      banner: () => {
        return `
---------------------------------------
Fluxel - Immersive Content Creators
---------------------------------------
${new Date().toDateString()}
---------------------------------------
`
      }
    })
  ]
}
