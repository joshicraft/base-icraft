import express from 'express';
import path from 'path';
import routes from '../../../router/paths'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes';
import sitemapMiddleware from 'sitemap-middleware'
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// app.use('/', indexRouter);


function getRoutesXML() {
    const list = getRoutesList(routes, 'https://zigamiklic.com')
        .map(route => `<url><loc>${route}</loc></url>`)
        .join('\r\n');
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
}

function getRoutesList(routes, pre) {
    return routes.reduce((array, route) => {
        const path = `${pre}${route.path}`;

        if (route.path !== '*') {
            array.push(path);
        }

        if (route.children) {
            array.push(...getRoutesList(route.children, `${path}/`));
        }

        return array;
    }, []);
}
getRoutesXML();
// app.get('/sitemap.xml', sitemapMiddleware());
export default app;