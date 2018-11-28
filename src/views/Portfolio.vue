<template>
  <v-layout column wrap class="c-title mt-5 -arrow-buffer-top  -arrow-buffer-bot">
    <v-icon size="150" class="mx-0 --rotate-in-center">mdi-settings</v-icon>
    <h1 class="mt-5 mb-3 text-lg-center">OOPS, LOOKS LIKE WE'RE IN DEVELOPMENT</h1>
    <h3 class="mb-4 text-lg-center">Come back in a week or two and this should all be up and running.</h3>
    <p class="text-lg-center">In the mean time checkout our website pages or get in touch with us via the contact page. :)</p>
  </v-layout>
  <!--<v-container fill-height>-->
    <!--<v-layout justify-center align-center>-->
      <!--<v-flex xs8 class="mb-5">-->
        <!--<alpha-gallery-->
          <!--:categories="categories"-->
          <!--:projects="projects"-->
        <!--/>-->
      <!--</v-flex>-->
    <!--</v-layout>-->
  <!--</v-container>-->
</template>

<script>
  // import content from '../lang/en/Views/Portfolio'
  export default {
      props: {
          loadTickerCount: {
              default: 0,
              type: Number
          }
      },
    computed: {
      categories () {
        return this.$t('Views.Portfolio.categories')
      },
      projects () {
          return this.$t('Views.Portfolio.projects')
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
