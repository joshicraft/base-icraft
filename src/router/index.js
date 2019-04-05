/* eslint-disable no-undef */
/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

//     /** webpackPrefetch: false */


// Routes
import paths from './paths'

import fs from 'fs'

let routes = makeRoutes()


function route(path, parentPath) {
    let newPath = parentPath ? parentPath.path + '/' + path.path : path.path
    let dirPath = parentPath ? parentPath.name + '/' + path.name : path.name
    let r = {
        path: newPath,
        name: path.name,
        nested: path.nestedItems,
        props: parentPath ? {nestedPath: dirPath} : {}
    }
    console.log(dirPath)

    if (r.name === 'Home') {
        r.component = (resovle) => import(
            `@/views/${dirPath}.vue`
            ).then(resovle)
    } else {
        r.component = (resovle) => import(
            `@/views/${dirPath}.vue`
            ).then(resovle)
    }
    // console.log(newPath)
    return r
}

function makeRoutes() {
    let routes = paths.map((path) => {
        return route(path)
    })
    let nestedRoutes = []
    paths.forEach((path) => {
        if (path.nestedItems) {
            path.nestedItems.forEach((nestedPath) => {
                nestedRoutes.unshift(route(nestedPath, path))
            })
        }
    })
    routes = [...routes, ...nestedRoutes].concat([
        {path: '*', redirect: '/'}
    ])
    fs.write('C:/sitemap.xml', getRoutesXML(routes))
    return routes
}

function getRoutesXML(routes) {
    const list = routes
        .map(route => `<url><loc>${route}</loc></url>`)
        .join('\r\n');
    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
    console.log(sitemap)
    return sitemap
}


Vue.use(Router)

// Create a new router
const router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return {selector: to.hash}
        }
        return {x: 0, y: 0}
    }
})

router.afterEach((to, from, next) => {


})
router.beforeEach((to, from, next) => {
    if (from.name === null) {
        next()
        return
    }
    TweenMax.killAll()

    setTimeout(() => {

        let jumbo = document.querySelector('#jumbotron')
        if (!jumbo) {
            next()
            return
        }
        let gradient = jumbo.querySelector('#jumbo-gradient')
        // let text = jumbo.querySelector('h1')
        let duration = 0.6
        let newSound
        let dur = window.screen.width < 960 ? 0 : 1
        let scrollPos = window.pageYOffset ||
            document.documentElement.scrollTop
        let tl = new TimelineLite({delay: 0}),
            mySplitText,
            chars
        let tL = new TimelineMax()
        let title = document.querySelector('#jumbotron .title')

        let button = title.querySelectorAll('#jumbotron .title button')
        let text = title.querySelectorAll('#jumbotron .title .-text-anim')
        // TweenMax.killAll()
        if (dur) {
            newSound = {
                data: new Audio('/static/sound/light_woosh.mp3')
            };
            newSound.data.volume = 1;
            newSound.data.play()
            mySplitText = new SplitText(text, {type: "words,chars"}),
                chars = mySplitText.chars; //an array of all the divs that wrap each character
            TweenLite.set(text, {perspective: 400});
        }


        tL
            .to(window, scrollPos === 0 ? 0 : 0.35, {scrollTo: {y: 0}}, 'a')
            .set(text, {opacity: 1}, 'a')
            .staggerTo(chars, 0.6 * dur, {
                opacity: 0,
                scale: 0,
                y: -60,
                rotationX: 180,
                transformOrigin: "0% 50% 50",
                ease: Back.easeIn
            }, 0.01, "+=0")
            .to([button], 0.5 * dur, {
                opacity: 0,
                scale: 0,
                y: -30,
                rotationX: 180,
                transformOrigin: "0% 50% 50",
                ease: Back.easeIn
            }, 'a')
            .call(next, [], this, '-=0.2')
            .to(gradient, duration * dur, {autoAlpha: 0.82})
            .to(gradient, duration * dur, {autoAlpha: 1})

    }, 1)
})

Vue.use(Meta)

export default router
