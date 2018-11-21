<template>
    <v-layout
            align-center lg12
            class="relative overflow-hidden"
            :class="{'row-reverse': i%2===0, 'c-1' : i%2===0, 'c-2': i%2!==0}"
            v-scroll="scrollH"
    >
            <slide-bg :left="i%2!==0"></slide-bg>

            <v-img
                    lg6
                    :lazy-src="imgC(item.img, false, false, true)"
                    :alt="item.img"
                    :src="imgC(item.img)"
                    height="100vh"
            >
            </v-img>

            <v-flex lg6 pa-5 class="d-flex" justify-center>
                <div class="title-a">
                <h1 class="mb-4 font-weight-bold">{{item.title}}</h1>
                <h3 class="mb-4">{{item.text}}</h3>
                    <v-btn @click="linkTo(item.to)"class="ml-0">{{item.button}}</v-btn>
                </div>
            </v-flex>
        <div class="directions">
            <div class="directions-down">
                <v-btn fab alt="down arrow" @click="goToNext()">
                <v-icon large>mdi-arrow-down</v-icon>
                </v-btn>
            </div>
        </div>

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
            scrollH(){
                let $e = this.$el,
                 $left,
                 $right,
                 $iris,
                 $title,
                 $irisRings
                let pos = $e.getBoundingClientRect().y
                if (pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    $left = $e.querySelector('.wipe-left')
                    $right = $e.querySelector('.wipe-right')
                    $iris = $e.querySelector('.iris')
                    $title =$e.querySelector('.title-a')
                    $irisRings = [$iris.querySelector('.iris-1'), $iris.querySelector('.iris-2'), $iris.querySelector('.iris-3'), $iris.querySelector('.iris-4')]
                    $e.scrollAnimated = true
                    new TimelineMax()
                        .to($iris, 0.3, {scale: 1, ease: Bounce.easeOut})
                        .to($iris.querySelector('.iris-1'), 0.3, {rotation: 360, transformOrigin: '50% 50%'}, '-=' + .15)
                        .to($iris.querySelector('.iris-2'), 0.3, {rotation: 180, transformOrigin: '50% 50%'}, '-=' + .15)
                        .to($iris.querySelector('.iris-3'), 0.3, {rotation: -180, transformOrigin: '50% 50%'}, '-=' + .15)
                        .to($iris.querySelector('.iris-4'), 0.3, {rotation: 360, transformOrigin: '50% 50%'}, '-=' + .15)
                        .fromTo($title, 1.2, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=0.7')
                        .to($iris, 0.3, {scale: 0, ease: Bounce.easeOut}, '-=0.5')
                        .to($left ? $left : $right, 0.5, {x: $left ? '-50%' : '50%'}, '-=0.2')
                } else if ($e.scrollAnimated && pos > window.innerHeight - 2) {
                    $e.scrollAnimated = false
                    $left = $e.querySelector('.wipe-left')
                    $right = $e.querySelector('.wipe-right')
                    $iris = $e.querySelector('.iris')
                    $title =$e.querySelector('.title-a')
                    $irisRings = [$iris.querySelector('.iris-1'), $iris.querySelector('.iris-2'), $iris.querySelector('.iris-3'), $iris.querySelector('.iris-4')]
                    new TimelineMax()
                        .set($iris,  {scale: 1})
                        .set($irisRings, {rotation: 0})
                        .set($left ? $left : $right, {x: '0%'})
                        .set($e.querySelector('.title-a'), {y: 60, autoAlpha: 0})
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .directions
        position: absolute
        left: 50%
        bottom calc(50%-35px)
        transform: translateX(-50%)

    .title-a
        opacity 0
        max-width 64%
        width 70%
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
    .c-1
        background #e8e8e8
    .c-2
        background #dcdcdc

    @media (max-width: 500px)
        .title-a
            max-width 100%
            text-align center
            /*font-size 12px*/
</style>
