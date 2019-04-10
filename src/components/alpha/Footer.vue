<template>
  <v-footer>
    <v-container fluid class="alpha-footer">
      <v-layout
        row
        wrap
        justify-space-between
        pt-5
        class="grey darken-4 fill-height"
      >
        <v-flex
          xs12
          sm4
          class="px-5 py-5 pb-3 grey darken-4"
        >
          <h5 class="title pb-3" v-text="company" />
          <ul>
            <li v-for="(item, i) in siteLinks" :key="i">
              <router-link :to="{name: item.name}" class="layout align-center">
                <v-icon
                  dark
                  class="mr-3"
                  v-text="item.icon"
                />
                <span class="subheading" v-text="item.text" />
              </router-link>
            </li>
          </ul>
        </v-flex>


        <v-flex
                xs12
                sm4
                class="pa-5 pb-3 rey darken-4 text-lg-right"
        >
          <h5 class="title pb-3">
            Contact
          </h5>
          <ul>
            <li>
              <v-layout justify-end row>
                <v-icon
                        dark
                        class="mr-3"
                >
                  mdi-phone
                </v-icon>
                <a class="p-format" :href="'tel:' + contact.phone" v-text="contact.phone">
                </a>
              </v-layout>
            </li>
            <li>
              <v-layout justify-end row>
                <v-icon
                        dark
                        class="mr-3"
                >
                  mdi-email
                </v-icon>
                <a
                          class="p-format"
                          :href="'mailto:' + contact.email"
                          v-text="contact.email">
                  </a>
              </v-layout>
            </li>
            <li>
              <v-layout justify-end row>
                <v-icon
                        dark
                        class="mr-3"
                >
                  mdi-domain
                </v-icon>
                <p class="p-format" v-text="contact.cityState">
                </p>

              </v-layout>
            </li>
            <li>
              <v-layout justify-end row>
                <v-icon
                        dark
                        class="mr-3"
                >
                  mdi-web
                </v-icon>
                <p class="p-format" v-text="contact.country">
                </p>
              </v-layout>
            </li>
            <li>
              <v-layout justify-end row>
                <v-icon
                        dark
                        class="mr-3"
                >
                  mdi-home
                </v-icon>
                <p class="p-format" v-text="contact.address">
                </p>
              </v-layout>
            </li>
            <li>
              <v-layout justify-end row>
                <v-icon
                        dark
                        class="mr-3"
                >
                  mdi-clock-outline
                </v-icon>
                  <p class="p-format" v-text="contact.hours.weekday">
                  </p>
              </v-layout>
            </li>
            <li>
              <v-layout justify-end row>
                <v-icon
                        dark
                        class="mr-3"
                >
                  mdi-clock-outline
                </v-icon>
                  <p class="p-format" v-text="contact.hours.weekend">
                  </p>
              </v-layout>
            </li>
          </ul>
        </v-flex>

        <v-flex xs12>
          <v-card
            tile
            light
            dark
            class="grey darken-3 text-xs-center"
          >
            <v-flex
                    xs12
                    class="grey darken-4"
            >
              <div class="social-media-toolbar">
                <v-layout  justify-between>
                  <v-flex
                          justify-between
                          class="pa-2 py-1 text-xs-center"
                          v-for="platform in social.platforms"
                          :key="'platform-footer-' + platform.text"

                  >

                    <v-btn small  :href="platform.to" target="_blank"><v-icon>{{platform.icon}}</v-icon></v-btn>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card
                  tile
                  flat
                  dark
                  class="grey darken-3 text-xs-center"
          >
            <v-card-text>
              <slot />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="jumbo-bot-arrow">
      <svg viewBox="0,0,500,100" preserveAspectRatio="none">
        <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
      </svg>

    </div>
  </v-footer>
</template>

<script>
  export default {
    name: 'alpha-footer',
    props: {
      categories: {
        type: Array,
        default: () => ([])
      },
      company: String,
      facebook: String,
      github: String,
      links: {
        type: Array,
        default: () => []
      },
      twitter: String
    },
    computed: {
      contact () {
        return this.$t('ContactInfo')
        // return this.bakedViews.Contact
      },
      social () {
        return this.$t('SocialMedia')
        // return this.bakedViews.Contact
      },
      siteLinks () {
        return this.$t('Layout.Footer.links')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .jumbo-bot-arrow
    top 1px
    bottom initial
</style>

<style lang="stylus">

  .v-footer
    position: relative;
    z-index: 28

  .p-format
      margin-bottom: 0



  .alpha-footer
    background: #cacaca
    color: #fff
    display: block
    padding: 0 !important
    height: auto

    .container
      padding: 0
      margin: 0

    ul
      list-style-type: none
      margin: 0
      padding: 0

      li
        max-height: 1.6em;
        margin-bottom: 10px

      a
        color: #fff
        text-decoration: none
        transition: .2s ease-in

        &:hover
          opacity: .5
</style>
