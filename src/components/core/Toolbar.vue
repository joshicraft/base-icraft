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
        <div class="toolbar-svg-wrapper" @click="playSound('click', 0.3)">
            <router-link aria-label="home-link" :to="{name: 'Home'}" >
            <custom-logo-side :hide-text="true"></custom-logo-side>
            </router-link>
        </div>
        <v-spacer/>
        <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
            <v-menu
                    open-on-hover
                    offset-y
                    v-for="(item, i) in items"
                    v-if="!item.noToolbar"
                    :key="i"
            >
                <v-btn

                        slot="activator"
                        :to="{name: item.name}"
                        @click="playSound('click', 0.3)"
                        exact
                        :aria-label="item.path + '-toolbar'"
                        :class="getCurrentRouteClass(item, item.nestedItems)"
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
                            v-if="!path.noToolbar"
                            :key="index"
                            :aria-label="path.name + '-toolbar'"
                            :class="getCurrentRouteClass(path)"
                            @click="playSound('click', 0.3)"
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
          this.items = this.getItems()
        },
        methods: {
            ...mapMutations('app', ['toggleDrawer']),
            clickRoute(route){
                this.playSound('click', 0.3);
              this.$router.push(route)
            },
            getCurrentRouteClass(item, nested) {
                return (this.$route.name === item.name ? 'primary' : '') + (nested ? ' nested-menu' : '')
            },
            getItems() {
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

