<template>
    <v-app>

        <core-toolbar  v-if="getLoadCount($vuetify.breakpoint.smAndDown ? 2 : 0)"/>

        <core-drawer v-if="getLoadCount($vuetify.breakpoint.smAndDown ? 0 : 2)"/>

        <core-jumbotron @clicked="clickScrolled" app/>

        <core-view
                    :scrolled="scrolled"
                   @scroll="handleScroll"
                   @clicked="clickScrolled"
                   :loadTickerCount="loadTickerCount"
                   :class="this.$route.path === '/' ? 'no-pad' : ''"/>

        <core-footer v-if="getLoadCount(0)"/>

        <custom-contact-icon :atTop="atTop" ></custom-contact-icon>
        <custom-gift-icon :atTop="atTop" v-if="this.$route.path === '/' && $vuetify.breakpoint.mdAndUp"></custom-gift-icon>

        <!--<cookie-law theme="dark-lime"></cookie-law>-->
    </v-app>
</template>
<script>
    /* eslint-disable no-undef,spaced-comment */
    import {mapMutations, mapGetters} from 'vuex'
    // import CookieLaw from 'vue-cookie-law'
    import animationLibrary from './plugins/gsap-animation-library'

    // io.POLL_INTERVAL = 100; // Time in milliseconds.
    // var options = {
    //     root: document.querySelector('#core-view'),
    //     rootMargin: '0px',
    //     threshold: 1.0
    // }
    // var observer = new IntersectionObserver(callback);

    export default {
        data() {
            return {
                scrolled: false,
                atTop: true,
                componentsLoaded: null,
                loadTickerCount: 0,
                loadCount: 0,
                loader: false,
                lazyTriggered: null
            }
        },
        created () {
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        },
        // components: { CookieLaw },
        mounted() {
            let $this = this;
            let timeLoad = new Date().getTime() - window.startLoadTime;
            document.body.addEventListener('click', () => {
                $this.setLazyLoaded(true);
                $this.setLoader(true)
            });
            $this.animateLoaded();
            clearTimeout(this.delayAnimated);
            this.delayAnimated = setTimeout(() => {
                // document.getElementById('home-loader').classList.add('hide-');
                $this.setLazyLoaded(true);
                $this.setLoader(true)
            }, timeLoad < 10 ? 10 : 15)
            // setTimeout(this.mountFBChat, 4000)

        },
        watch: {
            $route(frm, to) {
                if (to.name) {
                    // document.getElementById('home-loader').classList.add('hide-');
                    clearTimeout(this.delayAnimated)
                }

                this.startLoadTicker(false);
                this.animateJumbotronChange(true)
                clearTimeout(this.contactAnimDelay)
                this.contactAnimDelay = setTimeout(()=>{
                    animationLibrary.wobble(document.querySelector('.contact-ico .v-btn'), {transformOrigin: '0% 100%', modifier: 0.2});
                    animationLibrary.textAnimOne(document.querySelector('.contact-ico'));
                    animationLibrary.textAnimOne(document.querySelector('.gift-ico'), {delay: 0.666});
                }, 2000)
                //animationLibrary.wobble(document.querySelector('.gift-ico'), {transformOrigin: '0% 100%', delay: 0.8})

            }
        },
        computed: {
            lazyLoaded() {
                return this.getLazy()
            },
            loaded() {
                return this.getLoader()
            },
            getScrolled() {
                return this.scrolled
            }
        },
        methods: {
            ...mapMutations('app', ['setLazyLoaded']),
            ...mapMutations('app', ['setLoader']),
            ...mapGetters('app', ['getLazy']),
            ...mapGetters('app', ['getLoader']),
            handleScroll () {

                let scrollPos = (window.pageYOffset ||
                    document.documentElement.scrollTop || 0)
                this.scrolled = this.scrolled || scrollPos > 0;
                this.atTop = scrollPos < 100
            },
            clickScrolled(value){
                console.log(value)
                this.scrolled = value
            },
            getLoadCount(i) {
                return i < this.loadCount
            },
            increment() {
                this.loadCount += 1;
                if (this.loadCount > 5) {
                    clearInterval(this.loadComponentsTicker)
                }
            },
            loadTick() {
                this.loadTickerCount+=1;
                if (this.loadTickerCount > this.tickerLimit) {
                    clearInterval(this.loadTicker)
                }
            },
            clearLoadTicker() {
                this.loadTickerCount = 0;
                clearInterval(this.loadTicker)
            },
            startLoadTicker(tickInterval, limit) {
                limit = limit || 15;
                tickInterval = tickInterval || 1;
                this.tickerLimit = limit;
                this.clearLoadTicker();
                this.loadTicker = setInterval(this.loadTick, tickInterval * 500)
            },
            animateLoaded() {
                this.loadComponentsTicker = setInterval(this.increment, 300)
            },
            onScroll(e) {
                let scrollPos = (window.pageYOffset ||
                    document.documentElement.scrollTop || 0)
                if (this.lazyTriggered && !this.getLazy()) {
                    this.setLazyLoaded(true);
                    this.setLoader(true)
                }
                console.log('ssss' + scrollPos)
                if(scrollPos < 50){
                    console.log('ssss')
                    this.atTop = true
                }
                this.lazyTriggered = scrollPos >
                    (50);
                if (!this.scrolled) {
                    if (!e) {
                        e = window.event
                    }
                    /* IE7, IE8, Chrome, Safari */
                    if (e.preventDefault) {
                        e.preventDefault()
                    }
                    /* Chrome, Safari, Firefox */
                    e.returnValue = false;
                    /* IE7, IE8 */
                    this.scroll(e)
                }
            }
        }
    }
</script>


<style lang="stylus">


</style>
