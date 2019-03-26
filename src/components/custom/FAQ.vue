<template>
    <div class="-view-height">
    <v-expansion-panel focusable>
        <v-expansion-panel-content
                v-for="(item,i) in 5"
                :key="'faq-exp-panel-'+i"
        >
            <template v-slot:header>
                <div>Item</div>
            </template>
            <v-card>
                <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
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