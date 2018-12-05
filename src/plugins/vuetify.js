import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import theme from './theme'
import {Scroll, Resize} from 'vuetify/lib/directives'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
    theme,
    directives: {
        Scroll,
        Resize
    },
    iconfont: "mdi"
})
