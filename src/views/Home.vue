<template>
    <div>
        <v-img

                src="/static/web-3.jpg"
                height="100vh"

        >

            <v-container >

                <v-layout align-center ml-5 mt-3>
                    <v-flex lg6 pa-5>
                        <h1 class="mb-4 display-2 font-weight-bold">LOOKING TO UPGRADE YOUR DIGITAL PRESENCE?</h1>
                        <h3 class="mb-4 display-1">Here at ICRAFT we provide a range of solutions to help you get online
                            and get noticed.</h3>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <v-img

                src="/static/web-4.jpg"
                height="100vh"

        >

            <v-container >

                <v-layout align-center justify-center ml-5 mt-5>
                    <v-flex lg6 pa-5 mt-5 mr-5>
                        <h1 class="mb-4 mt-3 display-2 font-weight-bold">STUNNING, FAST AND SECURE WEBSITES</h1>
                        <h3 class="mb-4 display-1">ICRAFTS Top Quality websties are hand crafted to support your brand. They use the latest tech and design trends to keep your visitors engaged.
                            </h3>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <v-img

                src="/static/web-2.jpg"
                height="100vh"

        >

            <v-container >

                <v-layout align-center justify-flex-end ml-5 mt-3>
                    <v-flex lg6 pt-4 pl-5 pb-4 ml-5>
                        <h1 class="mb-4 display-2 font-weight-bold">CAPTIVATING DIGITAL MARKETING</h1>
                        <h3 class="mb-4 display-1">ICRAFT can help your customers find you and keep engaged with your business.
                            </h3>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <alpha-hero
                src="/static/testimonial.jpg"
                :height="$vuetify.breakpoint.mdAndUp ? 500 : 'auto'"
                :jumbotron="false"
                dark>
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
        mounted() {

        },
        data() {
            return {
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
