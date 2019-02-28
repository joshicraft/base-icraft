<template>
    <div class="-arrow-buffer-top -arrow-buffer-bot">
        <v-layout class="pa-5">
            <v-flex class="title-a">
                <h1 class="mb-4">
                    How these useful tools can help with productivity!
                </h1>
                <p>
                    ICRAFT can provide your business with a range of software tools that can help you or your team improve productivity, collaboration, and versatility.
                </p>
                <p>
                    I’ve been using these tools for many years for organizing my data, creating quick and easy documents and much much more. These are world renowned Google products, supported by billions of dollars worth of investment.
                </p>
                <p>
                    I can personally coach you and or your team how to integrate these products on multiple devices and set them up in a way that improves the security of all your sensitive information.
                </p>
                <p>
                    ICRAFT is committed to protecting your information.
                </p>
                <p>
                    Some examples of these tools that can be easily shared, stored, accessed, printed, emailed and
                    downloaded are…
                </p>
                <ul class="mt-5">
                    <li>Create quick and easy word documents that look good and are super fast to get up and running.
                    </li>
                    <li>Build powerful yet easy to use Spread Sheets that can be used for financial documents, stock
                        lists or anything that involves lots of numbers and data.
                    </li>
                    <li>Store or back-up your files on the cloud so that anyone who you choose can access from
                        any location at any time.
                    </li>
                    <li>Create secure group chats or make video calls and easily stay in touch with your team.</li>
                    <li>Organize your team and keep them up-to-date through events, milestones, and reminders so that
                        everyone stays on the same page.
                    </li>
                    <li>Create work-boards to help your team to organize and prioritize your projects in a fun, flexible
                        and rewarding way.
                    </li>
                    <li>Adopt an advanced email system that offers a bunch of cool features to help get you or your team
                        to get through their emails faster with less effort.
                    </li>
                </ul>
                <p class="mt-5">
                    If you want to know more about how these services can help you, click the button below and get in touch with us today.
                </p>
                <v-btn
                        @click="goToAndScroll('Contact')"
                        class="ml-0 mt-4 primary"
                >
                    get in touch
                    <v-icon right>mdi-phone</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    // import content from '../lang/en/Views/ItSolutions'
    export default {
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        computed: {
            items() {
                return this.$t('Views.ItSolutions.items')
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

    li
        margin-left 15px
        margin-bottom 10px
        font-style italic
        font-size 15px
</style>
