var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(8080, '127.0.0.1', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 127.0.0.1:8080');
});
