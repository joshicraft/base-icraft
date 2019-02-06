// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
// import '@babel/polyfill'
// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import {sync} from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
// import * as CONTENT from './lang/en/Views'
import {createSimpleTransition} from 'vuetify/es5/util/helpers'

// import './registerServiceWorker'
// Sync store with router
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

const myTransition = createSimpleTransition('my-transition')

Vue.component('my-transition', myTransition)

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

            submitToServer(data, method, path) {
                data = JSON.stringify(data)
                return new Promise((resolve, reject) => {
                    let api = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '/.netlify/functions'
                    fetch(api + path, {
                        method: method,
                        body: data
                    }).then(response => {
                        resolve(response)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            imgC(name, img, ext, thumb, addPath) {
                console.log(name)
                let path = '/static/' + (addPath || '')
                let size = ''
                let bp = this.$vuetify.breakpoint
                let sizes = [2100, 1920, 1440, 1280, 1024, 768, 568]
                if (img) {
                    let width = img.getBoundingClientRect().width
                    for (let i = 0; i < sizes.length; i++) {
                        if (sizes[i] < width) {
                            size = sizes[i]
                        }
                    }

                } else {
                    if (bp.smAndDown) {
                        size = '768'
                    } else if (bp.lgAndDown) {
                        size = '1280'
                    } else {
                        size = '1920'
                    }
                }

                if (thumb) {
                    size = '568'
                }

                return path + size + '-' + name + (this.ext(ext || 'jpg'))
            },
            firstBGColor: '#fafafa',
            currentBGColor: '#fafafa',
            secondBGColor: '#303030',
            getNameSpace() {
                let nested = this.$route.matched[0] ? this.$route.matched[0].props.default.nestedPath : false
                console.log(nested)
                let nestedPath = nested ? nested.replace('/', '.') : this.$route.name
                return this.$route.name ? nestedPath : 'Home'
            },
            inDevelopment(dev) {
                return dev ? dev : process.env.NODE_ENV === 'development'
            },
            fullSizeBracket() {
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
            sounds: [],
            playSound(file, volume) {
                let newSound
                let found = this.sounds.find(sound => sound.id === file)
                if (!found) {
                    newSound = {
                        id: file,
                        data: new Audio('/static/sound/' + file + '.mp3')
                    }
                    newSound.data.volume = volume || 1
                    this.sounds.unshift(newSound)
                } else {
                    newSound = found
                }

                newSound.data.play()
            },
            makeSound(sound) {
                let audioContext = new (window.AudioContext || window.webkitAudioContext)();
                let source = audioContext.createBufferSource();
                let request = new XMLHttpRequest();

                request.open('GET', '/static/sound/' + sound + '.mp3', true);
                request.responseType = 'arraybuffer';
                request.onload = function () {
                    audioContext.decodeAudioData(request.response, function (buffer) {
                        source.buffer = buffer;
                        source.connect(audioContext.destination);
                        source.loop = true;
                        // Play the sound!
                        source.start(0);
                    }, function (e) {
                        console.log('Audio error! ', e);
                    });
                }
                request.send();
            },
            goToAndScroll(to, delay, params) {
                this.playSound('click')
                this.$router.push({name: to || '', params: params || {}})
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight)
                }, delay || 4000)
            },
            scroll() {
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
            // bakedViews: CONTENT.default.en.Views,
            // bakedLayout: CONTENT.default.en.Layout,
            scrolled: false
        }
    }
})

/* eslint-disable no-new */
let main = new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')


