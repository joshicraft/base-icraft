<template>
  <v-content>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-content>
</template>

<script>
  export default {
    metaInfo () {
        console.log(this.$route.name)
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
