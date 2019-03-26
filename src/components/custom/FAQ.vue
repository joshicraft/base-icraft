<template>
    <div class="-view-height">
    <v-expansion-panel focusable>
        <v-expansion-panel-content
                v-for="(item,i) in items"
                :key="'faq-exp-panel-'+i"
        >
            <template v-slot:header>
                <div>{{item.title}}</div>
            </template>
            <v-card>
                <v-card-text class="grey lighten-3" v-html="item.title"></v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                items: [
                    {
                        title: "How much does it cost to make a website?",
                        content: "",
                        links: [
                            "Packages"
                        ]
                    },
                    {
                        title: "What is SEO?",
                        content: "",
                        links: [

                        ]
                    },
                    {
                        title: "How do I get more customers to visit my website?",
                        content: "",
                        links: [

                        ]
                    },
                    {
                        title: "Why do I need a website?",
                        content: "",
                        links: [
                            "Discovery"
                        ]
                    },
                    {
                        title: "When do I need digital marketing?",
                        content: "",
                        links: [

                        ]
                    },
                    {
                        title: "How long does a website take to make?",
                        content: "",
                        links: [

                        ]
                    },
                    {
                        title: "Can I make my own website?",
                        content: "",
                        links: [

                        ]
                    },
                    {
                        title: "How do I make my website work on a mobile device?",
                        content: "",
                        links: [
                            "Mobile"
                        ]
                    },
                    {
                        title: "My website is down, what do I do now?",
                        content: "",
                        links: [

                        ]
                    },
                    {
                        title: "",
                        content: "",
                        links: [

                        ]
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>