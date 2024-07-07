const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/ocr-home',
  pluginOptions: {
    'process.env': {
      VUE_APP_BACKEND_PATH: process.env.VUE_APP_BACKEND_PATH,
      VUE_APP_LOGIN_PATH: process.env.VUE_APP_LOGIN_PATH,
    }
  }
})


