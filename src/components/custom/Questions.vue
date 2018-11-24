<template>
    <v-stepper
            v-model="e1"
            vertical
            editabe

    >
        <template
                v-for="(item, i) in items"
               
        >


        <!--<v-stepper-header>-->

            <v-stepper-step
                :complete="e1 > i"
                :step="i+1"
                @click="e1 = -1"

            >
                {{item.title}}

            </v-stepper-step>
                <!---->
            <!--<v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>-->

            <!--<v-divider></v-divider>-->

            <!--<v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>-->

            <!--<v-divider></v-divider>-->

            <!--<v-stepper-step step="3">Name of step 3</v-stepper-step>-->
        <!--</v-stepper-header>-->

        <!--<v-stepper-items>-->
            <v-stepper-content
                    :step="i+1">
                <v-card
                        class="mb-5"
                >
                    <v-list
                            subheader
                            two-line
                    >
                    <v-list-tile
                            v-for="(option, c) in item.options"
                            :key="c"
                    >

                        <v-list-tile-action @click="option.checked = !option.checked" >
                            <v-checkbox v-model="option.checked" :label="option.title"></v-checkbox>
                        </v-list-tile-action>

                        <!--<v-list-tile-content @click="option.checked = !option.checked">-->
                            <!--<v-list-tile-title  @click="option.checked = !option.checked">{{option.title}}</v-list-tile-title>-->
                             <!--&lt;!&ndash;<v-list-tile-sub-title>Subtite</v-list-tile-sub-title>&ndash;&gt;-->
                        <!--</v-list-tile-content>-->
                    </v-list-tile>
                    </v-list>
                </v-card>

                <v-btn
                        color="primary"
                        @click="e1 = i+2"
                >
                    Next
                </v-btn>
            </v-stepper-content>

        </template>
        <!--</v-stepper-items>-->
    </v-stepper>
</template>

<script>
    export default {
        props: {
            items: {
                default: [],
                type: Array
            }
        },
        data () {
            return {
                e1: 0
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>
