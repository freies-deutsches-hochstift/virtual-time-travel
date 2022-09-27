const { merge } = require("webpack-merge");
module.exports = (config, context) => {
	return merge(
		config,
		{
			devServer: {
			host: '0.0.0.0',
			allowedHosts: "all",
			client: {
				webSocketURL: 'auto://0.0.0.0:0/ws'
			}
			}
		}
	);
};