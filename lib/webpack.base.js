const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = process.cwd()

// 动态的设置`entry`和`HtmlWebpackPlugin`
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  entryFiles.map((item) => {
    const entryFile = item;
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    // entryFile[pageName] =
    entry[pageName] = entryFile;

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [`vendors`, pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          removeComments: false
        }
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  stats: `errors-only`,
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }, {
      test: /\.(jpg|jpeg|gif|png)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]_[contenthash:8].css`
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors.length > 0 && process.argv.indexOf('--watch') === -1) {
          console.log('build error');
          // 通过process.exit()主动抛出错误码。
          process.exit(1);
        }
      });
    }
  ].concat(htmlWebpackPlugins)
};
