<template>
    <v-app>

        <core-toolbar v-if="getLoadCount($vuetify.breakpoint.smAndDown ? 2 : 0.5)"/>

        <core-drawer v-if="getLoadCount($vuetify.breakpoint.smAndDown ? 1 : 2)"/>

        <core-jumbotron app/>
        <div class="contact-ico bot-p left-p">
            <v-btn
                    aria-label="go-to-contact"
                    v-if="$route.name !== 'Contact'"
                    @click="goToContact"
                    fab
                    dark
                    medium
                    :small="$vuetify.breakpoint.smAndDown"
                    color="primary"
                    :class="$vuetify.breakpoint.smAndDown ? 'bot' : ''"
                    class="darken-3"
            >
                <v-icon
                        large
                        :medium="$vuetify.breakpoint.mdAndDown"
                        dark
                >
                    mdi-phone
                </v-icon>
            </v-btn>
        </div>
        <core-view :loadTickerCount="loadTickerCount" :class="this.$route.path === '/' ? 'no-pad' : ''"
                   v-if="getLoadCount(0.5)"/>

        <core-footer v-if="getLoadCount(1.5)"/>

        <!--<cookie-law theme="dark-lime"></cookie-law>-->
    </v-app>
</template>
<script>
    /* eslint-disable no-undef,spaced-comment */
    import {mapMutations, mapGetters} from 'vuex'
    // import CookieLaw from 'vue-cookie-law'
    import animationLibrary from './plugins/gsap-animation-library'
    export default {
        data() {
            return {
                componentsLoaded: null,
                loadTickerCount: 0,
                loadCount: 0,
                loader: false,
                lazyTriggered: null
            }
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
                animationLibrary.wobble(document.querySelector('.contact-ico'), {transformOrigin: '0% 100%'})
            }
        },
        computed: {
            lazyLoaded() {
                return this.getLazy()
            },
            loaded() {
                return this.getLoader()
            }
        },
        methods: {
            ...mapMutations('app', ['setLazyLoaded']),
            ...mapMutations('app', ['setLoader']),
            ...mapGetters('app', ['getLazy']),
            ...mapGetters('app', ['getLoader']),
            mountFBChat() {
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'))
            },
            goToContact () {
                this.playSound('click', 0.3)
                this.$router.push({name:'Contact'});
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight, { offset: -document.querySelector('.v-toolbar').getBoundingClientRect().height })
                }, 2000)

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
                if (this.lazyTriggered && !this.getLazy()) {
                    this.setLazyLoaded(true);
                    this.setLoader(true)
                }
                this.lazyTriggered = (window.pageYOffset ||
                    document.documentElement.scrollTop || 0) >
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
    html
        overflow scroll
        overflow-x hidden

    ::-webkit-scrollbar
        cursor pointer
        width: 8px /* remove scrollbar space */
        background: transparent

    /* optional: just make scrollbar invisible */

    /* optional: show position indicator in red */
    ::-webkit-scrollbar-thumb
        background #b0b0b0
        cursor pointer
        border-radius 5px

    ::-webkit-scrollbar-thumb:hover
        background #4a4a4a

    ::-webkit-scrollbar-thumb:active
        background #1a1a1a

    .v-content
        padding-top: 0 !important

    ._bg-color-a
        background-color: #eaeaea

    ._bg-color-b
        background-color: #e2e2e2

    ._bg-color-c
        background-color: #5a5a5a

    .-transparent-bg
        background transparent !important

    .contact-ico
        right 0
        top 0
        bottom 0
        margin auto
        position: fixed
        z-index: 50
        .v-btn
            border-radius 0
            margin 0
        &.bot-p
            top initial
            bottom: 0px
        &.left-p
            right initial
            left 0

    .-border-btn
        background: #ffffff1c !important;
        border: 1px solid #ffffff14;
        color: #fff !important;
    .title-a
        max-width 999px
        margin-left auto
        margin-right auto
        h1
            font-size: 2.75em
        h2
            font-size 2.45em
            font-weight 100
        h3
            font-size 2.15em
            font-weight 100
        h4
            font-size 1.76em
        p
            font-size 1.23em

    .-full-viewport-arrow
        min-height calc(100vh -300px)

    .-full-vp
        position relative
        width 100vw
        min-height 100vh
        justify-content center
        align-items center
        display flex

    .nested-menu::after
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 2px;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-top: 6px solid #03a9f4;

    .jumbo-bot-arrow
        width 100%
        height: 300px;
        pointer-events none
        position absolute
        margin-top -150px
        z-index 3

        svg
            filter drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25))
            position absolute
            height 100%
            display: block
            width: 100%;
        polygon
            fill #5a5a5a

        &.static
            margin-top 0
            position static
            svg
                position static

    .-arrow-buffer-top
        padding-top 150px

    .-arrow-buffer-bot
        padding-bottom 200px

    .-view-height
        min-height 100vh
        display flex
        align-items center
        justify-items center
        flex-direction row
        justify-content center
        //padding-top: 10vh;
        //padding-bottom 10vh

    #webchat
        z-index: 20;
        position fixed
        bottom: 0
        right: 0
        width: 300px
        max-height: 400px
        ul
            overflow hidden
            overflow-y scroll

    .pointer
        cursor pointer

    .invisible
        opacity 0
        visibility hidden

    .hide-
        top -100%
        img
            animation: d

    .slide-out-l
        animation slide-out-left 1.4s ease-in forwards

    .slide-out-r
        animation slide-out-right 1.4s ease-in forwards

    .j-bg-svg
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        svg
            display block
            width 100%
            height 100%

    .shake-vertical:hover
        .anim-icon
            animation: shake-vertical 1.2s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both

    .shake-vertical .animate
        animation: shake-vertical 1.2s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both

    .--rotate-in-center
        animation rotate-in-center 1.8s infinite both linear

    @keyframes rotate-in-center {
        0% {
            transform: rotate(0deg);
            //opacity 0
        }
        100% {
            transform rotate(360deg)
            // opacity 0
        }
    }

    @keyframes jello-diagonal-2 {
        10% {
            transform: skew(0deg 0deg);
        }
        30% {
            transform: skew(-25deg -25deg);
        }
        40% {
            transform: skew(15deg, 15deg);
        }
        50% {
            transform: skew(-15deg, -15deg);
        }
        65% {
            transform: skew(5deg, 5deg);
        }
        75% {
            transform: skew(-5deg, -5deg);
        }
        100% {
            transform: skew(0deg 0deg);
        }
    }

    .my-transition
        &-leave-active
            position: absolute

        &-enter-active, &-leave, &-leave-to
            transition: opacity 0.6s
            .title
                transition: transform 0.6s

        &-enter, &-leave-to
            opacity: 0
            .title
                transform: scale(0.75)

    .v-content
        padding-top: 0 !important
        /*padding-bottom: 64px !important*/
        padding-bottom: 0px !important
        z-index 3

    .fixed-content-bg
        position: absolute;
        z-index: -1;
        width: 100vw;
        height: 200vh;
        top: 0;
        left: 0;

    .no-pad
        padding-bottom: 0 !important
        padding-top: 0 !important

    .container
        max-width: 1280px

    .relative
        position: relative

    .theme--light.v-stepper--vertical .v-stepper__content:not(:last-child)
        border-left: 0 solid rgba(0, 0, 0, 0.12);

    .row-reverse
        flex-direction row-reverse

    @media screen and (-webkit-min-device-pixel-ratio:0)
        select,
        textarea,
        input
            font-size: 16px !important

    @media (max-height: 500px) and (orientation: landscape) and (max-width: 800px)
        .title-a
            max-width 80% !important

        .directions
            display: none

    @media screen and (max-width: 700px)

        .jumbo-bot-arrow
            margin-top -(94/2)px
            height: 94px

        .-arrow-buffer-top
            padding-top: 60px

        .section-arrow.first-arrow
            top: 31px

        .title-a
            h3
                line-height 1.1 !important

    @media (max-width: 500px)
        .title-a, .title-c
            max-width 100% !important
            h1
                font-size 2.2em !important

            h3
                font-size 1.5em !important


    #fb-root
        .fb_dialog
            bottom: 0 !important;
            display: inline !important;
            height: 40px !important;
            padding: 0 !important;
            position: fixed !important;
            right: 0 !important;
            top: auto !important;
            width: 40px !important;
            z-index: 2147483646 !important;
            background: #005da0 !important;
            border-radius: 0 !important;
            svg
                height: 40px !important
                width: 40px !important


</style>
