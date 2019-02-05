<template>
    <!--<error-in-development></error-in-development>-->
    <div class="relative">

        <v-flex
        >
            <div id="intro" class="relative -view-height _bg-color-a">
                <ui-section-nav-arrow :index="2" direction="prev"></ui-section-nav-arrow>
                <ui-section-nav-arrow :index="2" direction="next"></ui-section-nav-arrow>

                <v-layout
                        lg12
                        wrap
                        align-center
                >
                    <v-img
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :alt="'web-1'"
                            :src="imgC('b-card')"
                            :lazy-src="imgC('b-card', false, false, true)"
                            height="100vh"
                    >

                    </v-img>

                    <v-flex column wrap lg6 class="title-a d-flex text-lg-left text-sm-center">
                        <div>
                            <h1 class="mt-0 mb-3">
                                IN NEED OF SOME BRANDED ITEMS?
                            </h1>
                            <h3 class="mb-4">
                                We can provide a wide range of branded content creation or advertisement material.
                            </h3>
                            <p>
                                These include things like Logos, Flyer's, Menus, Business Cards, Banners and much much
                                more. For a list of the services available click SERVICES, otherwise get in touch to
                                find out more.
                            </p>
                            <div class="mx-auto">
                                <v-btn
                                        @click="$vuetify.goTo('#services')"
                                        class="primary ml-0"
                                >
                                    Services
                                </v-btn>
                                <v-btn
                                        @click="goToAndScroll('Contact')"
                                        class="primary ml-0"
                                >
                                    Get in touch
                                    <v-icon right>mdi-phone</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-flex>

                </v-layout>
            </div>

            <div id="services" class="relative -view-height _bg-color-a">
                <ui-section-nav-arrow :index="2" direction="prev"></ui-section-nav-arrow>
                <ui-section-nav-arrow :index="2" direction="next"></ui-section-nav-arrow>

                <v-layout
                        lg12
                        wrap
                        align-center
                >


                    <v-flex column wrap lg6 class="title-a d-flex text-lg-left text-sm-center">
                        <div>
                            <h1 class="mt-0 mb-3">
                                OUR BRANDING SERVICES
                            </h1>
                            <h3 class="mb-4">Giving you an idea of the content we can create for you.</h3>
                            <v-flex class="d-flex" row wrap>
                                <ul class="lg6">
                                    <li>
                                        Logo's & business branding
                                    </li>
                                    <li>
                                        Business card's, Letterheads
                                    </li>
                                    <li>

                                        Flyer's, Brochure's Tri-fold's
                                    </li>
                                    <li>

                                        Magazine & Newspaper Adverts
                                    </li>
                                    <li>

                                        Invitations
                                    </li>

                                </ul>
                                <ul class="lg6">
                                    <li>
                                        Product packaging
                                    </li>
                                    <li>

                                        Infographic's
                                    </li>
                                    <li>

                                        Facebook banners
                                    </li>
                                    <li>

                                        Photo touch-ups
                                    </li>
                                    <li>

                                        Posters & signage
                                    </li>
                                    <li>

                                        Marketing Collateral
                                    </li>
                                </ul>
                            </v-flex>
                            <p class="mt-3">
                                To find out more about these services, get in touch with us today so we can find the
                                right solution for you.
                            </p>
                            <div class="mx-auto">
                                <v-btn
                                        @click="goToAndScroll('Contact')"
                                        class="primary ml-0"
                                >
                                    Get in touch
                                    <v-icon right>mdi-phone</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-flex>
                    <v-img
                            v-if="$vuetify.breakpoint.smAndUp"
                            lg6
                            :alt="'branding image'"
                            :src="imgC('branding')"
                            :lazy-src="imgC('branding', false, false, true)"
                            height="100vh"
                    >

                    </v-img>
                </v-layout>
            </div>


        </v-flex>
    </div>

</template>

<script>
    // import content from '../lang/en/Views/Branding'
    export default {
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        computed: {
            items() {
                return this.$t('Views.Branding.items')
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

<style lang="stylus">
    .v-list__group__header__append-icon
        .v-icon
            background #5a5a5a
            border-radius 30px
</style>
<style lang="stylus" scoped>
    /*.max-view-width*/
    /*width 100% !important*/
    .title-a > div
        width 80%
        margin 0 auto
        max-width: 537px;
        padding 5vh 0

    .title-a > div
        padding 10vh 0


    ul
        width 50%

    .pack-img
        max-height: 450px

    .column
        /*min-height 300px*/
        flex-direction column
        position: relative;

        .top-content
            text-align center
            min-height: 300px

    .relative
        position: relative;

    .z1
        position: relative
        z-index 1

    .top-content
        h3, p
            font-weight 100

    .title-1
        max-width 62%

        h1
            font-size: 2.5em

        h2
            font-size: 2em

        h3
            font-size: 1.5em

        p
            font-size: 1em

    .bg-gradient
        z-index: 0
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events none

    .bg-gradient
        background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(100, 100, 100, 0.7) 100%);
</style>
