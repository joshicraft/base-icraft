const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const { VuetifyProgressiveModule } = require('vuetify-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
const HtmlWebpackPlugin = require('html-webpack-plugin')
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

    // pwa: {
    //     name: 'ICRAFT',
    //     themeColor: '#4DBA87',
    //     msTileColor: '#000000',
    //     manifestPath: 'manifest.json',
    //     iconPaths: {
    //         favicon32: 'favicon/favicon-32x32.png',
    //         favicon16: 'favicon/favicon-16x16.png',
    //         appleTouchIcon: 'favicon/apple-touch-icon-152x152.png',
    //         maskIcon: 'favicon/safari-pinned-tab.svg',
    //         msTileImage: 'favicon/msapplication-icon-144x144.png'
    //     }b
    // },
    configureWebpack: {
        plugins: [

            new VuetifyLoaderPlugin(),
            // new PreloadWebpackPlugin()
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(js|css)$'
                ),
                threshold: 10240,
                minRatio: 0.8
            })
            // new HtmlWebpackPlugin(),
            // new PreloadWebpackPlugin({
            //     rel: 'preload',
            //     as(entry) {
            //         if (/\.css$/.test(entry)) return 'style';
            //         if (/\.woff$/.test(entry)) return 'font';
            //         if (/\.png$/.test(entry)) return 'image';
            //         return 'script';
            //     },
            //     include: 'all'
            // })
            // new PreloadWebpackPlugin({
            //     rel: 'preload',
            //     as: 'style'
            // })
        ]

    },
    chainWebpack:  config => {
        // config.resolve.alias
        //     .set('vuetify/lib', 'vuetify/es5/components');
        config.module.rules.delete('eslint')
        // config.plugin('vuetify-loader')
        //     .use(VuetifyLoaderPlugin);
        // config.plugin('workbox')
        // config.plugins.delete('prefetch')
        // config.plugin('preload')

        // if (process.env.npm_config_argv.indexOf('--report') != -1) {
        //     config.plugin('webpack-bundle-analyzer')
        //         .use(BundleAnalyzerPlugin);
        // }
        // config.module
        //     .rule('vue')
        //     .use('vue-loader')
        //     .loader('vue-loader')
        //     .tap(options => {
        //         options.compilerOptions.modules = [VuetifyProgressiveModule];
        //         return options;
        //     });
        // const imagesRule = config.module.rule('images');
        // imagesRule.uses.clear();
        // config.module
        //     .rule('images')
        //     .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        //     .oneOf('progressiveImages')
        //     .test(/\.(png|jpe?g|gif)$/)
        //     .resourceQuery(/vuetify-preload/)
        //     .use('progressiveLoader')
        //     .loader('vuetify-loader/progressive-loader')
        //     .end()
        //     .use('notProgressive')
        //     .loader('url-loader')
        //     .options({limit: 8000})
        //     .end()
    }
}
