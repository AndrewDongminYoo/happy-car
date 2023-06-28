const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * @format
 *
 * Metro configuration
 * @see https://facebook.github.io/metro/docs/configuration
 * @see https://github.com/facebook/react-native
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
