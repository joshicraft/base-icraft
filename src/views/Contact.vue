<template>
    <v-container fill-height class="mb-5">
        <v-layout class="content-wrap" justify-space-between align-center wrap dark>
            <!--<v-flex md1 class="img-wrap">-->
            <!--<img src="/static/device-iphone-contact.png"/>-->
            <!--</v-flex>-->
            <v-flex xs12 lg7 mx2 dark>
                <v-card dark class="pa-4 form-wrap">
                    <h2 class="headline mb-2" v-text="content.heading1"/>
                    <p class="mb-4" v-text="content.headingText1"/>
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
                        <v-btn class="mt-5" v-if="failed" @click="resetForm">TRY AGAIN</v-btn>
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
                                prepend-icon="account_box"
                                v-model="name"
                                :rules="nameRules"
                                label="name"
                                name="name"
                                type="text"
                                required
                        ></v-text-field>

                        <v-text-field
                                prepend-icon="email"
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                name="email"
                                type="email"
                                required
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="phone"
                                v-model="phone"
                                label="phone"
                                name="phone"
                                type="number"
                                required
                        ></v-text-field>
                        <v-textarea
                                prepend-icon="message"
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
                                class="mr-3"
                                color="warning"
                                @click="clear">clear
                        </v-btn>
                        <v-btn
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
                    <div>
                        <custom-logo-side white></custom-logo-side>
                    </div>
                    <v-card-title class="headline">
                        Contact Details
                    </v-card-title>

                    <v-card-text>
                        <v-layout mb-2 justify-start align-center row>
                            <v-icon
                                    sm
                            >phone
                            </v-icon>
                            <a class="ml-2 p-format" :href="'tel:' + contact.phone" v-text="contact.phone">
                            </a>
                        </v-layout>
                        <v-layout mb-2 justify-start align-center row>
                            <v-icon
                                    sm
                            >home
                            </v-icon>
                            <p class="ml-2 p-format" v-text="contact.address">
                            </p>
                        </v-layout>
                        <v-layout justify-start align-start row>
                            <v-icon
                                    sm
                            >access_time
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
                            >person_pin
                            </v-icon>
                            <p class="ml-2 p-format" v-text="person.name">
                            </p>
                        </v-layout>
                        <v-layout mb-2 justify-start align-center row>
                            <v-icon
                                    sm
                            >label
                            </v-icon>
                            <p class="ml-2 p-format" v-text="person.title">
                            </p>
                        </v-layout>
                        <v-layout mb-2 justify-start align-center row>
                            <v-icon
                                    sm
                            >smartphone
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
                            >email
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
    import content from '../lang/en/Views/Contact'

    export default {
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
                return content
            }
        },
        methods: {
            loadLimit(i) {
                return this.loadTickerCount <= i
            },
            loadPoint(i) {
                return this.loadTickerCount >= i
            },
            resetForm() {
                this.submitted = false
                this.failed = false
            },
            clear() {
                this.$refs.form.reset()
            },
            submitToServer() {
                let data = JSON.stringify(
                    {
                        name: this.name,
                        message: this.message,
                        email: this.email,
                        phone: this.phone
                    }
                )
                return new Promise((resolve, reject) => {
                    let api = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '/.netlify/functions'
                    fetch(api + '/contact-sendgrid', {
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
                this.failed = false
                this.submitting = true
                this.submitToServer().then(response => {
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

    .img-wrap
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
