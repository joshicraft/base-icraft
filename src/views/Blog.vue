<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <template
                v-for="(item, i) in items"
                >
                <v-flex
                        :class="item.highlight ? 'lg8' : 'lg4'"
                >
                    <v-card dark color="primary">
                        <v-card-text class="px-0">{{item.title}}</v-card-text>
                    </v-card>
                </v-flex>
            </template>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: ()=>{
            return{
                items: [
                    {
                        title: "1",
                        img: "1",
                        date: "1",
                        subtitle: "1"
                    },
                    {
                        title: "2",
                        img: "2",
                        date: "2",
                        subtitle: "2",
                        highlight: true
                    },
                    {
                        title: "3",
                        img: "3",
                        date: "3",
                        subtitle: "3"
                    },
                    {
                        title: "4",
                        img: "4",
                        date: "4",
                        subtitle: "4"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>