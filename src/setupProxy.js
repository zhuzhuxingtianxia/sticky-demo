const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    //开发环境设置网络代理
    app.use(
        proxy('/proxyStg1',{
            target:'https://api.stg1.com.cn/',
            changeOrigin: true,
            pathRewrite: {'^/proxyStg1':''}
        }),
        proxy('/proxyStg2',{
            target:'https://api.stg2.com.cn/',
            changeOrigin: true,
            pathRewrite: {'^/proxyStg2':''}
        })
    )
}