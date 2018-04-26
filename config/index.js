// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        assetsPublicPath: '/cft-admin/',
        devEnv: require('./dev.env'),  //开发环境
        testEnv: require('./test.env'), //测试环境
        localEnv: require('./local.env'), //本地环境
        prodEnv: require('./prod.env'),//生产环境
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/'),
        assetsSubDirectory: 'static',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8888,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    }
}
