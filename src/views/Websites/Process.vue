<template>
    <div class="timeline-wrap _bg-color-b -arrow-buffer-top" id="process">

        <v-container>
            <v-layout column wrap class="title-a">
                <h1 class="mt-5 mb-3 text-lg-center">

                    {{data.title}}
                </h1>
                <h3 class="mb-4 text-lg-center">

                    {{data.subTitle}}
                </h3>
                <p class="text-lg-center">
                    {{data.subSubTitle}}
                    We follow these steps so our end product meets your requirements.
                </p>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout>
                <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                    <template v-for="(feature, k) in data.items">
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
               data: this.$t('Views.Websites.Process')
           }
       }
    }
</script>

<style scoped lang="stylus">
    .v-timeline
        /*padding-top 150px*/
        padding-bottom 150px

    .timeline-wrap
        /*padding-top 0*/
        padding-bottom 0
</style>