<template>
    <v-layout
            :key="item.date + item.title"
            align-center lg12
            class="relative overflow-hidden -view-height"
            :class="{'row-reverse c-1': index%2===0, 'c-2': index%2!==0}"
            v-scroll="scrollS"
    >
        <ui-section-nav-arrow :index="index" direction="prev"></ui-section-nav-arrow>
        <ui-section-nav-arrow :index="index" direction="next"></ui-section-nav-arrow>
        <v-img
                v-if="item.images"
                class="section-img"
                lg6
                :lazy-src="imgC(item.images[0], false, false, true)"
                :alt="item.images[0]"
                :src="imgC(item.images[0])"
                height="100vh"
        >
        </v-img>

        <v-flex lg6 pa-5 class="d-flex section-title" justify-center>
            <div class="title-a" :class="{'align-left': index%2===0}">
                <h1 class="mb-4 font-weight-bold">{{item.title}}</h1>
                <!--<h3 class="mb-4">{{item.summary}}</h3>-->
                <p class="mb-4">{{item.date}}</p>
                <p class="mb-4" v-html="item.body"></p>
                <v-btn @click="goToAndScroll('')" class="ml-0 primary">Show more</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
 export default {
        props: {
            index: Number,
            item: Object
        },
        methods: {
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