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

<style lang="stylus">
  .v-parallax--dark,
  .v-parallax--light
    .v-parallax__image-container:after
      bottom: 0
      content: ''
      position: absolute
      left: 0
      right: 0
      top: 0
      z-index: 1

  .v-parallax
    &--light &__image-container:after
      background: linear-gradient(to top, rgba(#fff, .8), rgba(#fff, .9))
      // background: #000000; /* Old browsers */
      // background: -moz-radial-gradient(center, ellipse cover, rgba(13, 10, 13, .85) 0%, #e5e5e5 100%); /* FF3.6-15 */
      // background: -webkit-radial-gradient(center, ellipse cover, rgba(13, 10, 13, .85) 0%,#e5e5e5 100%); /* Chrome10-25,Safari5.1-6 */
      // background: radial-gradient(ellipse at center, #000000 0%,#e5e5e5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

    &--dark &__image-container:after
        // background: #000000; /* Old browsers */
        // background: -moz-radial-gradient(center, ellipse cover, rgba(13, 10, 13, .45)  0%, rgba(200, 200, 200, .85) 100%); /* FF3.6-15 */
        // background: -webkit-radial-gradient(center, ellipse cover, rgba(13, 10, 0, .65) 0%, rgba(200, 200, 200, .85) 100%); /* Chrome10-25,Safari5.1-6 */
        // background: radial-gradient(ellipse at center, rgba(0, 0, 0, .75) 20%, rgba(200, 200, 200, .85) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

        background: linear-gradient(to top, rgba(10, 10, 10, .85) 0%, rgba(10, 10, 10, .9) 50%, rgba(10, 10, 10, .85) 100%)
</style>
