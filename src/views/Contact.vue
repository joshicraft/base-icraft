<template>
  <v-container fill-height class="mb-5">
    <v-layout justify-space-between wrap dark>
      <v-flex xs12 md7 dark>
        <h2 class="headline mb-2" v-text="$t('Views.Contact.heading1')" />
        <p class="mb-4" v-text="$t('Views.Contact.headingText1')" />
        <v-card dark>
          <v-card-text>
            <v-text-field
              label="Name"
              prepend-icon="mdi-account"
            />
            <v-text-field
              label="Email"
              prepend-icon="mdi-email"
            />
            <v-textarea
              label="Message"
              prepend-icon="mdi-message-text"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn large class="px-5" color="primary">
              {{ $t('Views.Contact.submit') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card dark>
          <div class="pa-3">
            <div class="toolbar-svg-wrapper my-3">
              <custom-logo-side></custom-logo-side>
            </div>
          </div>
          <v-card-text>
            <div v-text="$t('Views.Contact.phone')" class="mb-3" />
            <div v-text="$t('Views.Contact.address')" />
            <div v-text="$t('Views.Contact.cityState')" />
            <div v-text="$t('Views.Contact.zip')" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Contact Anderson Air Conditioning & Electrical',
      meta: [
        { name: 'description', content: 'To get find out more about what we can offer you, get in touch today!' }
      ]
    },
  }
</script>

<style lang="stylus" scoped>
  .logo-text-2, .logo-text-1
    opacity 1
</style>
