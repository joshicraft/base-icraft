<template>
    <v-content>
        <router-view :loadTickerCount="loadTickerCount"/>
    </v-content>
</template>

<script>
    export default {
        metaInfo() {
            return {
                titleTemplate: '%s',
                meta: [
                    // { name: 'description', content: '%s', vmid: 'description' }
                ]
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
</style>
