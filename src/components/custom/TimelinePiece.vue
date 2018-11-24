<template>

        <v-card class="elevation-2" v-scroll="scrollTops">
            <v-img :src="imgC('web-1')" height="200px"></v-img>
            <v-card-title class="headline">{{data.subTitle}}</v-card-title>
            <v-card-text>
                {{data.subSubTitle}}
            </v-card-text>
        </v-card>
</template>

<script>
    export default {
        props: {
            data: {}
        },
        methods: {
            scrollTops () {
                let $e = this.$el
                let pos = $e.getBoundingClientRect().y
                if(pos < window.innerHeight / 1.5 && !$e.scrollAnimated) {
                    this.data.visible = true
                    $e.scrollAnimated = true

                    TweenMax.fromTo($e, 1.3, {y: 120, autoAlpha: 0}, {y: 0, autoAlpha: 1, ease: Quart.easeOut})
                }
                else if ($e.scrollAnimated && pos > window.innerHeight - 100 ) {
                    $e.scrollAnimated = false
                    TweenMax.set($e, {autoAlpha: 0, y: 50})
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .v-card
        opacity 0
</style>
