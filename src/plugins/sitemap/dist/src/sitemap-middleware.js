"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sitemapMiddleware = void 0;

var _vueRouterSitemap = _interopRequireDefault(require("vue-router-sitemap"));

var _path = _interopRequireDefault(require("path"));

var _router = require("../../../router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sitemapMiddleware = function sitemapMiddleware() {
  return function (req, res) {
    res.set('Content-Type', 'application/xml');

    var staticSitemap = _path.default.resolve('dist/static', 'sitemap.xml');

    var filterConfig = {
      isValid: false,
      rules: [/\/example-page/, /\*/]
    };
    new _vueRouterSitemap.default(_router.router).filterPaths(filterConfig).build('http://example.com').save(staticSitemap);
    return res.sendFile(staticSitemap);
  };
};

exports.sitemapMiddleware = sitemapMiddleware;