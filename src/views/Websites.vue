<template>
    <div>
        <div class="loader" v-if="loadLimit(2)">
            <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
        </div>
    <v-flex
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
                justify-center
                align-start
                :class="[{'offset-4-grid': $vuetify.breakpoint.lgAndUp}, $vuetify.breakpoint.smAndUp ? 'pa-5' : 'pa-1']"
        >
            <v-flex
                    mb-3

                    :class="[$vuetify.breakpoint.smAndDown ? 'pa-2' : '']"
                    v-if="loadPoint(2)"
                    justify-space-between
                    align-content-space-between
                    d-flex>
                <v-flex light class="pa-3"

                >
                    <v-img
                            class="relative pack-img"
                            :src="service.image">

                    <!--&gt;-->

                        <v-layout
                                class="z1 pa-5 title-1 d-flex"
                                column
                                fill-height

                                wrap
                        >
                            <v-flex lg6 sm12  fill-height>
                                <v-layout column justify-center fill-height>
                            <v-card-title class="white--text">
                                <h1>{{ service.name }}</h1>
                            </v-card-title>
                            <v-card-title class="white--text">
                                <h3 class="">{{ service.subTitle }}</h3>
                            </v-card-title>
                            <v-card-title class="white--text">
                                <p class="">{{ service.disclaimer }}</p>
                            </v-card-title>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <div class="bg-gradient"></div>
                        <custom-background-vector position="top-left">
                        </custom-background-vector>

                    </v-img>
                    <h1 class="my-5">PACKAGES</h1>
                    <v-layout row wrap mt-4>

                        <v-flex
                                v-if="loadPoint(3)"
                                lg3
                                md3
                                sm12
                                v-for="(packageItem, p) in service.items"
                                :key="p"
                        >

                            <v-card
                                    md6
                                    dark
                                    class="elevation-6 column"
                            >
                                <custom-bg-vector-corner :fill="mainBGColor" width="100px" height="92px"></custom-bg-vector-corner>
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
                                            :append-icon="$vuetify.icons.expand"
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
                </v-flex>
            </v-flex>
        </v-layout>

    </v-container>

    </v-flex>

    </div>
</template>

<script>
    import content from '../lang/en/Views/Websites'
    export default {
        metaInfo: {
            title: content.headTitle,
            meta: [
                {name: 'description', content: content.headDescription}
            ]
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
            }
        },
        computed: {
            items() {
                return content.items
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
