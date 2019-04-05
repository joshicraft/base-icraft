<template>
    <div>
        <v-layout
                v-for="(item, i) in items"
                :key="i"
        >
            <home-section v-if="loadPoint(i-1)"
                          :item="item" :i="i"></home-section>

        </v-layout>
        <div class="relative">
            <div class="jumbo-bot-arrow">
                <svg viewBox="0,0,500,100" preserveAspectRatio="none">
                    <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
                </svg>
            </div>
        </div>
        <v-img
                class="c-box-shadow"
                height="100vh"
                v-if="loaded"
                :src="imgC('testimonial')"
                dark
        >
            <div class="bg-darken"></div>
            <v-container
                    fill-height
                    grid-list-xl
                    class="-arrow-buffer-top"

            >
                <v-layout
                        align-center
                        justify-space-around
                        wrap

                >
                    <v-flex
                            dark
                            md6
                    >
                        <v-carousel hide-delimiters hide-controls class="testimonial-carousel">
                            <v-carousel-item
                                    v-for="(testimonial, i) in testimonials"
                                    :key="i"
                                    :interval="8000"
                                    align-center
                                    justify-space-around
                                    class="elevation-0 align-center justify-space-around"
                            >

                                <alpha-testimonial
                                        dark
                                        :author="testimonial.author"
                                        :title="testimonial.title"
                                        :quote="testimonial.quote"
                                />

                            </v-carousel-item>
                        </v-carousel>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <div class="relative">
            <div class="jumbo-bot-arrow">
                <svg viewBox="0,0,500,100" preserveAspectRatio="none">
                    <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
                </svg>
            </div>
        </div>
        <v-layout class="-view-height -arrow-buffer-top -arrow-buffer-bot">
            <custom-faq></custom-faq>
        </v-layout>
    </div>
</template>

<script>
    import HomeSection from '../components/custom/HomeSection'

    export default {
        components: {HomeSection},
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        data() {
            return {
                items: this.$t('Views.Home.items'),
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
