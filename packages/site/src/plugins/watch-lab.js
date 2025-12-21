const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'watch-lab',
    configureWebpack(config, isServer) {
      // Only apply this logic in development mode
      if (process.env.NODE_ENV !== 'development') {
        return {};
      }

      return {
        resolve: {
          alias: {
            '@andrejground/lab/style.css': path.resolve(
              __dirname,
              '../../../lab/dist/lab.css',
            ),
            '@andrejground/lab': path.resolve(
              __dirname,
              '../../../lab/src',
            ),

            '@/': path.resolve(__dirname, '../../../lab/src'),
          },
        },
      };
    },
  };
};
