module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin', // يجب أن يكون دائمًا في نهاية قائمة المكونات الإضافية
    ],
  };
};