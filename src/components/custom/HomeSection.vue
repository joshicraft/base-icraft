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
                let $e = this.$el
                let $left = $e.querySelector('.wipe-left')
                let $right = $e.querySelector('.wipe-right')
                let $iris = $e.querySelector('.iris')
                let $irisRings = [$iris.querySelector('.iris-1'), $iris.querySelector('.iris-2'), $iris.querySelector('.iris-3'), $iris.querySelector('.iris-4')]
                let pos = $e.getBoundingClientRect().y
                if (pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    console.log('ss')
                    new TimelineMax()
                        .to($iris, 0.3, {scale: 1, ease: Bounce.easeOut})
                        .to($iris.querySelector('.iris-1'), 0.3, {rotation: 360, transformOrigin: '50% 50%'}, '-=' + .15)
                        .to($iris.querySelector('.iris-2'), 0.3, {rotation: 180, transformOrigin: '50% 50%'}, '-=' + .15)
                        .to($iris.querySelector('.iris-3'), 0.3, {rotation: -180, transformOrigin: '50% 50%'}, '-=' + .15)
                        .to($iris.querySelector('.iris-4'), 0.3, {rotation: 360, transformOrigin: '50% 50%'}, '-=' + .15)
                        .fromTo($e.querySelector('.title-a'), 1.2, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=0.5')
                        .to($iris, 0.3, {scale: 0, ease: Bounce.easeOut})
                        .to($left ? $left : $right, 0.5, {x: $left ? '-100%' : '100%'})

                    // $left.classList.add('left-out')
                    // $right.classList.add('right-out')
                    // $iris.classList.add('iris-animate')
                    $e.scrollAnimated = true
                } else if ($e.scrollAnimated && pos > window.innerHeight - 300) {
                    $e.scrollAnimated = false
                    new TimelineMax()
                        .from($iris, 0.2, {scale: 1, ease: Bounce.easeOut})
                        .to($irisRings, 0.2, {rotation: 0})
                        .to($left ? $left : $right, 0.3, {x: '0%'})
                    // $left.classList.remove('left-out')
                    // $right.classList.remove('right-out')
                    // $iris.classList.remove('iris-animate')
                }
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>
