<template>
    <v-container fill-height class="mb-5 -arrow-buffer-top -arrow-buffer-bot">
        <v-layout class="content-wrap mt-5" justify-space-between align-center wrap dark>
            <!--<v-flex md1 class="img-wrap">-->
            <!--<img src="/static/device-iphone-contact.png"/>-->
            <!--</v-flex>-->

            <v-layout class="justify-center">
                <v-flex xs12 md6>
                    <v-card  class="pa-4 form-wrap grey lighten-2 align-center d-flex mb-5">
                        <div class="title-a text-lg-left">
                            <h4 class="mt-0 mb-3 text-uppercase">{{heading.h1}}</h4>
                            <p class="mb-4">{{heading.h2}}</p>
                            <p v-if="heading.p">{{heading.p}}</p>
                        </div>
                    </v-card>
                    <v-card class="pa-3 grey lighten-2">
                        <div class="contact-logo ml-3 mt-4">
                            <custom-logo-side white></custom-logo-side>
                        </div>
                        <v-card-title class="headline">
                            Contact Details
                        </v-card-title>

                        <v-card-text>
                            <v-layout mb-2 justify-start align-center row>
                                <v-icon
                                        sm
                                >mdi-phone
                                </v-icon>
                                <a class="ml-2 p-format" :href="'tel:' + contact.phone" v-text="contact.phone">
                                </a>
                            </v-layout>
                            <v-layout mb-2 justify-start align-center row>
                                <v-icon
                                        sm
                                >mdi-home
                                </v-icon>
                                <p class="ml-2 p-format" v-text="contact.address">
                                </p>
                            </v-layout>
                            <v-layout justify-start align-start row>
                                <v-icon
                                        sm
                                >mdi-clock-outline
                                </v-icon>
                                <v-layout justify-start column>
                                    <p class="ml-2 p-format" v-text="contact.hours.weekday">
                                    </p>
                                    <p class="ml-2 p-format" v-text="contact.hours.weekend">
                                    </p>
                                </v-layout>
                            </v-layout>
                        </v-card-text>
                        <v-card-title class="subheading">
                            People
                        </v-card-title>
                        <v-card-text
                                v-for="(person, i) in contact.people"
                                :key="i"
                        >
                            <v-layout mb-2 justify-start align-center row>
                                <v-icon
                                        sm
                                >mdi-account-circle
                                </v-icon>
                                <p class="ml-2 p-format" v-text="person.name">
                                </p>
                            </v-layout>
                            <v-layout mb-2 justify-start align-center row>
                                <v-icon
                                        sm
                                >mdi-label
                                </v-icon>
                                <p class="ml-2 p-format" v-text="person.title">
                                </p>
                            </v-layout>
                            <v-layout mb-2 justify-start align-center row>
                                <v-icon
                                        sm
                                >mdi-cellphone
                                </v-icon>
                                <a
                                        class="ml-2 p-format"
                                        :href="'tel:' + person.mobile"
                                        v-text="person.mobile">
                                </a>
                            </v-layout>
                            <v-layout
                                    justify-start
                                    row
                            >
                                <v-icon
                                        sm
                                >mdi-email
                                </v-icon>
                                <a
                                        class="ml-2 p-format"
                                        :href="'mailto:' + person.email"
                                        v-text="person.email">
                                </a>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            <v-flex xs12 md6 class="ml-5">
                <v-card class="pa-4 form-wrap grey lighten-2">
                    <!--<h2 class="headline mb-2" v-text="heading.h1"/>-->
                    <!--<p class="mb-4" v-text="heading.h2"/>-->
                    <div v-if="submitting" class="progress-wrap">
                        <v-progress-circular
                                :size="100"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                    </div>
                    <v-layout
                            :class="{'slide-in':submitted}"
                            justify-center
                            align-center
                            column
                            class="v-form-success"
                            dark
                    >
                        <div class="wrap pa-5">
                            <h1 class="white--text display-2 text-lg-left mb-4">{{submitStatus.t1}}</h1>
                            <p class="white--text display-1 text-lg-left mb-5">{{submitStatus.t2}}</p>
                            <img :src="`/static/gif/${contactMethod === 'Phone' ? 'phone.gif' : 'email.gif'}`"/>
                        </div>
                        <v-btn aria-label="form-try-again" class="mt-5" v-if="failed" @click="resetForm">TRY AGAIN</v-btn>
                    </v-layout>

                    <v-form

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
                                label="Name"
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
                                prepend-icon="mdi-phone"
                                v-model="phone"
                                label="Phone (optional)"
                                name="phone"
                                type="number"
                        ></v-text-field>
                        <v-textarea
                                prepend-icon="mdi-message"
                                v-model="message"
                                :rules="messageRules"
                                label="Message"
                                name="message"
                                type="text"
                                required
                        ></v-textarea>
                        <v-text-field
                                prepend-icon="mdi-gift"
                                v-model="code"
                                label="Promo Code (optional)"
                                name="code"
                                type="text"
                        ></v-text-field>

                        <v-radio-group v-model="contactMethod">

                                <div class="mb-4">How would you like us to contact you? <strong>{{contactMethod}}</strong></div>
                            <div v-for="n in contactPreferences" @click="playSound('Click')">
                            <v-radio

                                    class="mb-3"
                                    :key="n"
                                    color="primary"
                                    :label="n"
                                    :value="n"
                            ></v-radio>
                            </div>

                        </v-radio-group>
                        <div class="mb-4">Sign up to our news letter for new features, services and sales? <strong>{{newsletterSignUp ? 'Yes' : 'No'}}</strong></div>
                        <v-checkbox v-model="newsletterSignUp" :label="newsletterSignUp ? 'Yes' : 'No'"></v-checkbox>
                        <!--<v-checkbox v-model="checkbox1" :label="`Checkbox 2: ${checkbox1.toString()}`"></v-checkbox>-->

                    </v-form>
                    <v-card-actions class="mt-5">
                        <v-spacer/>
                        <v-btn
                                aria-label="clear-form"
                                class="mr-3"
                                color="warning"
                                @click="clear">clear
                        </v-btn>
                        <v-btn
                                aria-label="submit-form"
                                class=""
                                color="primary"
                                :disabled="!valid"
                                @click="handleSubmit"
                        >
                            submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
    /* eslint-disable no-console */
    // import content from '../lang/en/Views/Contact'

    export default {
        data() {
            return {
                submitStatus: {
                    t1: '',
                    t2: ''
                },
                contactPreferences: [
                  "E-mail",
                  "Phone"
                ],
                newsletterSignUp: true,
                contactMethod: "E-mail",
                failed: false,
                submitting: null,
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
                code: '',
                codeRules: [
                    v => (v && v.length <= 10) || 'The code must be less than 10 characters'
                ],
                phone: '',
                select: null
            }
        },
        computed: {
            contact() {
                return this.$t('Views.Contact')
            },

            heading () {
                if (this.$route.params.title === 'mobile quote'){
                    return {
                        h1: "After a free quote or mobile audit?",
                        h2: "Fill out the forms below with a few details describing what you're after.",
                        p: "We'll get back to you withing 2 working days with your quote or audit results."
                    }
                }else{
                    return {
                        h1: this.contact.heading1,
                        h2: this.contact.headingText1
                    }
                }
            }
        },
        methods: {
            resetForm() {
                this.submitted = false
                this.failed = false
            },
            clear() {
                this.$refs.form.reset()
            },
            handleSubmit(e) {
                let data =  {
                    name: this.name,
                    message: this.message,
                    email: this.email,
                    phone: this.phone,
                    website: window.location.host,
                    signUp: this.newsletterSignUp ? "Yes" : "No",
                    contactMethod: this.contactMethod,
                    code: this.code.length > 0 ? this.code : false
                }
                this.failed = false
                this.submitting = true
                this.submitToServer(data, 'POST', '/contact-sendgrid').then(response => {
                    if (Number(response.status) !== 200) {
                        this.submitStatus.t1 = "Opp's, looks like an error occurred :("
                        this.submitStatus.t2 = 'Try fill out the form again or get in touch via phone or email.'
                        this.failed = true
                        console.log('Error submitting the form.')
                    } else {
                        this.submitStatus.t1 = 'Thank you for your message!'
                        this.submitStatus.t2 = 'We\'ll be in touch shortly'
                        console.log('Form was submitted!')
                    }
                    this.submitted = true
                    this.submitting = false
                }).catch((e) => {
                    console.log(e)
                    this.submitStatus.t1 = "Opp's, looks like an error occurred :("
                    this.submitStatus.t2 = 'Try fill out the form again or get in touch via phone or email.'
                    this.failed = true
                    this.submitted = true
                    this.submitting = false
                })
                e.preventDefault()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .logo-text-2, .logo-text-1
        opacity 1

    .form-wrap
        overflow hidden

    .p-format
        margin-bottom: 0

    .v-form-success
        position: absolute;
        left: 100%
        top 0
        height 100%
        width 100%
        transition left 0.3s ease-out
        z-index 1
        display flex
        text-align center
        background #424242
        h1
            font-weight 100
        p
            font-weight 100

    .slide-in
        left 0
    .contact-logo
        height 100px
        svg
            height 100%
    .content-wrap
        position: relative;

    .progress-wrap
        background rgba(50, 50, 50, 0.5)
        position: absolute;
        top: 0;
        left: 0;
        width 100%
        height 100%
        z-index 2

    .v-progress-circular
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
</style>
