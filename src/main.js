// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
// import '@babel/polyfill'

import VueShowdown from 'vue-showdown'


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
import VueAnalytics from 'vue-analytics'

// import * as CONTENT from './lang/en/Views'
// import {createSimpleTransition} from 'vuetify/es5/util/helpers'

// import './registerServiceWorker'

// import './registerServiceWorker'
// Sync store with router
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// // const myTransition = createSimpleTransition('my-transition');
// //
// Vue.component('my-transition', myTransition);
Vue.use(VueShowdown, {
    // set default flavor of showdown
    flavor: 'github',
    // set default options of showdown (will override the flavor options)
    options: {
        emoji: false,
    },
})

sync(store, router);

if(process.env.NODE_ENV === 'production') {
    Vue.use(VueAnalytics, {
        id: 'UA-128666877-4',
        router
    })
}

Vue.config.productionTip = false;
/* eslint-disable no-undef,spaced-comment */
Vue.mixin({
    data() {
        return {
            // scrolled: false,
            webp: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0,
            ext(type, thumb) {
                type = type || 'jpg';
                return (thumb ? 'thumb/' : '') + (this.webp ? '.webp' : '.' + type)
            },

            submitToServer(data, method, path) {
                data = JSON.stringify(data);
                return new Promise((resolve, reject) => {
                    let api = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '/.netlify/functions';
                    fetch(api + path, {
                        method: method,
                        body: data,
                        dataType: 'json'
                    }).then(response => {
                        resolve(response)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            imgC(name, img, ext, thumb, addPath) {
                let path = '/static/' + (addPath || '');
                let size = '';
                let bp = this.$vuetify.breakpoint;
                let sizes = [2100, 1920, 1440, 1280, 1024, 768, 568]
                let h
                let useH
                if(process.env.NODE_ENV !== 'developmentd') {
                    if (img) {
                        let width = img.getBoundingClientRect().width;
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
                    // if(this.$el) {
                    //     let s = this.submitToServer(
                    //         {
                    //             img: (window.location.origin + path + size + '-' + name + '.jpg'),
                    //             w: this.$el.getBoundingClientRect().width,
                    //             h: this.$el.getBoundingClientRect().height,
                    //             ext: (this.ext(ext || 'jpg'))
                    //         }, 'POST', '/image-resizer')
                    // }
                    return path + size + '-' + name + (this.ext(ext || 'jpg'))
                }else{
                    useH = this.$el || img
                    h = this.$el ? this.$el : img
                    console.log(h)
                    h = h ? h.getBoundingClientRect ? h.getBoundingClientRect().height : sizes[0] : sizes[0]
                    // path = '/dist' + path
                    return path + sizes[0] + '-' + name + this.ext(ext || 'jpg') + '?nf_resize=fit&h=' + h
                }
            },
            firstBGColor: '#fafafa',
            currentBGColor: '#fafafa',
            secondBGColor: '#303030',
            getNameSpace() {
                let nested = this.$route.matched[0] ? this.$route.matched[0].props.default.nestedPath : false;
                let nestedPath = nested ? nested.replace('/', '.') : this.$route.name;
                return this.$route.name ? nestedPath : 'Home'
            },
            inDevelopment(dev) {
                return dev ? dev : process.env.NODE_ENV === 'development'
            },
            fullSizeBracket() {
                let size = '';
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
            delayPlaySound(file, volume, delay){
              setTimeout(()=>{
                  this.playSound(file, volume)
              },delay * 1000)
            },
            animateJumbotronChange(from, to){
                if(this.$vuetify.breakpoint.mdAndUp) {

                    setTimeout(() => {
                        let title = document.querySelector('#jumbotron .title')
                        let text = title.querySelectorAll('#jumbotron .title .-text-anim')
                        let button = title.querySelectorAll('#jumbotron .title button')
                        var tl = new TimelineLite({delay: 0})
                            // mySplitText = new SplitText(text, {type: "words,chars"}),
                            // chars = mySplitText.chars; //an array of all the divs that wrap each character
                        TweenLite.set(text, {perspective: 400});
                        tl
                            .set([text, button], {opacity: 1}, 'a')
                            .to(title, 0.6, {
                                opacity: 1,
                                scale: 1
                            }, 0.01, "+=0")
                            // .staggerFrom(chars, 0.8, {
                            //     opacity: 0,
                            //     scale: 0,
                            //     y: from ? 80 : -80,
                            //     rotationX: from ? 180 : -180,
                            //     transformOrigin: "0% 50% -50",
                            //     ease: Back.easeOut
                            // }, 0.01, "+=0")
                            // .from([button], 0.5, {
                            //     opacity: 0,
                            //     scale: 0,
                            //     y: -60,
                            //     rotationX: -180,
                            //     transformOrigin: "0% 50% -20",
                            //     ease: Back.easeOut}, 'a')
                    }, 850);
                    this.playSound('deep_woosh', 1, 0.8);
                }else{
                    setTimeout(() => {
                        let title = document.querySelector('#jumbotron .title')
                        new TimelineMax()
                            .to(title, 0.42, {scale:0.4, opacity: 0})
                            .to(title, 0.42, {scale:1, opacity: 1})
                    }, 200)
                }
            },
            playSound(file, volume, delay) {
                if(delay){
                    this.delayPlaySound(file, volume, delay)
                    return
                }
                let newSound;
                let found = this.sounds.find(sound => sound.id === file);

                if (!found) {
                    newSound = {
                        id: file,
                        data: new Audio('/static/sound/' + file + '.mp3')
                    };
                    newSound.data.volume = volume || 1;
                    this.sounds.unshift(newSound)
                } else {
                    newSound = found
                }
                try {
                    newSound.data.play()
                } catch (e){
                    console.log(file + ' sound not yet ready')
                }
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
                };
                request.send();
            },
            goToID(id, offset) {
                // this.scrolled = true;
                this.playSound('click', 0.3);

                setTimeout(() => {
                    this.$vuetify.goTo(id, {offset: offset || 0})
                }, 250)
            },
            goToAndScroll(to, delay, params) {
                // this.scrolled = true;
                console.log(to)
                this.playSound('click', 0.3);
                if(this.$route.name === to){
                    this.$vuetify.goTo(0)
                    return;
                }
                this.$router.push({name: to || '', params: params || {}});
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight)
                }, delay || this.$vuetify.breakpoint.smAndDown ? 3400  : 5500)
            },
            scroll() {
                // this.scrolled = true;
                let current = window.pageYOffset;
                let pos = window.innerHeight;
                let tBHeight = document.querySelector('.v-toolbar');
                tBHeight = tBHeight.getBoundingClientRect().height;
                pos = pos - tBHeight - current;
                this.scrolled = true;
                pos = pos + current;
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
            }
        }
    }
});

/* eslint-disable no-new */
let main = new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');


