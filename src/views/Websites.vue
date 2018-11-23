<template>
    <div>
    <v-flex
            v-scroll="topScroll"
        v-for="(service, i) in content.items"
        :key="i"
        v-if="loadPoint(1)"
    >
        <!--<custom-video-background-->
                <!--id="jumbotron"-->
                <!--:sources="['/static/video/2' + '.mp4']"-->
                <!--:img="''"-->
                <!--:alt="''">-->
        <!--</custom-video-background>-->

        <!--<v-layout d-flex wrap justify-stretch>-->
            <!--<v-flex row d-flex wrap lg6 pa-3 v-for="(feature, j) in service.features">-->
                <!--<v-hover>-->
                    <!--<v-card slot-scope="{ hover }">-->

                <!--<v-img  :src="imgC('web-1')" height="400px" lg4>-->
                    <!--<v-card-title primary-title class="pa-4">-->
                        <!--<h3 class="headline">{{feature.title}}</h3>-->
                    <!--</v-card-title>-->

                            <!--<v-slide-y-transtition>-->
                                <!--<h2-->
                                        <!--v-if="hover"-->
                                        <!--class="d-flex orange darken-2 -reveal white&#45;&#45;text"-->
                                        <!--style="height: 100%;"-->
                                <!--&gt;-->
                                    <!--{{feature.subSubTitle}}-->
                                <!--</h2>-->
                            <!--</v-slide-y-transtition>-->
                <!--</v-img>-->
                <!--<v-flex primary-title lg8>-->
                    <!--<div class="pa-4">-->

                        <!--<h2>{{feature.subTitle}}</h2>-->
                        <!--<p>{{feature.subSubTitle}}</p>-->
                    <!--</div>-->
                <!--</v-flex>-->


                    <!--</v-card>-->
                <!--</v-hover>-->
            <!--</v-flex>-->

        <!--</v-layout>-->
        <div class="start-bg-arrow">
            <!--<svg  preserveAspectRatio="none" class=""-->
                 <!--viewBox="0 0 500 50">-->
                <!--<polygon  class="ss0" points="0,0 500,0 250,50 0,0 "/>-->
                <!--&lt;!&ndash;<polygon class="ss1" points="500,0 0,0 250,250 0,500 500,500 "/>&ndash;&gt;-->

            <!--</svg>-->

            <svg
                    viewBox="0 0 1500 228.4">
                <!--<style type="text/css">-->
               <!---->
                <!--</style>-->
                <polygon class="st0" points="-0.5,-0.5 749.5,224.5 1499.5,-0.5 "/>
                <g>
                    <path class="st1" d="M418.6,112.4c-0.2,21.3-13.3,42.5-42.2,42.5c-28.9,0-42.3-20.8-42.3-42.4c0-21.6,13.9-43.3,42.3-43.3
		C404.7,69.2,418.8,90.9,418.6,112.4z M349.4,112.7c0.4,13.5,7.6,27.9,27,27.9c19.4,0,26.7-14.6,26.9-28.1
		c0.2-13.9-7.5-29.4-26.9-29.4C357,83.3,349.1,98.9,349.4,112.7z"/>
                    <path class="st1" d="M502,70.9V118c0,24.3-14.9,36.8-35.6,36.8c-19.7,0-36.5-12-36.5-36.8V70.9h15.4V118c0,14.8,8.5,22.7,21.3,22.7
		s20.1-8.6,20.1-22.7V70.9H502z"/>
                    <path class="st1" d="M590.1,153h-18.4l-24-27.5h-14.9V153h-15.5V70.7c13,0,26.1,0.1,39.1,0.1c19.4,0.1,29.6,13,29.6,27.2
		c0,11.3-5.2,22.7-20.8,25.8l24.9,28.1V153z M532.8,85.3v26.3h23.6c9.9,0,14.1-6.6,14.1-13.2c0-6.6-4.3-13.2-14.1-13.2H532.8z"/>
                    <path class="st1" d="M658.9,128.8h-23.2V153h-15.5V70.8c12.9,0,25.8-0.1,38.7-0.1C699,70.7,699.2,128.8,658.9,128.8z M635.6,114.6
		h23.2c19.8,0,19.7-29.1,0-29.1h-23.2V114.6z"/>
                    <path class="st1" d="M772.4,153H754l-24-27.5h-14.9V153h-15.5V70.7c13,0,26.1,0.1,39.1,0.1c19.4,0.1,29.6,13,29.6,27.2
		c0,11.3-5.2,22.7-20.8,25.8l24.9,28.1V153z M715.1,85.3v26.3h23.6c9.9,0,14.1-6.6,14.1-13.2c0-6.6-4.3-13.2-14.1-13.2H715.1z"/>
                    <path class="st1" d="M859.5,112.4c-0.2,21.3-13.3,42.5-42.2,42.5c-28.9,0-42.3-20.8-42.3-42.4c0-21.6,13.9-43.3,42.3-43.3
		C845.7,69.2,859.8,90.9,859.5,112.4z M790.4,112.7c0.4,13.5,7.6,27.9,27,27.9c19.4,0,26.7-14.6,26.9-28.1
		c0.2-13.9-7.5-29.4-26.9-29.4C798,83.3,790,98.9,790.4,112.7z"/>
                    <path class="st1" d="M943.4,142.7c-8.5,8.3-19.4,12.2-31.2,12.2c-30.5,0-43.4-21-43.6-42.4c-0.1-21.5,13.9-43.3,43.6-43.3
		c11.2,0,21.7,4.2,30.2,12.6l-10.3,10c-5.4-5.3-12.7-7.7-19.8-7.7c-19.8,0-28.4,14.8-28.3,28.5c0.1,13.6,8,27.8,28.3,27.8
		c7.2,0,15.3-2.9,20.7-8.3L943.4,142.7z"/>
                    <path class="st1" d="M1013.3,153h-61.5c0-27.4,0-54.8,0-82.2h61.5v15h-46.1v18.9h44.5v14.4h-44.5v18.6h46.1V153z"/>
                    <path class="st1" d="M1078.5,90.7c-2.8-4.7-10.6-9.2-19.5-9.2c-11.5,0-17,4.8-17,10.9c0,7.2,8.5,9.2,18.3,10.3
		c17.1,2.1,33.1,6.6,33.1,26.2c0,18.3-16.2,26.2-34.5,26.2c-16.8,0-29.7-5.2-35.8-20.2l12.9-6.7c3.6,9,13.2,13,23.1,13
		c9.7,0,18.9-3.4,18.9-12.3c0-7.7-8.1-10.9-19-12.1c-16.8-2-32.3-6.5-32.3-24.9c0-16.9,16.7-23.8,31.8-24c12.8,0,26.1,3.6,32.3,16.3
		L1078.5,90.7z"/>
                    <path class="st1" d="M1156.1,90.7c-2.8-4.7-10.6-9.2-19.5-9.2c-11.5,0-17,4.8-17,10.9c0,7.2,8.5,9.2,18.3,10.3
		c17.1,2.1,33.1,6.6,33.1,26.2c0,18.3-16.2,26.2-34.5,26.2c-16.8,0-29.7-5.2-35.8-20.2l12.9-6.7c3.6,9,13.2,13,23.1,13
		c9.7,0,18.9-3.4,18.9-12.3c0-7.7-8.1-10.9-19-12.1c-16.8-2-32.3-6.5-32.3-24.9c0-16.9,16.7-23.8,31.8-24c12.8,0,26.1,3.6,32.3,16.3
		L1156.1,90.7z"/>
                </g>
            </svg>

        </div>
        <v-container class="timeline-wrap">
        <v-layout>
            <v-timeline>
                <v-timeline-item
                        v-sroll="scrollTimelineItem"
                        v-for="(f, k) in service.features"
                        :key="k"
                        color="blue lighten-2"
                        large
                        icon="mdi-web"
                >
                    <custom-timeline-piece :data="f"></custom-timeline-piece>
                </v-timeline-item>
            </v-timeline>
        </v-layout>
        </v-container>
        <v-container>
            <v-layout column wrap>
                <h1 class="mt-5 mb-3 text-lg-center">PACKAGES</h1>
                <h3 class="mb-4 text-lg-center">{{ service.subTitle }}</h3>
                <p class="text-lg-center">{{ service.disclaimer }}</p>
            </v-layout>
        </v-container>
        <v-layout
                row
                wrap
                justify-center
                align-start
        >
            <v-flex
                    mb-3

                    :class="[$vuetify.breakpoint.smAndDown ? 'pa-2' : '']"
                    v-if="loadPoint(2)"
                    justify-space-between
                    align-content-space-between
                    d-flex>
                <v-flex light class="pa-3">

                    <v-container
                            grid-list-lg
                            pa-0
                            pb-4
                            d-flex
                            justify-center
                            align-center
                            class="max-view-width"

                    >

                    <v-layout row wrap mt-4>

                        <v-flex
                                v-if="loadPoint(3)"
                                lg3
                                md3
                                sm6
                                xs12
                                v-for="(packageItem, p) in service.items"
                                :key="p"
                        >

                            <v-card
                                    md6
                                    dark
                                    class="elevation-6 column"
                            >
                                <!--<custom-bg-vector-corner fill="#f0f0f0" width="100px" height="92px"></custom-bg-vector-corner>-->
                                <div class="top-content pt-4 pl-4 pr-4 pb-1">

                                    <v-flex row >
                                        <h1 :class="packageItem.iconColor + '--text'">{{ packageItem.name }}</h1>
                                        <v-icon mt-2 large :color="packageItem.iconColor">{{ packageItem.icon }}</v-icon>
                                    </v-flex>
                                    <h3 class="mt-4">{{ packageItem.price }}</h3>
                                    <p class="mt-4">{{ packageItem.title }}</p>


                                </div>
                                <v-list two-line class="list">
                                    <v-list-group
                                            append-icon="mdi-arrow-down"
                                            v-model="packageItem.active"
                                            expand

                                    >

                                        <v-list-tile :ripple="true" slot="activator">

                                            <v-list-tile-content>

                                                <!--<h1 ></h1>-->
                                                <!--<h2>{{ i.title }}</h2>-->
                                                <h4>{{!packageItem.active ? "SHOW PACKAGE" : "CLOSE"}}</h4>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile
                                                v-if="loadPoint(4)"
                                                v-for="subItem in packageItem.items"
                                                :key="subItem.text"
                                        >

                                            <v-list-tile-action>
                                                <v-icon>{{ subItem.icon }}</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
                                            </v-list-tile-content>

                                        </v-list-tile>
                                    </v-list-group>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    </v-container>

                </v-flex>
            </v-flex>
        </v-layout>


    </v-flex>

    </div>
</template>

<script>
    // import content from '../lang/en/Views/Websites'
    export default {
        data () {
            return {
                content: this.$t('Views.Websites')
            }
        },
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        methods: {
            loadLimit(i) {
                return this.loadTickerCount <= i
            },
            loadPoint(i) {
                return this.loadTickerCount >= i
            },
            scrollS () {
                console.log('a')
            },
            scrollTimelineItem () {
                console.log('s')
            },
            topScroll () {
                let $e = this.$el
                let pos = $e.getBoundingClientRect().y
                if(pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    $e.scrollAnimated = true
                    TweenMax.staggerFromTo($e.querySelectorAll('.start-bg-arrow path'), .36, {autoAlpha: 0, y: -50}, {y: 0, autoAlpha: 1, ease: Back.easeOut}, .095)
                    TweenMax.staggerFromTo($e.querySelectorAll('.start-bg-arrow path'), .36, {fill: '#ffffff'}, {fill: '#007eff', delay: 0.3, yoyo:true, repeat: 1}, .095)
                }
                else if ($e.scrollAnimated && pos > window.innerHeight - 100 ) {
                    $e.scrollAnimated = false
                    TweenMax.set($e.querySelectorAll('.start-bg-arrow path'), {autoAlpha: 0,  fill: '#fff'})
                }
            }
        },
        computed: {
            items() {
                return this.content.items
            }
        }
    }
</script>

<style lang="stylus">
    .v-list__group__header__append-icon
        .v-icon
            background #5a5a5a
            border-radius 30px
</style>
<style lang="stylus" scoped>
    /*.max-view-width*/
        /*width 100% !important*/
    .st0{stroke:#000000;stroke-miterlimit:10;}
    .st1{fill:#FFFFFF;}
    .timeline-wrap
        padding-top 0
        margin-top -10px
    .start-bg-arrow
        polygon
            fill #1a1a1a

    .scroll-pos-icon
        position: absolute;
        width: 50px
        height 50px
        background red
        left 0
        right 0
        margin auto
    .start-arrow-text
        position absolute
        top 30px
        left 0
        right 0
        margin auto
        text-align center
        font-size 700%
        color #f3f3f3

    .ss0
        fill: #037F7F;

    .-reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
    .loader
        position: fixed;
        left 0
        right 0
        bottom 30px
        margin auto
        text-align center
        z-index 100
    .pack-img
        max-height: 450px

    .column
        /*min-height 300px*/
        flex-direction column
        position: relative;
        .top-content
            text-align center
            min-height: 300px
    .relative
        position: relative;

    .z1
        position: relative
        z-index 1

    .top-content
        h3, p
            font-weight 100

    .title-1
        max-width 62%
        h1
            font-size: 2.5em
        h2
            font-size: 2em
        h3
            font-size: 1.5em
        p
            font-size: 1em

    .bg-gradient
        z-index: 0
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events none

    .bg-gradient
        background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(100, 100, 100, 0.7) 100%);
</style>
