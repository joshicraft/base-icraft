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
        <div id="toolbar-logo" class="toolbar-svg-wrapper pulsate-hover" @click="playSound('click', 0.3)">
            <router-link aria-label="home-link" :to="{name: 'Home'}" >
                <custom-logo-side :hide-text="true"></custom-logo-side>
            </router-link>
        </div>


        <div class="social-media-toolbar"

        >
            <v-layout>
                <v-flex
                    class="pa-2 py-3 text-xs-center pulsate-hover"
                    v-for="platform in platforms"
                    :key="'platform-' + platform.text"
                    :class="isScrolling ? 'slide-out-blurred-top' : 'slide-in-blurred-top'"
                >

                    <v-btn small fab  :href="platform.to" target="_blank" rel="noopener"><v-icon>{{platform.icon}}</v-icon></v-btn><span class="d-none">{{platform.text}}</span>
                </v-flex>
            </v-layout>
        </div>

        <!--<h3 class="mdi mr-5 pa-2 pointer-all top-o" :class="{'slide-top': $vuetify.breakpoint.mdAndUp && isScrolling}">-->
            <!--For a free quote call on: <a :href="'tel: ' + contact.phone">{{contact.phone}}</a> or email us at: <a :href="'mailto: ' + contact.email">{{contact.email}}</a>-->
        <!--</h3>-->
        <v-spacer/>
        <div :style="{'height': isScrolling ? '38px' : '100%'}"
        >
        <v-toolbar-items

                v-if="$vuetify.breakpoint.mdAndUp">

            <v-menu

                    open-on-hover
                    offset-y
                    v-for="(item, i) in items"
                    v-if="!item.noToolbar"
                    :key="i"
            >
                <v-btn

                        slot="activator"
                        @click="goToAndScroll(item.name)"
                        exact
                        :aria-label="item.path + '-toolbar'"
                        :class="{'primary': $route.name === item.name, 'nested-menu': item.nestedItems}"
                        class="ml-1 mt-0"
                >
                    {{item.text}}
                </v-btn>

                <v-list
                        dark
                        v-if="item.nestedItems"
                >
                    <template
                            v-for="(path, index) in item.nestedItems">
                        <v-btn
                                dense

                                v-if="!path.noToolbar"
                                :key="index"
                                :aria-label="path.name + '-toolbar'"
                                @click="goToAndScroll(path.name, 0, {nestedPath: item.name})"
                                :class="{'primary': $route.name === path.name}"
                               >
                            {{ path.text }}
                        </v-btn>
                    </template>

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
        </div>
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
            setTimeout(this.animateLogo, 4000)
        },

        computed: {
            platforms() {
                console.log( this.$t('SocialMedia.platforms'))
                return this.$t('SocialMedia.platforms')
            },
            contact() {
                return this.$t('Views.Contact')
            }
        },
        methods: {
            ...mapMutations('app', ['toggleDrawer']),
            animateLogo(){
                this.items = this.getItems()
                let $svg = this.$el.querySelector('#toolbar-logo')
                let paths = $svg.querySelectorAll('#block-logo polygon')
                new TimelineMax({repeat: -1, repeatDelay: 1})
                    .to($svg.querySelector("#log-a-0"), 1.1, {morphSVG:$svg.querySelector("#log-p-1")}, 'a')
                    .to($svg.querySelector("#log-a-1"), 1.1, {morphSVG:$svg.querySelector("#log-p-2")}, 'a')
                    .to($svg.querySelector("#log-a-2"), 1.1, {morphSVG:$svg.querySelector("#log-p-0")}, 'a')
            },
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
                }
            }
        }
    }
</script>

