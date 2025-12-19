const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'watch-lib',
    configureWebpack(config, isServer) {
      // Only apply this logic in development mode
      if (process.env.NODE_ENV !== 'development') {
        return {};
      }

      return {
        resolve: {
          alias: {
            '@andrejground/react-dropdown/style.css': path.resolve(
              __dirname,
              '../../../lib/dist/react-dropdown.css',
            ),
            '@andrejground/react-dropdown': path.resolve(
              __dirname,
              '../../../lib/src',
            ),

            '@/': path.resolve(__dirname, '../../../lib/src'),
          },
        },
      };
    },
  };
};
