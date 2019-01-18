<template>
    <div>
        <error-in-development></error-in-development>
        <div class="relative -view-height -arrow-buffer-top _bg-color-a">
            <ui-section-nav-arrow :index="0" direction="prev"></ui-section-nav-arrow>
            <ui-section-nav-arrow :index="0" direction="next"></ui-section-nav-arrow>
            <v-layout justify-center align-center>
                <v-flex class="title-a">
                    <h1 class="mb-4">
                        ABOUT ICRAFT
                    </h1>
                    <p>
                        ICRAFT was started in 2018 by Joshua Scorrar.
                    </p>
                    <p>
                        Josh has over 5 Years as a Front-End developer for an start-up company, the roles included
                        building a start-of-the-art user interface using cutting edge Design and UX techniques.
                        It was here he discovered how to blend a range of software tools to reduce hosting costs, adopt
                        the latest front-end frameworks and get insights on other disciplinary skills including
                        Business, Marketing and Design.
                    </p>
                    <p>
                        He also has a diploma in Visual Arts from M.I.T and Degree in Creative Technologies from A.U.T.
                        It was here he learnt about a variety of creative techniques in the design and software fields.
                    </p>
                </v-flex>
            </v-layout>
        </div>
        <div
                class="relative -view-height _bg-color-b"

        >
            <ui-section-nav-arrow :index="1" direction="prev"></ui-section-nav-arrow>
            <ui-section-nav-arrow :index="1" direction="next"></ui-section-nav-arrow>
            <v-container>

                <v-layout>
                    <v-flex lg4 v-for="(tab, o) in data.items">
                        <h1 @click="modData(o)" class="text-lg-center c-tab" :class="{'-active' : tab.title === selected.title}">{{tab.title}}</h1>
                    </v-flex>
                </v-layout>
                <v-layout class="_bg-color-c c-menu">
                    <v-flex
                            justift-center
                            align-center
                            lg6
                            class="mr-2 fill-height"

                    >
                        <v-card
                                class="-transparent-bg elevation-0"
                                v-if="selected"
                                v-for="(title, j) in selected.items"
                                v-model="title.selected"
                                :class="{'--active': title.title === secondSelected.title}"
                        >
                            <v-btn


                                    @click="modData(undefined, j)"
                            >
                                {{title.title}}
                            </v-btn>
                        </v-card>
                    </v-flex>

                    <v-flex lg6 class="ml-2">
                        <v-layout
                                lg6
                                justify-center
                                align-center
                                v-if="secondSelected"
                        >
                            <v-flex
                                    class="title-a"
                            >
                                <v-card
                                        class="pa-5 ma-5 c-pane elevation-0"
                                >
                                    <h1 class="mb-3">
                                        {{secondSelected.title}}
                                    </h1>
                                    <div v-html="secondSelected.content"></div>
                                </v-card>
                            </v-flex>

                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>

</template>

<script>
    import data from "../../lang/en/Views/Websites/WhyUsWebsites"

    export default {
        data() {
            return {
                data: this.modData,
                selected: false,
                secondSelected: false,
            }
        },
        mounted() {
            this.data = this.modData(0)
        },
        // computed: {
        //     data(){
        //       return data
        //     }
        // },
        methods: {
            modData(index, secondIndex) {

                if(secondIndex === undefined) {
                    this.selected = data.items[index]

                }
                this.secondSelected = this.selected.items[secondIndex || 0]

                return data
            },
            isSelected(item) {
                console.log(item)
                return item.items.find(i => i.selected)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .c-menu
        height 50vh
        min-height 400px
        transition opacity 0.3s

    .c-pane
        height 40vh
        padding-top 5vh
        padding-bottom: 5vh
        max-height 40vh
        overflow-y scroll


    .--fade-in
        opacity 1


    .--fade--out
        opacity 0


    $c-color-1=#5a5a5a
    $c-color-2=#303030

    .--active
        .v-btn
            background: $c-color-2 !important
            color: #f0f0f0

    .c-tab
        border-top-left-radius 5px
        border-top-right-radius 5px
        border-bottom: lighten($c-color-1, 10%) 1px solid
        border-right: lighten($c-color-1, 10%) 1px solid
        border-bottom: lighten($c-color-1, 10%) 1px solid
        cursor: pointer;
        background: $c-color-2
        color white
        &.-active
            border-bottom: $c-color-1 1px solid
            background: $c-color-1
        &:hover:not(.-active)
            background lighten($c-color-2, 10%)


</style>