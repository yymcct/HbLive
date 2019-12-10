// vue.config.js
module.exports = {
    // 选项...
    publicPath: '/live',
    devServer: {
        port: 80,
        disableHostCheck: true,
        proxy: 'http://localhost:8222'
    }
}