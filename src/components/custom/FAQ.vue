<template>
    <div class="container">
        <div class="title-a mx-0 mb-5">
            <h1>FAQ</h1>
            <h2>Some of questions we get asked allot about websites and stuff</h2>
        </div>
        <v-expansion-panel focusable>
            <v-expansion-panel-content
                    v-if="item.content"
                    v-for="(item,i) in items"
                    :key="'faq-exp-panel-'+i"
            >
                <template v-slot:header>

                    <div>{{item.title}}</div>
                </template>
                <v-card class="">
                    <v-card-text class="px-5 grey lighten-4">
                        <VueShowdown :markdown="item.content"/>

                        <v-flex v-for="(link, l) in item.links"
                                :key="'faq-answer-'+ l"
                        >
                            <v-btn class="primary" :to="link.to">{{link.name}}</v-btn>
                        </v-flex>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        title: "How much does it cost to make a website?",
                        content: "Prices range from agency to agency and depend on what your website is for. But the average website price that takes a templated approach will cost between <strong>$1000-$1800</strong>. A custom website that's designed specifically for your company will cost between <strong>$5,000 and $15,000</strong>. Websites come in many shapes and forms so make sure you have some clear desired outcomes from the websites when communication with a website agency or developer."
                        +"</br></br> Find out about our website packages or run through our discovery process to help find something that fits your needs.",
                        links: [
                            {name: "Packages", to: "Packages"},
                            {name: "Website Discovery", to: "Discovery"}
                        ]
                    },
                    {
                        title: "What is SEO?",
                        content: ""
                    },
                    {
                        title: "How do I get more customers to visit my website?",
                        content: "How do I get more customers to visit my website?\n" +
                            "There are many ways to increase the number of people who visit your website. \n" +
                            "* To start, you need to make sure your website is mobile friendly. Up to 47% of people in New Zealand alone browse the web on a mobile or tablet device. \n" +
                            "* Make your website fast to load, this is best done in the initial set-up phase.\n" +
                            "* Market your website on Social Media Platforms such as Facebook, linked in and Instagram. Use the paid ad platforms with each of these services to reach even more people; this comes at a cost though so make sure you know what you're doing o hire someone who does. \n" +
                            "* Use SEO techniques to improve how your website appears on google. There are many techniques such as keyword optimization, title, and description tags and content filling. \n" +
                            "These are only a few examples to get you started in the right direction, to find out more feel free to get in touch."
                    },
                    {
                        title: "Why do I need a website?",
                        content: "A website serves many purposes. In the information age, it's pretty damn important to have one. Almost everyone in the developed world has access to the internet and its endless stream of information, having a website lets become part of that stream. On a website, you can display essential information about your business like it's contact information, experience, services, and products. It also gives you the opportunity to express your brand in a variety of ways through design and rich media content.",
                        links: [
                            {name: "About our websites", to: "Websites"}
                        ]
                    },
                    {
                        title: "When do I need digital marketing?",
                        content: ""
                    },
                    {
                        title: "How long does a website take to make?",
                        content: ""
                    },
                    {
                        title: "Can I make my own website?",
                        content: ""
                    },
                    {
                        title: "How do I make my website work on a mobile device?",
                        content: "",
                        links: [
                            {name: "Mobile friendly website", to: "Mobile"}
                        ]
                    },
                    {
                        title: "My website is down, what do I do now?",
                        content: ""
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>