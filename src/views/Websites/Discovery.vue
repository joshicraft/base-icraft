<template>
    <v-container class="-arrow-buffer-top">
        <div class="fixed-content-bg"  :style="{'backgroundColor' : secondBGColor}">

        </div>
        <v-container>
            <v-layout column wrap class="title-a white--text">
                <h1 class="mt-5 mb-3 text-lg-center">
                    {{data.title}}
                </h1>
                <h3 class="mb-4 text-lg-center">
                    {{data.subTitle}}
                </h3>
                <p class="mt-3 text-lg-center">
                    {{data.subSubTitle}}
                </p>
            </v-layout>
        </v-container>
        <v-layout>
            <v-flex
                    lg12
                    pa-2
                    class="fill-height scroll-y d-flex theme--dark questions-wrapper"
                    :class="{'pa-5' : $vuetify.breakpoint.mdAndUp}"
            >
                <!--<v-card dark height="100vh" class="elevation-0">-->
                <v-flex
                        align-center
                        justify-center
                        class="d-flex fill-height _questions-bg"
                        height="100vh"
                >
                    <custom-questions :data="data.data" :matches="packages"></custom-questions>
                </v-flex>
                <!--</v-card>-->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        computed: {

            data() {
                return this.$t('Views.' + this.getNameSpace())
            },
            packages() {
                return this.$t('Views.Websites.Packages.items')
            }
        }
    }
</script>

<style scoped>

</style>