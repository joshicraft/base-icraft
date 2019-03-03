const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
const { VuetifyProgressiveModule } = require('vuetify-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')
// const loadMinified = require('./build/load-minified')
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
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(js|css)$'
                ),
                threshold: 10240,
                minRatio: 0.8
            })
        ]

    },
    chainWebpack:  config => {
        // config.resolve.alias
        //     .set('vuetify/lib', 'vuetify/es5/components');
        config.module.rules.delete('eslint')
        config.plugin('vuetify-loader')
            .use(VuetifyLoaderPlugin);
        // config.plugin('workbox')
        config.plugins.delete('prefetch')
        if (process.env.npm_config_argv.indexOf('--report') != -1) {
            config.plugin('webpack-bundle-analyzer')
                .use(BundleAnalyzerPlugin);
        }
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.modules = [VuetifyProgressiveModule];
                return options;
            });
        const imagesRule = config.module.rule('images');
        imagesRule.uses.clear();
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
            .oneOf('progressiveImages')
            .test(/\.(png|jpe?g|gif)$/)
            .resourceQuery(/vuetify-preload/)
            .use('progressiveLoader')
            .loader('vuetify-loader/progressive-loader')
            .end()
            .use('notProgressive')
            .loader('url-loader')
            .options({limit: 8000})
            .end()
    },
    // css: {
    //     loaderOptions: {
    //         css: {
    //             camelCase: 'none'
    //         }
    //     }
    // }
    pwa: {
        name: 'ICRAFT',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: './build/service-worker-prod.js',
            // ...other Workbox options...
        }
    }
    // chainWebpack: config => {
    //     config.externals({
    //         'sharp': 'node_modules\\sharp\\vendor'
    //     })
    // }
}
