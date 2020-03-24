module.exports = {
    publicPath:'./',
    configureWebpack:{
        resolve: {
            alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'router':'@/router',
              'api': '@/api',
              'store':'@/store',
              'slider':'@/slider'
            }
          }
    }
}