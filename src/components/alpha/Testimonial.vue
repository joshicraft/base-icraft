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
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      author: String,
      dark: Boolean,
      quote: String,
      title: String
    }
  }
</script>

