const { 
    override, 
    fixBabelImports, 
    addLessLoader,
    addDecoratorsLegacy,
    addWebpackResolve,
    disableEsLint
} = require('customize-cra');

const path = require('path')

module.exports = override(
    disableEsLint(),
    //设置按需加载
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true
    }),
    //支持装饰器写法
    addDecoratorsLegacy(),
    addWebpackResolve({
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@config': path.resolve(__dirname,'src/config'),
            '@com': path.resolve(__dirname,'src/containers/components'),
            '@pages': path.resolve(__dirname,'src/containers/pages')
        }
    })
);