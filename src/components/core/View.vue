<template>
    <v-content>
        <div class="jumbo-bot-arrow top">
            <svg viewBox="0,0,500,100" preserveAspectRatio="none">
                <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
                <!--<polygon fill="#fafafa" points="0,0 0,100 250,50 500,100 500,0 250,50"></polygon>-->
            </svg>
        </div>
        <v-layout
                v-if="namespace()"
                column
                wrap
                class="c-title mt-5 -arrow-buffer-top  -arrow-buffer-bot"
        >
            <v-icon size="150" class="mx-0 --rotate-in-center">mdi-settings</v-icon>
            <h1 class="mt-5 mb-3 text-lg-center --rotate-in-center">OOPS, LOOKS LIKE WE'RE IN DEVELOPMENT</h1>
            <h3 class="mb-4 text-lg-center">Come back in a week or two and this should all be up and running.</h3>
            <p class="text-lg-center">In the mean time checkout our website pages or get in touch with us via the contact page. :)</p>
        </v-layout>
        <router-view v-else :loadTickerCount="loadTickerCount"/>
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
        },
        methods: {
            namespace () {
                console.log('ssssss')
                return this.$t('Views.' + (this.$route.name || 'Home') + '.developing')
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
