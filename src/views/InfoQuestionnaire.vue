<template>
  <div>
    <v-container
      grid-list-lg
      pa-0
      pb-4
      d-flex
      justify-center
      class="max-view-width"
    >
      <v-flex d-flex xs12 md7 class="pa-2">
        <v-card :class="$vuetify.breakpoint.smAndDown ? 'pa-1' : 'pa-4'" class="translucent">
          <v-card-title primary-title color="blue-grey darken-2">
            <div class="mb-3 headline">{{titles.h1}}</div>
            <div class="mb-3">{{titles.h2}}</div>
            <div class="mb-3">{{titles.h3}}</div>
            <div class="mb-3">{{titles.h4}}</div>
            <div class="">{{titles.h5}}</div>

          </v-card-title>

          <v-form
            v-if="!submitted"
            class="pa-3"
            ref="form"
            v-model="valid"
            method="POST"
            lazy-validation
            netlify
            name="submitQuestions"
          >
            <div
              :v-if="items.length > 0"
              v-for="(question, i) in items"
              :key="i"
            >
              <h3>{{question.title}}</h3>
              <p>{{question.question}}</p>
              <v-textarea
                v-model="question.message"
                :label="question.title"
                :name="question.title"
              ></v-textarea>
            </div>
          </v-form>
          <v-flex pa-3
                  v-else
                  class="headline">

            <span>Thanks for contacting us! We'll get back to you with-in the next 2 working days</span>
            <v-icon>
              thumb_up
            </v-icon>
          </v-flex>
          <v-card-actions class="mt-3" v-if="!submitted">
            <v-spacer/>
            <v-btn
              class="px-5 mr-3"
              color="warning"
              @click="clear">clear
            </v-btn>
            <v-btn
              class="px-5"
              color="primary"
              :disabled="!valid"
              @click="handleSubmit"
            >
              submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>
<script>
  /* eslint-disable no-undef */
  import content from '../lang/en/Views/InfoQuestionnaire'
  export default {
      metaInfo: {
          title: content.headTitle,
          meta: [
              {name: 'description', content: content.headDescription}
          ]
      },
    data () {
      return {
        submitted: null,
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length >= 3) || 'Name must more than 4 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        message: '',
        messageRules: [
          v => !!v || 'Message must be valid',
          v => (v && v.length >= 10) || 'Your message must be more than 10 characters'
        ],
        select: null
      }
    },
    computed: {
      titles () {
          let data = content
          return {
              h1: data.heading1,
              h2: data.heading2,
              h3: data.heading3,
              h4: data.heading4,
              h5: data.heading5
          }
      },
      items () {
        let items = content.questions
        items.forEach((item) => {
          item.message = ''
        })
        return items
      }
    },
    methods: {
      clear () {
        this.$refs.form.reset()
      },
      encode (data) {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&')
      },
      handleSubmit (e) {
        let $this = this
        // let data = this.items()

        fetch('/.netlify/functions/questionnaire', {
          method: 'POST',
          body: JSON.stringify(this.items)
        })
          .then(() => {
            $this.submitted = true
          })
          .catch(error => alert(error))
        e.preventDefault()
      }
    }
  }
</script>
