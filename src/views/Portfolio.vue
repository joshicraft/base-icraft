<template>
    <div id="cube-wrapper">
        <custom-cube></custom-cube>
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
        padding: 12vh 0;

</style>

<style lang="stylus">
    .shadow
        -moz-box-shadow inset 0px 1px 3px #5d5d5d
        -webkit-box-shadow inset 0px 1px 3px #5d5d5d
        box-shadow inset 0px 1px 3px #5d5d5d

    #cube .--active
        opacity: 1 !important

</style>