<template>
    <v-content>
        <router-view :loadTickerCount="loadTickerCount"/>
    </v-content>
</template>

<script>
    export default {
        metaInfo() {
            return {
                titleTemplate: '%s'
            }
        },
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .v-content
        opacity 0
        transition opacity 0.25s ease-in
        opacity 1
</style>
