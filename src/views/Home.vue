<template>
    <div>

        <v-container fill-height>
            <v-layout
                    justify-center
                    align-center
                    wrap
            >
                <h1 class="mb-5">WORK IN PROGRESS</h1>
                <v-flex xs12 mb-5>
                    <alpha-card-feature :features="cardFeatures"/>
                </v-flex>
                <v-flex xs12 mb-3>
                    <h2>{{ $t('Views.Home.testimonialsTitle') }}</h2>
                </v-flex>
            </v-layout>
        </v-container>


        <alpha-hero
                src="/static/testimonial-bg-4.jpg"
                :height="$vuetify.breakpoint.mdAndUp ? 500 : 'auto'"
                :jumbotron="false"
                dark
                class="mt-5"
        >
            <custom-background-vector position="top" :top="false"></custom-background-vector>
            <custom-background-vector changeFill="st3" :top="false"></custom-background-vector>

            <v-container
                    fill-height
                    grid-list-xl
            >
                <v-layout
                        align-center
                        justify-space-around
                        wrap

                >
                    <v-flex
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
                    <!--<v-window v-model="onboarding" :cycle="true">-->
                        <!--<v-window-item-->
                                <!--xs12-->
                                <!--sm6-->
                                <!--v-for="(testimonial, i) in testimonials"-->
                                <!--:key="i"-->
                        <!--&gt;-->
                            <!--<v-layout-->
                                    <!--align-center-->
                                    <!--justify-center-->
                                    <!--fill-height-->
                                    <!--tag="v-card-text"-->
                            <!--&gt;-->
                                <!--<alpha-testimonial-->
                                        <!--:author="testimonial.author"-->
                                        <!--:title="testimonial.title"-->
                                        <!--:quote="testimonial.quote"-->
                                <!--/>-->
                            <!--</v-layout>-->
                        <!--</v-window-item>-->
                    <!--</v-window>-->
                </v-layout>
            </v-container>
        </alpha-hero>
    </div>
</template>

<script>
    import CONTENT from '../lang/en/Views/Home.json'

    export default {
        metaInfo: {
            title: 'Anderson Air Conditioning & Electrical',
            meta: [
                {
                    name: 'description',
                    content: 'Top Quality Electrician and Air Conditioning Services situated in the greater Auckland region.'
                }
            ]
        },
        data() {
            return {
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
            }
        },
        computed: {
            cardFeatures() {
                return CONTENT.cardFeatures
            },
            testimonials() {
                return CONTENT.testimonials
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
