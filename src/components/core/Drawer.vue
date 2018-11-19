<template>
  <v-navigation-drawer
    fixed
    temporary
    v-model="inputValue"
    left
  >
    <v-list>
      <v-list-tile>
        <v-spacer />
        <v-btn aria-label="close-menu"  icon @click="toggleDrawer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-tile>
      <v-list-tile
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
      >
        <v-list-tile-title v-text="item.text" />
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { mapMutations } from 'vuex'
  import links from '../../lang/en/Layout/Drawer'

  export default {
    computed: {
      visible () {
          return this.$store.state.app.drawer
      },
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      },
      items () {
        return links
      }
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
    }
  }
</script>

<style scoped lang="stylus">
  .v-navigation-drawer
    overflow visible
</style>
