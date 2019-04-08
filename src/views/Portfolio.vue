<template>
    <div v-if="inDevelopment" id="cube-wrapper">
        <custom-cube></custom-cube>
    </div>
    <div v-else>
        <error-in-development></error-in-development>
    </div>
</template>

<script>
    // import content from '../lang/en/Views/Portfolio'
    export default {
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        computed: {
            categories() {
                return this.$t('Views.Portfolio.categories')
            },
            projects() {
                return this.$t('Views.Portfolio.projects')
            }
        },
        methods: {
            loadLimit(i) {
                return this.loadTickerCount <= i
            },
            loadPoint(i) {
                return this.loadTickerCount >= i
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #cube-wrapper
        background: black
        /*padding: 12vh 0;*/

</style>
