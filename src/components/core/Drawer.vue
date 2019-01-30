<template>
    <v-navigation-drawer
            fixed
            temporary
            v-model="inputValue"
            left
    >
        <!--<v-list>-->
        <!--<v-list-tile>-->
        <!--<v-spacer />-->
        <!--<v-btn aria-label="close-menu"  icon @click="toggleDrawer">-->
        <!--<v-icon>mdi-close</v-icon>-->
        <!--</v-btn>-->
        <!--</v-list-tile>-->
        <!--<v-list-tile-->
        <!--v-for="(item, i) in items"-->
        <!--:key="i"-->
        <!--:to="item.to"-->
        <!--&gt;-->
        <!--<v-list-tile-title v-text="item.text" />-->
        <!--</v-list-tile>-->
        <!--</v-list>-->
        <div
                class="drawer-wrapper"
                :class="{'-show-right': nested.length > 0}"
        >
            <div class="__drawer-left">
                <v-list

                        v-for="(item, i) in items"
                >
                    <v-list-tile
                            v-if="item.nestedPaths && !item.nestedPath"
                            :to="{name: item.name}"
                    >
                        <v-list-tile-title v-text="item.text"/>
                        <v-icon @click="nested=item.nestedPaths">mdi-arrow-right</v-icon>
                    </v-list-tile>
                    <v-list-tile
                            v-else-if="!item.nestedPath"
                            :to="{name: item.name}"
                    >
                        <v-list-tile-title v-text="item.text"/>

                    </v-list-tile>
                </v-list>
            </div>
            <div class="__drawer-right"

            >
                <v-icon large @click="nested = []">mdi-arrow-left</v-icon>
                <h1 class="ml-4 mt-4" v-if="nested.length > 0">{{nested[0].nestedPath}}</h1>
                <v-list

                        v-if="nested.length > 0"
                        v-model="nested"
                        v-for="(item, i) in nested"
                >
                    <v-list-tile
                            class="ml-5"
                            :to="{name: item.name}"
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
                nested: []
            }
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
            },
            items() {
                let filtered = paths.filter(path => !path.noToolbar)
                filtered.forEach((path) => {
                        if (path.nestedPath) {
                            let parentPath = paths.find(p => p.name === path.nestedPath)
                            if (!parentPath.nestedPaths) {
                                parentPath.nestedPaths = []
                            }
                            parentPath.nestedPaths.unshift(path)
                            parentPath.nestedPaths.reverse()
                        }
                    }
                )
                return filtered.filter(path => !path.nestedPath)

            }
        },

        methods: {
            ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
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
