<template>
    <v-fade-transition mode="out-in">
        <custom-video-background
                id="jumbotron"
                class="vh"
                :sources="[heroVideo + '.mp4', heroVideo + '.ogv']"
                :img="heroImage"
                :alt="heroImage"
        >
            <div class="z0 bg-gradient" id="jumbo-gradient"></div>
                <div class="contact-ico bot-p">
                <v-btn
                        v-if="$route.name !== 'Contact'"
                        @click="gotToContact"
                        fab
                        dark
                        medium
                        :small="$vuetify.breakpoint.smAndDown"
                        color="primary"
                        :class="$vuetify.breakpoint.smAndDown ? 'bot' : ''"
                        class="darken-3"

                >
                    <v-icon
                            large
                            :medium="$vuetify.breakpoint.mdAndDown"
                            dark
                    >mdi-message-text
                    </v-icon>
                </v-btn>
            </div>
            <div class="contact-ico bot-p left-p">
                <v-btn
                        v-if="$route.name !== 'Contact'"
                        @click="gotToContact"
                        fab
                        dark
                        medium
                        :small="$vuetify.breakpoint.smAndDown"
                        color="primary"
                        :class="$vuetify.breakpoint.smAndDown ? 'bot' : ''"
                        class="darken-3"

                >
                    <v-icon
                            large
                            :medium="$vuetify.breakpoint.mdAndDown"
                            dark
                    >mdi-phone
                    </v-icon>
                </v-btn>
            </div>
            <custom-background-vector></custom-background-vector>


            <v-fade-transition mode="out-in">
                <v-container
                        fill-height
                        :key="$route.path"
                        v-if="isBooted"
                        class="z1"
                >
                    <v-layout align-center>
                        <v-fade-transition mode="out-in">
                            <v-layout
                                    column
                                    justify-center
                                    align-center
                                    text-xs-center
                                    :key="$route.path"
                                    class="title"
                            >
                                <div class="jumbo-logo">
                                    <custom-logo></custom-logo>
                                </div>
                                <h1>{{title}}</h1>
                                <h2>{{subTitle}}</h2>
                            </v-layout>
                        </v-fade-transition>
                    </v-layout>
                </v-container>
            </v-fade-transition>
            <!--</v-img>-->
            <div
                    @click="goTo('#view')"
                    class="scroll-wheel-wrap scrollwheel"
            >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 58.5 84.2" style="enable-background:new 0 0 58.5 84.2;" xml:space="preserve">
                    <path class="st10" d="M29.3,7.2L29.3,7.2C18.5,7.2,9.6,16,9.6,26.9v31.3c0,10.8,8.8,19.7,19.7,19.7h0c10.8,0,19.7-8.8,19.7-19.7V26.9  C48.9,16,40.1,7.2,29.3,7.2z"/>
                    <path class="slide-bottom" id="mousewheel-wheel" d="M28.6,35.3h0.6c0.8,0,1.5-0.7,1.5-1.5v-10c0-0.8-0.7-1.5-1.5-1.5h-0.6c-0.8,0-1.5,0.7-1.5,1.5v10  C27.1,34.6,27.8,35.3,28.6,35.3z"/>
                </svg>
            </div>
        </custom-video-background>

    </v-fade-transition>
</template>

<script>
    import SplitText from '../../plugins/split-text'
    // import createPlayer from 'web-audio-player'
    // let soundA = createPlayer('/static/sound/woosh.mp3')
    //
    // soundA.on('load', () => {
    //     soundA.node.connect(soundA.context.destination)
    // })
    /* eslint-disable no-undef */
    export default {
        data: () => ({
            scrolling: false,
            isBooted: false
        }),
            beforeRouteUpdate  (to, from){

                this.scrolled = false
                TweenMax.killDelayedCallsTo(this.goTo)
                TweenMax.delayedCall(5000, this.goTo, [".v-container"])
                next()
            },
        methods: {
            gotToContact () {
                this.$router.push('Contact')
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight + 15, { offset: -document.querySelector('.v-toolbar').getBoundingClientRect().height })
                }, 2000)

            },
            goTo () {
                this.scrolling = true
                this.$vuetify.goTo(window.innerHeight + 15, { offset: -document.querySelector('.v-toolbar').getBoundingClientRect().height })
            }
        },

        computed: {
            isHome() {
                return this.$route.path === '/'
            },
            namespace() {
                return this.$route.name
            },
            title() {
                return this.bakedViews[this.namespace].jumbotronTitle || ''
            },
            subTitle() {
                return this.bakedViews[this.namespace].jumbotronSubTitle || ''
            },
            heroImage() {
                let path = '/static/video/4'
                let size = ''
                let name = ''
                // let bp = this.$vuetify.breakpoint
                // if (bp.smAndDown) {
                //     size = '768'
                // } else if (bp.lgAndDown) {
                //     size = '1280'
                // } else {
                //     size = '1920'
                // }
                return path + size + name + '.jpg'

                // return path + size + name + (this.ext('.jpg'))
            },

            heroVideo() {
                let path = '/static/video/4'
                let size = ''
                let name = 'vid-bg'
                let bp = this.$vuetify.breakpoint

                if (bp.smAndDown) {
                    size = '_768'
                } else if (bp.mdAndDown) {
                    size = '_1024'
                } else if (bp.lgAndDown) {
                    size = '_1280'
                } else {
                    size = '_1920'
                }
                return (path)
            }
        },

        mounted() {
            setTimeout(() => {
                this.isBooted = true
                setTimeout(() => {

                    // let $svg = document.getElementById('logo-svg')
                    // let $left = $svg.querySelector("#left-flake_1_")
                    // let $right = $svg.querySelector("#logo-circut")
                    // let $paths = $right.querySelectorAll('.anim')
                    // let $nodes = $right.querySelectorAll('.anim-2')
                    // let t_l = new TimelineMax({delay: 0.1})
                    //
                    // let dur = 1
                    //
                    // t_l
                    //     .set(
                    //         $paths,
                    //         {
                    //             drawSVG: '0%'
                    //         },
                    //         'a'
                    //     )
                    //     .set(
                    //         $left,
                    //         {
                    //             autoAlpha: 0,
                    //             rotation: 180,
                    //             transformOrigin: '50% 50%'
                    //         },
                    //         'a')
                    //     .staggerTo(
                    //         $paths,
                    //         dur * 2,
                    //         {
                    //             drawSVG: '100%'
                    //         },
                    //         dur / 5.3,
                    //         'a+=' + (dur / 2)
                    //     )
                    //     .to(
                    //         [$paths],
                    //         1.2,
                    //         {
                    //             stroke: '#b0b0b0',
                    //             fill: 'rgba(244, 244, 240, 0.05)'
                    //         }, '-=1.2')
                    //     .fromTo(
                    //         $nodes,
                    //         dur * 0.3,
                    //         {
                    //             scale: 0, transformOrigin: '50% 50%'
                    //         },
                    //         {
                    //             ease: Back.easeOut,
                    //             scale: 1,
                    //             transformOrigin: '50% 50%',
                    //             autoAlpha: 1
                    //         },
                    //         '-=' + (dur * 1)
                    //     )
                    //     .to(
                    //         $left,
                    //         dur * 1,
                    //         {
                    //             ease: Back.easeOut,
                    //             rotation: 0,
                    //             transformOrigin: '50% 50%',
                    //             autoAlpha: 1
                    //         },
                    //         '-=2.2'
                    //     )
                    //
                    // new SplitText(document.querySelector('.title h1'), 1.8, 0.16)
                    // new SplitText(document.querySelector('.title h2'), 2.2, 0.055)
                }, 100)
            }, 200)

        }
    }
</script>

<style lang="stylus" scoped>
    #jumbotron
        height: 100vh !important
        z-index 2

    .VideoBg__content
        position: relative;

    .jumbo-logo
        display none
        width: 20%
        max-height 50%
        margin: 0 auto 3em auto;

    .title
        /*display none*/
        color: #fafafa
        /*color: #438ccb*/
        h1
            font-size: 3em
            margin-left: 3px;
            font-weight 500
            transform scaleY(0.9)
        h2
            font-size: 1em;
            font-weight: 300
            transform scaleY(0.95)

    .contact-ico
        right 15px
        top 0
        bottom 0
        margin auto
        position: fixed
        z-index: 50
        &.bot-p
            top initial
            bottom: 15px
        &.left-p
            right initial
            left 10px



    .st10{fill:none;stroke:#FFF;stroke-width:3;stroke-miterlimit:10;}

    .z1
        z-index: 1
        position relative

    .scrollwheel
        cursor pointer
        opacity: 0.45
        position: absolute
        bottom: 15px
        left: 0
        right: 0
        margin: auto
        width: 30px
        z-index 1
        background transparent
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0), 0px 1px 1px 0px rgba(0,0,0,0), 0px 1px 3px 0px rgba(0,0,0,0);
        transition background 0.3s ease-in, box-shadow 0.4s ease-out
        border-radius 25px
        display flex
        justify-items center
        align-items center
        svg
            width: 100%

    .scrollwheel:hover
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
        background rgba(200, 200, 200, 0.5)

    .bg-gradient, .bg-img
        z-index: 0
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events none

    .bg-gradient
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.995) 0%, rgba(35, 30, 40, 0.859) 100%);
        //background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(28, 35, 43, 0.9) 100%);

    .bg-img
        opacity: 0.05
        background-image url('/static/testimonial-bg-8.png')

    svg
        -webkit-filter: drop-shadow(0px 0px 7px rgba(0,0,0,0.25));
        filter: drop-shadow(0px 0px 7px rgba(0,0,0,0.25));

    .slide-bottom {
        -webkit-animation: slide-bottom 1s ease-in-out infinite both;
        animation: slide-bottom 1s ease-in-out infinite both;
    }


    @-webkit-keyframes slide-bottom {
        0% {
            fill: #ccc
            -webkit-transform: translateY(0px) scaleY(0.75);
            transform: translateY(0px) scaleY(0.75);
        }
        50% {
            fill: #fff
        }
        85% {
            -webkit-transform: translateY(8px) scaleY(1);
            transform: translateY(8px) scaleY(1);
        }
        100% {
            fill: #aaa
            transform: translateY(0px);
        }
    }

    @keyframes slide-bottom {
        0% {
            fill: #ccc
            -webkit-transform: translateY(0px) scaleY(0.75);
            transform: translateY(0px) scaleY(0.75);
        }
        50% {
            fill: #fff
        }
        85% {

            -webkit-transform: translateY(8px) scaleY(1);
            transform: translateY(8px) scaleY(1);
        }
        100% {
            fill: #aaa
            transform: translateY(0px);
        }
    }

    /*@media (orientation: portrait)*/
        /*#jumbotron*/
            /*height: 70vh !important*/
        /*.jumbo-logo*/
            /*width: 70%*/
    /*@media (orientation: portrait) and (max-width: 450px)*/
        /*#jumbotron*/
            /*height: 55vh !important*/

    @media (max-width: 470px), (max-width: 740px) and (orientation: landscape)
        .title

            font-size: 1em !important

</style>
