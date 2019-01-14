<template>
    <v-layout
            align-center lg12
            class="relative overflow-hidden"
            :class="{'row-reverse c-1': i%2===0, 'c-2': i%2!==0}"
            v-scroll="scrollH"
    >
            <slide-bg :left="i%2!==0"></slide-bg>
            <div class="section-arrow prev-arrow" @click="navArrowScroll('up')">
                <svg viewBox="0 0 100 50">
                    <polygon points="0,50 50,0 100,50 0,50" />
                    <!--<line x1="50" y1="40" x2="50" y2="0" stroke="white"></line>-->
                    <!--<line x1="50" y1="40" x2="25" y2="25" stroke="white"></line>-->
                    <!--<line x1="50" y1="40" x2="75" y2="25" stroke="white"></line>-->
                </svg>
                <v-icon class="arrow" x-large>mdi-arrow-down</v-icon>
            </div>
            <div class="section-arrow next-arrow" @click="navArrowScroll('down')">
                <svg viewBox="0 0 100 50">
                    <polygon points="0,0 100,0 50,50 0,0" />
                    <!--<line x1="50" y1="10" x2="50" y2="50" stroke="white"></line>-->
                    <!--<line x1="50" y1="10" x2="25" y2="25" stroke="white"></line>-->
                    <!--<line x1="50" y1="10" x2="75" y2="25" stroke="white"></line>-->
                </svg>
                <v-icon class="arrow" x-large>mdi-arrow-up</v-icon>
            </div>
            <v-img
                    class="section-img"
                    lg6
                    :lazy-src="imgC(item.img, false, false, true)"
                    :alt="item.img"
                    :src="imgC(item.img)"
                    height="100vh"
            >
            </v-img>

            <v-flex lg6 pa-5 class="d-flex section-title" justify-center>
                <div class="title-a" :class="{'align-left': i%2===0}">
                    <h1 class="mb-4 font-weight-bold">{{item.title}}</h1>
                    <h3 class="mb-4">{{item.text}}</h3>
                    <v-btn @click="linkTo(item.to)"class="ml-0">{{item.button}}</v-btn>
                </div>
            </v-flex>
        <!--<div class="directions" :class="{'arrow-bottom' : $vuetify.breakpoint.mdAndDown}">-->
            <!--<div class="directions-down">-->
                <!--<v-btn small slot="activator" fab alt="down arrow" @click="goToNext()">-->
                    <!--<v-icon >mdi-arrow-down</v-icon>-->
                <!--</v-btn>-->
            <!--</div>-->
        <!--</div>-->

    </v-layout>
</template>

<script>
    import SlideBg from './SlideBg'
    export default {
        components: {SlideBg},
        props:{
            i: 0,
            item: {
                type: Object,
                default: {}
            }
        },
        methods:{
            linkTo (to) {
              this.$router.push({name: to})
            },
            goToNext () {
              this.$vuetify.goTo(window.pageYOffset + window.innerHeight)
            },
            getDirectionPos (left) {
                let bp = this.$vuetify.breakpoint
                let pos
              if(bp.mdAndDown){
                  if(left){
                      pos = 'left-pos'

                  }else {
                      pos = 'right-pos'
                  }
              }
              return pos
            },
            navArrowScroll (dir) {
                this.$vuetify.goTo(window.scrollY + (dir === 'up' ? window.innerHeight : -window.innerHeight))
            },
            scrollH(e){
                let $e = this.$el,
                 $left,
                 $right,
                 $iris,
                 $title,
                 distance,
                 $irisRings
                let pos = $e.getBoundingClientRect().top
                if (pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    $left = $e.querySelector('.wipe-left')
                    $right = $e.querySelector('.wipe-right')
                    $iris = $e.querySelector('.iris')
                    $title =$e.querySelector('.title-a')
                    $irisRings = [$iris.querySelector('.iris-1'), $iris.querySelector('.iris-2'), $iris.querySelector('.iris-3'), $iris.querySelector('.iris-4')]
                    $e.scrollAnimated = true
                    distance = this.$vuetify.breakpoint.smAndDown ? '80%' : '40%'
                    new TimelineMax()
                        .fromTo($iris, 0.5, {scale: 0.2}, {scale: 1, ease: Back.easeOut})
                        .to($left ? $left : $right, 1.59, {x: $left ? '-' + distance : distance, ease: Back.easeOut}, '-=0.25')
                        .to($iris.querySelector('.iris-1'), 0.36, {rotation: 100, transformOrigin: '50% 50%', autoAlpha: 0.3}, '-=' + 1.475)
                        .to($iris.querySelector('.iris-2'), 0.36, {rotation: 180, transformOrigin: '50% 50%', autoAlpha: 0.3}, '-=' + 1.25)
                        .to($iris.querySelector('.iris-3'), 0.36, {rotation: -180, transformOrigin: '50% 50%', autoAlpha: 0.3}, '-=' + 1.25)
                        .to($iris.querySelector('.iris-4'), 0.36, {rotation: 75, transformOrigin: '50% 50%', autoAlpha: 0.3}, '-=' + 1.25)
                        .to($iris, 0.37, {scale: 0, ease: Bounce.easeOut}, '-=1.05')
                        .fromTo($title, 1.2, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=.85')
                } else if ($e.scrollAnimated && pos > window.innerHeight - 2) {
                    $e.scrollAnimated = false
                    $left = $e.querySelector('.wipe-left')
                    $right = $e.querySelector('.wipe-right')
                    $iris = $e.querySelector('.iris')
                    $title =$e.querySelector('.title-a')
                    $irisRings = [$iris.querySelector('.iris-1'), $iris.querySelector('.iris-2'), $iris.querySelector('.iris-3'), $iris.querySelector('.iris-4')]
                    new TimelineMax()
                        .set($iris,  {scale: 1})
                        .set($irisRings, {rotation: 0, autoAlpha: 1})
                        .set($left ? $left : $right, {x: '0%'})
                        .set($e.querySelector('.title-a'), {y: 60, autoAlpha: 0})
                }
            }
        }
    }
</script>

<style scoped lang="stylus">


    .directions
        bottom 80px
        position: absolute
        left: 50%
        margin-top: -2px
        margin-left: -1px
        transform: translateX(-50%)

    .arrow-bottom
        bottom 30px


    .title-a
        opacity 0
        max-width 64%
        width 70%
        text-align right
        h1
            line-height 1.1
            font-size 2.85em
        h3
            line-height 1.2
            font-size 1.85em
            font-weight 100
        button
            font-weight bold
            margin-left 0

    .align-left
        text-align left

    $color-1 = #e8e8e8
    $color-2 = #dcdcdc

    .c-1
        background $color-1
    .c-2
        background $color-2

    .section-arrow
        position: absolute
        left 0
        right 0
        margin auto
        width 8em
        height 4em
        background transparent
        z-index 2
        cursor pointer
        .arrow, svg
            position: absolute;
            top 0
            left 0
            width: 100%;
            height: 100%

        line
            stroke #5a5a5a
            stroke-width 5px



    .next-arrow
        top 0
        polygon
            fill $color-2
        &:hover
            .v-icon
                color $color-1
            polygon
                fill lightness($color-2, 50%)

    .prev-arrow
        bottom 0
        polygon
            fill $color-1
        &:hover
            .v-icon
                color $color-2
            polygon
                fill lightness($color-1, 50%)




    @media (max-height: 500px) and (orientation:landscape) and (max-width: 800px)
        .title-a
            max-width 80%
        .directions
            display: none

    @media (max-width: 500px)
        .title-a
            h1
                font-size 2.2em
            h3
                font-size 1.5em
            max-width 100%
            /*text-align center*/
            /*font-size 12px*/
</style>
