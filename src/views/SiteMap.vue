<template>
    <v-container>
        <div class="-arrow-buffer-top" >
        <ul
            v-for="(item, i) in items"
        >
            <li>
                <router-link :to="{name: item.name}">{{item.text}}</router-link>
                <ul
                    v-if="item.nestedItems"
                >

                    <li
                        v-for="(nested, n) in item.nestedItems"
                    >
                        <router-link :to="{name: nested.name}">{{nested.text}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
        </div>
    </v-container>
</template>

<script>
    import paths from '../router/paths'
    export default {
        computed: {
            items(){
                return paths
                let filtered = paths
                filtered.forEach((path) => {
                    path.nestedPaths = null
                })
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
        }
    }
</script>

<style module lang="stylus">
    li
        font-size 18px
</style>