<template>
  <div>
    <v-container
      fill-height
      mb-4
      class="max-view-width">
      <v-layout
        justify-center
        align-center
        wrap
      >
        <v-flex md8 xs12 d-flex
          :class="[{'column':$vuetify.breakpoint.xsOnly}]"
        >
          <v-flex
            dark
            md6
            xs12

          >
            <v-card
              class="pa-4 elevation-0"
            >
              <h2 class="mb-4">{{about.heading1}}</h2>
              <p class="subheading mb-4">{{about.headingText1}}</p>
              <p class="subheading mb-4">{{about.headingText2}}</p>
            </v-card>
          </v-flex>
          <v-flex
            dark
            md6
            xs12

          >
            <v-card
              class="pa-4 elevation-0"
            >
              <h2 class="mb-4">{{community.heading1}}</h2>
              <p class="subheading mb-4">{{community.headingText1}}</p>
              <v-btn class="ml-0" href="/community">Community
                <v-icon class="ml-3">{{community.icon}}</v-icon>
              </v-btn>
            </v-card>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container
      fill-height
      mb-5
      id="practices-standards"
      class="max-view-width"
    >
      <v-layout
        justify-center
        align-center
        wrap
      >
        <v-flex
          dark
          xs12
          md8
        >
          <v-card class="pa-4 elevation-0">
            <v-flex md8 class="mt-3 text-center">
              <h2 class="mb-3">{{safety.heading1}}</h2>
              <p class="subheading">{{safety.headingText1}}</p>
            </v-flex>
            <v-container>
              <v-layout
                justify-center
                wrap
              >
                <v-flex
                  class="mb-4 mt-5 ml-4 text-center"
                  justify-center
                  align-baseline
                  column
                  xs12
                  md3
                  v-for="(item, i) in safety.items"
                  :key="i"
                >
                  <alpha-svg-icon :name="item.icon"></alpha-svg-icon>
                  <v-flex
                    mt-3
                    flex-d
                    justify-center
                    align-center
                  >
                    <h2 class="mb-2">{{item.heading1}}</h2>
                    <p class="subheading mb-0">{{item.headingText1}}</p>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
    import content from '../lang/en/Views/About'
  export default {
    name: 'about',
      metaInfo: {
          title: content.headTitle,
          meta: [
              {name: 'description', content: content.headDescription}
          ]
      },
      props: {
          loadTickerCount: {
              default: 0,
              type: Number
          }
      },
    computed: {
      safety () {
        return content.safety
      },
      community () {
        return content.community
      },
      about () {
        return content.about
      }
    },
      methods: {
          loadLimit(i) {
              return this.loadTickerCount <= i
          },
          loadPoint(i) {
              return this.loadTickerCount >= i
          }
      }
  }
</script>

<style scoped lang="stylus">
  .column
    flex-direction column

  .d-flex-a
    display: flex

  .text-center
    margin-left auto
    margin-right auto

  .v-card
    h1
      line-height 1.1

  svg.icon
    flex none
    width 50px
    height 50px
</style>
