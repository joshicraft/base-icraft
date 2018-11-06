<template>
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
                    lg12

                    mb-3
                    v-for="(service, i) in items"
                    :class="[$vuetify.breakpoint.smAndDown ? 'pa-2' : '']"
                    :key="i"
                    justify-space-between
                    align-content-space-between
                    d-flex>
                <v-flex light class="pa-3">
                    <v-img
                            class="relative"
                            :src="service.image"
                            height="300px"
                    >
                        <v-layout
                                class="z1"
                                column
                                fill-height
                        >

                            <v-spacer></v-spacer>

                            <v-card-title class="white--text">
                                <h1>{{ service.name }}</h1>

                            </v-card-title>
                            <v-card-title class="white--text">
                                <h2 class="">{{ service.title }}</h2>
                            </v-card-title>
                            <v-card-title class="white--text">
                                <p class="">{{ service.subTitle }}</p>
                            </v-card-title>
                        </v-layout>
                        <div class="bg-gradient"></div>
                    </v-img>
                    <v-layout>
                        <v-flex
                                row
                                lg3
                                md6
                                v-for="(packageItem, p) in service.items"
                                :key="p"
                        >

                            <v-card
                                    dark
                                    class="elevation-3 column"
                            >
                                <div class="top-content">
                                    <v-card-title class="text-lg-center">
                                        <h1>{{ packageItem.name }}</h1>
                                    </v-card-title>
                                    <v-card-title class="text-lg-center">
                                        <p class="">{{ packageItem.title }}</p>
                                    </v-card-title>
                                    <!--<v-card-title class="">-->
                                    <!--<p class="">{{ packageItem.subTitle }}</p>-->
                                    <!--</v-card-title>-->
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
</template>

<script>
    import VLabel from 'vuetify/lib/components/VLabel/VLabel'

    export default {
        components: {VLabel},
        metaInfo: {
            title: 'Services of Anderson Air Conditioning & Electrical',
            meta: [
                {name: 'description', content: 'AACE offers a wide range of Air Conditioning and Electrical Services'}
            ]
        },
        computed: {
            items() {
                return this.bakedViews.Services.items
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .column
        min-height 300px
        flex-direction column
        position: relative;
        .top-content
            text-align center
            min-height: 200px
    .relative
        position: relative;

    .z1
        position: relative
        z-index 1

    .bg-gradient
        z-index: 0
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events none

    .bg-gradient
        background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(197, 197, 197, 0.5) 100%);
</style>
