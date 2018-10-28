<template>
  <v-app>
    <core-toolbar />

    <core-drawer />

    <core-jumbotron />

    <core-view :class="this.$route.path === '/' ? 'no-pad' : ''" />

    <core-footer />
  </v-app>
</template>
<style lang="stylus">
  .v-content
    padding-top: 64px !important
    padding-bottom: 64px !important
    z-index 1
  .no-pad
    padding-bottom: 0 !important
  .container
    max-width: 1280px
</style>
