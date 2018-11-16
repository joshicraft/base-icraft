<template>
  <v-app>
    <core-toolbar v-if="getLoadCount(3)"/>

    <core-drawer v-if="getLoadCount(5)"/>

    <core-jumbotron v-if="getLoadCount(1)"/>

    <core-view :loadTickerCount="loadTickerCount" :class="this.$route.path === '/' ? 'no-pad' : ''"  v-if="getLoadCount(2)"/>

    <core-footer v-if="getLoadCount(4)"/>
    <div class="site-loader" :class="{'hide-s': loaded}">
      <div class="j-bg-svg">
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100">
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="29.2825" y1="40.3713" x2="106.4355" y2="76.229">
	<!--<stop offset="0" style="stop-color:#13638C"/>-->
	<!--<stop offset="1" style="stop-color:#00FFFF"/>-->
	<stop offset="0" style="stop-color:#22daff"/>
	<stop offset="1" style="stop-color:#33cccc"/>
</linearGradient>
<polygon class="st0 poly-right anim" points="0,100 100,0 100,100 "/>
<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="29.2825" y1="40.3713" x2="106.4355" y2="76.229" gradientTransform="matrix(-1 0 0 -1 100 100)">
	<!--<stop offset="0" style="stop-color:#13638C"/>-->
	<!--<stop offset="1" style="stop-color:#00FFFF"/>-->
	<stop offset="0" style="stop-color:#11daff"/>
	<stop offset="1" style="stop-color:#33cccc"/>
</linearGradient>
<polygon class="st1 poly-left anim" points="100.1,0 0,100.1 0,0 "/>
</svg>
      </div>
      <div class="load-icon-wrap rotate" v-if="true">
        <img src="img/logo-b.png"/>
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
            // this.loadTicker = setInterval(() => {
            //     // this.loadCount+=1
            //     // if(this.loadCount > 5) {
            //     //
            //     //     clearInterval($this.loadTicker)
            //     // }
            // }, 500)
            clearTimeout(this.delayAnimated)
            this.delayAnimated = setTimeout(() => {
                $this.setLazyLoaded(true)
                $this.setLoader(true)
            }, 1000)
        },
        watch: {
            $route () {
                console.log('change')
                let $this = this
                clearTimeout(this.delayAnimated)
                this.startLoadTicker()
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
            getLoadTickerCount () {
              return this.loadTickerCount
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
                this.loadCount ++
            },

            loadTick() {
                console.log(this.loadTickerCount)
                this.loadTickerCount++
            },
            clearLoadTicker() {
                this.loadTickerCount = 0
                TweenMax.killDelayedCallsTo(this.loadTick)
                if (this.loadTicker && this.loadTicker.kill) {
                    this.loadTicker.kill()
                }
            },
            startLoadTicker(tickInterval, limit) {
                limit = limit || 100
                tickInterval = tickInterval || 1
                this.clearLoadTicker()
                this.loadTicker = new TimelineMax()
                for(let i = 0; i < limit; i ++) {
                    this.loadTicker.addCallback(this.loadTick, i * tickInterval, [], this)
                }
            },
            animateLoaded () {
              let tL = new TimelineMax(),
                $loader = document.querySelector('.site-loader'),
                  $logo = $loader.querySelector('.load-icon-wrap img'),
                  $bg = $loader.querySelector('.j-bg-svg')
                tL
                    // .to($logo, 2, {rotation: 360}, 'a')
                    .call(this.increment, [], this, 'a')
                    .call(this.increment, [], this, 'a+=0.5')
                    .call(this.increment, [], this, 'a+=1')
                    .call(this.increment, [], this, 'a+=1.5')
                    .call(this.increment, [], this, 'a+=2')
                    .call(this.increment, [], this, 'a+=2')
                    .to($logo, 0.4, {autoAlpha: 0, scale: 0.1}, 'a+=2.5')
                    .to($bg.querySelector('.poly-left'), 0.3, {x: -3, ease: Back.easeOut}, 'a+=3')
                    .to($bg.querySelector('.poly-right'), 0.3, {x: 3, ease: Back.easeOut}, 'a+=3')
                    .to($bg.querySelector('.poly-left'), 1, {x: -100, ease: Circ.easeIn}, 'a+=3.5')
                    .to($bg.querySelector('.poly-right'), 1, {x: 100, ease: Circ.easeIn}, 'a+=3.5')
                    .set($loader, {display: 'none'})
                    // .to($bg.querySelector('.poly-left'), 1.4, {className: '+=slide-out-l'}, 'a+=2')
                    // .to($bg.querySelector('.poly-right'), 1.4, {className: '+=slide-out-r'}, 'a+=2')
            },
            onScroll (e) {
                if (this.lazyTriggered && !this.getLazy()) {
                    this.setLazyLoaded(true)
                    this.setLoader(true)
                }
                this.lazyTriggered = (window.pageYOffset ||
                    document.documentElement.scrollTop || 0) >
                    (50)
                console.log('s')
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
    background transparent
    .load-icon-wrap
      width: 100px
      height: 100px
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      img
        display block
        width 100%
        height 100%



  .rotate
    animation: rotate-in-center 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite both;

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
  //.st0{fill: #44daff}
  //.st1{fill: #3680ff}

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

  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display none
    }
  }

  @keyframes slide-out-left {
    0% {
      transform translateX(0)
    }
    100% {
      transform translateX(100px)
    }
  }

  @keyframes slide-out-right {
    0% {
      transform translateX(0)
    }
    100% {
      transform translateX(-100px)
    }
  }

  .my-transition
      &-leave-active
          position: absolute

      &-enter-active, &-leave, &-leave-to
          transition: opacity 0.4s
          .title
            transition: transform 0.4s

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
