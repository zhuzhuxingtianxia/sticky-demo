const path = require('path')
const CracoLessPlugin = require('craco-less');
const resolve = pathname => path.resolve(__dirname, pathname)

module.exports = {
  devServer: {
    proxy: {
        '/proxyStg1': {
            target: 'https://api.stg1.com.cn/',
            changeOrigin: true,
            pathRewrite: {
              '^/proxyStg1':''
            }
        }
    },
  },

  //less
  plugins: [
    { plugin: CracoLessPlugin },
  ],
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      '@config': resolve('src/config'),
      '@com': resolve('src/containers/components'),
      '@pages': resolve('src/containers/pages')
    }
  }
}