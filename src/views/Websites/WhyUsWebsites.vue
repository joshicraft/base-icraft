<template>
    <div>
        <!--<error-in-development></error-in-development>-->
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
                class="relative -view-height py-5"
                :class="i%2===0 ? '_bg-color-b' : '_bg-color-a'"
                v-for="(item, i) in data.items"
        >
            <ui-section-nav-arrow :index="1" direction="prev"></ui-section-nav-arrow>
            <ui-section-nav-arrow :index="1" direction="next"></ui-section-nav-arrow>
            <v-container>
                <div class="title-a">
                <h1 class="text-lg-center text-uppercase mb-5">{{item.title}}</h1>
                </div>
                <v-layout
                        lg6
                        sm12
                        :class="$vuetify.breakpoint.smAndDown ? 'column' : 'row'"
                        d-flex
                >
                    <v-flex
                            lg6
                            sm12
                            :class="$vuetify.breakpoint.smAndDown ? '__auto-height' : '__c-height'"


                    >
                        <!--<v-list>-->
                            <!--<v-list-tile-->
                                    <!--v-for="(title, j) in item.items"-->
                            <!--&gt;-->
                        <div class="__btn-wrapper"
                             :class="$vuetify.breakpoint.smAndDown ? '' : ''"
                        >
                                <v-btn
                                        v-for="(title, j) in item.items"
                                        :class="{'primary': title.title === item.selected.title}"
                                        @click="selectItem(item, title)"
                                >
                                    {{title.title}}
                                </v-btn>
                        </div>
                            <!--</v-list-tile>-->
                        <!--</v-list>-->
                    </v-flex>

                    <v-flex lg6 sm12>
                        <v-layout
                                :class="$vuetify.breakpoint.smAndDown ? '__auto-height' : '__c-height'"
                                justify-center
                                align-center
                        >
                            <v-flex
                                    class="title-a"
                                    :class="$vuetify.breakpoint.smAndDown ? 'py-4' : 'pa-5'"

                            >
                                <div
                                        v-if="item.selected"
                                >
                                    <h2 class="mb-3">
                                        {{item.selected.title}}
                                    </h2>
                                    <div v-html="item.selected.content"></div>
                                </div>
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
                data: data,
                selected: false,
                secondSelected: false,
            }
        },
        mounted() {
            // this.data = this.modData(0)
            this.data.items.forEach(item => item.selected = item.items[0])
        },
        // computed: {
        //     data(){
        //       return data
        //     }
        // },
        computed: {
            getData(){
              return data
            }
        },
        methods: {
            selectItem(item, title){
                this.playSound('click', 0.3)
                item.selected = title
            },
            getSelected (items) {
                let selected = items.find(item => item.selected)
                return selected || items[0]
            },
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
<style module lang="stylus">
    li
        font-size 17px
</style>
<style scoped lang="stylus">

    .__btn-wrapper
        display flex
        flex-direction row
        justify-content center
        align-items center
        /*max-width 95%*/
        flex-wrap wrap

    .__auto-height
        height auto

    .-view-height
        max-height 700px


    .column
        flex-direction column

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

    .__c-height
        /*height 60vh*/
        max-height 700px
        height: 500px;
        justify-content: center;
        align-items: center;
        display: flex;




    .--fade-in
        opacity 1


    .--fade--out
        opacity 0

    $color-1 = #e8e8e8
    $color-2 = #dcdcdc
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