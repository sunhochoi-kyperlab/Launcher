
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
  configureWebpack: {
    output: {
      // path: config.build.assetsRoot,
      // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
      globalObject: process.env.NODE_ENV === 'production' ? 'window' : 'this'
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    module: {
      rules: [
      /*
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: "file-loader",
          options: {
             name: 'img/[name].[ext]'
          }
        },
        */
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "url-loader",
          options: {
             name: 'fonts/[name].[ext]',
             limit: 50,
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: './config/config.xml', flatten:true },
        { from: './config/splash.png', flatten:true },
        { from: './config/icon.png', flatten:true }
      ])
    ]
  }
}
