<template>
    <v-timeline-item
            dark
            v-scroll="scrollTops"
            :key="index"
            :id="index + '-timeline-feature'"
            color="blue lighten-2"
            large
            class="invisible"
            :icon="data.icon"
    >

        <v-card class="elevation-2 --anim-2">
            <!--<c-img :src="data.img" height="300px"></c-img>-->
            <v-img
                    :src="imgC(data.img)"
                    :lazy-src="imgC(data.img, false, false, true)"
                    height="40%"
                   :ref="'tl-img-' + index"
            >
                <v-icon
                        size="150px"
                        color="primary"
                        class="ma-4"
                >
                    {{data.icon}}
                </v-icon>
            </v-img>
            <div>
                <v-card-title
                        :class="$vuetify.breakpoint.smAndUp ? 'px-5 pt-5' : ' px-3 pt-3'"
                        class="headline"
                >
                    {{data.subTitle}}
                </v-card-title>
                <v-card-text
                        :class="$vuetify.breakpoint.smAndUp ? 'px-5 pb-5' : ' px-3 pb-3'"
                        class=""
                >
                    {{data.subSubTitle}}
                </v-card-text>
            </div>
        </v-card>
        <div
                slot="opposite"
                class="--anim-1"
                v-if="!$vuetify.breakpoint.smAndDown"
        >
            <h1
                    class="opposite_tl --anim-3"
            >
                {{data.title}}
            </h1>
        </div>
    </v-timeline-item>
</template>

<script>
    export default {
        props: {
            data: {},
            index: 0
        },
        methods: {
            scrollTops() {
                let $e = this.$el
                let pos = $e.getBoundingClientRect().top
                let tL
                if (pos < window.innerHeight / 1.5 && !$e.scrollAnimated) {
                    this.data.visible = true
                    $e.scrollAnimated = true
                    tL = new TimelineMax()
                        .set($e, {autoAlpha: 1})
                        .fromTo($e.querySelector('.v-timeline-item__dot'), 0.54, {scale: 0.15, autoAlpha:0}, {scale:1, autoAlpha:1})
                        .fromTo($e.querySelector('.--anim-3'), 0.4, {y: 50, autoAlpha:0}, {y:0, autoAlpha:1}, '-=0.2')
                        .fromTo($e.querySelector('.--anim-2'), 0.4, {y: 50, autoAlpha:0}, {y:0, autoAlpha:1}, '-=0.3')
                    // TweenMax.staggerFromTo($e.children, 1.3, {y: 120, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Quart.easeOut}, 0.3)
                }
                else if ($e.scrollAnimated && pos > window.innerHeight - 100) {
                    $e.scrollAnimated = false
                    tL = new TimelineMax()
                        .set($e.querySelector('.v-timeline-item__dot'), {scale: 0.5, autoAlpha:0})
                        .set($e.querySelector('.--anim-3'), {y: 50, autoAlpha:0})
                        .set($e.querySelector('.--anim-2'), {y: 50, autoAlpha:0})
                }
            }
        }
    }
</script>

<style lang="stylus">
    .v-timeline--dense .v-timeline-item__body {
        max-width: calc(100% - 44px);
    }
</style>
<style scoped lang="stylus">
    /*.v-card*/
        /*opacity 0*/

    .opposite_tl
        font-size: 3.5em


</style>
