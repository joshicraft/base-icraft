import sitemapMiddleware from "../sitemap-middleware";
// import app from "../app";

import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/sitemap.xml', sitemapMiddleware());

module.exports = router;
