<template>
  <v-fade-transition mode="out-in">
    <v-img
      v-if="namespace"
      :key="$route.path"
      :src="heroImage"
      class="jumbo-wrap"
      gradient="to top, rgba(100, 90, 70, .95), rgba(30, 40, 30, .95)"
    >
      <v-fade-transition mode="out-in">
        <v-container
          fill-height
          :key="$route.path"
          v-if="isBooted"
        >
          <v-layout align-center>
            <v-fade-transition mode="out-in">
              <v-layout
                justify-center
                align-center
                text-xs-center
                :key="$route.path"
              >
                <div class="jumbo-logo">
                  <custom-logo></custom-logo>
                </div>
                <!--<h1 class="display-2 white&#45;&#45;text" v-html="title" />-->
                <!--<div-->
                  <!--class="subheading white&#45;&#45;text"-->
                  <!--v-html="subTitle"-->
                  <!--v-if="subTitle"-->
                <!--/>-->
              </v-layout>
            </v-fade-transition>
          </v-layout>
        </v-container>
      </v-fade-transition>
    </v-img>
  </v-fade-transition>
</template>

<script>
  export default {
    data: () => ({
      isBooted: false
    }),

    computed: {
      isHome () {
        return this.$route.path === '/'
      },
      namespace () {
        return this.$route.name
      },
      title () {
        return this.$t(`Views.${this.namespace}.jumbotronTitle`)
      },
      subTitle () {
        return this.$t(`Views.${this.namespace}.jumbotronSubTitle`)
      },
      heroImage () {
        return `/static/main-bg.jpeg`
       // return `/static/${this.namespace.toLowerCase()}-hero.png`
      }
    },

    mounted () {
      setTimeout(() => {
        this.isBooted = true

      }, 200)

    }
  }
</script>

<style lang="stylus" scoped>
  .jumbo-wrap
    height: 100vh

  .jumbo-logo
    width: 30%
    margin: 0 auto;

</style>
