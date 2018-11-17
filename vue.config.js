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
