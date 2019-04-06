<template>
    <div class="">
        <template
                v-for="(item, i) in blogs"
        >
            <custom-blog-preview :index="i" :item="item"></custom-blog-preview>
        </template>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                blogRoutes: [],
                blogs: [],
                blogLoadIndex: 0
            }
        },
        mounted() {
            this.blogRoutes = this.filterBlogs()
            this.getBlogs()
        },
        methods: {
            filterBlogs() {
                return this.$router.options.routes.filter(route => {
                    return route.path.search('/blog/') !== -1
                })
            },
            getBlogs() {
                let $this = this
                fetch(window.location.origin + "/src/lang/en/Blog" + this.blogRoutes[this.blogLoadIndex].path + ".json")
                    .then(res => {
                        if (res.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                res.status);
                            return;
                        }

                        // Examine the text in the response
                        res.json().then(function (data) {
                            $this.blogs.push(data)
                            console.log(data);
                        });
                    })
                    .catch(err => {
                        console.log('Fetch Error :-S', err);
                    })
            }
        }
    }
</script>

