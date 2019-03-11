<template>
    <div class="relative">
        <!--<div class="jumbo-bot-arrow">-->
            <!--<svg viewBox="0,0,500,100" preserveAspectRatio="none">-->
                <!--<polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>-->
            <!--</svg>-->
        <!--</div>-->
        <custom-video-background
                id="jumbotron"
                class="vh"
                :sources="[heroVideo + '.mp4']"
                :img="imgC('v-bga', false, false, false, 'video/')"
                alt="Background video image"
        >
            <div class="z0 bg-gradient" id="jumbo-gradient"></div>

            <my-transition mode="out-in">
                <v-container
                        fill-height
                        :key="$route.path"
                        v-if="isBooted"
                        class="z1"
                >
                    <v-layout align-center>
                            <v-layout
                                    column
                                    justify-center
                                    align-center
                                    text-xs-center
                                    :key="$route.path"
                                    class="title title-a"
                                    :class="$vuetify.breakpoint.mdAndUp ? 'show-text-anim' : ''"
                            >
                                <h1 class="mb-3 -text-anim">{{title}}</h1>
                                <h4 class="-text-anim">{{subTitle}}</h4>
                                <!--<p class="mt-3" v-if="subSubTitle">{{subSubTitle}}</p>-->
                                <v-btn
                                        
                                        large
                                        class="font-weight-bold mt-5 -border-btn elevation-19 -text-anim"
                                        @click="goTo('#view')"
                                >IGNITION</v-btn>
                            </v-layout>
                    </v-layout>
                </v-container>
            </my-transition>
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
    </div>
</template>

<script>
    export default {
        metaInfo ()  {
            return {
                title: this.$t('Views.' + this.getNameSpace() + '.headTitle'),
                meta: [
                    {name: 'description', content: this.$t('Views.' + (this.$route.name || 'Home') + '.headDescription')}
                ]
            }
        },
        props: {
          scrolled: Boolean
        },
        data: () => ({
            scrolling: false,
            isBooted: false,
        }),
        methods: {

            goTo () {
                this.$emit('clicked', true)
                this.goToID('#view')
            }
        },

        computed: {
            isHome() {
                return this.$route.path === '/'
            },
            namespace() {
               return this.getNameSpace()
            },
            title() {
                return this.$t('Views.' + this.namespace + '.jumbotronTitle')
            },
            subTitle() {
                return this.$t('Views.' + this.namespace + '.jumbotronSubTitle')
            },
            subSubTitle() {
                let str = 'Views.' + this.namespace + '.jumbotronSubSubTitle'
                let data = this.$t(str);
                return data !== str ? data : false
            },
            heroVideo() {
                let path = '/static/video/'
                let size = ''
                let name = 'v-'
                let bp = this.$vuetify.breakpoint

                if (bp.smAndDown) {
                    size = '768'
                } else if (bp.mdAndDown) {
                    size = '1024'
                } else if (bp.lgAndDown) {
                    size = '1280'
                } else {
                    size = '1920'
                }
                // return '/static/video/1_2'
                return (path + name + size)
            }
        },

        mounted() {
            setTimeout(() => {
                this.isBooted = true
            }, 100)
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
        color: #fafafa
        .-text-anim
            opacity 1

        h1
            /*font-size: 3em*/
            margin-left: 3px;
            ///*font-weight 500*/

        h4, h3
            /*font-size: 1em;*/
            font-weight: 100

        &.show-text-anim
            .-text-anim
                opacity 0



    .st10{fill:none;stroke:#FFF;stroke-width:3;stroke-miterlimit:10;}


    .jumbo-bot-arrow
        z-index 3
        bottom 1px
        svg
            transform translateY(50%)
        polygon
            fill #5a5a5a

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
        width: 32px
        z-index 4
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
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.995) 0%, rgba(35, 30, 40, 0.809) 100%);
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

            font-size: 1.15em !important

</style>
