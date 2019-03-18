<template>
    <div class="Home">
    </div>
</template>

<script>
    export default {}
    // import { mapActions, mapState } from 'vuex';
    //
    // import { GET_LANDING_PAGE } from '../../store/action-types';
    // import { HOME } from '../../models/landing-page';
    // import landingPage from '../../store/modules/landing-page';
    //
    // const STORE_NAMESPACE = 'landingPage/home';
    //
    // export default {
    //     name: 'Home',
    //     computed: {
    //         ...mapState(STORE_NAMESPACE, [
    //             'intro',
    //             'title',
    //         ]),
    //     },
    //     created() {
    //         // Dynamically register the landing page store module in
    //         // a custom namespace which is only used by this component.
    //         this.$store.registerModule(STORE_NAMESPACE, landingPage);
    //
    //         // Do not fetch data again if it has been fetched already.
    //         if (this.$store.state[STORE_NAMESPACE].id) return;
    //
    //         this.getLandingPage(HOME);
    //     },
    //     methods: {
    //         ...mapActions(STORE_NAMESPACE, {
    //             getLandingPage: GET_LANDING_PAGE,
    //         }),
    //     },
    // };
</script>

<style scoped>

</style>