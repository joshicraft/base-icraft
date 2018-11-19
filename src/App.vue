<template>
  <v-app>

    <core-toolbar v-if="getLoadCount($vuetify.breakpoint.smAndDown ? 4 : 2)"/>

    <core-drawer v-if="getLoadCount($vuetify.breakpoint.smAndDown ? 2 : 4)"/>

    <core-jumbotron/>

    <core-view :loadTickerCount="loadTickerCount" :class="this.$route.path === '/' ? 'no-pad' : ''"  v-if="getLoadCount(4)"/>

    <core-footer v-if="getLoadCount(4)"/>

  </v-app>
</template>
<script>
    /* eslint-disable no-undef,spaced-comment */

    import { mapMutations, mapGetters } from 'vuex'
    export default {
        data () {
            return {
                componentsLoaded: null,
                loadTickerCount: 0,
                loadCount: 0,
                loader: false,
                lazyTriggered: null
            }
        },
        mounted () {
            let $this = this
            document.body.addEventListener('click', () => {
                $this.setLazyLoaded(true)
                $this.setLoader(true)
            })
            $this.animateLoaded()
            clearTimeout(this.delayAnimated)
            console.log(window.startLoadTime)
            this.delayAnimated = setTimeout(() => {
                document.getElementById('site-loader').classList.add('hide-')
                $this.setLazyLoaded(true)
                $this.setLoader(true)
            }, 1000)
        },
        computed: {
            lazyLoaded () {
                return this.getLazy()
            },
            loaded () {
                return this.getLoader()
            }
        },
        methods: {
            ...mapMutations('app', ['setLazyLoaded']),
            ...mapMutations('app', ['setLoader']),
            ...mapGetters('app', ['getLazy']),
            ...mapGetters('app', ['getLoader']),
            getLoadCount (i) {
                return i < this.loadCount
            },
            increment () {
                this.loadCount += 1
                if(this.loadCount > 5){
                    clearInterval(this.loadComponentsTicker)
                }
            },
            loadTick() {
                this.loadTickerCount++
            },
            clearLoadTicker() {
                this.loadTickerCount = 0
                clearInterval(this.loadTicker)
            },
            startLoadTicker(tickInterval, limit) {
                limit = limit || 100
                tickInterval = tickInterval || 1
                this.clearLoadTicker()
                this.loadTicker = setInterval(this.loadTick, tickInterval * 1000)
            },
            animateLoaded () {
                this.loadComponentsTicker = setInterval(this.increment, 1000)
            },
            onScroll (e) {
                if (this.lazyTriggered && !this.getLazy()) {
                    this.setLazyLoaded(true)
                    this.setLoader(true)
                }
                this.lazyTriggered = (window.pageYOffset ||
                    document.documentElement.scrollTop || 0) >
                    (50)
                if (!this.scrolled) {
                    if (!e) {
                        e = window.event
                    }
                    /* IE7, IE8, Chrome, Safari */
                    if (e.preventDefault) {
                        e.preventDefault()
                    }
                    /* Chrome, Safari, Firefox */
                    e.returnValue = false
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
    width: 8px  /* remove scrollbar space */
    background: transparent  /* optional: just make scrollbar invisible */

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

  .st0{fill:url(#SVGID_1_);}
  .st1{fill:url(#SVGID_2_);}

  @keyframes rotate-in-center {
    0% {
      transform: rotate(-360deg);
      //opacity 0
    }
    75% {
      transform rotate(0)
      //opacity 1
    }
    100% {
     // opacity 0
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
    padding-top: 0px !important
    padding-bottom: 64px !important
    z-index 1

  .no-pad
    padding-bottom: 0 !important
    padding-top: 0 !important

  .container
    max-width: 1280px
</style>
