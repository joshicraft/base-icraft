<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs8 class="mb-5">
        <alpha-gallery
          :categories="categories"
          :projects="projects"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import content from '../lang/en/Views/Portfolio'
  export default {
      metaInfo: {
          title: content.headTitle,
          meta: [
              {name: 'description', content: content.headDescription}
          ]
      },
      props: {
          loadTickerCount: {
              default: 0,
              type: Number
          }
      },
    computed: {
      categories () {
        return content.categories
      },
      projects () {
          return content.projects
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
