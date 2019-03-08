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

        <core-footer v-if="getLoadCount(1.5)"/>

        <custom-contact-icon></custom-contact-icon>
        <!--<custom-gift-icon></custom-gift-icon>-->

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
                animationLibrary.wobble(document.querySelector('.contact-ico'), {transformOrigin: '0% 100%'})
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
                this.scrolled = this.scrolled || window.scrollY > 0;
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

    .-border-btn
        background: #ffffff1c !important
        border: 1px solid #ffffff14
        color: #fff !important
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
        content: ''
        position: absolute
        top: 100%
        left: 0
        width: 100%
        height: 2px
        border-left: 50px solid transparent
        border-right: 50px solid transparent
        border-top: 6px solid #03a9f4

    .jumbo-bot-arrow
        width 100%
        height: 300px
        pointer-events none
        position absolute
        margin-top -150px
        z-index 3

        svg
            filter drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25))
            position absolute
            height 100%
            display: block
            width: 100%
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
        //padding-top: 10vh
        //padding-bottom 10vh

    #webchat
        z-index: 20
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
            transform: rotate(0deg)
            //opacity 0
        }
        100% {
            transform rotate(360deg)
            // opacity 0
        }
    }



    @-webkit-keyframes wobble-hor-bottom {
        0%,  100% {
            -webkit-transform: translateX(0%)
            transform: translateX(0%)
            -webkit-transform-origin: 50% 50%
            transform-origin: 50% 50%
        }
        15% {
            -webkit-transform: translateX(-30px) rotate(-6deg)
            transform: translateX(-30px) rotate(-6deg)
        }
        30% {
            -webkit-transform: translateX(15px) rotate(6deg)
            transform: translateX(15px) rotate(6deg)
        }
        45% {
            -webkit-transform: translateX(-15px) rotate(-3.6deg)
            transform: translateX(-15px) rotate(-3.6deg)
        }
        60% {
            -webkit-transform: translateX(9px) rotate(2.4deg)
            transform: translateX(9px) rotate(2.4deg)
        }
        75% {
                -webkit-transform: translateX(-6px) rotate(-1.2deg)
                transform: translateX(-6px) rotate(-1.2deg)
            }
    }

    .wobble-hor-bottom {
        -webkit-animation: wobble-hor-bottom 0.8s 1s infinite both
        animation: wobble-hor-bottom 0.8s 1s infinite both
    }

    @keyframes jello-diagonal-2 {
        10% {
            transform: skew(0deg 0deg)
        }
        30% {
            transform: skew(-25deg -25deg)
        }
        40% {
            transform: skew(15deg, 15deg)
        }
        50% {
            transform: skew(-15deg, -15deg)
        }
        65% {
            transform: skew(5deg, 5deg)
        }
        75% {
            transform: skew(-5deg, -5deg)
        }
        100% {
            transform: skew(0deg 0deg)
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
        position: absolute
        z-index: -1
        width: 100vw
        height: 200vh
        top: 0
        left: 0

    .no-pad
        padding-bottom: 0 !important
        padding-top: 0 !important

    .container
        max-width: 1280px

    .relative
        position: relative

    .theme--light.v-stepper--vertical .v-stepper__content:not(:last-child)
        border-left: 0 solid rgba(0, 0, 0, 0.12)

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
            bottom: 0 !important
            display: inline !important
            height: 40px !important
            padding: 0 !important
            position: fixed !important
            right: 0 !important
            top: auto !important
            width: 40px !important
            z-index: 2147483646 !important
            background: #005da0 !important
            border-radius: 0 !important
            svg
                height: 40px !important
                width: 40px !important

    /*
        Copied global styles
     */

    .testimonial-carousel .v-responsive__content
        justify-content center
        align-items center
        display flex

    .v-list__group__header__append-icon
        .v-icon
            background #5a5a5a
            border-radius 30px

    .v-list__group__header__append-icon
        .v-icon
            background #5a5a5a
            border-radius 30px
    /*
    Logo
     */
    .sprite-wrapper
        margin 0 auto
        width 200px
        height 200px
        overflow hidden
        position relative

    .sprite
        position absolute
        background-position 0 0
        background-repeat no-repeat
        background-size auto

    /*
    Cube
     */
    #cube
        .shadow
            -moz-box-shadow inset 0px 1px 3px #5d5d5d
            -webkit-box-shadow inset 0px 1px 3px #5d5d5d
            box-shadow inset 0px 1px 3px #5d5d5d

        .--active
            opacity: 1 !important

    /*
    Websites
     */
    @keyframes shake-vertical {
        0%,
        100% {
            transform: translateY(0)
        }
        10%,
        30%,
        50%,
        70% {
            transform: translateY(-4px)
        }
        20%,
        40%,
        60% {
            transform: translateY(4px)
        }
        80% {
            transform: translateY(3.4px)
        }
        90% {
            transform: translateY(-3.4px)
        }
    }
    .vid-bg .v-image__image
        z-index 0

    /*
        Comp - Hero
     */

    .v-parallax--dark,
    .v-parallax--light
    .v-parallax__image-container:after
        bottom: 0
        content: ''
        position: absolute
        left: 0
        right: 0
        top: 0
        z-index: 1

    .v-parallax
        &--light &__image-container:after
            background: linear-gradient(to top, rgba(#fff, .8), rgba(#fff, .9))

        &--dark &__image-container:after
            background: linear-gradient(to top, rgba(10, 10, 10, .85) 0%, rgba(10, 10, 10, .9) 50%, rgba(10, 10, 10, .85) 100%)

    .alpha-testimonial
        &__content
            align-items: flex-start
            display: flex
            justify-content: space-between
            font-size 1.2em

        &__footer-bar
            height: 4px
            margin: 20px 0 20px auto
            width: 100px

        .v-icon
            justify-content: flex-end
            flex: 0 1 10%
            margin-top: -8px
            transform: rotate(180deg)

        p
            flex: 1 1 85%
            line-height: 2

        footer
            flex: 1 0 auto
            text-align: right

            .title
                font-weight: 300

        &--dark
            color: #fff

    /*
    Comp - Toolbar
     */
    .v-toolbar.v-toolbar--fixed
        z-index 4
        opacity 0
        pointer-events none
        transition opacity 0.5s ease-in
        opacity 1



    .--icon-dark
        .v-icon
            color: black !important

    .--icon-light
        .v-icon
            color: white !important

    .v-btn.v-btn--router
        border-radius 0

    .v-toolbar__content
        padding-right 0


    .v-toolbar__items
        pointer-events all
        /*background #5a5a5a*/
        padding 4px 4px 4px 0
        height: 100%

    .v-btn
        pointer-events all

    .toolbar-svg-wrapper
        height: 100%
        position: relative
        left -24px
        pointer-events all
        svg
            width: auto
            height: 100%

    ._visible
        opacity: 1

    .v-list
        display: flex
        margin-top: 5px
        flex-direction: column

    .v-menu__content
        box-shadow none

        .v-btn
            margin 0

        .v-list
            background transparent
            padding 0

    @media only screen and (max-width: 959px)
        .toolbar-svg-wrapper
            left -16px

    /*
    Comp - Questions

     */

    .-c-pad 
        margin-bottom: 10vh
    

    .mw-1
        max-width 1440px
        width 100%
        margin-left auto
        margin-right auto

    .v-input--is-label-active
        label.v-label
            font-weight bold
            color white

    /*color black*/

    .no-message
        .v-messages
            display none

    .scale-anim
        .v-input--selection-controls__input
            animation scale-up 0.29s ease-out forwards
            transform-origin center center

    @keyframes scale-up {
        0% {
            transform: scale(1)
        }
        100% {
            transform: scale(1.1)
        }
    }

    /*
    Comp - Timeline Piece
     */

    .v-timeline--dense .v-timeline-item__body 
        max-width: calc(100% - 44px)
    
    .v-timeline-item .--anim-2
        opacity 0

    /*
    Comp - Videobackground
     */

    .VideoBg 
        position: relative
        background-size: cover
        background-position: center
        overflow: hidden
    

    .VideoBg video 
        position: absolute
        top: 50%
        left: 50%
        visibility: hidden
        transform: translate(-50%, -50%)
    

    .VideoBg__content 
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    
</style>
