<template>
    <v-layout
            align-center lg12
            class="relative overflow-hidden"
            :class="{'row-reverse c-1': i%2===0, 'c-2': i%2!==0}"
            v-scroll="scrollH"
    >
        <slide-bg :left="i%2!==0"></slide-bg>
        <ui-section-nav-arrow :index="i" direction="prev"></ui-section-nav-arrow>
        <ui-section-nav-arrow :index="i" direction="next"></ui-section-nav-arrow>
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
                <v-btn @click="goToAndScroll(item.to)" class="ml-0 primary">{{item.button}}</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import SlideBg from './SlideBg'
    import Sound from '../../plugins/sound'
    export default {
        components: {SlideBg},
        props: {
            i: 0,
            item: {
                type: Object,
                default: {}
            }
        },
        methods: {
            linkTo(to) {
                this.$router.push({name: to})
            },
            goToNext() {
                this.$vuetify.goTo(window.pageYOffset + window.innerHeight)
            },
            getDirectionPos(left) {
                let bp = this.$vuetify.breakpoint
                let pos
                if (bp.mdAndDown) {
                    if (left) {
                        pos = 'left-pos'

                    } else {
                        pos = 'right-pos'
                    }
                }
                return pos
            },
            navArrowScroll(dir) {
                let dimensions = this.$el.getBoundingClientRect()
                this.$vuetify.goTo(window.scrollY + (dir === 'down' ? window.innerHeight : -window.innerHeight) + dimensions.top)
            },
            scrollH(e) {
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
                    // $iris = $e.querySelector('.iris')
                    $title = $e.querySelector('.title-a')
                    // $irisRings = [$iris.querySelector('.iris-1'), $iris.querySelector('.iris-2'), $iris.querySelector('.iris-3'), $iris.querySelector('.iris-4')]
                    $e.scrollAnimated = true
                    distance = this.$vuetify.breakpoint.smAndDown ? '80%' : '40%'
                    new TimelineMax()
                        .call(Sound.playSound, ['slide', 0.22], Sound)
                        // .fromTo($iris, 0.5, {scale: 0.2}, {scale: 1, ease: Back.easeOut})
                        .to($left ? $left : $right, 1.59, {
                            x: $left ? '-' + distance : distance,
                            ease: Back.easeOut
                        }, '-=0')

                        // .to($iris.querySelector('.iris-1'), 0.36, {
                        //     rotation: 100,
                        //     transformOrigin: '50% 50%',
                        //     autoAlpha: 0.3
                        // }, '-=' + 1.475)
                        // .to($iris.querySelector('.iris-2'), 0.36, {
                        //     rotation: 180,
                        //     transformOrigin: '50% 50%',
                        //     autoAlpha: 0.3
                        // }, '-=' + 1.25)
                        // .to($iris.querySelector('.iris-3'), 0.36, {
                        //     rotation: -180,
                        //     transformOrigin: '50% 50%',
                        //     autoAlpha: 0.3
                        // }, '-=' + 1.25)
                        // .to($iris.querySelector('.iris-4'), 0.36, {
                        //     rotation: 75,
                        //     transformOrigin: '50% 50%',
                        //     autoAlpha: 0.3
                        // }, '-=' + 1.25)
                        // .to($iris, 0.37, {scale: 0, ease: Bounce.easeOut}, '-=1.05')
                        .fromTo($title, 1.2, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=.85')
                } else if ($e.scrollAnimated && pos > window.innerHeight - 2) {
                    $e.scrollAnimated = false
                    $left = $e.querySelector('.wipe-left')
                    $right = $e.querySelector('.wipe-right')
                    // $iris = $e.querySelector('.iris')
                    $title = $e.querySelector('.title-a')
                    // $irisRings = [$iris.querySelector('.iris-1'), $iris.querySelector('.iris-2'), $iris.querySelector('.iris-3'), $iris.querySelector('.iris-4')]
                    new TimelineMax()
                        // .set($iris, {scale: 1})
                        // .set($irisRings, {rotation: 0, autoAlpha: 1})
                        .set($left ? $left : $right, {x: '0%'})
                        .set($e.querySelector('.title-a'), {y: 60, autoAlpha: 0})
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    $color-1 = #e8e8e8
    $color-2 = #dcdcdc

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


    .c-1
        background $color-1
    .c-2
        background $color-2



</style>
