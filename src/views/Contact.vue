<template>
    <v-container fill-height class="mb-5 -arrow-buffer-top -arrow-buffer-bot">
        <v-layout class="content-wrap" justify-space-between align-center wrap dark>
            <!--<v-flex md1 class="img-wrap">-->
            <!--<img src="/static/device-iphone-contact.png"/>-->
            <!--</v-flex>-->
            <div class="title-a text-lg-center mb-5">
                <h1 class="mt-5 mb-3">WE'D LIKE TO HEAR FROM YOU</h1>
                <h3 class="mb-4">You can use one of the methods below to get in touch.</h3>
                <p>To find out the best solution for you its best to get in touch with us so we can find out exactly what you're after.</p>
            </div>
            <v-flex xs12 lg7 mx2 dark>
                <v-card dark class="pa-4 form-wrap">
                    <h2 class="headline mb-2" v-text="contact.heading1"/>
                    <p class="mb-4" v-text="contact.headingText1"/>
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
                            class="v-form-success">
                        <div class="wrap">
                            <h1>{{submitStatus.t1}}</h1>
                            <p>{{submitStatus.t2}}</p>
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
                                prepend-icon="mdi-phone"
                                v-model="phone"
                                label="phone"
                                name="phone"
                                type="number"
                                required
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
            <v-flex xs12 md4>
                <v-card dark class="pa-3">
                    <div class="contact-logo">
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
                                    :mailto="person.email"
                                    v-text="person.email">
                            </a>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
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
                phone: '',
                select: null
            }
        },
        computed: {
            contact() {
                return this.$t('Views.Contact')
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
                    website: window.location.host
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
                }).catch(() => {
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
