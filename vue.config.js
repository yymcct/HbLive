// vue.config.js
module.exports = {
    // 选项...
    publicPath: '/live',
    devServer: {
        port: 80,
        disableHostCheck: true,
        proxy: 'https://app.huobaowang.com' //'http://192.168.0.34'
    }
}