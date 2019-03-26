import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import {Resize} from 'vuetify/lib/directives'
import Scroll from './scroll'
// import '~vuetify/src/stylus/main'
import 'vuetify/src/stylus/app.styl'
import /*webpackPreload: true*/'../style/main.styl'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
    theme,
    directives: {
        Scroll,
        Resize
    },
    iconfont: "mdi"
})
