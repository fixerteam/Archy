const path = require('path')

module.exports = (async () => {
  return {
    projectRoot: path.resolve(__dirname, '../../'),
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  }
})()
