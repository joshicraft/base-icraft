<template>
    <div class="relative">

        <v-flex
                v-scroll="topScroll"
                v-for="(service, i) in content.items"
                :key="i"
                v-if="loadPoint(1)"
        >
            <div

                    class="relative -view-height _bg-color-b"
            >
                <v-layout
                        lg12
                        wrap
                        align-center
                >
                    <v-img

                            lazy-src="/static/web-bg-1.jpg"
                            src="/static/web-bg-1.jpg"
                            :class="{'-_arrow-pt': $vuetify.breakpoint.smAndDown}"
                            lg6
                            :alt="'web-1'"
                            class="vid-bg -_grid-img"
                            :height="$vuetify.breakpoint.smAndDown ? '50vh' : '100vh'"
                    >
                        <div class="video-wrapper">
                        <!--<video class="web-video" playsinline="" autoplay="autoplay" loop="loop"  src="/static/video/web-vid-3.webm"></video>-->

                            <video class="phone-web-video" playsinline="" autoplay="autoplay" loop="loop"  src="/static/video/phone-web-2.webm"></video>

                            <img class="thumb-overlay" src="/static/web-why--thumb.png"/>

                        </div>
                    </v-img>

                    <v-flex
                            lg6
                            :class="'pa-' + $vuetify.breakpoint.mdAndUp ? '5' : '2'"
                            class="c-title d-flex text-lg-right text-sm-center"
                            justify-center
                            column
                    >
                        <div>
                            <h1 class="mt-0 mb-3">
                                WHY ICRAFT WEBSITES?
                            </h1>
                            <h3 class="mb-4 ">
                                Fast, secure, responsive, customizable and comes with some of the cheapest hosting rates out there!
                            </h3>
                            <p class="">
                                You know those nasty hosting rates that come out of your pocket every month? They generally cost anywhere between $30-$70 a month! Well... we've figured out how to get them down to as little as $10 a month.
                            </p>
                            <div class="mt-5">
                                <v-btn
                                        class="primary ml-0 mr-0"
                                        @click="$vuetify.goTo('#finding', {offset: -48})"
                                >
                                    FIND A WEBSITE
                                </v-btn>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>
            </div>
            <div
                    id="finding"
                    class="relative -view-height _bg-color-a"
            >
                <v-layout
                        lg12
                        wrap
                        align-center
                >
                    <v-flex
                            lg6
                            :class="'pa-' + $vuetify.breakpoint.mdAndUp ? '5' : '2'"
                            class="c-title d-flex text-lg-left text-sm-center"
                            justify-center
                            column
                    >
                        <div>
                        <h1 class="mt-0 mb-3">
                            LETS FIND YOU A WEBSITE
                        </h1>
                        <h3 class="mb-4">
                            Trying to understand the constantly changing tech jargon and
                            daunting range of options can be a nightmare.
                        </h3>
                        <p class="">
                            Our goal is to help you find the right solution for your needs.
                            Here
                            you can find out what website will suite you, check out some package ideas and find out
                            about our process.
                        </p>
                        <div class="mt-5">
                            <v-btn
                                    class="primary ml-0 mr-3"
                                    @click="$vuetify.goTo('#discovery', {offset: -48})"
                            >
                                HELP ME CHOOSE
                            </v-btn>
                            <v-btn
                                    class="primary ml-0 mr-3"
                                    @click="$vuetify.goTo('#packages', {offset: -48})"
                            >
                                find a package
                            </v-btn>
                            <v-btn
                                    class="primary ml-0 mr-3"
                                    @click="$vuetify.goTo('#process', {offset: -48})"
                            >
                                The process
                            </v-btn>
                        </div>
                        </div>
                    </v-flex>
                    <v-img
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            lazy-src="/static/web-img-4.jpg"
                            src="/static/web-img-4.jpg"
                            height="100vh"
                    >
                    </v-img>
                </v-layout>

            </div>
            <div
                    id="discovery"
                    class="relative -view-height _bg-color-b"
            >
                <v-layout
                        lg12
                        wrap
                        align-center
                >
                    <v-img
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :alt="'web-1'"
                            src="/static/websites-1b.jpg"
                            height="100vh"
                    >
                            <video class="web-video" playsinline="" autoplay="autoplay" loop="loop"  src="/static/video/web-vid-3.webm"></video>
                        <!--<img class="screen-panel-anim" src="/static/screen-panel-shadow.png"/>-->
                        <!--<img class="screen-panel-anim" src="/static/screen-panel-shadow.png"/>-->
                        <!--<img class="screen-panel-anim" src="/static/screen-panel-shadow.png"/>-->

                    </v-img>
                    <v-flex
                            v-if="showQuestions"
                            lg12
                            pa-2
                            class="fill-height scroll-y d-flex theme--dark questions-wrapper"
                            :class="{'--questions-wrapper-full' : !resultsGenerated, 'pa-5' : $vuetify.breakpoint.mdAndUp}"
                    >
                        <!--<v-card dark height="100vh" class="elevation-0">-->
                            <v-flex
                                    align-center
                                    justify-center
                                    class="d-flex fill-height _questions-bg"
                                    height="100vh"
                            >
                                <questions :data="content.discover"></questions>
                            </v-flex>
                        <!--</v-card>-->
                    </v-flex>
                    <v-flex v-else column wrap lg6 class="c-title d-flex text-lg-right text-sm-center">
                        <div>
                        <h1 class="mt-0 mb-3">
                            CAN'T FIND THE RIGHT FIT?
                        </h1>
                        <h3 class="mb-4">
                            We've come up with {{content.discover.questions.length}} easy
                            questions that can help you choose.
                        </h3>
                        <p>
                            To get stuck in, click GET STARTED then follow the questions and
                            select the boxes for the answers that
                            relate to you. Otherwise, feel free to get in touch to find out more.
                        </p>
                        <div class="mx-auto">
                            <v-btn
                                    @click="showQuestionFrame"
                                    class="primary ml-0"
                                    :loading="loadingQuestions"
                                    v-if="!showQuestions"
                            >
                                Get Started
                            </v-btn>
                            <v-btn
                                    @click="goToContact"
                                    class="primary ml-0"
                                    v-if="!showQuestions"
                            >
                                Get in touch <v-icon right>mdi-phone</v-icon>
                            </v-btn>
                        </div>
                        </div>
                    </v-flex>
                </v-layout>
            </div>
            <div id="packages" class="-view-height _bg-color-a">
                <div>
                    <v-container>
                        <v-layout column wrap class="c-title">
                            <h1 class="mt-0 mb-3 text-lg-center">
                                BASELINE PACKAGES
                            </h1>
                            <h3 class="mb-4 text-lg-center">
                                {{ service.subTitle }}
                            </h3>
                            <p class="text-lg-center">
                                {{ service.disclaimer }}
                            </p>
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
                                <v-flex
                                        light
                                        class="pa-3"
                                >
                                    <v-container
                                            grid-list-lg
                                            pa-0
                                            pb-4
                                            d-flex
                                            justify-center
                                            align-center
                                            class="max-view-width"
                                    >
                                        <v-layout
                                                row
                                                wrap
                                                mt-4
                                        >
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
                                                        @mouseover="hoverPackage"
                                                        class="elevation-6 column shake-vertical"
                                                >
                                                    <div class="top-content pt-4 pl-4 pr-4 pb-1">

                                                        <v-flex
                                                                row
                                                        >
                                                            <h1
                                                                    :class="packageItem.iconColor + '--text'"
                                                            >
                                                                {{packageItem.name }}
                                                            </h1>
                                                            <v-icon
                                                                    mt-2 size="150px"
                                                                    class="anim-icon"
                                                                    :class="{'animate': resultName === packageItem.name.toLowerCase()}"
                                                                    :color="packageItem.iconColor"
                                                            >
                                                                {{packageItem.icon}}
                                                            </v-icon>
                                                        </v-flex>
                                                        <h3 class="mt-4">
                                                            {{ packageItem.price }}
                                                        </h3>
                                                        <p class="mt-4">
                                                            {{ packageItem.title }}
                                                        </p>
                                                    </div>
                                                    <v-list two-line class="list">
                                                        <v-list-group
                                                                append-icon="mdi-arrow-down"
                                                                v-model="packageItem.active"
                                                                expand
                                                        >
                                                            <v-list-tile :ripple="true" slot="activator">
                                                                <v-list-tile-content>
                                                                    <h4>
                                                                        {{!packageItem.active ? "SHOW PACKAGE" : "CLOSE"}}
                                                                    </h4>
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
                        </v-layout>
                    </v-container>
                </div>
            </div>
            <div class="timeline-wrap _bg-color-b" id="process">
                <v-container>
                    <v-layout column wrap class="c-title">
                        <h1 class="mt-5 mb-3 text-lg-center">
                            OUR PROCESS
                        </h1>
                        <h3 class="mb-4 text-lg-center">
                            6 Steps for Success.
                        </h3>
                        <p class="text-lg-center">
                            We follow these steps so our end product meets your requirements.
                        </p>
                    </v-layout>
                </v-container>
                <v-container>
                    <v-layout>
                        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                            <template v-for="(feature, k) in service.features">
                                <custom-timeline-piece :data="feature" :index="k"></custom-timeline-piece>
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
                resultsGenerated: false,
                resultName: '',
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
            hoverPackage () {
              this.resultName = ''
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
            goToContact () {
                this.$router.push({name:'Contact'})
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight + 15, { offset: -document.querySelector('.v-toolbar').getBoundingClientRect().height })
                }, 2000)

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
    .vid-bg .v-image__image
        z-index 0
</style>
<style lang="stylus" scoped>
    /*.max-view-width*/
    /*width 100% !important*/
    .video-wrapper
        position: absolute;
        top 0
        left 0
        width 100%
        height 100%
        perspective 617px

    .web-video
        z-index: 1;
        position: absolute;
        height: 42%;
        top: 37%;
        margin: auto;
        left: 0;
        right: 0;
        transform: translateX(43.5%) translateY(-115%) rotate(-15.5deg) skew(2deg, -5deg) scaleX(0.63) scaleY(0.99) rotateY(8deg) rotateX(-5deg);

    .web-video-1
        z-index: 1;
        position: absolute;
        height: 42%;
        top: 92%;
        margin: auto;
        left: 0;
        right: 0;
        transform: translateX(-35.15%) translateY(-90.2%) rotate(-15.5deg) skew(5deg, -5deg) scaleX(0.47) scaleY(0.83) rotateY(8deg) rotateX(66.5deg);

    .screen-panel-anim
        position: absolute;
        height: 44.4%;
        top: 58%;
        left: 37%;
        transform scaleX(0.95)


    .phone-video-wrapper
        position: absolute;
        top 0
        left 0
        width 100%
        height 100%
        perspective 617px

    .phone-web-video
        z-index 1
        position: absolute;
        height: 43.1%;
        top: 15.6%;
        margin: auto;
        left: 0;
        right: 0;
        transform: translateX(95%) translateY(15%) skew(-11.5deg, 13deg) rotateY(-4deg) rotateX(-2deg) scaleX(0.95) rotate(-0.5deg);

    .thumb-overlay
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(190%) translateY(77%);
        z-index: 4;
        margin: auto;
        right: 0;
        bottom: 0;
        height: 18%;

    .st0 {
        stroke: #000000;
        stroke-miterlimit: 10;
    }

    .st1 {
        fill: #FFFFFF;
    }

    .c-title > div
        width 80%
        margin 0 auto
        max-width: 537px;
        padding 5vh 0

    .v-timeline
        /*padding-top 150px*/
        padding-bottom 150px

    //&:before
    /*border: 1px dashed #9a9a9a*/
    .--questions-wrapper-full
        width: 80%
        max-width: 1280px
        margin-left auto
        margin-right auto

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

    .-_arrow-pt
        padding-top: 80px

    .-_grid-img
        height: 50vh

    ._questions-bg
        background: #303030;
        min-height: 100vh;


    .shake-vertical:hover
        .anim-icon
            animation: shake-vertical 1.2s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both

    .shake-vertical .animate
        animation: shake-vertical 1.2s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both


</style>
