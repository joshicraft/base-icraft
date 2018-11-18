<template>
  <alpha-footer
    :company="content.company"
    :social="social"
    :categories="categories"
  >
    <span>
      &copy; 2017
      {{ content.company }}
      &mdash;
      {{ content.rights }}
    </span>
  </alpha-footer>
</template>

<script>
  export default {
    computed: {
        content () {
            return this.$t('Layout.Footer')
        },
      social () {
        return this.$t('Layout.Footer.social')
        // return this.bakedLayout.Footer.social
      },
      categories () {
        return this.$t('Layout.Footer.categories')
        // return $t('Layout.Footer.categories')
      }
    }
  }
</script>
