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
                    document.documentElement.scrollTop || 0) > window.innerHeight - 70) {
                    this.isScrolling = true
                    let tl = new TimelineMax()
                    let $svg = this.$el.querySelector('svg')
                    let $text1 = $svg.querySelector(".logo-text-1")
                    let $text2 = $svg.querySelector(".logo-text-2")
                    let $logoIcon = $svg.querySelector(".logo-icon")
                    tl
                        .to([$text2, $text1], 0.6, {x: 0, autoAlpha:0}, 'a')
                        .to([$logoIcon], 0.5, {x: 0, autoAlpha:1, rotation: 90, transformOrigin: '50% 50%'}, 'a')
                    //    .to([$svg], 0.2, {y: 31, transformOrigin: '50% 50%'}, '-=0.1')
                } else {
                    this.isScrolling = false
                    let tl = new TimelineMax()
                    let $svg = this.$el.querySelector('svg')
                    let $text1 = $svg.querySelector(".logo-text-1")
                    let $text2 = $svg.querySelector(".logo-text-2")
                    let $logoIcon = $svg.querySelector(".logo-icon")
                    tl

                        .to([$logoIcon], 0.5, {x: -185, rotation: 0, autoAlpha:1, transformOrigin: '50% 50%'}, 'a')
                        .to([$text2, $text1], 0.7, {x: -200, autoAlpha:1}, 'a')
                       // .to([$svg], 0.2, {y: 0, x: 0, transformOrigin: '50% 50%'}, '-=0.1')
                }
            }
        }
    }
</script>

<style lang="stylus">
    .toolbar-svg-wrapper
        height: 100%
        position: relative
        left -16px
        svg
            width: auto
            height: 100%

    .logo-text-1, .logo-text-2
        opacity 0
</style>
