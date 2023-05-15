module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['nativewind/babel'],

      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@store': './src/store',
            '@app': './src/app',
            '@theme': './src/theme',
            '@route': './src/routes',
            '@api': './src/api',
            '@utils': './src/utils',
            '@assets': './src/assets',
          },
        },
      ],
      [
        'react-native-reanimated/plugin',
        {
          relativeSourceLocation: true,
        },
      ],
    ],
  }
}
