<template>
    <v-toolbar
            app
            clipped
            dark
            dense
            :flat="!isScrolling"
            :color="!isScrolling ? 'transparent' : 'transparent'"
            v-scroll="onScroll"
            class="_visible elevation-0"
    >
        <div class="toolbar-svg-wrapper">
            <custom-logo-side :hide-text="true"></custom-logo-side>
        </div>
        <v-spacer/>
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
            <v-menu
                    open-on-hover
                    offset-y
                    v-for="(item, i) in items"
                    :key="i"
            >
                <v-btn
                        slot="activator"
                        :to="{name: item.name}"
                        :aria-label="item.path + '-toolbar'"
                        :class="getCurrentRouteClass(item)"
                        class="ml-1 mt-0"
                >
                    {{item.text}}
                </v-btn>

                <v-list v-if="item.children">
                    <v-list-tile
                            v-for="(path, index) in item.children"
                            :key="index"
                            v-if="!path.noToolbar"

                            :to="{name: path.name}"
                    >
                        <v-list-tile-title>{{ path.text }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>

            </v-menu>
            <!--<v-btn-->
                    <!--:aria-label="item.to + '-toolbar'"-->
                    <!--v-for="(item, i) in items"-->
                    <!--:class="getCurrentRouteClass(item)"-->
                    <!--:key="i"-->
                    <!--:to="item.to"-->
                    <!--flat-->
            <!--&gt;-->
                <!--<span v-text="item.text"/>-->
            <!--</v-btn>-->

        </v-toolbar-items>
        <v-btn aria-label="show-hide-menu" v-else icon @click="toggleDrawer">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    /* eslint-disable no-undef */
    import paths from '../../router/paths'
    // Utilities
    // import  'vuetify/lib/directives/scroll'
    // import content from '../../lang/en/Layout/View'
    import {mapMutations} from 'vuex'

    export default {
        data: () => ({

            isScrolling: false
        }),
        computed: {

            items() {
                return paths.filter(path => !path.noToolbar)
                // return this.$t('Layout.View.items')
                // return content.items
            }
        },

        methods: {
            ...mapMutations('app', ['toggleDrawer']),
            getCurrentRouteClass (item) {
                return this.$route.path === item.to ? 'primary--text' : ''
            },
            onScroll() {
                this.scrolled = true
                if (!this.isScrolling && (window.pageYOffset ||
                    document.documentElement.scrollTop || 0) > window.innerHeight - 70) {
                    this.isScrolling = true

                    let $svg = this.$el.querySelector('svg')
                    let $text = $svg.querySelector(".logo-text")
                    let $logoIcon = $svg.querySelector(".logo-icon")
                    console.log('s')
                    this.timelineAnimation = new TimelineMax()
                        // .to([$text], 0.6, {x: 0, autoAlpha:0}, 'a')
                        .staggerTo($svg.querySelectorAll('polygon'), 0.4, {rotationY: 180, transformOrigin: '50% 50%'}, 0.3)
                        .to([$logoIcon], 0.5, {x: 0, autoAlpha:1, rotation: 90, transformOrigin: '50% 50%'}, 'a')
                    //    .to([$svg], 0.2, {y: 31, transformOrigin: '50% 50%'}, '-=0.1')
                } else if(this.isScrolling && (window.pageYOffset ||
                    document.documentElement.scrollTop || 0) < window.innerHeight - 70){
                    this.isScrolling = false
                    let tl = new TimelineMax()
                    let $svg = this.$el.querySelector('svg')
                    let $text = $svg.querySelector(".logo-text")
                    let $logoIcon = $svg.querySelector(".logo-icon")
                    this.timelineAnimation = new TimelineMax()

                        // .to([$logoIcon], 0.5, {x: -185, rotation: 0, autoAlpha:1, transformOrigin: '50% 50%'}, 'a')
                        // .to([$text], 0.7, {x: -200, autoAlpha:1}, 'a')
                       // .to([$svg], 0.2, {y: 0, x: 0, transformOrigin: '50% 50%'}, '-=0.1')
                }
            }
        }
    }
</script>

<style lang="stylus">
    .v-toolbar.v-toolbar--fixed
        z-index 4
        opacity 0
        pointer-events none
        transition opacity 0.5s ease-in
        opacity 1

    .v-btn.v-btn--router
        border-radius 0

    .v-toolbar__content
        padding-right 0


    .v-toolbar__items
        pointer-events all
        background #5a5a5a
        padding 4px 4px 4px 0
        height: 100%;
    .v-btn
        pointer-events all
    .toolbar-svg-wrapper
        height: 100%
        position: relative
        left -24px
        svg
            width: auto
            height: 100%

    ._visible
        opacity: 1
    /*.logo-text-1, .logo-text-2*/
        /*opacity 0*/

    @media only screen and (max-width: 959px)
        .toolbar-svg-wrapper
            left -16px
</style>
