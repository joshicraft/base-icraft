<template>
    <div
            :class="{
                    'first-arrow' : index===0 && direction==='prev',
                    'c-1' : index%2===0,
                    'c-2' : index%2!==0,
                    'prev-arrow': direction === 'prev',
                    'next-arrow': direction === 'next',
                    'section-arrow-small': $vuetify.breakpoint.smAndDown,
                    'd-none': $vuetify.breakpoint.smAndDown
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
                this.playSound('click', 0.3);
                let dimensions = this.$el.getBoundingClientRect();
                let next = dir === 'next';
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

    $color-1 = rgb(212, 212, 212);
    $color-2 = rgb(212, 212, 212)


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
        &::before
            border-radius: inherit;
            color: inherit;
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            opacity: 0.12;
            -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            width: 100%;
        .arrow, svg
            position: absolute;
            top 0
            left 0
            width: 100%;
            height: 100%

        svg
            //filter: drop-shadow( 0px 3px 6px rgba(0, 0, 0, .11));

        line
            stroke #5a5a5a
            stroke-width 5px




    .next-arrow
        bottom 0
        polygon
            fill $color-1
        .v-icon
            color black
        &:hover
            .v-icon
                color $color-1
            polygon
                fill black

    .prev-arrow
        top 0
        polygon
            fill $color-2
        .v-icon
            color black
        &:hover
            .v-icon
                color $color-2

            polygon
                fill black


    .first-arrow
        top 140px;


    .section-arrow-small {
        width: 6em;
        height: 3em;
        i {
            font-size: 30px !important;
        }
    }



</style>