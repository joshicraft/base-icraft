// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

Vue.mixin({
    data() {
        return {
            webp: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0,
            ext(type, thumb) {
                type = type || 'jpg'
                return (thumb ? 'thumb/' : '') + (this.webp ? '.webp' : '.' + type)
            }
        }
    }
})

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


