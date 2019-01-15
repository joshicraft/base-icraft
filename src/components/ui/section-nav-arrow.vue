<template>
    <div
            :class="{
                    'first-arrow' : index===0 && direction==='prev',
                    'c-1' : index%2===0,
                    'c-2' : index%2!==0,
                    'prev-arrow': direction === 'prev',
                    'next-arrow': direction === 'next'
                    }"
            class="section-arrow"
            @click="navArrowScroll(direction)"
    >
        <svg viewBox="0 0 100 50">
            <polygon v-if="direction==='prev'" points="0,0 100,0 50,50 0,0"/>
            <polygon v-else points="0,50 50,0 100,50 0,50"/>
        </svg>
        <v-icon class="arrow" x-large>mdi-arrow-{{direction==='prev' ? 'up' : 'down'}}</v-icon>
    </div>
</template>

<script>
    export default {
        props: {
            index: {
                type: Number,
                default: 0
            },
            direction: {
                type: String,
                default: 'prev'
            }
        },
        methods: {
            navArrowScroll(dir) {
                let dimensions = this.$el.getBoundingClientRect()
                let next = dir === 'next'
                this.$vuetify.goTo(
                    window.pageYOffset +
                    ((next ? 0 : -window.innerHeight) +
                    dimensions.top) +
                    (next ? dimensions.height : 0)
                )
            }
        }
    }
</script>

<style scoped lang="stylus">

    $color-1 = #e8e8e8
    $color-2 = #dcdcdc


    .section-arrow
        position: absolute
        left 0
        right 0
        margin auto
        width 8em
        height 4em
        background transparent
        z-index 2
        cursor pointer

        .arrow, svg
            position: absolute;
            top 0
            left 0
            width: 100%;
            height: 100%

        line
            stroke #5a5a5a
            stroke-width 5px


    .c-1.section-arrow
        polygon
            fill $color-1

    .c-2.section-arrow
        polygon
            fill $color-2

    .next-arrow
        bottom 0

        &:hover
            .v-icon
                color $color-1

            polygon
                fill lightness($color-2, 50%)

    .prev-arrow
        top 0

        &:hover
            .v-icon
                color $color-2

            polygon
                fill lightness($color-1, 50%)


    .first-arrow
        top 140px;



</style>