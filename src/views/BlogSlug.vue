<template>
    <v-layout
            v-if="item"
            :key="item.title"
            align-center lg12
            class="relative overflow-hidden -view-height"
            :class="{'row-reverse c-1': index%2===0, 'c-2': index%2!==0}"
            v-scroll="scrollS"
    >
        <ui-section-nav-arrow :index="index" direction="prev"></ui-section-nav-arrow>
        <ui-section-nav-arrow :index="index" direction="next"></ui-section-nav-arrow>
        <v-img
                class="section-img"
                lg6
                :alt="item.featuredImage"
                :src="item.featuredImage"
                height="100vh"
        >
            <v-layout
                    v-if="item.images"
                    class="absolute blog-img-thumbs"
            >
                <v-flex
                        class="fill-height"
                        lg6
                        v-for="(img, j) in item.images"
                        :key="'blog-img' + img"
                >
                    <v-img
                            class="fill-height"
                            :src="img.image"
                    ></v-img>
                </v-flex>
            </v-layout>
        </v-img>

        <v-flex lg6 pa-5 class="d-flex section-title" justify-center>
            <div class="title-a" :class="{'align-left': index%2===0}">
                <h1 class="mb-4 font-weight-bold">{{item.title}}</h1>
                <!--<h3 class="mb-4">{{item.summary}}</h3>-->
                <!--<p class="mb-4">{{item.date}}</p>-->
                <p class="mb-4">
                    {{item.summary}}
                    <!--<VueShowdown :markdown="item.body"/>-->
                </p>
                <v-btn :to="{path: item.path, params: item}" class="ml-0 primary">Show more</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: {
            index: Number,

        },
        mounted() {
            let pth = this.$route.path.replace('/blog', '')
            let $this = this
            console.log('ssss')
            fetch(window.location.origin + "/blog" + pth + ".json")
                .then(res => res.json())
                .then(res => {
                        $this.item = res
                        console.log(res)
                    }
                )
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
            return {item: {}};
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

        },
        methods: {
            getHTML(d){
                d = d.replace("\n", "<br/><br/>");
                d.replace(/ *\([^)]*\) */g, "");
                return d
            },
            scrollS(e) {
                let $e = this.$el,
                    $title,
                    distance;

                let pos = $e.getBoundingClientRect().top;
                if (pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    $title = $e.querySelector('.title-a');
                    $e.scrollAnimated = true;
                    distance = this.$vuetify.breakpoint.smAndDown ? '80%' : '40%';
                    new TimelineMax()
                        .fromTo($title, 1.2, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=.85')
                } else if ($e.scrollAnimated && pos > window.innerHeight - 2) {
                    $e.scrollAnimated = false;
                    $title = $e.querySelector('.title-a');
                    new TimelineMax()
                        .set($e.querySelector('.title-a'), {y: 60, autoAlpha: 0})
                }
            }
        }
    }
</script>

<style lang="stylus">
    .blog-img-thumbs
        height: 30vh
        width: 100%
        bottom: 0;
        left: 0;
        position: absolute;
</style>

<style scoped lang="stylus">
    $color-1 = #e8e8e8
    $color-2 = #dcdcdc

    .directions
        bottom 80px
        position: absolute
        left: 50%
        margin-top: -2px
        margin-left: -1px
        transform: translateX(-50%)

    .arrow-bottom
        bottom 30px


    .title-a
        opacity 0
        max-width 64%
        width 70%
        text-align right

        h1
            line-height 1.1
            font-size 2.85em

        h3
            line-height 1.2
            font-size 1.85em
            font-weight 100

        button
            font-weight bold
            margin-left 0

    .align-left
        text-align left


    .c-1
        background $color-1
    .c-2
        background $color-2

</style>
