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
                        exact
                        :aria-label="item.path + '-toolbar'"
                        :class="getCurrentRouteClass(item)"
                        class="ml-1 mt-0"
                >
                    {{item.text}}
                </v-btn>

                <v-list
                        dark
                        v-if="item.nestedItems"
                >
                    <v-btn
                            dense
                            v-for="(path, index) in item.nestedItems"
                            :key="index"
                            :class="getCurrentRouteClass(path)"
                            :to="{name: path.name, params: {nestedPath: item.name}}">
                        {{ path.text }}
                    </v-btn>
                </v-list>
            </v-menu>
        </v-toolbar-items>
        <v-btn
                class="mr-2"
                aria-label="show-hide-menu"
                v-else
                icon
                @click="toggleDrawer"
                :class="isScrolling ? '--icon-dark' : '--icon-light'"
        >
            <v-icon

            >mdi-menu
            </v-icon>
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
            items: [],
            isScrolling: false
        }),
        mounted () {
            console.log(paths)
          this.items = this.getItems()
        },
        methods: {
            ...mapMutations('app', ['toggleDrawer']),
            getCurrentRouteClass(item) {
                return this.$route.name === item.name ? 'primary' : ''
            },
            getItems() {
                console.log(paths)
                let pts = paths

                // let filtered = pts.filter(path => !path.noToolbar)
                // filtered.forEach((path) => {
                //     path.nestedPaths = null
                // })
                // for (var i = 0; i < filtered.length; i++) {
                //     let path = filtered[i]
                //     if (path.nestedPath) {
                //         let parentPath = pts.find(p => p.name === path.nestedPath)
                //         if (!parentPath.nestedPaths) {
                //             parentPath.nestedPaths = []
                //         }
                //         parentPath.nestedPaths.unshift(path)
                //     }
                // }
                return paths
                // return this.$t('Layout.View.items')
                // return content.items
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
                        .staggerTo($svg.querySelectorAll('polygon'), 0.4, {
                            rotationY: 180,
                            transformOrigin: '50% 50%'
                        }, 0.3)
                        .to([$logoIcon], 0.5, {x: 0, autoAlpha: 1, rotation: 90, transformOrigin: '50% 50%'}, 'a')
                    //    .to([$svg], 0.2, {y: 31, transformOrigin: '50% 50%'}, '-=0.1')
                } else if (this.isScrolling && (window.pageYOffset ||
                    document.documentElement.scrollTop || 0) < window.innerHeight - 70) {
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


    .--icon-dark
        .v-icon
            color: black !important

    .--icon-light
        .v-icon
            color: white !important

    .v-btn.v-btn--router
        border-radius 0

    .v-toolbar__content
        padding-right 0


    .v-toolbar__items
        pointer-events all
        /*background #5a5a5a*/
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

    .v-list
        display: flex
        margin-top: 5px;
        flex-direction: column

    .v-menu__content
        box-shadow none

        .v-btn
            margin 0

        .v-list
            background transparent
            padding 0

    @media only screen and (max-width: 959px)
        .toolbar-svg-wrapper
            left -16px
</style>
