<template>
    <div class="relative">
        <template
                v-if="loaded"
                >
        <v-flex
                v-scroll="topScroll"
                v-for="(service, i) in content.items"
                :key="i + '-website-service'"

        >
            <div

                    class="relative -view-height _bg-color-b"
            >
                <ui-section-nav-arrow :index="0" direction="prev"></ui-section-nav-arrow>
                <ui-section-nav-arrow :index="0" direction="next"></ui-section-nav-arrow>
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
                            class="vid-bg c-box-shadow"
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
                            class="title-a d-flex text-lg-right text-sm-center"
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
                                You know those nasty hosting rates that come out of your pocket every month? They can generally cost anywhere between $30-$70 USD a month! Well... we've figured out how to get them down to as little as $5 a month.
                            </p>
                            <div class="mt-5">
                                <v-btn
                                        class="primary ml-0 mr-3"
                                        @click="goToID('#finding')"
                                >
                                    FIND A WEBSITE
                                </v-btn>
                                <v-btn
                                        class="primary ml-0 mr-0"
                                        @click="goToAndScroll('WhyUsWebsites')"
                                >
                                    WHY US
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
                <ui-section-nav-arrow :index="1" direction="prev"></ui-section-nav-arrow>
                <ui-section-nav-arrow :index="1" direction="next"></ui-section-nav-arrow>
                <v-layout
                        lg12
                        wrap
                        align-center
                >
                    <v-flex
                            lg6
                            :class="'pa-' + $vuetify.breakpoint.mdAndUp ? '5' : '2'"
                            class="title-a d-flex text-lg-left text-sm-center"
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
                                    @click="goToID('#discovery')"
                            >
                                HELP ME CHOOSE
                            </v-btn>
                            <v-btn
                                    class="primary ml-0 mr-3"
                                    @click="goToID('#packages')"
                            >
                                find a package
                            </v-btn>
                        </div>
                        </div>
                    </v-flex>
                    <v-img
                            class="c-box-shadow"
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

                <ui-section-nav-arrow :index="2" direction="prev"></ui-section-nav-arrow>
                <ui-section-nav-arrow :index="2" direction="next"></ui-section-nav-arrow>
                <v-layout
                        lg12
                        wrap
                        align-center
                >
                    <v-img
                            class="c-box-shadow"
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :alt="'web-1'"
                            src="/static/websites-1b.jpg"
                            height="100vh"
                    >

                            <video class="web-video" playsinline="" autoplay="autoplay" loop="loop"  src="/static/video/web-vid-3.webm"></video>


                    </v-img>

                    <v-flex column wrap lg6 class="title-a d-flex text-lg-right text-sm-center">
                        <div>
                        <h1 class="mt-0 mb-3">
                            CAN'T FIND THE RIGHT FIT?
                        </h1>
                        <h3 class="mb-4">
                            We've come up with a few easy
                            questions that can help you choose.
                        </h3>
                        <p>
                            To get stuck in, click SHOW QUESTIONS. This will take you the the questions page where you can answer the questions that best fit your requiremnts.
                            Otherwise, feel free to get in touch to find out more.
                        </p>
                        <div class="mx-auto">
                            <v-btn
                                    @click="goToAndScroll('Discovery')"
                                    class="primary ml-0"
                                    :loading="loadingQuestions"
                                    v-if="!showQuestions"
                            >
                                SHOW QUESTIONS
                            </v-btn>
                            <v-btn
                                    @click="goToAndScroll('Contact')"
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
            <div id="packages" class="relative -view-height _bg-color-a">
                <ui-section-nav-arrow :index="2" direction="prev"></ui-section-nav-arrow>
                <ui-section-nav-arrow :index="2" direction="next"></ui-section-nav-arrow>
                <v-layout
                        lg12
                        wrap
                        align-center
                >


                    <v-flex column wrap lg6 class="title-a d-flex text-lg-left text-sm-center">
                        <div>
                            <h1 class="mt-0 mb-3">
                                SOME BASELINE PACKAGES
                            </h1>
                            <h3 class="mb-4">
                                We've come up with some baseline packages to help get you started.
                            </h3>
                            <p>
                                These sweet packages will give you an idea of how to match your requirements with a number of features you will need. If you'd like to know more about them, get in touch.
                            </p>
                            <div class="mx-auto">
                                <v-btn
                                        @click="goToAndScroll('Packages')"
                                        class="primary ml-0"
                                        :loading="loadingQuestions"
                                        v-if="!showQuestions"
                                >
                                    Show Packages
                                </v-btn>
                                <v-btn
                                        @click="goToAndScroll('Contact')"
                                        class="primary ml-0"
                                        v-if="!showQuestions"
                                >
                                    Get in touch <v-icon right>mdi-phone</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-flex>
                    <v-img
                            class="c-box-shadow"
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :alt="'web-1'"
                            src="/static/web-packages.jpg"
                            height="100vh"
                    >


                    </v-img>
                </v-layout>
            </div>
            <div id="process" class="relative -view-height _bg-color-a">
                <ui-section-nav-arrow :index="2" direction="prev"></ui-section-nav-arrow>
                <ui-section-nav-arrow :index="2" direction="next"></ui-section-nav-arrow>

                <v-layout
                        lg12
                        wrap
                        align-center
                >
                    <v-img
                            class="c-box-shadow"
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :alt="'web-1'"
                            :src="imgC('research')"
                            :lazy-src="imgC('research', false, false, true)"
                            height="100vh"
                    >

                    </v-img>

                    <v-flex column wrap lg6 class="title-a d-flex text-lg-left text-sm-center">
                        <div>
                            <h1 class="mt-0 mb-3">
                                WANT TO KNOW ABOUT OUR PROCESS?
                            </h1>
                            <h3 class="mb-4">
                                We go through a number of steps so that we can deliver a website to you on-time.
                            </h3>
                            <p>
                                From Research to to Deployment, our process allows for a number of revision's and feedback from you so we can get closer to your vision.
                            </p>
                            <div class="mx-auto">
                                <v-btn
                                        @click="goToAndScroll('Process')"
                                        class="primary ml-0"
                                        :loading="loadingQuestions"
                                        v-if="!showQuestions"
                                >
                                    Show Process
                                </v-btn>
                                <v-btn
                                        @click="goToAndScroll('Contact')"
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



        </v-flex>
        </template>
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
                loaded: false,
                content: this.$t('Views.Websites')
            }
        },
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        mounted () {
          let $t = this
          setTimeout(()=>{
              $t.loaded = true
          }, 800)
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

<style lang="stylus" scoped>
    /*.max-view-width*/
    /*width 100% !important*/


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

    .title-a > div
        width 80%
        margin 0 auto
        max-width: 537px;
        padding 60px 0



    //&:before
    /*border: 1px dashed #9a9a9a*/
    .--questions-wrapper-full
        width: 80%
        max-width: 1280px
        margin-left auto
        margin-right auto



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

    .-_arrow-pt
        padding-top: 80px

    .-_grid-img
        height: 50vh

    ._questions-bg
        background: #303030;
        min-height: 100vh;


    @media  (min-width: 321px) {
        .title-a > div {
            padding 5vh 0;
        }
    }


</style>
