<template>
    <v-layout column wrap class="title-a mt-5 -arrow-buffer-top  -arrow-buffer-bot">
        <v-icon size="150" class="mx-0 --rotate-in-center">mdi-settings</v-icon>
        <h1 class="mt-5 mb-3 text-lg-center">404</h1>
        <h3 class="mb-4 text-lg-center">Opps, looks like we can find what you're looking for</h3>
        <p class="text-lg-center">Go back or hit the home button to regather your bearings :)</p>
        <v-btn primary class="b primary" to="/">HOME</v-btn>
        <v-btn class="b secondary" @click="$router.go(-1)">BACK</v-btn>
    </v-layout>
</template>


<script>
    export default {}
</script>

<style scoped lang="stylus">
    .b
        margin 10px auto
        width: 100px
</style>