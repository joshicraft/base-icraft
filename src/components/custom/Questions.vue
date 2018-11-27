<template>
    <v-stepper v-model="e1" class="pa-3">
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
            >
                <v-card
                        class="mb-5 elevation-0 grey lighten-3"

                >
                    <h3 class="pa-4">
                        {{data.questions[n-1].title}}
                    </h3>
                    <v-list
                            class="grey lighten-4"
                            subheader
                            two-line
                    >
                        <v-list-tile
                                v-for="(option, c) in data.questions[n-1].options"
                                :key="c"
                        >
                            <v-list-tile-action>
                                <v-checkbox v-model="option.checked"></v-checkbox>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{option.title}}</v-list-tile-title>
                                <!--<v-list-tile-sub-title>Subtite</v-list-tile-sub-title>-->
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>

                </v-card>

                <v-btn
                        v-if="n < steps"
                        color="primary"
                        @click="nextStep(n)"
                >
                    Next step
                    <v-icon class="ml-2">mdi-skip-next</v-icon>
                </v-btn>
                <v-btn
                        v-else
                        color="primary"
                        @click="loadResults"
                        :loading="resultsGenerating"
                >
                    {{resultsLoading[0]}}
                    <v-icon class="ml-2">mdi-play</v-icon>
                </v-btn>
                <v-btn
                        @click="nextStep(0)"
                        v-if="n >= steps"
                >
                    Clear
                </v-btn>
            </v-stepper-content>
            <v-stepper-content
                    class="over"
                    :class="{'fade-anim' : resultsGenerated}"
                    :step="steps + 1"
            >
                <v-card
                        class="mb-5 elevation-0 grey lighten-4 d-flex justify-center align-center text-lg-center"


                >
                    <v-layout column justify-center align-center v-if="resultsGenerating">
                        <h3 class="pa-5">{{resultsLoading[resultsLoadingIndex]}}</h3>
                        <v-progress-circular
                                :size="100"
                                color="primary"
                                indeterminate
                                class="mb-5"
                        ></v-progress-circular>
                    </v-layout>
                    <v-flex v-else-if="resultsGenerated" class="c-title pa-5">
                        <h1 class="mt-3 mb-3 lg-6">{{resultsTitle()}}</h1>
                        <v-layout
                                column
                                wrap
                                  class="pa-4 ma-3 elevation-4 lighten-1"
                        >
                            <v-icon class="mb-2 lg-6" size="100" color="primary">{{resultsIcon()}}</v-icon>

                            <h3 class="mb-4">{{resultsSubTitle()}}</h3>
                            <p>{{resultsSubSubTitle()}}</p>
                        </v-layout>
                        <div v-if="featureResultInformation" class="c-title">
                            <h1  class="mt-5 mb-3">You may also be interested in.</h1>
                            <v-layout>
                                <v-flex
                                    v-for="(f, i) in data.results.features"
                                    v-if="f.checked"
                                    lg6
                                    class="pa-4 ma-3 elevation-4 lighten-2"
                                >
                                    <v-layout justify-center align-center row wrap>
                                        <h3 class="mb-4">{{f.title}}</h3>

                                        <v-icon class="mb-4 ml-4" color="primary" x-large>{{f.icon}}</v-icon>
                                    </v-layout>
                                    <p>{{f.subTitle}}</p>

                                </v-flex>
                            </v-layout>
                            </div>
                    </v-flex>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
        <v-dialog
                v-model="dialog"
                max-width="320"
        >
            <v-card>
                <v-card-title class="headline">You must answer some questions before getting some results.</v-card-title>


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
                dialog: false,
                e1: 1,
                steps: this.data.questions.length,
                resultsGenerated: false,
                resultsInformation: '',
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
        methods: {
            resultsSubSubTitle () {
                return this.data.results[this.resultsInformation].subTitle
            },
            resultsSubTitle () {
                return this.data.results[this.resultsInformation].title
            },
            resultsIcon () {
                return this.data.results[this.resultsInformation].icon
            },
            resultsTitle () {
              return this.data.results.title + this.data.results[this.resultsInformation].name + this.data.results.endTitle
            },
            closeDialog () {
                this.dialog = false
            },
            nextStep(n) {
                if (n === this.steps + 1) {
                    this.e1 = 1
                } else {
                    this.e1 = n + 1
                }
                if(n === 0) {
                    this.el = 1
                    this.clearQuestions()
                }
            },
            clearQuestions() {
                this.resultsGenerating = false
                this.resultsLoadingIndex = 1
                this.resultsGenerated = false
                this.resultsInformation = false
                this.data.questions.forEach(val => {
                    val.options.forEach(option => {
                        option.checked = false
                    })
                })
                this.resetData()
            },
            resetData () {
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
                if(Object.keys(results).length === 0 && results.constructor === Object){
                    return false
                }
                let max = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b)
                this.resultsInformation = max
                this.featureResultInformation = Object.keys(features).length !== 0 && !Object.keys(features).some(v => v < 1) ? features : false
                console.log(this.resultsInformation)
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
                if (this.resultsLoading.length < this.resultsLoadingIndex) {
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
                this.resultsInformation = false
                this.resetData()
                if(!this.processQuestions()){
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

<style scoped lang="stylus">
    .v-list__tile__title, .v-list__tile__sub-title
        overflow visible
        white-space: initial

    .fade-anim
        animation fade-in-out 1s ease-in-out

    @keyframes fade-in-out {
        0% {
            opacity 0
        }
        100% {
            oipacity 1
        }
    }
</style>
