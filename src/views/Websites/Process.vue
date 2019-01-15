<template>
    <div class="timeline-wrap _bg-color-b" id="process">
        <v-container>
            <v-layout column wrap class="title-a">
                <h1 class="mt-5 mb-3 text-lg-center">
                    OUR PROCESS
                </h1>
                <h3 class="mb-4 text-lg-center">
                    6 Steps for Success.
                </h3>
                <p class="text-lg-center">
                    We follow these steps so our end product meets your requirements.
                </p>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout>
                <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                    <template v-for="(feature, k) in items">
                        <custom-timeline-piece :data="feature" :index="k"></custom-timeline-piece>
                    </template>
                </v-timeline>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
       data() {
           return {
               items: this.$t('Views.Websites.Process.items')
           }
       }
    }
</script>

<style scoped>

</style>