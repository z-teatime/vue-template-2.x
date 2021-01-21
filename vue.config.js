'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9803 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.VUE_APP_DOMAIN,
  outputDir: 'dist',
  assetsDir: '',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://dev.npush-php.uheixia.com',
    //     changeOrigin: true,
    //     secure: false,
    //     // pathRewrite: {},
    //   },
    // },
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js'),

    // 本地调试允许跨域
    headers: { 'Access-Control-Allow-Origin': '*' },
    // 本地调试刷新问题
    historyApiFallback: {
      rewrites: [{
        from: /.*/g,
        to: '/index.html'
      }]
    },
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    output: {
      jsonpFunction: 'npushWebpackJsonp'
    },
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])

    // // when there are many pages, it will cause too many meaningless requests
    // config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          // config
          //   .plugin('ScriptExtHtmlWebpackPlugin')
          //   .after('html')
          //   .use('script-ext-html-webpack-plugin', [{
          //   // `runtime` must same as runtimeChunk name. default is `runtime`
          //     inline: /runtime\..*\.js$/
          //   }])
          //   .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')

          // 添加打包后的index.html中的引号. 飞冰不支持无引号.
          config.plugin('html').tap(args => {
            args[0].minify = false
            return args
          })
        }
      )
  },
  css: {
    loaderOptions: {
      // scss: {
      //   additionalData: `@import "~@/styles/mixin.scss";`
      // }
      // scss: {
      //   additionalData: (content, loaderContext) => {
      //     const { resourcePath, rootContext } = loaderContext;
      //     const relativePath = path.relative(rootContext, resourcePath);
      //     if (/styles\\variables.scss/.test(relativePath)) {
      //       return `@import "~@/styles/mixin.scss";` + content
      //     }

      //     return `@import "~@/styles/mixin.scss";
      //     @import "~@/styles/variables.scss";` + content
      //   }
      // }
    }
  }
}
