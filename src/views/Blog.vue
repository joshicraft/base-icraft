<template>
    <div class="">
        <!--<router-link name="BlogSlug">-->
        <v-layout >
            <v-flex md4 class="-view-height -arrow-buffer-top -arrow-buffer-bot">
                <div class="fill-width overflow-hidden overflow-scroll fill-height">
                <template
                        v-for="(item, i) in blogs"
                >
                    <custom-blog-thumb :index="i" :item="item" :path="item.path"></custom-blog-thumb>
                    <v-btn @click="currentBlog = item">Show</v-btn>
                </template>
                </div>
            </v-flex>
            <v-flex md8>
                <router-view>
                <custom-blog-preview :index="0" :item="currentBlog" :path="currentBlog.path"></custom-blog-preview>
                </router-view>
            </v-flex>
        </v-layout>
        <!--</router-link>-->
        <!--<router-link name="BlogSlug">-->

        <!--</router-link>-->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                blogRoutes: [],
                blogs: [],
                blogLoadIndex: 0,
                currentBlog: {}
            }
        },
        mounted() {
            this.blogRoutes = this.filterBlogs()
            this.loadBlogs()
        },
        methods: {
            filterBlogs() {
                return this.$router.options.routes.filter(route => {
                    return route.path.search('/blog/') !== -1
                })
            },
            loadBlogs() {
                let $this = this
                if(this.blogs[0] && !this.currentBlog.title){
                    this.currentBlog = this.blogs[0]
                }
                if (this.blogLoadIndex >= this.blogRoutes.length) {
                    return
                }
                fetch(window.location.origin + this.blogRoutes[this.blogLoadIndex].path + ".json")
                    .then(res => {
                        if (res.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                res.status);
                            return;
                        }

                        // Examine the text in the response
                        res.json().then(function (data) {
                            data.path = $this.blogRoutes[$this.blogLoadIndex].path
                            $this.blogs.push(data)
                            $this.blogLoadIndex++
                            $this.loadBlogs()
                        });
                    })
                    .catch(err => {
                        console.log('Fetch Error :-S', err);
                    })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .-view-height
        max-height:100vh
</style>
