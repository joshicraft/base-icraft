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
    css: {
        loaderOptions: {
            css: {
                camelCase: 'none'
            }
        }
    }
}
