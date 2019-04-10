<template>
  <div
    class="alpha-testimonial align-center justify-space-around"
    :class="[dark ? 'alpha-testimonial--dark' : '']"
  >
    <div class="alpha-testimonial__content">
      <v-icon
        x-large
        class="primary--text"
        :dark="dark"
      >mdi-format-quote-open</v-icon>
      <p v-text="quote" />
    </div>
    <footer>
      <div
        class="alpha-testimonial__footer-bar"
        :class="[dark ? 'white' : 'primary']"
      />
      <div class="headline" v-text="author" />
      <div class="title" v-text="title" />
      <p class="mb-1">{{rating}} - Stars</p>
      <v-rating class="mt-2" v-model="rating" color="yellow darken-3" readonly half-increments></v-rating>
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      author: String,
      dark: Boolean,
      quote: String,
      rating: Number,
      title: String
    }
  }
</script>

