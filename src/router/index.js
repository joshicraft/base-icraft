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

function route(path, name, children) {
    // eslint-disable-next-line
    if (children) {
        children = children.forEach((c) => {
            console.log(c)
            c.component = (resovle) => import(/** webpackPrefetch: false */
                `@/views/${c.view}.vue`
                ).then(resovle)
        })
    }
    // eslint-disable-next-line
    return {
        name,
        path,
        children,
        component: (resovle) => import(/** webpackPrefetch: false */
            `@/views/${name}.vue`
            ).then(resovle)
    }
}

Vue.use(Router)

// Create a new router
const router = new Router({
    mode: 'history',
    routes: paths.map(path => route(path.path, path.view, path.children)).concat([
        {path: '*', redirect: '/'}
    ]),
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
        let tL = new TimelineMax()
        tL
        // .to(window, scrollPos === 0 ? 0 : 0.35, {scrollTo: {y: 0}}, 'a')
        // .to(gradient, duration, {autoAlpha: 0.8})
        // .call(next, [], this, '-=' + duration)
        // .to(gradient, duration, {autoAlpha: 1}, '+=' + duration)
            .to(window, scrollPos === 0 ? 0 : 0.35, {scrollTo: {y: 0}}, 'a')
            .call(next)
            .to(gradient, duration, {autoAlpha: 0.82})
            .to(gradient, duration, {autoAlpha: 1})


    }, 1)
})


Vue.use(Meta)

export default router
