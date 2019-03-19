<template>
    <alpha-footer
            :company="content.company"
            :links="links"
            :categories="categories"
    >
    <span>
      &copy; 2019
      {{ content.company }}
      &mdash;
      {{ content.rights }}
    </span>

    </alpha-footer>
</template>

<script>
    export default {
        computed: {
            content() {
                return this.$t('Layout.Footer')
            },
            links() {
                return this.$t('Layout.Footer.links')
                // return this.bakedLayout.Footer.social
            },
            categories() {
                return this.$t('Layout.Footer.categories')
                // return $t('Layout.Footer.categories')
            }
        }
    }
</script>


