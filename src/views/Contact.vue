<template>
    <v-container fill-height class="mb-5">
        <v-layout justify-space-between wrap dark>
            <v-flex xs12 md7 dark>
                <h2 class="headline mb-2" v-text="this.bakedContent.Contact.heading1"/>
                <p class="mb-4" v-text="this.bakedContent.Contact.headingText1"/>
                <v-card dark>
                    <v-form
                            v-if="!submitted"
                            class="pa-3"
                            ref="form"
                            v-model="valid"
                            method="POST"
                            lazy-validation
                            netlify
                            name="submitMessage"
                    >

                        <v-text-field
                                prepend-icon="mdi-account"
                                v-model="name"
                                :rules="nameRules"
                                label="name"
                                name="name"
                                type="text"
                                required
                        ></v-text-field>

                        <v-text-field
                                prepend-icon="mdi-email"
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                name="email"
                                type="email"
                                required
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="mdi-message-text"
                                v-model="message"
                                :rules="messageRules"
                                label="Message"
                                name="message"
                                type="text"
                                required
                        ></v-text-field>

                    </v-form>
                    <v-card-actions class="mt-3" v-if="!submitted">
                        <v-spacer/>
                        <v-btn
                                class="px-5 mr-3"
                                color="warning"
                                @click="clear">clear</v-btn>
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
            <v-flex xs12 md4>
                <v-card dark class="pa-3">
                    <div >
                            <custom-logo-side></custom-logo-side>
                    </div>
                    <v-card-text>
                        <div v-text="this.bakedContent.Contact.phone" class="mb-3"/>
                        <div v-text="this.bakedContent.Contact.address"/>
                        <div v-text="this.bakedContent.Contact.cityState"/>
                        <div v-text="this.bakedContent.Contact.zip"/>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    /* eslint-disable no-console */

    export default {
        metaInfo: {
            title: 'Contact Anderson Air Conditioning & Electrical',
            meta: [
                {name: 'description', content: 'To get find out more about what we can offer you, get in touch today!'}
            ]
        },
        data () {
            return {
                submitted: null,
                contact: this.$t('Views.Contact'),
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
        methods: {

            clear () {
                this.$refs.form.reset()
            },
            submitToServer() {
                let data = JSON.stringify({name: this.name, message: this.message, email: this.email})
                return new Promise((resolve, reject) => {
                    fetch(`/.netlify/functions/contact-sendgrid`, {
                        method: 'POST',
                        body: data
                    }).then(response => {
                        resolve(response)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            handleSubmit(e) {
                this.submitToServer().then(response => {
                    if (Number(response.status) !== 200) {
                        console.log('Error submitting the form.')
                    } else {
                        console.log('Form was submitted!')
                        this.submitted = true
                    }
                })
                e.preventDefault()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .logo-text-2, .logo-text-1
        opacity 1
</style>
