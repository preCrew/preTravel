import path from 'path';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration, DefinePlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import dotenv from 'dotenv';
// dotenv.config();

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './.env.development' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' });
}

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfig: Configuration = {
  name: 'preTravelPlan',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {},
      //     },
      //   ],
      // },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            use: ['@svgr/webpack'],
            issuer: /\.[jt]sx?$/,
            resourceQuery: { not: [/url/] },
          },
          {
            type: 'asset',
            resourceQuery: /url/, // *.svg?url
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg|gif)$/,
        // 8kb 이상은 asset/resource (webpack4에서 file-loader),
        // 8kb 이하는 asset/inline (webpack4에서 url-loader)
        type: 'asset',
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 4 * 1024 // 4kb
        //   }
        // }
        //   generator: {
        //     filename: 'assets/svgs/[hash][ext][query]',
        //   },
      },
      {
        test: /\.[jt]sx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: ['source-map-loader'],
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
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[hash].js',
    publicPath: '/',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  devServer: {
    port: 8080,
    // devMiddleware: {
    // con
    // }
    // devMiddleware: { publicPath: '/' },
    static: { directory: path.join(__dirname, 'build') },
    hot: true,
    historyApiFallback: true, //존재하지 않는 url일경우 -> index.html
    // client: {
    //   overlay: true,
    //   webSocketURL: 'ws://0.0.0.0:80/ws',
    // },
  },
};

export default webpackConfig;
