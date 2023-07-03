/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
          '@': './src',
          types: './@types',
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
};
