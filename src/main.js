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
sync(store, router)

Vue.config.productionTip = false

Vue.mixin({
    data() {
        return {
            webp: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0,
            ext(type, thumb) {
                type = type || 'jpg'
                return (thumb ? 'thumb/' : '') + (this.webp ? '.webp' : '.' + type)
            },
            bakedViews: CONTENT.default.en.Views,
            bakedLayout: CONTENT.default.en.Layout,
            all: '',
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


