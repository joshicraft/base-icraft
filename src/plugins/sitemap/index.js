const express = require('express')
const app = express()
const port = 3000
const sitemapMiddleware = require('./src/sitemap-middleware')

app.get('/sitemap.xml', sitemapMiddleware());
app.listen(port, () => console.log(`Example app listening on port ${port}!`))