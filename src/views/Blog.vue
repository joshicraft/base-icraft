<template>
    <div class="" id="blog">
        <!--<h1>BLOG</h1>-->
        <!--<router-link name="BlogSlug">-->
        <v-layout >
            <v-flex lg4 class="-arrow-buffer-bot">
                <div class="fill-width fill-height">
                <template
                        v-for="(item, i) in blogs"
                >
                    <custom-blog-thumb :index="i" :item="item" :path="item.path"></custom-blog-thumb>
                    <v-btn @click="currentBlog = item">Show</v-btn>
                </template>
                </div>
            </v-flex>
            <v-flex md8>
                <router-view></router-view>
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
            console.log('SSSSSS')
            this.blogRoutes = this.filterBlogs()
            console.log(this.blogRoutes)
            this.loadBlogs()
        },
        methods: {
            filterBlogs() {
                return this.$router.options.routes.find(route => {
                    return route.path.search('/blog') !== -1
                }).nested
            },
            loadBlogs() {
                let $this = this

                if(this.blogs[0] && !this.currentBlog.title){
                    this.currentBlog = this.blogs[0]
                }
                if (this.blogLoadIndex >= this.blogRoutes.length) {
                    return
                }
                let path = this.$route.path + '/' + this.blogRoutes[this.blogLoadIndex]
                console.log('Fetching: ' + path)
                fetch(path + ".json")
                    .then(res => {
                        if (res.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                res.status);
                            return;
                        }

                        // Examine the text in the response
                        res.json().then(function (data) {
                            // console.log(data)
                            console.log(path)
                            data.path =  $this.blogRoutes[$this.blogLoadIndex]
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
    #blog
        /*position: fixed*/
        /*top 0*/
        /*left 0*/
        width:100%
    .-view-height
        max-height:100vh
</style>
