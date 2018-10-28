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
            .call(next)
            .to(gradient, duration, {autoAlpha: 0.4})
            .to(gradient, duration, {autoAlpha: 1})

    }, 1)
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
