const path = require('path');

module.exports = {
  projectRoot: path.resolve(__dirname, '../../'),
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-typescript-transformer',
    ),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
