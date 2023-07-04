module.exports = {
  projectRoot: __dirname,
  project: {
    ios: {
      sourceDir: './ios',
    },
    android: {
      sourceDir: './android',
      appName: 'app',
      packageName: 'com.happycar',
    },
    macos: {
      sourceDir: './macos',
    },
  },
};
