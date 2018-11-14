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
                    <h2>{{ this.bakedViews.Home.testimonialsTitle }}</h2>
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
                </v-layout>
            </v-container>
        </alpha-hero>
    </div>
</template>

<script>
    export default {
        metaInfo: {
            title: 'ICRAFT - Design, Websites, Branding - Located in Franklin, South Auckland.',
            meta: [
                {
                    name: 'description',
                    content: 'Top Quality Electrician and Air Conditioning Services situated in the greater Auckland region.'
                }
            ]
        },
        mounted () {
            return new Promise((resolve, reject) => {
                let api = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '/.netlify/functions'
                fetch(api + '/image-mod', {
                    method: 'POST',
                    body: data
                }).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
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
                return this.bakedViews.Home.cardFeatures
            },
            testimonials() {
                return this.bakedViews.Home.testimonials
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
