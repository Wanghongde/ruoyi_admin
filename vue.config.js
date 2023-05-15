const { defineConfig } = require('@vue/cli-service')
const postcsspxtoviewport = require('postcss-px-to-viewport')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASEURL]: {
        target: 'http://vue.ruoyi.vip/prod-api',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASEURL]: '/'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            postcsspxtoviewport({
              unitToConvert: 'px', // 要转化的单位
              viewportWidth: 1920 // UI设计稿的宽度
            })
          ]
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  },
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
