<template>
    <v-content id="view">
        <div class="jumbo-bot-arrow top">
            <svg viewBox="0,0,500,100" preserveAspectRatio="none">
                <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
                <!--<polygon fill="#fafafa" points="0,0 0,100 250,50 500,100 500,0 250,50"></polygon>-->
            </svg>
        </div>

        <router-view v-if="scrolled" :loadTickerCount="loadTickerCount"/>
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
            scrolled: Boolean,
            loadTickerCount: {
                default: 0,
                type: Number
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .v-content
        min-height 100vh
        opacity 0
        transition opacity 0.25s ease-in
        opacity 1
</style>
