<template>
    <div>
        <v-layout
                v-for="(item, i) in items"
                :key="i"
        >
            <custom-home-section
                    v-if="loadPoint(i-1)"
                    stagger
                    :item="item" :i="i"
                    wide="true"
                    :first="i===0"
            ></custom-home-section>

        </v-layout>
    </div>
</template>

<script>
    // import HomeSection from '../../components/custom/HomeSection'

    export default {
        // components: {HomeSection},
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        data() {
            return {
                items: this.$t('Views.Websites.WhyWebsites.items'),
                currentIndex: 0,
                length: 3,
                onboarding: 0,
                loaded: false
            }
        },
        mounted() {
            let $t = this
            setTimeout(() => {
                $t.loaded = true
            }, 800)
        },

        methods: {
            next() {
                this.onboarding = this.onboarding + 1 === length
                    ? 0
                    : this.onboarding + 1
            },
            prev() {
                this.onboarding = this.onboarding - 1 < 0
                    ? this.length - 1
                    : this.onboarding - 1
            },
            loadLimit(i) {
                return this.loadTickerCount <= i
            },
            loadPoint(i) {
                return this.loadTickerCount >= i
            }
        },
        computed: {
            testimonials() {
                return this.$t('Testimonials.testimonials')
            }
        }
    }
</script>

<style scoped lang="stylus">
    .bg-darken
        background rgba(0, 0, 0, 0.7)
        position absolute
        pointer-events none
        width: 100%
        height 100%

    .v-carousel
        box-shadow none


</style>
