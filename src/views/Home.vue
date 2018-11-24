<template>
    <div >
        <v-layout
                  v-for="(item, i) in items"
                  :key="i"
                  >
            <home-section v-if="loadPoint(i)"
                          :item="item" :i="i"></home-section>

        </v-layout>
        <div class="relative">
        <div class="jumbo-bot-arrow">
            <svg viewBox="0,0,500,100" preserveAspectRatio="none">
                <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
            </svg>

        </div>
        </div>
        <alpha-hero
                alt="testimonial picture"
                v-if="loadPoint(items.length)"
                :src="imgC('testimonial')"
                :jumbotron="false"
                dark>
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
                                    :src="testimonial.src"
                                    :interval="8000"
                                    align-center
                                    justify-space-around
                                    class="elevation-0 align-center justify-space-around"
                            >

                                <alpha-testimonial
                                        :author="testimonial.author"
                                        :title="testimonial.title"
                                        :quote="testimonial.quote"
                                />

                            </v-carousel-item>
                        </v-carousel>
                    </v-flex>
                </v-layout>
            </v-container>
        </alpha-hero>
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
                onboarding: 0
            }
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
                return this.$t('Views.Home.testimonials')
            }
        }
    }
</script>

<style lang="stylus">
    .testimonial-carousel .v-responsive__content
        justify-content center
        align-items center
        display flex
</style>

<style lang="stylus" scoped>
    .v-carousel
        box-shadow none


</style>
