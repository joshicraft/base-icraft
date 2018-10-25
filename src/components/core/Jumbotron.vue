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
        </custom-video-background>
    </v-fade-transition>
</template>

<script>
    export default {
        data: () => ({
            isBooted: false
        }),

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

    .z1
        z-index: 1
        position relative

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

    @media (orientation: portrait)
        .jumbo-logo
            width: 70%
</style>
