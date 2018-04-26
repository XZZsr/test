'use strict'
const merge = require('webpack-merge')
const testEnv = require('./test.env')

module.exports = merge(testEnv, {
    NODE_ENV: '"devEnvironment"',
    ENV_CONFIG: '"dev"',
    hosturl: '"https://cft.upmi.com.cn/dev/"'
})
