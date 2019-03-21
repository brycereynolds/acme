const withTypescript = require('@zeit/next-typescript')
const withStylus = require('@zeit/next-stylus')
module.exports = withTypescript(
  withStylus({
    // target: 'serverless',
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    }
  })
)


// module.exports = withTypescript(withStylus({
// 	webpack: function (config) {
// 		return {
//       ...config,
//       cssModules: true,
//       cssLoaderOptions: {
//         importLoaders: 1,
//         localIdentName: "[local]___[hash:base64:5]",
//       }
//     }
// 	}
// }));
