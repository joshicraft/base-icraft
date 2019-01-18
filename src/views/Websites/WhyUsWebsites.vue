<template>
    <div>
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
                v-for="(item, i) in data.items"
        >
            <ui-section-nav-arrow :index="1" direction="prev"></ui-section-nav-arrow>
            <ui-section-nav-arrow :index="1" direction="next"></ui-section-nav-arrow>
            <v-container>
                <h1 class="text-lg-center">{{item.title}}</h1>
                <v-layout>
                    <v-flex lg6>
                        <v-list v-model="selected">
                            <v-list-tile
                                    v-for="(title, j) in item.items"
                            >
                                <v-btn
                                        :class="{'primary': title.title === item.selected}"
                                        @click="item.selected = title.title"
                                >
                                    {{title.title}}
                                </v-btn>
                            </v-list-tile>
                        </v-list>
                    </v-flex>

                    <v-flex lg6>
                        <v-layout
                                lg6
                                justify-center
                                align-center
                                v-model="selected"
                        >
                            <v-flex
                                    class="title-a pa-5"
                                    v-for="(category, k) in item.items"
                                    v-if="item.selected === category.title"
                            >
                                <v-card>
                                    <h1 class="mb-3">
                                        {{category.title}}
                                    </h1>
                                    <div v-html="category.content"></div>
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
        computed: {
            data(){
              return data
            }
        },
        methods: {
            isSelected(item){
                console.log(item)
                return item.items.find(i=>i.selected)
            }
        }
    }
</script>

<style scoped>

</style>