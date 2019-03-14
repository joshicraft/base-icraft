<template>
    <v-layout
            align-center lg12
            class="relative overflow-hidden"
            :id="$route.name + '-section-' + i"
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
            navArrowScroll(dir) {
                let dimensions = this.$el.getBoundingClientRect()
                this.$vuetify.goTo(window.scrollY + (dir === 'down' ? window.innerHeight : -window.innerHeight) + dimensions.top)
            },
            scrollH(e) {
                let $e = this.$el,
                    $left,
                    $right,
                    $title,
                    distance

                let pos = $e.getBoundingClientRect().top
                if (pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    $left = $e.querySelector('.wipe-left')
                    $right = $e.querySelector('.wipe-right')
                    $title = $e.querySelector('.title-a')
                    $e.scrollAnimated = true
                    distance = this.$vuetify.breakpoint.smAndDown ? '80%' : '40%'
                    new TimelineMax()
                        .call(Sound.playSound, ['slide', 0.22], Sound)
                        .to($left ? $left : $right, 1.59, {
                            x: $left ? '-' + distance : distance,
                            ease: Back.easeOut
                        }, '-=0')
                        .fromTo($title, 1.2, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=.85')
                } else if ($e.scrollAnimated && pos > window.innerHeight - 2) {
                    $e.scrollAnimated = false
                    $left = $e.querySelector('.wipe-left')
                    $right = $e.querySelector('.wipe-right')
                    $title = $e.querySelector('.title-a')
                    new TimelineMax()
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
