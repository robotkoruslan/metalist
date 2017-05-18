var path = require( 'path' );
var webpack = require( 'webpack' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, '../');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry : './client/app/app',
  output : {
    filename : 'bundle.[hash].js',
    path: `${ROOT_PATH}/dist/client`
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        loader : 'ng-annotate-loader!babel-loader'
      },
      {
        test : /\.css$/,
        loader : 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        use :[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: "assets/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: `ngtemplate-loader?relativeTo=${ROOT_PATH}/client/app!html-loader`,
        exclude: (path.resolve(__dirname, './client/index.html'))
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: "assets/images/[name].[hash].[ext]"
            }
          }
        ],
      },
      {
        test: /favicon\.ico$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: '[name].[ext]',
        }
      }
    ]
  },
  resolve : {
    extensions : [ ' ', '.js' ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: `${ROOT_PATH}/client/robots.txt` },
      { from: `${ROOT_PATH}/client/.htaccess` },
      { from: `${ROOT_PATH}/client/assets/teamLogo`, to: 'assets/teamLogo' }
    ])
  ]
};
