/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const dotenv = require('dotenv').config({ path: __dirname + '/.env' })

module.exports = (env) => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    mode: 'development',
    devServer: {
      host: 'localhost',
      port: 8080,
      hot: true,
      compress: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, './build'),
        publicPath: '/',
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /(node_modues)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /(node_modues)/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          use: ['ts-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(dotenv.parsed),
        'process.env.REACT_APP_ENV': env.REACT_APP_ENV === 'gh' ? JSON.stringify(env.REACT_APP_ENV) : JSON.stringify(dotenv.parsed.REACT_APP_ENV),
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};