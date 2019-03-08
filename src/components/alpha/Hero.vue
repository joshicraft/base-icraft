<template>
  <div>
    <v-parallax
            height="100vh"
            :src="src"
            :class="classes"
            :alt="src"
    >
      <slot name="default" />
    </v-parallax>
    <!--<parallax :speed-factor="0.3">-->
      <!--<img src="https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg">-->
    <!--</parallax>-->

  </div>

</template>

<script>
  export default {
    name: 'alpha-hero',

    props: {
      src: String,
      dark: Boolean,
      height: {
        type: [Number, String],
        default: '100vh'
      },
      light: Boolean
    },
    computed: {
      classes () {
        return {
          'v-parallax--dark': this.dark,
          'v-parallax--light': this.light
        }
      }
    }
  }
</script>

