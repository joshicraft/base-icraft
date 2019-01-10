<template>
    <div class="relative">
        <v-flex
                v-scroll="topScroll"
                v-for="(service, i) in content.items"
                :key="i"
                v-if="loadPoint(1)"
        >
            <div class="relative -view-height _bg-color-a">

                <v-layout lg12 wrap align-center>
                    <v-flex lg6 pa-5 class="c-title d-flex" justify-center column>
                        <h1 class="mt-0 mb-3">LETS FIND YOU A WEBSITE</h1>
                        <h3 class="mb-4 ">Trying to understand the constantly changing tech jargon and
                            daunting range of options can be a nightmare.</h3>
                        <p class="">Our goal is to help you find the right solution for your needs.
                            Here
                            you can find out what website will suite you, check out some package ideas and find out
                            about our process.</p>
                        <div class="mt-5">
                            <v-btn
                                    class="primary"
                                    @click="$vuetify.goTo('#discovery')"
                            >
                                HELP ME CHOOSE
                            </v-btn>
                            <v-btn
                                    class="primary"
                                    @click="$vuetify.goTo('#packages')"
                            >
                                find a package
                            </v-btn>
                            <v-btn
                                    class="primary"
                                    @click="$vuetify.goTo('#process')"
                            >
                                The process
                            </v-btn>
                        </div>
                    </v-flex>
                    <v-img
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :lazy-src="imgC('web-1', false, false, true)"
                            :alt="'web-1'"
                            :src="imgC('web-1')"
                            height="100vh"
                    >
                    </v-img>
                </v-layout>

            </div>
            <div id="discovery" class="relative -view-height _bg-color-b">
                <v-layout lg12 wrap align-center>
                    <v-img
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :lazy-src="imgC('web-1', false, false, true)"
                            :alt="'web-1'"
                            :src="imgC('web-1')"
                            height="100vh"
                    >
                    </v-img>
                    <v-flex v-if="showQuestions" lg12 class="fill-height scroll-y d-flex questions-wrapper theme--dark">
                        <!--<v-card dark height="100vh" class="elevation-0">-->
                            <v-flex align-center justify-center class="d-flex fill-height">
                                <questions :data="content.discover"></questions>
                            </v-flex>
                        <!--</v-card>-->
                    </v-flex>
                    <v-flex v-else column wrap lg6 class="c-title d-flex">
                        <h1 class="mt-0 mb-3 text-lg-center">CAN'T DECIDE?</h1>
                        <h3 class="mb-4 text-lg-center">We've come up with {{content.discover.questions.length}}
                            questions that can help you choose.</h3>
                        <p class="text-lg-center">To get stuck in, click GET STARTED then follow the questions and
                            select the tick boxes for the answers that
                            relate to you.</p>
                        <div class="mx-auto">
                            <v-btn
                                    @click="showQuestionFrame"
                                    class="primary"
                                    :loading="loadingQuestions"
                                    v-if="!showQuestions"
                            >
                                Get Started
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </div>
            <div id="packages" class="-view-height _bg-color-a">
                <div>
                    <v-container>
                        <v-layout column wrap class="c-title">
                            <h1 class="mt-0 mb-3 text-lg-center">PACKAGES</h1>
                            <h3 class="mb-4 text-lg-center">{{ service.subTitle }}</h3>
                            <p class="text-lg-center">{{ service.disclaimer }}</p>
                        </v-layout>

                        <v-layout

                                class="relative"
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
                                                        class="elevation-6 column shake-vertical"
                                                >
                                                    <div class="top-content pt-4 pl-4 pr-4 pb-1">

                                                        <v-flex row>
                                                            <h1 :class="packageItem.iconColor + '--text'">{{
                                                                packageItem.name
                                                                }}</h1>
                                                            <v-icon
                                                                    mt-2 size="150px"
                                                                    class="anim-icon"
                                                                    :color="packageItem.iconColor"
                                                            >{{
                                                                packageItem.icon
                                                                }}
                                                            </v-icon>

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

                                                                    <h4>{{!packageItem.active ? "SHOW PACKAGE" :
                                                                        "CLOSE"}}</h4>
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
                                                                    <v-list-tile-title>{{ subItem.text }}
                                                                    </v-list-tile-title>
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

                            <!--<div class="jumbo-bot-arrow static">-->
                            <!--<svg viewBox="0,0,500,100" preserveAspectRatio="none">-->
                            <!--<polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>-->
                            <!--</svg>-->

                            <!--</div>-->
                        </v-layout>
                    </v-container>
                </div>
            </div>
            <div class="timeline-wrap _bg-color-b" id="process">
                <v-container>
                    <v-layout column wrap class="c-title">
                        <h1 class="mt-5 mb-3 text-lg-center">OUR PROCESS</h1>
                        <h3 class="mb-4 text-lg-center">6 Steps for Success.</h3>
                        <p class="text-lg-center">We follow these steps so our end product meets your requirements.</p>
                    </v-layout>
                </v-container>
                <v-container>
                    <v-layout>
                        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                            <template v-for="(feature, k) in service.features">
                                <custom-timeline-piece :data="feature" :index="k"></custom-timeline-piece>
                                <!--<v-timeline-item-->
                                <!--dark-->
                                <!--v-scroll="scrollTimelineItem"-->
                                <!--:key="k"-->
                                <!--:id="k + '-timeline-feature'"-->
                                <!--color="blue lighten-2"-->
                                <!--large-->
                                <!--:icon="feature.icon"-->
                                <!--&gt;-->
                                <!--<div slot="opposite" v-if="!$vuetify.breakpoint.smAndDown">-->
                                <!--<h1 class="opposite_tl">{{feature.title}}</h1>-->
                                <!--</div>-->
                                <!--<v-card class="elevation-2">-->
                                <!--&lt;!&ndash;<c-img :src="feature.img" height="300px"></c-img>&ndash;&gt;-->
                                <!--<v-img :src="imgC(feature.img)" :lazy-src="imgC(feature.img, false, false, true)" height="40%" :ref="'tl-img-' + k">-->
                                <!--<v-icon size="150px" color="#5a5a5a" class="ma-4">{{feature.icon}}</v-icon>-->
                                <!--</v-img>-->
                                <!--<div>-->
                                <!--<v-card-title class="headline px-5 pt-5">{{feature.subTitle}}</v-card-title>-->
                                <!--<v-card-text class="px-5 pb-5">-->
                                <!--{{feature.subSubTitle}}-->
                                <!--</v-card-text>-->
                                <!--</div>-->
                                <!--</v-card>-->
                                <!--</v-timeline-item>-->
                            </template>
                        </v-timeline>
                    </v-layout>
                </v-container>
            </div>


            <div class="progress">
                <div v-for="(item, l) in service.features" :key="l">
                    <div class="progress-item" :style="{background: item.visible ? '#ba0022a' : ''}">

                    </div>
                </div>
            </div>

        </v-flex>

    </div>
</template>

<script>
    // import content from '../lang/en/Views/Websites'
    import TimelineProgress from '../components/custom/TimelineProgress'
    import Questions from '../components/custom/Questions'
    import CImg from '../components/custom/CImg'

    export default {
        components: {Questions, TimelineProgress, CImg},
        data() {
            return {
                loadingQuestions: false,
                showQuestions: false,
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
            showQuestionFrame() {
                this.loadingQuestions = true

                setTimeout(() => {
                    this.showQuestions = true
                    this.loadingQuestions = false
                }, 1111)
            },
            scrollTimelineItem() {
                let $e = this.$el
                let pos = $e.getBoundingClientRect().top
                if (pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    $e.scrollAnimated = true
                    TweenMax.fromTo($e, 0.3, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0})
                } else if ($e.scrollAnimated && pos > window.innerHeight - 100) {
                    $e.scrollAnimated = false
                    TweenMax.set($e, {autoAlpha: 0})
                }
            },
            loadLimit(i) {
                return this.loadTickerCount <= i
            },
            loadPoint(i) {
                return this.loadTickerCount >= i
            },
            shakeAnim(i) {
                TweenMax.to(this.$el, 0.3, {})
            },
            topScroll() {
                // let $e = this.$el
                // let pos = $e.getBoundingClientRect().y
                // if(pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                //     $e.scrollAnimated = true
                //     TweenMax.staggerFromTo($e.querySelectorAll('.start-bg-arrow path'), .36, {autoAlpha: 0, y: -50}, {y: 0, autoAlpha: 1, ease: Back.easeOut}, .095)
                //     TweenMax.staggerFromTo($e.querySelectorAll('.start-bg-arrow path'), .36, {fill: '#ffffff'}, {fill: '#007eff', delay: 0.3, yoyo:true, repeat: 1}, .095)
                // }
                // else if ($e.scrollAnimated && pos > window.innerHeight - 100 ) {
                //     $e.scrollAnimated = false
                //     TweenMax.set($e.querySelectorAll('.start-bg-arrow path'), {autoAlpha: 0,  fill: '#fff'})
                // }
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

    @keyframes shake-vertical {
        0%,
        100% {
            transform: translateY(0);
        }
        10%,
        30%,
        50%,
        70% {
            transform: translateY(-4px);
        }
        20%,
        40%,
        60% {
            transform: translateY(4px);
        }
        80% {
            transform: translateY(3.4px);
        }
        90% {
            transform: translateY(-3.4px);
        }
    }
</style>
<style lang="stylus">

</style>
<style lang="stylus" scoped>
    /*.max-view-width*/
    /*width 100% !important*/

    .st0 {
        stroke: #000000;
        stroke-miterlimit: 10;
    }

    .st1 {
        fill: #FFFFFF;
    }

    .v-timeline
        /*padding-top 150px*/
        padding-bottom 150px

    //&:before
    /*border: 1px dashed #9a9a9a*/
    .questions-wrapper
        /*width: 80%*/
        /*max-width: 1280px*/

    .timeline-wrap
        padding-top 0
        padding-bottom 0
        margin-top -10px

    /*.start-bg-arrow*/
    /*polygon*/
    /*fill #1a1a1a*/

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

    .jumbo-bot-arrow
        bottom 1px

    .ss0
        fill: #2a262e

    .-reveal
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;

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

    .opposite_tl
        font-size: 3.5em

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


    ._bg-color-a
        background-color: #eaeaea

    ._bg-color-b
        background-color: #e2e2e2


    .shake-vertical:hover
        .anim-icon
            animation: shake-vertical 1.2s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both


</style>
