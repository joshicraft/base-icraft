<template>
    <div>
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
                    <v-flex  light class="pa-3">
                        <v-img
                                :src="service.image"
                                height="300px"
                        >
                            <v-layout
                                    column
                                    fill-height
                            >

                                <v-spacer></v-spacer>

                                <v-card-title class="">
                                    <h1>{{ service.name }}</h1>

                                </v-card-title>
                                <v-card-title class="">
                                    <h2 class="">{{ service.title }}</h2>
                                </v-card-title>
                                <v-card-title class="">
                                    <p class="">{{ service.subTitle }}</p>
                                </v-card-title>
                            </v-layout>
                        </v-img>
                        <v-layout>
                        <v-flex
                                row
                                lg3
                                v-for="(packageItem, p) in service.items"
                                :key="p"
                        >
                            <v-card
                                    column

                                    class="elevation-3 fill-height d-flex justify-space-between"
                            >
                                <v-card-title class="">
                                    <h1>{{ packageItem.name }}</h1>

                                </v-card-title>
                                <v-card-title class="">
                                    <p class="">{{ packageItem.title }}</p>
                                </v-card-title>
                                <!--<v-card-title class="">-->
                                    <!--<p class="">{{ packageItem.subTitle }}</p>-->
                                <!--</v-card-title>-->
                                <v-list two-line>
                                    <v-list-group

                                    v-model="packageItem.active"

                                    >

                                    <v-list-tile slot="activator">

                                        <v-list-tile-content>

                                            <!--<h1 ></h1>-->
                                            <!--<h2>{{ i.title }}</h2>-->
                                            <h3>Contents</h3>
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
                        <!--<v-list-tile v-for="i in item.items" :key="i.name">-->
                        <!--<v-list-tile-action>-->
                        <!--<v-icon large>mdi-package-variant-closed</v-icon>-->
                        <!--</v-list-tile-action>-->

                        <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title>{{i.name}}</v-list-tile-title>-->
                        <!--<v-list-tile-sub-title></v-list-tile-sub-title>-->
                        <!--</v-list-tile-content>-->
                        <!--<v-list>-->
                        <!---->
                        <!--<v-list-tile v-for="j in i.items" :key="j">-->

                        <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title>{{j}}</v-list-tile-title>-->
                        <!--<v-list-tile-sub-title></v-list-tile-sub-title>-->
                        <!--</v-list-tile-content>-->
                        <!--</v-list-tile>-->
                        <!--</v-list>-->
                        <!--</v-list-tile>-->


                    </v-flex>

                </v-flex>
            </v-layout>
        </v-container>
    </div>
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
    .fill-height
        flex-direction column
        height 100%
</style>
