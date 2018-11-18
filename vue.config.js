const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const { VuetifyProgressiveModule } = require('vuetify-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
                rel: "preload",
                include: "allChunks"
            })
             // new BundleAnalyzerPlugin()
        ]

    },
    chainWebpack:  config => {
        // config.resolve.alias
        //     .set('vuetify/lib', 'vuetify/es5/components');
        // config.plugin('vuetify-loader')
        //     .use(VuetifyLoaderPlugin);
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
