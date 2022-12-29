import path from 'path';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration, DefinePlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import dotenv from 'dotenv';
dotenv.config();

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

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
        loader: 'babel-loader',
        options: isDevelopment ? { plugins: ['react-refresh/babel'] } : {},
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
        include: path.resolve(__dirname, 'src'),
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
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/',
  },
  devServer: {
    port: 8080,
    devMiddleware: { publicPath: '/build' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
    historyApiFallback: true, //존재하지 않는 url일경우 -> index.html
  },
};

export default webpackConfig;
