module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv'
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        components: './src/screens/components',
        theme: './src/theme',
        cache: './src/cache',
        utils: './src/utils',
        assets: './assets',
        services: './src/services',
        actions: './src/actions',
        excel: './src/export/excel',
        report: './src/export/report'
      }
    }]
  ],
  env: {
    production: {
      plugins: [
        'transform-remove-console'
      ]
    }
  }
}
