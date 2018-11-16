<template>
  <v-content>
      <router-view />
  </v-content>
</template>

<script>
  export default {
    metaInfo () {
      return {
        titleTemplate: '%s'
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .v-content
    /*background #438ccb;*/
</style>
