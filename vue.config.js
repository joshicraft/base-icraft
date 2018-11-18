const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    devServer: {
        proxy: {
            "/.netlify/functions": {
                "target": "http://localhost:9000",
                "pathRewrite": {
                    "^/\\.netlify/functions": ""
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
           new VuetifyLoaderPlugin(),
            new PreloadWebpackPlugin({
                rel: 'preload',
                as(entry) {
                    if (/\.css$/.test(entry)) return 'style';
                    if (/\.woff$/.test(entry)) return 'font';
                    if (/\.png$/.test(entry)) return 'image';
                    return 'script';
                }
            })
            // new BundleAnalyzerPlugin(),
        ]

    }
    // css: {
    //     loaderOptions: {
    //         css: {
    //             camelCase: 'none'
    //         }
    //     }
    // }
    // pwa: {
    //     name: 'ICRAFT',
    //     themeColor: '#4DBA87',
    //     msTileColor: '#000000',
    //     appleMobileWebAppCapable: 'yes',
    //     appleMobileWebAppStatusBarStyle: 'black'
    // },
    // chainWebpack: config => {
    //     config.externals({
    //         'sharp': 'node_modules\\sharp\\vendor'
    //     })
    // }
}
