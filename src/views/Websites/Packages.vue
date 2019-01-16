<template>
    <v-container class="-arrow-buffer-top">
        <v-layout column wrap class="title-a">
            <h1 class="mt-5 mb-3 text-lg-center">
                BASELINE PACKAGES
            </h1>
            <h3 class="mb-4 text-lg-center">
                {{ data.subTitle }}
            </h3>
            <p class="text-lg-center">
                {{ data.disclaimer }}
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
                                    lg3
                                    md3
                                    sm6
                                    xs12
                                    v-for="(packageItem, p) in data.items"
                                    :key="p"
                            >
                                <v-card
                                        md6
                                        dark
                                        @mouseover="hoverPackage"
                                        class="elevation-6 column shake-vertical"
                                >
                                    <div class="text-lg-center top-content pt-4 pl-4 pr-4 pb-1">
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
</template>

<script>
    export default {
        data(){
            return {
                resultName: ''
            }
        },
        mounted () {
          let s = 0
          console.log(s)
        },
        computed: {
            data() {
                return this.$t('Views.' + this.getNameSpace())
            }
        },
        methods: {
            hoverPackage () {
                this.resultName = ''
            }
        }
    }
</script>

<style scoped>

</style>