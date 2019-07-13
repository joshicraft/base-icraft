"use strict";

var express = require('express');

var app = express();
var port = 3000;

var sitemapMiddleware = require('./src/sitemap-middleware');

app.get('/sitemap.xml', sitemapMiddleware());
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});