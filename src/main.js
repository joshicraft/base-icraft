// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
// import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import * as CONTENT from './lang/en/Views'

// import all from './lang/en'
// Sync store with router
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import './registerServiceWorker'
sync(store, router)

Vue.config.productionTip = false
/* eslint-disable no-undef,spaced-comment */
Vue.mixin({
    data() {
        return {
            webp: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0,
            ext(type, thumb) {
                type = type || 'jpg'
                return (thumb ? 'thumb/' : '') + (this.webp ? '.webp' : '.' + type)
            },
            fullSizeBracket () {
                let size = ''
                if (window.innerWidth > 1600) {
                    size = 2000
                } else if (window.innerWidth > 1200) {
                    size = 1600
                } else if (window.innerWidth > 800) {
                    size = 1200
                } else if (window.innerWidth > 400) {
                    size = 800
                } else {
                    size = 400
                }
                return size + '/'
            },
            playSound () {
                this.audio = this.audio || new Audio('/static/sound/click.mp3')
                this.audio.play()
            },
            views: CONTENT.default.en.Views,
            nextRoute () {
                let route = this.$route.path
                let routes = this.views
                let nextIndex = routes.findIndex(i => i.to === route)
                if (nextIndex === routes.length - 1) {
                    nextIndex = 0
                } else {
                    nextIndex++
                }
                return routes[nextIndex]
            },
            prevRoute () {
                let route = this.$route.path
                let routes = this.views
                let nextIndex = routes.findIndex(i => i.to === route)

                if (nextIndex === 0) {
                    nextIndex = routes.length - 1
                } else {
                    nextIndex--
                }
                return routes[nextIndex]
            },
            scroll () {
                let current = window.pageYOffset
                let pos = window.innerHeight
                let tBHeight = document.querySelector('.v-toolbar')
                tBHeight = tBHeight.getBoundingClientRect().height
                pos = pos - tBHeight - current
                this.scrolled = true
                pos = pos + current
                TweenMax.to(window, 0.7, {
                    onStart: ($this) => {
                        $this.scrolling = true
                    },
                    onStartParams: [this],
                    onComplete: ($this) => {
                        setTimeout(() => {
                            $this.scrolling = false
                        }, 100)
                    },
                    onCompleteParams: [this],
                    delay: 0.2,
                    scrollTo: {
                        y: pos,
                        autoKill: false
                    }
                })
            },
            bakedViews: CONTENT.default.en.Views,
            bakedLayout: CONTENT.default.en.Layout,
            scrolled: false
        }
    }
})

/* eslint-disable no-new */
new Vue({
  // i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


