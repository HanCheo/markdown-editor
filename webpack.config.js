import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack from 'webpack';

const __dirname = path.resolve();

export default (env) => {
  return {
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: { minimize: true },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({ async: false }),
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.jsx', '.ts', '.js', '.json', '.css'],
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    output: {
      path: __dirname + '/build',
      filename: '[name].js',
    },
    devtool: 'inline-source-map',
  };
};
