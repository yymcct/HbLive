// vue.config.js
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    // 选项...
    publicPath: '/meeting',
    devServer: {
        port: 80,
        disableHostCheck: true,
        proxy: 'http://localhost:8222'//'http://192.168.0.34' 'https://app.huobaowang.com' //
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    }

}