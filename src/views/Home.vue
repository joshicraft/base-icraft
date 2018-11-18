<template>
    <div >
        <v-img
                :alt="item.img"
                v-for="(item, i) in items"
                :key="i"
                v-if="loadPoint(i)"
                :src="imgC(item.img)"
                height="75vh"

        >

            <v-container>

                <v-layout align-center ml-5 mt-3>
                    <v-flex lg6 pa-5 :v-scroll="scrollT">
                        <div

                        >
                        <h1 class="mb-4 display-2 font-weight-bold">{{item.title}}</h1>
                        <h3 class="mb-4 display-1">{{item.text}}</h3>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <alpha-hero
                v-if="loadPoint(items.length)"
                :src="imgC('testimonial')"
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
    import content from '../lang/en/Views/Home'
    export default {
        metaInfo: {
            title: content.headTitle,
            meta: [
                {
                    name: 'description',
                    content: content.headDescription
                }
            ]
        },
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        mounted() {

        },
        data() {
            return {
                items: content.items,
                currentIndex: 0,
                length: 3,
                onboarding: 0
            }
        },
        methods: {
            scrollT (e) {
                let sT = e.target.getBoundingClientRect().y

                if (sT < window.innerHeight / 2 && !e.target.scrollTriggered) {
                    e.target.scrollTriggered = true
                    TweenMax.from(e.target, 0.4, {y: 20, autoAlpha: 0})
                }
              console.log('s')
            },
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
            cardFeatures() {
                return content.cardFeatures
            },
            testimonials() {
                return content.testimonials
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
