<template>
    <div>
        <h1>
            How these useful tools can help with productivity!
        </h1>
        <p>
            One helpful service we can provide for you is in the service of IT Solutions. Now you may be wonder what is that? Well, its a range of software tools that can help you or your team improve productivity, collaboration, and versatility.
        </p>
        <p>
            Personally I’ve been using these tools for more than 10 years now, and they’ve been very helpful in organizing my data, creating quick and easy documents and much much more. By now, you may be wondering what are these tools? Well, they’re made by Google! Yes, that massive multi-billion dollar company that basically own the portal to all the world's information, this means you don’t need to worry about them going out of business any time soon.
        </p>
        <p>
            I can teach you and or your team how to integrate these tools on many devices and set them up in a way that improves the security of all your sensitive information, we don’t want any nasties getting access to that!
        </p>
        <p>
            Some examples of these tools that can be easily shared, stored, accessed, printed, emailed and downloaded are…
        </p>
        <ul>
            <li>Create quick and easy word documents that look good and are super fast to get up and running. </li>
            <li>Build powerful yet easy to use Spread Sheets that can be used for financial documents, stock lists or anything that involves lots of numbers and data. </li>
            <li>Store or back-up your files on the cloud so that anyone who you choose can have access to from any location at any time. </li>
            <li>Create secure group chats or make video calls and easily stay in touch with your team.</li>
            <li>Organize your team and keep them up-to-date through events, milestones, and reminders so that everyone stays on the same page.</li>
            <li>Create work-boards to help your team to organize and prioritize your projects in a fun, flexible and rewarding way.</li>
            <li>Adopt an advanced email system that offers a bunch of cool features to help get you or your team to get through their emails faster with less effort. </li>
        </ul>
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
