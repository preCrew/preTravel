import path from 'path';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration, DefinePlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import dotenv from 'dotenv';
dotenv.config();

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const commonPlugins = ['babel-plugin-twin', 'babel-plugin-macros'];
const devPlugins = [...commonPlugins, 'react-refresh/babel'];
const productionPlugins = [...commonPlugins];

const webpackConfig: Configuration = {
  name: 'preTravelPlan',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)?$/,
        loader: 'babel-loader',
        options: {
          plugins: isDevelopment ? devPlugins : productionPlugins,
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@emotion/babel-preset-css-prop',
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.css$/i,
        // include: path.resolve(__dirname, 'src'),
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './src/assets/fonts/',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      // 생성자를 이용한 플러그인 생성
      template: './index.html', // 템플릿 연결
    }),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    devMiddleware: { publicPath: '/build' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
    historyApiFallback: true, //존재하지 않는 url일경우 -> index.html
    client: {
      overlay: true,
      webSocketURL: 'ws://0.0.0.0:80/ws',
    },
  },
};

export default webpackConfig;
