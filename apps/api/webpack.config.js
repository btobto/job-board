const { composePlugins, withNx } = require('@nrwl/webpack');
const nodeExternals = require('webpack-node-externals');


// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // config.externals = [nodeExternals()];
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  // config.plugins.push(new webpack.IgnorePlugin({
  //   checkResource(resource) {
  //     const lazyImports = ['cache-manager', 'stream', 'util', 'class-transformer/storage'];
  //     if (!lazyImports.includes(resource)) {
  //       return false;
  //     }
  //     try {
  //       require.resolve(resource);
  //     } catch (err) {
  //       return true;
  //     }
  //     return false;
  //   },
  // }))
  return config;
});
