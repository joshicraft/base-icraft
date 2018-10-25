<template>
    <v-fade-transition mode="out-in">
        <!--<v-img-->
        <!--v-if="namespace"-->
        <!--:key="$route.path"-->
        <!--:src="heroImage"-->
        <!--class="jumbo-wrap"-->
        <!--gradient="to top, rgba(100, 90, 70, .95), rgba(30, 40, 30, .95)"-->
        <!--&gt;-->
        <custom-video-background
                id="jumbotron"
                class="vh"
                :sources="[heroVideo + '.mp4', heroVideo + '.ogv']"
                :img="heroImage"
                :alt="heroImage"
        >
            <div class="z0 bg-gradient"></div>
            <div class="vid-bg-vector">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 934" style="enable-background:new 0 0 1902 934;" xml:space="preserve">
                    <g>
                        <path class="st0" d="M0,761.7c0,0,485,175.3,1117,175.3s787-84,787-84v84H0L0,761.7z"/>
                        <path class="st1" d="M0,805c0,0,485,132,1117,132s785-66,785-66l2,66H0L0,805z"/>
                    </g>
                </svg>
            </div>
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
                                    justify-center
                                    align-center
                                    text-xs-center
                                    :key="$route.path"
                            >
                                <div class="jumbo-logo">
                                    <custom-logo></custom-logo>
                                </div>
                                <!--<h1 class="display-2 white&#45;&#45;text" v-html="title" />-->
                                <!--<div-->
                                <!--class="subheading white&#45;&#45;text"-->
                                <!--v-html="subTitle"-->
                                <!--v-if="subTitle"-->
                                <!--/>-->
                            </v-layout>
                        </v-fade-transition>
                    </v-layout>
                </v-container>
            </v-fade-transition>
            <!--</v-img>-->
            <div
                    @click="goTo('#view')"
                    v-if="!isScrolling && $vuetify.breakpoint.mdAndUp"
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
    export default {
        data: () => ({
            isBooted: false
        }),

        methods: {
            goTo () {
                this.scrolling = false
                // this.$children[0].$refs.video.pause()
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
                return this.$t(`Views.${this.namespace}.jumbotronTitle`)
            },
            subTitle() {
                return this.$t(`Views.${this.namespace}.jumbotronSubTitle`)
            },
            heroImage() {
                let path = '/static/video/'
                let size = ''
                let name = '-vid-bg'
                let bp = this.$vuetify.breakpoint
                if (bp.smAndDown) {
                    size = '768'
                } else if (bp.lgAndDown) {
                    size = '1280'
                } else {
                    size = '1920'
                }
                return path + size + name + (this.ext('.jpg'))
            },

            heroVideo() {
                let path = '/static/video/'
                let size = ''
                let name = 'vid-bg'
                let bp = this.$vuetify.breakpoint
                //
                if (bp.smAndDown) {
                    size = '_768'
                } else if (bp.mdAndDown) {
                    size = '_1024'
                } else if (bp.lgAndDown) {
                    size = '_1280'
                } else {
                    size = '_1920'
                }
                return (path + name + size)
            }
        },

        mounted() {
            setTimeout(() => {
                this.isBooted = true

            }, 200)

        }
    }
</script>

<style lang="stylus" scoped>

    .vid-bg-vector
        position: absolute;
        top 0
        left 0
        width 100%
        height 100%
        svg
            width: 100%;
            /* height: 100%; */
            display: block;
            position: absolute;
            bottom: 0;

    .jumbo-wrap
        height: 100vh

    .jumbo-logo
        width: 30%
        margin: 0 auto;

    .st0 {
        fill: #CECECE;
    }

    .st1 {
        fill: #FAFAFA;
    }

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

    .bg-gradient
        z-index: 0
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events none
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(197, 197, 197, 0.5) 100%);

    svg
        -webkit-filter: drop-shadow(0px 0px 7px rgba(0,0,0,0.25));
        filter: drop-shadow(0px 0px 7px rgba(0,0,0,0.25));

    .slide-bottom {
        -webkit-animation: slide-bottom 1s ease-in-out infinite both;
        animation: slide-bottom 1s ease-in-out infinite both;
    }
    @-webkit-keyframes slide-bottom {
        0% {
            fill: #aaa
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            fill: white
            -webkit-transform: translateY(12px);
            transform: translateY(12px);
        }
    }
    @keyframes slide-bottom {
        0% {
            fill: #ccc
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            fill: #555
            -webkit-transform: translateY(12px);
            transform: translateY(12px);
        }
    }

    @media (orientation: portrait)
        .jumbo-logo
            width: 70%

</style>
