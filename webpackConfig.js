const { merge } = require("webpack-merge");

const getWebpackConfig = require("@nrwl/react/plugins/webpack");

function getCustomWebpackConfig(webpackConfig) {
  const config = getWebpackConfig(webpackConfig);

  // SVG fix
  const index = config.module.rules.findIndex((rule) => rule.test.test(".svg"));
  config.module.rules.splice(index, 1, {
    test: /\.svg$/,
    //issuer: {
    //  test: /\.[jt]sx?$/
    //},
    use: ["@svgr/webpack"],
  });

  return merge(config, {
    devServer: {
      host: "0.0.0.0",
      allowedHosts: "all",
      client: {
        webSocketURL: "auto://0.0.0.0:0/ws",
      },
    },
  });
}
module.exports = getCustomWebpackConfig;
