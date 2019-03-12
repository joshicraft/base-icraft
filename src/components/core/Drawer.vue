<template>
    <v-navigation-drawer
            fixed
            temporary
            v-model="inputValue"
            left
    >
        <div
                class="drawer-wrapper"
                :class="{'-show-right': selected.length > 0}"
        >
            <div class="__drawer-left">
                <v-list
                        v-if="!item.noToolbar"
                        v-for="(item, i) in items"

                >
                    <template
                            v-if="!item.noToolbar"
                    >
                        <v-list-tile
                                v-if="item.nestedItems"
                                :aria-label="item.name + '-drawer'"
                                :to="{name: item.name}"
                                exact
                        >
                            <v-list-tile-title v-text="item.text"/>
                            <v-icon @click="selected=item.nestedItems">mdi-arrow-right</v-icon>
                        </v-list-tile>
                        <v-list-tile
                                :aria-label="item.name + '-drawer'"
                                v-else-if="!item.nestedItems"
                                :to="{name: item.name}"
                                exact
                        >
                            <v-list-tile-title v-text="item.text"/>

                        </v-list-tile>
                    </template>
                </v-list>
            </div>
            <div class="__drawer-right"

            >
                <v-icon large @click="selected = []">mdi-arrow-left</v-icon>
                <h1 class="ml-4 mt-4" v-if="selected.length > 0">{{selected[0].nestedPath}}</h1>
                <v-list

                        v-if="selected.length > 0 && !item.noToolbar"
                        v-model="selected"
                        v-for="(item, i) in selected"
                >
                    <v-list-tile
                            class="ml-5"
                            :to="{name: item.name}"
                            :aria-label="item.name + '-drawer'"
                    >
                        <v-list-tile-title  v-text="item.text"/>
                    </v-list-tile>
                </v-list>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script>
    // Utilities
    import {mapMutations} from 'vuex'
    import links from '../../lang/en/Layout/Drawer'
    import paths from '../../router/paths'

    export default {
        data() {
            return {
                selected: [],
                items: []
            }
        },
        mounted () {
          this.items = this.getItems()
        },
        computed: {
            visible() {
                return this.$store.state.app.drawer
            },
            inputValue: {
                get() {
                    return this.$store.state.app.drawer
                },
                set(val) {
                    this.setDrawer(val)
                }
            }
        },

        methods: {
            ...mapMutations('app', ['setDrawer', 'toggleDrawer']),

            getItems() {
                return paths
            }
        }
    }
</script>

<style scoped lang="stylus">
    .v-navigation-drawer
        overflow visible
        overflow-y: scroll
        overflow-x: hidden
        .v-list
            background #f7f7f7

    .drawer-wrapper
        /*display: flex*/
        /*flex-direction row*/
        position: relative;
        left 0
        transition left 0.3s ease-out

    .__drawer-right
        position: absolute;
        width 100%
        left: 100%
        top 0

    .-show-right
        left: -100%
</style>
