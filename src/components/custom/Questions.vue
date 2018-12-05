<template>
    <v-stepper v-model="e1" class="pa-3" v-if="showQuestions">
        <v-stepper-header class="elevation-0">
            <template v-for="n in steps">
                <v-stepper-step
                        :complete="e1 > n"
                        :key="`${n}-step`"
                        :step="n"
                        editable
                        class="pa-3"
                >
                    {{data.questions[n-1].name}}
                </v-stepper-step>
                <v-stepper-step
                        class="pa-3"
                        complete-icon="mdi-check"
                        :complete="resultsGenerated"
                        color="success"
                        :rules="[() => resultsGenerated]"
                        v-if="n >= steps"
                        :step="steps + 1"
                >
                    Results
                </v-stepper-step>

                <v-divider
                        v-if="n !== steps"
                        :key="n"
                ></v-divider>
            </template>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content
                    v-for="n in steps"
                    :key="`${n}-content`"
                    :step="n"
                    class="pa-0"
            >
                <v-card
                        class="mb-3 elevation-0 grey lighten-3"

                >
                    <h3 class="pa-4">
                        {{data.questions[n-1].title}}
                    </h3>
                    <v-list
                            class="grey lighten-4 q-overflow"
                            subheader
                            two-line
                    >
                        <v-list-tile
                                v-for="(option, c) in data.questions[n-1].options"
                                :key="c"
                        >
                            <!--<v-list-tile-action>-->
                            <v-hover>
                                <v-checkbox
                                        slot-scope="{ hover }"
                                        :class="{'scale-anim': hover, 'ma-4': $vuetify.breakpoint.smAndUp}"
                                        class="pa-0 ma-2 no-message"
                                        v-model="option.checked"
                                        :label="option.title"
                                ></v-checkbox>
                            </v-hover>
                            <!--</v-list-tile-action>-->

                            <!--<v-list-tile-content>-->
                            <!--<v-list-tile-title>{{option.title}}</v-list-tile-title>-->
                            <!--&lt;!&ndash;<v-list-tile-sub-title>Subtite</v-list-tile-sub-title>&ndash;&gt;-->
                            <!--</v-list-tile-content>-->
                        </v-list-tile>
                    </v-list>

                </v-card>

                <v-btn
                        v-if="n < steps"
                        color="primary"
                        class="ml-0"
                        @click="nextStep(n)"
                >
                    Next step
                    <v-icon class="ml-2">mdi-skip-next</v-icon>
                </v-btn>

                <v-btn
                        v-else
                        class="ml-0"
                        color="primary"
                        @click="loadResults"
                        :loading="resultsGenerating"
                >
                    {{resultsLoading[0]}}
                    <v-icon class="ml-2">mdi-play</v-icon>
                </v-btn>

                <v-btn
                        class="ml-0"
                        @click="nextStep(0)"
                        v-if="n >= steps"
                >
                    Clear
                </v-btn>
                <p class="ml-0 text--lighten-1 grey--text">{{'Step ' + n + '/' + steps}}</p>
            </v-stepper-content>
            <v-stepper-content
                    class="over pa-0"
                    :class="{'fade-anim' : resultsGenerated}"
                    :step="steps + 1"
            >
                <v-card
                        class="mb-5 elevation-0 grey lighten-4 d-flex justify-center align-center"


                >
                    <v-layout column justify-center align-center v-if="resultsGenerating">
                        <h3
                                class="pa-2"
                                :class="{'pa-5': $vuetify.breakpoint.smAndUp}">{{resultsLoading[resultsLoadingIndex]}}
                        </h3>
                        <v-progress-circular
                                :size="100"
                                color="primary"
                                indeterminate
                                class="mb-5"
                        ></v-progress-circular>
                    </v-layout>
                    <v-flex
                            v-else-if="resultsGenerated"
                            class="c-title no-max pa-2"
                            :class="{'pa-5': $vuetify.breakpoint.smAndUp}"
                    >
                        <h1 class="mt-2 mb-4 lg-6 text-lg-center">{{resultsTitle()}}</h1>
                        <v-hover>
                            <v-card
                                    slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}` + (hover ? ' rise-anim': '')"
                                    column
                                    wrap
                                    class="pa-4 ma-3 lighten-1"
                            >
                                <v-icon class="mb-2 lg-6" size="100" color="primary">{{resultsIcon()}}</v-icon>

                                <h3 class="mb-4">{{resultsSubTitle()}}</h3>
                                <p>{{resultsSubSubTitle()}}</p>

                                <p class="mt-4 text--grey">
                                    This solution closely matches our package: {{resultsSolutionMatch().name}}
                                    <v-icon
                                            :color="resultsSolutionMatch().iconColor"
                                    >
                                        {{resultsSolutionMatch().icon}}
                                    </v-icon>
                                </p>
                                <v-btn
                                        class="text-lg-left"
                                        color="primary"
                                        @click="$vuetify.goTo('#packages')"
                                >
                                    Check {{resultsSolutionMatch().name}} out
                                </v-btn>
                            </v-card>
                        </v-hover>
                        <h1 class="mt-5 mb-3 text-lg-center">You may also be interested in.</h1>
                        <v-container
                                class="pa-0"
                             fluid
                             grid-list-md
                        >
                        <v-layout v-if="featureResultInformation" class="no-max"  row wrap>

                                <v-flex
                                        lg6
                                        md12
                                        d-flex

                                        v-for="(f, i) in data.results.features"
                                         v-if="f.checked"
                                >
                                <v-hover

                                >

                                    <v-card

                                            slot-scope="{ hover }"
                                            :class="{'elevation-2': !hover, 'pa-4': $vuetify.breakpoint.smAndUp}"
                                            class="pa-2 ma-3 lighten-2 elevation-2 md12 lg6"
                                    >
                                        <v-layout justify-center align-center row wrap>
                                            <h3 class="mb-4">{{f.title}}</h3>

                                            <v-icon class="mb-4 ml-4" color="primary" x-large>{{f.icon}}</v-icon>
                                        </v-layout>
                                        <p>{{f.subTitle}}</p>

                                    </v-card>

                                </v-hover>
                                </v-flex>
                        </v-layout>
                        </v-container>
                        <v-card class="pa-3 ma-3"
                                :class="{'pa-4': $vuetify.breakpoint.smAndUp}"
                        >
                            <p class="text--white">If you'd like a more comprehensive breakdown, enter in your email
                                below and well send you a PDF via email. </p>
                            <v-form
                                    class="text-lg-left"
                                    v-model="valid">
                                <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        required
                                ></v-text-field>
                                <v-btn
                                        class="ml-0"
                                        :disabled="!valid"
                                        @click="submitEmail"
                                >
                                    submit
                                </v-btn>
                                <v-checkbox
                                        label="Sign up to be informed about new services and sweet sales from ICRAFT."
                                        v-model="emailChecked"></v-checkbox>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
        <v-dialog
                v-model="dialog"
                max-width="320"
        >
            <v-card>
                <v-card-title class="headline">You must answer some questions before getting some results.
                </v-card-title>


                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="dialog = false"
                    >
                        Ok, Got it
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-stepper>


</template>

<script>
    export default {
        props: {
            data: {
                default: {},
                type: Object
            }
        },
        data() {
            return {
                showQuestions: false,
                emailChecked: false,
                valid: false,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                dialog: false,
                e1: 1,
                steps: this.data.questions.length,
                resultsGenerated: false,
                resultsMatch: '',
                resultsGenerating: false,
                resultsLoading: ['Get Results', 'Fetching Entries', 'Indexing Entries', 'Applying Filters', 'Measuring Results', 'Sending Results'],
                resultsLoadingIndex: 0
            }
        },
        watch: {
            steps(val) {
                if (this.e1 > val) {
                    this.e1 = val
                }
            }
        },
        computed: {
            getEl() {
                return this.el
            }
        },
        mounted() {
            this.showQuestions = true
        },
        methods: {
            resultsSolutionMatch() {
                return this.$parent.items[0].items.find(item => item.rank === this.resultsMatch)
            },
            resultsSubSubTitle() {
                return this.data.results[this.resultsMatch].subTitle
            },
            resultsSubTitle() {
                return this.data.results[this.resultsMatch].title
            },
            resultsIcon() {
                return this.data.results[this.resultsMatch].icon
            },
            resultsTitle() {
                return this.data.results.title + this.data.results[this.resultsMatch].name + this.data.results.endTitle
            },
            closeDialog() {
                this.dialog = false
            },
            submitEmail() {

            },
            nextStep(n) {
                if (n === this.steps + 1) {
                    this.e1 = 1
                } else {
                    this.e1 = n + 1
                }
                if (n === 0) {
                    this.el = 1
                    this.clearQuestions()
                }
            },
            clearQuestions() {
                this.resultsGenerating = false
                this.resultsLoadingIndex = 1
                this.resultsGenerated = false
                this.resultsMatch = false
                this.data.questions.forEach(val => {
                    val.options.forEach(option => {
                        option.checked = false
                    })
                })
                this.resetData()
            },
            resetData() {
                this.data.results.features.forEach(feature => {
                    feature.checked = false
                })
            },
            processQuestions() {
                let results = {}
                let selections = []
                let features = {}
                let data = this.data
                data.questions.forEach(val => {
                    val.options.forEach(option => {
                        if (!option.points || !option.checked) {
                            return
                        }
                        selections.push({
                            title: option.title,
                            points: option.points
                        })
                        Object.keys(option.points).forEach(function (key) {
                            let points = option.points[key]
                            data.results.features.forEach(feature => {
                                if (feature && feature.name === key) {
                                    features[key] = (!features[key] ? points : features[key] + points)
                                    feature.checked = features[key] > 0
                                }
                            })
                            if (results[key] || results[key] === 0) {
                                results[key] += points
                            } else {
                                results[key] = points
                            }
                        });
                    })
                })
                if (Object.keys(results).length === 0 && results.constructor === Object) {
                    return false
                }
                let max = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b)
                this.resultsMatch = max
                this.featureResultInformation = Object.keys(features).length !== 0 && !Object.keys(features).some(v => v < 1) ? features : false
                console.log(this.resultsMatch)
                console.log(this.featureResultInformation)
                this.submitQuestions({
                    endResult: max,
                    selections: selections,
                    results: results
                })
                return true

            },
            submitQuestions(data) {
                this.submitToServer(data, 'POST', '/create-website-discovery').then(response => {
                    console.log(response)
                }).catch((response) => {
                    console.log(response)
                })
            },
            resultsGeneratingTick() {
                console.log(this.resultsLoadingIndex)
                this.resultsLoadingIndex++
                if (this.resultsLoading.length < this.resultsLoadingIndex + 1) {
                    clearInterval(this.resultsGeneratingInterval)
                    this.resultsGenerated = true
                    this.resultsLoadingIndex = 0
                    this.resultsGenerating = false
                }
            },
            loadResults() {
                this.featureResultInformation = false
                this.resultsGenerating = true
                this.resultsLoadingIndex = 0
                this.resultsGenerated = false
                this.resultsMatch = false
                this.resetData()
                if (!this.processQuestions()) {
                    this.dialog = true
                    this.resultsGenerating = false
                    this.resultsLoadingIndex = 0
                    return
                }
                this.nextStep(this.steps)
                this.resultsGeneratingInterval = setInterval(this.resultsGeneratingTick, 500)
            }
        }
    }
</script>
<style lang="stylus">
    .v-input--is-label-active
        label.v-label
            /*font-weight bold*/
            color black

    .no-message
        .v-messages
            display none

    .scale-anim
        .v-input--selection-controls__input
            animation scale-up 0.29s ease-out forwards
            transform-origin center center

    @keyframes scale-up {
        0% {
            transform: scale(1)
        }
        100% {
            transform: scale(1.1)
        }
    }
</style>
<style scoped lang="stylus">
    .v-list__tile__title, .v-list__tile__sub-title
        overflow visible
        white-space: initial

    .fade-anim
        animation fade-in-out 1s ease-in-out

    .text--grey
        color #9a9a9a

    .no-max
        max-width 100%


    .q-overflow
        height: 247px
        overflow-y scroll
    /*.v-input--is-label-active*/
    /*label*/
    /*font-weight bold*/
    /*color black*/

    .rise-anim
        animation rise-up 0.6s ease-out forwards

    @keyframes rise-up {
        0% {
            transform: translateY(0px)
        }
        100% {
            transform: translateY(-5px)
        }
    }

    @keyframes fade-in-out {
        0% {
            opacity 0
        }
        100% {
            opacity 1
        }
    }
</style>
