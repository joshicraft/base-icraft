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



// Routes
import paths from './paths'

let routes = makeRoutes()


function route(path, parentPath) {
    console.log(parentPath ? parentPath.name + '/' + path.name : path.name)
    return {
        path: parentPath ? parentPath.path + '/' + path.path : path.path,
        name: path.name,
        nested: path.nested,
        component: (resovle) => import(/** webpackPrefetch: false */
            `@/views/${parentPath ? parentPath.name + '/' + path.name : path.name}.vue`
            ).then(resovle)

    }
}

function makeRoutes(){
    let routes = paths.map((path)=>{
        return route(path)
    })
    let nestedRoutes = []
    routes.forEach((path)=>{
        if(path.nested){
            path.nested.forEach((nestedPath)=>{
                console.log(nestedPath)
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
