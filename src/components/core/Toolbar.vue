<template>
    <v-toolbar
            app
            dark
            :flat="!isScrolling"
            :dense="isScrolling"
            :color="!isScrolling ? 'transparent' : 'secondary'"
            v-scroll="onScroll"
    >
        <div class="toolbar-svg-wrapper">
            <custom-logo-side></custom-logo-side>
        </div>
        <v-spacer/>
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn
                    v-for="(item, i) in items"
                    :active-class="!isScrolling ? 'primary--text' : undefined"
                    :key="i"
                    :to="item.to"
                    flat
            >
                <span v-text="item.text"/>
            </v-btn>
        </v-toolbar-items>
        <v-btn v-else icon @click="toggleDrawer">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    /* eslint-disable no-undef */

    // Utilities
    import {mapMutations} from 'vuex'

    export default {
        data: () => ({
            isScrolling: false
        }),

        computed: {
            items() {
                return this.$t('Layout.View.items')
            }
        },

        methods: {
            ...mapMutations('app', ['toggleDrawer']),
            onScroll() {
                if ((window.pageYOffset ||
                    document.documentElement.scrollTop || 0) > window.innerHeight) {
                    this.isScrolling = true
                    let tl = new TimelineMax()
                    let $svg = this.$el.querySelector('svg')
                    let $text1 = $svg.querySelector(".logo-text-1")
                    let $text2 = $svg.querySelector(".logo-text-2")
                    let $logoIcon = $svg.querySelector(".logo-icon")
                    tl
                        .to($text1, 0.2, {y: -50, autoAlpha:0})
                        .to($text2, 0.2, {y: -40, autoAlpha:0}, '-=0.1')
                        .to([$logoIcon], 0.2, {scale: 1.2, rotation: 90, transformOrigin: '50% 50%'})
                    //    .to([$svg], 0.2, {y: 31, transformOrigin: '50% 50%'}, '-=0.1')
                } else {
                    this.isScrolling = false
                    let tl = new TimelineMax()
                    let $svg = this.$el.querySelector('svg')
                    let $text1 = $svg.querySelector(".logo-text-1")
                    let $text2 = $svg.querySelector(".logo-text-2")
                    let $logoIcon = $svg.querySelector(".logo-icon")
                    tl
                        .to($text1, 0.2, {y: 0, autoAlpha:1})
                        .to($text2, 0.2, {y: 0, autoAlpha:1}, '-=0.1')
                        .to([$logoIcon], 0.2, {scale: 1, rotation: 0, transformOrigin: '50% 50%'}, '-=0.1')
                       // .to([$svg], 0.2, {y: 0, x: 0, transformOrigin: '50% 50%'}, '-=0.1')
                }
            }
        }
    }
</script>

<style lang="stylus">
    .toolbar-svg-wrapper
        height: 100%;
</style>
