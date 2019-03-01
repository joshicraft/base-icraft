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

let routes = makeRoutes()


function route(path, parentPath) {
    let newPath = parentPath ? parentPath.path + '/' + path.path : path.path
    let dirPath = parentPath ? parentPath.name + '/' + path.name : path.name
    // console.log(newPath)
    return {
        path: newPath,
        name: path.name,
        nested: path.nestedItems,
        props: parentPath ? {nestedPath: dirPath} : {},
        component: (resovle) => import(/** webpackPrefetch: false */
            `@/views/${dirPath}.vue`
            ).then(resovle)

    }
}

function makeRoutes(){
    let routes = paths.map((path)=>{
        return route(path)
    })
    let nestedRoutes = []
    paths.forEach((path)=>{
        if(path.nestedItems){
            path.nestedItems.forEach((nestedPath)=>{
                nestedRoutes.unshift(route(nestedPath, path))
            })
        }
    })
    routes = [...routes, ...nestedRoutes].concat([
        {path: '*', redirect: '/'}
    ])
    return routes
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
        let duration = 0.6
        let scrollPos = window.pageYOffset ||
            document.documentElement.scrollTop
        TweenMax.killAll()
        let tL = new TimelineMax()
        console.log(to)
        tL
            .to(window, scrollPos === 0 ? 0 : 0.35, {scrollTo: {y: 0}}, 'a')
            .call(next)
            .to(gradient, duration, {autoAlpha: 0.82})
            .to(gradient, duration, {autoAlpha: 1})

    }, 1)
})

Vue.use(Meta)

export default router
