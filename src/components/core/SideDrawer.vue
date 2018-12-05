<template>
    <div  v-if="items.length > 0">
        <div class="fixed temporary" @click="mini = true" v-if="!mini"></div>

    <v-navigation-drawer
            id="nav-drawer"

            :mini-variant.sync="mini"
            v-model="drawer"
            dark
            fixed
    >

        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <custom-logo></custom-logo>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>ICRAFT - {{this.namespace()}}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                                icon
                                @click.stop="mini = !mini"
                        >
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile

                    v-for="item in items"
                    :key="item.title"
                    class="pointer pa-0"
                    @click=""
            >
                <v-list-tile-action class="pa-0">
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content @click="goToItem(item)">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                drawer: true,
                mini: true
            }
        },
        methods: {
            namespace() {
                return this.$route.name || 'Home'
            },
            goToItem (item) {
                this.$vuetify.goTo('#' + item.name, {offset: -150})
                this.mini = true
            }
        },
        computed: {
            temporary () {
              return !this.mini
            },
            items() {
                let items = this.$t('Views.' + this.namespace() + '.contents')
                if (items.constructor === Array) {
                    return items
                } else {
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="stylus">

.v-navigation-drawer
    z-index 5

.fixed.temporary
    position fixed
    width 100vw
    height 100vh
    z-index: 4;
    background: rgba(0,0,0,0.6);
</style>
