<template>
    <v-stepper
            v-model="e1"
            class="fade-anim-out-in elevation-0"
            :class="{'px-5': $vuetify.breakpoint.lgAndUp }"
            dark
            v-if="showQuestions"
    >
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
                        class="mb-3 elevation-0"

                >
                    <h3 class="pa-4">
                        {{data.questions[n-1].title}}
                    </h3>
                    <v-list
                            class="grey darken-4 q-overflow"
                            subheader
                            two-line
                    >
                        <v-list-tile
                                v-for="(option, c) in data.questions[n-1].options"
                                :key="c"

                        >
                            <v-checkbox
                                    @change="playSound('click', 0.2)"
                                    :class="{'ma-4': $vuetify.breakpoint.smAndUp}"
                                    class="pa-0 ma-2 no-message"
                                    v-model="option.checked"
                                    :label="option.title"
                            ></v-checkbox>
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
                        :loading="results.generating"
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
                <p class="ml-0 text--lighten-1 grey--text -c-pad">{{'Step ' + n + '/' + steps}}</p>
            </v-stepper-content>
            <v-stepper-content
                    class="over pa-0"
                    :class="{'fade-anim' : results.generated}"
                    :step="steps + 1"
            >
                <v-card
                        class="mb-5 elevation-0 d-flex justify-center align-center"


                >
                    <v-layout column justify-center align-center v-if="results.generating">
                        <h3
                                :class="$vuetify.breakpoint.smAndUp ? 'pa-5' : 'pa-2'">
                            {{resultsLoading[resultsLoadingIndex]}}
                        </h3>
                        <v-progress-circular
                                :size="100"
                                color="primary"
                                indeterminate
                                class="mb-5"
                        ></v-progress-circular>
                    </v-layout>
                    <v-flex
                            v-else-if="results.generated"
                            class="title-a no-max"
                            :class="$vuetify.breakpoint.smAndUp ? 'pa-5' : 'pa-2'"
                    >

                        <v-card
                                :class="$vuetify.breakpoint.smAndUp ? 'mw-1 my-3 pa-4' : 'my-0 pa-2'"
                                column
                                wrap
                                class="lighten-1 elevation-0"
                        >
                            <v-flex class="d-flex">

                                <div class="mr-5">
                                    <h1 class="mt-2 mb-4 lg-6 font-weight-thin">{{resultsTitle()}}</h1>
                                    <h3 class="mb-4">{{resultsSubTitle()}}</h3>
                                    <p class="font-weight-thin">{{resultsSubSubTitle()}}</p>
                                    <v-layout class="d-flex" column>
                                        <p class="mt-3 text--grey text--lighten-2">
                                            This solution closely matches our package...
                                        </p>
                                        <h4 class="mt-2">
                                            {{results.name}}
                                            <v-icon
                                                    class="ml-3"
                                                    size="50"
                                                    :color="results.iconColor"
                                                    @click="goToAndScroll('Packages')"
                                            >
                                                {{results.icon}}
                                            </v-icon>
                                        </h4>
                                        <p class="mt-5">
                                            To learn more about {{ results.name}} check out our packages or get in touch
                                            with us directly.
                                        </p>
                                    </v-layout>
                                    <v-btn
                                            class="text-lg-left ml-0 mt-5"
                                            color="primary"
                                            @click="goToAndScroll('Packages', undefined, {result: results.name})"
                                    >
                                        Check {{results.name}} out
                                    </v-btn>
                                    <v-btn
                                            class="text-lg-left ml-0 mt-5"
                                            color="primary"
                                            @click="goToAndScroll('Contact', undefined, {result: results.name})"
                                    >
                                        GET IN TOUCH
                                        <v-icon right>mdi-phone</v-icon>
                                    </v-btn>
                                </div>
                                <v-icon
                                        :class="{'display-none': $vuetify.breakpoint.mdAndDown}"
                                        class="mb-2 ml-5 mr-0 lg-6 results-anim"
                                        size="300"
                                        @click="goToAndScroll('Packages', undefined, {result: results.name})"
                                        :color="results.iconColor"
                                >
                                    <!--{{resultsIcon()}}-->
                                    {{results.icon}}
                                </v-icon>
                            </v-flex>
                        </v-card>
                        <template v-if="data.results.features">
                            <div
                                    :class="$vuetify.breakpoint.smAndUp ? 'mw-1' : ''"
                            >
                                <h1

                                        :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                                        class="mt-5 mb-4 white--text font-weight-thin"
                                >
                                    You may also be interested in...
                                </h1>
                            </div>
                            <v-container
                                    class="pa-0"
                                    :class="$vuetify.breakpoint.smAndUp ? 'mw-1' : ''"
                                    grid-list-md
                            >
                                <v-layout class="no-max" row wrap>
                                    <template
                                        v-for="(feature, i) in data.results.features"
                                    >
                                        <v-flex
                                                lg6
                                                md12
                                                d-flex
                                                v-if="feature.checked"
                                        >
                                            <template>
                                                <v-card
                                                        :class="{'pl-4 pt-4 pr-4 pb-4': $vuetify.breakpoint.smAndUp, 'pl-0': i === 0, 'pr-0': i === results.features.length-1}"
                                                        class="pt-2 pr-2 pb-2 pl-2 ma-3 ml-0 lighten-2 elevation-0 md12 lg6"
                                                >
                                                    <v-layout justify-center align-center row wrap>
                                                        <h3 class="mb-4">{{feature.title}}</h3>
                                                        <v-icon class="mb-4 ml-4" color="primary" x-large>{{feature.icon}}
                                                        </v-icon>
                                                    </v-layout>
                                                    <p>{{feature.subTitle}}</p>
                                                </v-card>
                                            </template>
                                        </v-flex>
                                    </template>
                                </v-layout>
                            </v-container>
                        </template>
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
    import {mapMutations, mapGetters} from 'vuex'

    export default {
        props: {
            data: {
                default: {},
                type: Object
            },
            matches: {
                default: [],
                type: Array
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
                features: [],
                dialog: false,
                e1: 1,
                steps: this.data.questions.length,
                resultsGenerated: false,
                resultsMatch: '',
                resultsGenerating: false,
                resultsLoading: ['Get Results', 'Fetching Entries', 'Indexing Entries', 'Applying Filters', 'Measuring Results', 'Sending Results'],
                resultsLoadingIndex: 0,
                results: {}
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
            },
            hasResultsFeatures() {
                console.log(this.results)
                if (!this.results || !this.results.features) {
                    return false
                }
                return this.features.length > 0
            }
        },
        mounted() {
            let questionsResult = this.getQuestionsResult();
            this.showQuestions = true;
            if (questionsResult) {
                this.results = questionsResult
                this.results.generating = false
                this.results.generated = true;
                this.resultsLoadingIndex = 0;

            }
        },
        methods: {
            ...mapMutations('app', ['setQuestionsResult']),
            ...mapGetters('app', ['getQuestionsResult']),
            resultsSolutionMatch(max, features) {
                let result = this.matches.find(item => item.rank === max);
                result.generating = true
                result.resultsMatch = max;
                result.features = features;
                this.setQuestionsResult(result);
                this.results = result
                // return result
            },
            resultsSubSubTitle() {
                return this.data.results[this.results.resultsMatch].subTitle
            },
            resultsSubTitle() {
                return this.data.results[this.results.resultsMatch].title
            },
            resultsIcon() {
                return this.data.results[this.results.resultsMatch].icon
            },
            resultsTitle() {
                return this.data.results.title + this.data.results[this.results.resultsMatch].name + this.data.results.endTitle
            },
            closeDialog() {
                this.dialog = false
            },
            submitEmail() {

            },
            goToContact() {
                this.playSound('click', 0.3)
                this.$router.push({name: 'Contact'});
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight + 15, {offset: -document.querySelector('.v-toolbar').getBoundingClientRect().height})
                }, 2000)

            },
            nextStep(n) {
                this.playSound('click', 0.2)
                if (n === this.steps + 1) {
                    this.e1 = 1
                } else {
                    this.e1 = n + 1
                }
                if (n === 0) {
                    this.el = 1;
                    this.clearQuestions()
                }
            },
            clearQuestions() {
                this.resultsGenerating = false;
                this.resultsLoadingIndex = 1;
                this.resultsGenerated = false;
                this.resultsMatch = false;
                this.data.questions.forEach(val => {
                    val.options.forEach(option => {
                        option.checked = false
                    })
                });
                this.resetData()
            },
            resetData() {
                this.playSound('click', 0.2)
                this.data.results.features.forEach(feature => {
                    feature.checked = false
                })
            },
            processQuestions() {
                let results = {};
                let selections = [];
                let features = {};
                let data = this.data;

                data.questions.forEach(val => {
                    val.options.forEach(option => {
                        if (!option.points || !option.checked) {
                            return
                        }
                        selections.push({
                            title: option.title,
                            points: option.points
                        });
                        Object.keys(option.points).forEach(function (key) {
                            let points = option.points[key];
                            data.results.features.forEach(feature => {
                                if (feature && feature.name === key) {
                                    features[key] = (!features[key] ? points : features[key] + points);
                                    feature.checked = features[key] > 0
                                }
                            });
                            if (results[key] || results[key] === 0) {
                                results[key] += points
                            } else {
                                results[key] = points
                            }
                        });
                    })
                });
                if (Object.keys(results).length === 0 && results.constructor === Object) {
                    return false
                }
                let max = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
                let featuresResult = Object.keys(features).length !== 0 && !Object.keys(features).some(v => v < 1) ? features : false;
                this.resultsSolutionMatch(max, featuresResult);
                this.features = featuresResult
                // this.resultsMatch = max;
                // this.features =
                this.submitQuestions({
                    endResult: max,
                    selections: selections,
                    results: results
                });
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
                this.resultsLoadingIndex++;
                if (this.resultsLoading.length < this.resultsLoadingIndex + 1) {
                    clearInterval(this.resultsGeneratingInterval);
                    this.results.generated = true;
                    this.resultsLoadingIndex = 0;
                    this.results.generating = false
                }
            },
            loadResults() {
                this.features = false;
                this.resultsGenerating = true;
                this.resultsLoadingIndex = 0;
                this.resultsGenerated = false;
                this.resultsMatch = false;
                this.resetData();
                this.playSound('click', 0.35)
                if (!this.processQuestions()) {
                    this.dialog = true;
                    this.resultsGenerating = false;
                    this.resultsLoadingIndex = 0;
                    return
                }
                this.nextStep(this.steps);
                this.resultsGeneratingInterval = setInterval(this.resultsGeneratingTick, 500)
            }
        }
    }
</script>

<style scoped lang="stylus">

    .display-none
        display none

    .v-list__tile__title, .v-list__tile__sub-title
        overflow visible
        white-space: initial

    .fade-anim
        animation fade-in-out 1s ease-in-out

    .fade-anim-out-in
        animation fade-out-in-out 1s ease-in-out

    .text--grey
        color #9a9a9a

    .no-max
        max-width 100%


    .q-overflow
        min-height: 247px
        height: 40vh
        overflow-y scroll

    .results-anim
        animation: pulsate-bck 0.5s ease-in-out infinite both;

    .rise-anim
        animation rise-up 0.9s ease-out forwards


    @keyframes pulsate-bck {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.975);
        }
        100% {
            transform: scale(1);
        }
    }

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

    @keyframes fade-out-in-out {
        0% {
            opacity 0
        }
        100% {
            opacity 1
        }
    }

</style>
