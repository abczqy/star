const path = require("path");
const utils = require("./utils");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [resolve("src"), resolve("node_modules")],
    alias: {
      src: resolve("src"),
      assets: resolve("src/assets"),
      utils: resolve("src/utils"),
      config: resolve("src/config"),
      components: resolve("src/components"),
      routes: resolve("src/routes"),
      views: resolve("src/views"),
      services: resolve("src/services"),
      $redux: resolve("src/redux")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [resolve("src"), resolve("test")],
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")],
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      },
      {
        // antd 自定义主题
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                "@icon-url":
                  process.env.NODE_ENV === "production"
                    ? '"/static/iconfont/iconfont"'
                    : '"/static/iconfont/iconfont"',
              }
            }
          }
        ]
      }
    ]
  }
};
