<template>
  <v-app>
    <core-toolbar v-if="getLoadCount(3)"/>

    <core-drawer v-if="getLoadCount(4)"/>

    <core-jumbotron v-if="getLoadCount(1)"/>

    <core-view :class="this.$route.path === '/' ? 'no-pad' : ''"  v-if="getLoadCount(2)"/>

    <core-footer v-if="getLoadCount(5)"/>
    <div class="site-loader" :class="{'hide': loaded}">
      <div class="load-icon-wrap" v-if="!loaded">
      <custom-logo></custom-logo>
      </div>
    </div>


  </v-app>
</template>
<script>
    /* eslint-disable no-undef,spaced-comment */

    import { mapMutations, mapGetters } from 'vuex'
    export default {
        data () {
            return {
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
            this.loadTicker = setInterval(() => {
                this.loadCount+=1
                if(this.loadCount > 5) {
                    clearInterval(this.loadTicker)
                }
            }, 500)
            clearTimeout(this.delayAnimated)
            this.delayAnimated = setTimeout(() => {
                $this.setLazyLoaded(true)
                $this.setLoader(true)
            }, 1000)
        },
        watch: {
            $route () {
                let $this = this
                clearTimeout(this.delayAnimated)
                this.delayAnimated = setTimeout(() => {
                    $this.setLazyLoaded(true)
                    $this.setLoader(true)
                }, 3000)
            }
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

  .hide
    opacity 0
    visibility hidden

  .site-loader
    position: fixed;
    top 0
    left 0
    height 100vh
    width 100vw
    z-index 1000
    background dodgerblue
    transition: opacity 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940), visibility 0.6s
    .load-icon-wrap
      width: 100px
      height: 100px
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      animation: rotate-in-center 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite both;



  @keyframes rotate-in-center {
    0% {
      transform: rotate(-360deg);
      opacity 0
    }
    75% {
      transform rotate(0)
      opacity 1
    }
    100% {
      opacity 0
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display none
    }
  }

  .v-content
    padding-top: 64px !important
    padding-bottom: 64px !important
    z-index 1
  .no-pad
    padding-bottom: 0 !important
  .container
    max-width: 1280px
</style>
