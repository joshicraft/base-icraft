<template>
  <alpha-footer
    :company="this.bakedLayout.Footer.company"
    :social="social"
    :categories="categories"
  >
    <span>
      &copy; 2017
      {{ this.bakedLayout.Footer.company }}
      &mdash;
      {{ this.bakedLayout.Footer.rights }}
    </span>
  </alpha-footer>
</template>

<script>
  export default {
    computed: {
      social () {
        // return this.$t('Layout.Footer.social')
        return this.bakedLayout.Footer.social
      },
      categories () {
        // return this.$t('Layout.Footer.categories')
        return this.bakedLayout.Footer.categories
      }
    }
  }
</script>
