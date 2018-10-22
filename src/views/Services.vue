<template>
  <v-container fill-height>
    <v-layout wrap pb-5>
      <v-flex md4 hidden-sm-and-down>
        <v-card img="/static/feature1.png" height="250px" />
      </v-flex>
      <v-flex xs12 md8 :pl-5="$vuetify.breakpoint.mdAndUp">
        <h2 class="title mb-3" v-text="heading1" />
        <p v-text="headingText1" />
      </v-flex>
      <v-flex xs12 sm8 md6 mb-5 class="py-5">
        <h2 class="title mb-3" v-text="heading2" />
        <p v-text="headingText2a" />
        <p v-text="headingText2b" />
        <p v-text="headingText2c" />
      </v-flex>
      <v-flex xs12>
        <v-layout justify-center>
          <v-flex xs12 sm10 md8>
            <alpha-testimonial
              :author="testimonial.author"
              :title="testimonial.title"
              :quote="testimonial.quote"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import MY_JSON from '../lang/en/Views/Services.json'
  export default {
    metaInfo: {
      title: 'Services',
      meta: [
        { name: 'description', content: 'Customized vue-cli templates for Vue and Vuetify' }
      ]
    },
    data () {
      return MY_JSON
    }
    // computed: {
    //   testimonial () {
    //     return {
    //       //quote: this.$t('Views.Services.testimonial.quote'),
    //       quote: MY_JSON.testimonial.quote,
    //       author: MY_JSON.testimonial.author,
    //       title: MY_JSON.testimonial.title,
    //     }
    //   }
    // }
  }
</script>
