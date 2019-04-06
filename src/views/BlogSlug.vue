<template>
    <div>
        <h1>{{$route.params}}</h1>
    </div>
</template>

<script>
    export default {
        // props: ['params'],
        mounted() {
            let pth = this.$route.path.replace('/blog', '')
            // let post = import("@/lang/en/Blog" + pth + ".json");

            console.log(pth);
            fetch(window.location.origin + "/src/lang/en/Blog" + pth + ".json")
                .then(res => {
                    if (res.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            res.status);
                        return;
                    }

                    // Examine the text in the response
                    res.json().then(function(data) {
                        console.log(data);
                    });
                })
                .catch(err => {
                    console.log('Fetch Error :-S', err);
                })
            // await store.commit("SET_TITLE", post.title);
            // await store.commit("SET_CRUMB", 'Categories');
            // return post;
        },
        // head() {
        //     return {
        //         title: this.title + " | " + this.$store.state.siteInfo.sitename
        //     };
        // },
        transition (to, from) {
            if (!from) return 'slide-right'
            return +to.query.page > +from.query.page ? 'slide-right' : 'slide-left'
        },
        data() {
            console.log('ssss')
            return {};
        },
        methods: {
            theSlug() {
                return this.$route.params.slug
            },
        },

        computed: {
            allBlogPosts() {
                return this.$store.state.blogPosts;
            },


            findCatPosts() {
                var posts = this.allBlogPosts;
                var title = this.title
                return posts.filter(function(obj) {
                    return obj.category == title
                });
            }

        }
    };
</script>

<style scoped>

</style>