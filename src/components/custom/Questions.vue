<template>
    <v-stepper
            v-model="e1"
            class="pa-3 fade-anim-out-in elevation-0"
            :class="{'px-5': $vuetify.breakpoint.smAndUp }"
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
                        class="mb-5 elevation-0 d-flex justify-center align-center"


                >
                    <v-layout column justify-center align-center v-if="resultsGenerating">
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
                            v-else-if="resultsGenerated"
                            class="c-title no-max"
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
                                                {{resultsSolutionMatch().name}}
                                                <v-icon
                                                        class="ml-3"
                                                        size="50"
                                                        :color="resultsSolutionMatch().iconColor"
                                                        @click="$vuetify.goTo('#packages', {offset: -48})"
                                                >
                                                    {{resultsSolutionMatch().icon}}
                                                </v-icon>
                                            </h4>
                                        </v-layout>

                                        <v-btn
                                                class="text-lg-left ml-0 mt-5"
                                                color="primary"
                                                @click="$vuetify.goTo('#packages', {offset: -48})"
                                        >
                                            Check {{resultsSolutionMatch().name}} out
                                        </v-btn>
                                    </div>
                                    <v-icon
                                            :class="{'display-none': $vuetify.breakpoint.mdAndDown}"
                                            class="mb-2 ml-5 mr-0 lg-6 results-anim"
                                            size="300"
                                            @click="$vuetify.goTo('#packages')"
                                            :color="resultsSolutionMatch().iconColor"
                                    >
                                        <!--{{resultsIcon()}}-->
                                        {{resultsSolutionMatch().icon}}
                                    </v-icon>
                                </v-flex>
                            </v-card>
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
                            <v-layout v-if="featureResultInformation" class="no-max" row wrap>
                                <v-flex
                                        lg6
                                        md12
                                        d-flex
                                        v-for="(f, i) in data.results.features"
                                        v-if="f.checked"
                                >
                                        <v-card
                                                :class="{'pl-4 pt-4 pr-4 pb-4': $vuetify.breakpoint.smAndUp, 'pl-0': i === 0, 'pr-0': i === data.results.features.length-1}"
                                                class="pt-2 pr-2 pb-2 pl-2 ma-3 ml-0 lighten-2 elevation-0 md12 lg6"
                                        >
                                            <v-layout justify-center align-center row wrap>
                                                <h3 class="mb-4">{{f.title}}</h3>
                                                <v-icon class="mb-4 ml-4" color="primary" x-large>{{f.icon}}</v-icon>
                                            </v-layout>
                                            <p>{{f.subTitle}}</p>
                                        </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <!--<v-card class="my-3 elevation-0 mw-1"-->
                                <!--:class="$vuetify.breakpoint.smAndUp ? 'pa-5' : 'pa-3'"-->
                        <!--&gt;-->
                            <!--<p class="text&#45;&#45;white">If you'd like a more comprehensive breakdown, enter in your email-->
                                <!--below and well send you a PDF via email. </p>-->
                            <!--<v-form-->
                                    <!--class="text-lg-left"-->
                                    <!--v-model="valid">-->
                                <!--<v-text-field-->
                                        <!--v-model="email"-->
                                        <!--:rules="emailRules"-->
                                        <!--label="E-mail"-->
                                        <!--required-->
                                <!--&gt;</v-text-field>-->
                                <!--<v-btn-->
                                        <!--class="ml-0"-->
                                        <!--:disabled="!valid"-->
                                        <!--@click="submitEmail"-->
                                <!--&gt;-->
                                    <!--submit-->
                                <!--</v-btn>-->
                                <!--<v-checkbox-->
                                        <!--label="Sign up to be informed about new services and sweet sales from ICRAFT."-->
                                        <!--v-model="emailChecked"></v-checkbox>-->
                            <!--</v-form>-->
                        <!--</v-card>-->
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
                let result = this.$parent.items[0].items.find(item => item.rank === this.resultsMatch)
                this.$parent.resultName = result.name.toLowerCase()
                this.$parent.resultsGenerated = true
                return result
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
                this.data.results.features.forEach(feature => {
                    feature.checked = false
                })
            },
            processQuestions() {
                let results = {};
                let selections = [];
                let features = {};
                let data = this.data;
                this.$parent.resultsGenerated = false
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
                this.resultsMatch = max;
                this.featureResultInformation = Object.keys(features).length !== 0 && !Object.keys(features).some(v => v < 1) ? features : false;
                console.log(max);

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
                console.log(this.resultsLoadingIndex);
                this.resultsLoadingIndex++;
                if (this.resultsLoading.length < this.resultsLoadingIndex + 1) {
                    clearInterval(this.resultsGeneratingInterval);
                    this.resultsGenerated = true;
                    this.resultsLoadingIndex = 0;
                    this.resultsGenerating = false
                }
            },
            loadResults() {
                this.featureResultInformation = false;
                this.resultsGenerating = true;
                this.resultsLoadingIndex = 0;
                this.resultsGenerated = false;
                this.resultsMatch = false;
                this.resetData();
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
<style lang="stylus">
    .mw-1
        max-width 1280px
        width 80%
        margin-left auto
        margin-right auto

    .v-input--is-label-active
        label.v-label
            font-weight bold
            color white

    /*color black*/

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

    /*.v-input--is-label-active*/
    /*label*/
    /*font-weight bold*/
    /*color black*/
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
