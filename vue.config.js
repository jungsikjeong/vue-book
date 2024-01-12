const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/assets/globalStyle/global.scss";`,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_KAKAO_REST_API: JSON.stringify(
            process.env.VUE_APP_KAKAO_REST_API
          ),
        },
      }),
    ],
  },
});
