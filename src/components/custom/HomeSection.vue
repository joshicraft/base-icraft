<template>
    <v-layout
            align-center lg12
            class="relative overflow-hidden"
            :class="{'row-reverse': i%2===0}"
            v-scroll="scrollH"
    >
            <slide-bg :left="i%2!==0"></slide-bg>
            <v-img
                    lg6
                    :lazy-src="imgC(item.img, false, false, true)"
                    :alt="item.img"
                    :src="imgC(item.img)"
                    height="95vh"
            >
            </v-img>

            <v-flex lg6 pa-5 >
                <div class="title-a">
                <h1 class="mb-4 display-2 font-weight-bold">{{item.title}}</h1>
                <h3 class="mb-4 display-1">{{item.text}}</h3>
                </div>
            </v-flex>

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
            },
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        methods:{
            loadLimit(i) {
                return this.loadTickerCount <= i
            },
            loadPoint(i) {
                return this.loadTickerCount >= i
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
                        .to($left ? $left : $right, 0.5, {x: $left ? '-100%' : '100%'}, '-=0.2')
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

</style>
