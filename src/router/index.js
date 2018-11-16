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
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Routes
import paths from './paths'

function route (path, name) {
  return {
    name,
    path,
    component: (resovle) => import(
      `@/views/${name}.vue`
    ).then(resovle)
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view)).concat([
    { path: '*', redirect: '/' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {

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
            .to(window, scrollPos === 0 ? 0 : 0.35, {scrollTo: {y: 0}}, 'a')
            .to(gradient, duration, {autoAlpha: 0.8})
            .call(next, [], this, '-=' + duration)

            .to(gradient, duration, {autoAlpha: 1}, '+=' + duration)


    }, 1)
})

router.afterEach((to, from) => {
    // let jumbo = document.querySelector('#jumbotron')
    // let gradient = jumbo.querySelector('#jumbo-gradient')
    // let title = jumbo.querySelector('.title')
    // let duration = 0.6
    // new TimelineMax()
    //     .set(gradient, {autoAlpha: 0.87})
    //     .set(title, {scale: 0.5})
    //     .to(gradient, duration, {autoAlpha: 1}, '+=0.3')
    //     .to(title, duration, {scale: 1}, '-=' + duration)
    // TweenMax.delayedCall(5000, ()=>{
    //     if (!this.scrolled) {
    //        TweenMax.to(window, 0.6, {scrollTo:{y: window.innerHeight}})
    //     }
    // }, [], this)
})


Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
