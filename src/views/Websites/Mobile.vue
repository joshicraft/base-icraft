<template>
    <v-flex>
        <div

                class="relative -view-height"
        >
            <ui-section-nav-arrow :index="0" direction="prev"></ui-section-nav-arrow>
            <ui-section-nav-arrow :index="0" direction="next"></ui-section-nav-arrow>
            <v-layout
                    lg12
                    wrap
                    align-center
            >


                <v-flex
                        lg6

                        class="d-flex text-lg-left text-sm-center title-a"
                        :class="'pa-' + ($vuetify.breakpoint.mdAndUp ? '5' : '2')"
                        justify-center
                        column
                >
                    <div class="">
                        <h1 class="mt-0 mb-3">
                            MAKE IT MOBILE FRIENDLY
                        </h1>
                        <h3 class="mb-4 ">
                            Is your current website mobile friendly?
                        </h3>
                        <p class="">
                            If it was built more than 6 years ago that's quite unlikely.
                        </p>
                        <p>
                            Whip out your phone and take a look. If the text is tiny and hard to read, the buttons
                            appear small and are hard to press or the content just doesn't seem right - then it's
                            probably time for an upgrade.
                        </p>
                        <p>
                            In NZ alone 47% of the people visiting your website will be doing it on a mobile or tablet
                            device... That's half your traffic! Think about all those potential customers your business
                            could be missing out on...
                        </p>
                        <p>
                            To find out how we can remedy that you can get in touch with us or learn more about how we make our websites.
                        </p>
                        <div class="mt-5">
                            <v-btn
                                    class="primary ml-0 mr-3"
                                    @click="goToAndScroll('Contact')"
                            >
                                get in touch <v-icon right>mdi-phone</v-icon>
                            </v-btn>
                            <v-btn
                                    class="primary ml-0 mr-3"
                                    @click="goToAndScroll('Websites')"
                            >
                                Learn more
                            </v-btn>
                        </div>
                    </div>
                </v-flex>
                <v-img

                        lazy-src=""
                        src="/static/holding phone.jpg"
                        :class="{'-_arrow-pt': $vuetify.breakpoint.smAndDown}"
                        lg6
                        :alt="'web-1'"
                        class="vid-bg -_grid-img lg6"
                        :height="$vuetify.breakpoint.smAndDown ? '50vh' : '100vh'"
                >
                    <div class="video-wrapper">

                        <video class="fill-height mobile-video" playsinline="" autoplay="autoplay" loop="loop">
                            <source src="/static/video/holding phone.webm" type="video/webm">
                            <source src="/static/video/holding phone.mp4" type="video/mp4">

                        </video>

                    </div>
                </v-img>
            </v-layout>
        </div>
    </div>
    </v-flex>
</template>

<script>
    export default {}
</script>

<style scoped lang="stylus">
    .mobile-video
        left: -21%;
        position: relative;

    .title-a > div
        width 80%
        margin 0 auto
        max-width: 700px;
        padding 60px 0

</style>