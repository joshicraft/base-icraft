<template>
    <div class="wrap">
        <svg
                v-if="left"
                preserveAspectRatio="none"
                class="wipe wipe-left"
                viewBox="0 0 500 500">
            <polygon class="ss1 right" points="0,0 250,0 500,250 250,500 0,500 "/>
        </svg>
        <svg
                v-else
                preserveAspectRatio="none"
                class="wipe wipe-right"
                viewBox="0 0 500 500">
            <polygon class="ss0 right" points="0,250 250,0 500,0 500,500 250,500 "/>
        </svg>
    </div>
</template>
<script>
    export default {
        props: {
            left: {
                default: true,
                type: Boolean
            }
        },
        methods: {
            scrollX() {

            }
        }
    }
</script>

<style scoped lang="stylus">
    .st0 {
        fill: #231F20;
        opacity 0.5
    }

    .st1 {
        fill: none;
    }

    .ss0

        fill: #037F7F;

    .ss1

        transition-delay 1s
        fill: #25C8CC;


    .left-out
        animation-delay 0.5s
        animation left-out 1s ease-in forwards

    .right-out
        animation-delay 0.5s
        animation right-out 1s ease-in forwards

    .wrap
        position: absolute
        top 0
        left 0
        z-index 2
        width 100%
        height 100%
        pointer-events none

    .iris
        position absolute
        width 200px
        height 200px
        top 0
        left 0
        right 0
        bottom 0
        margin auto

    .small-ico
        display none
        width 100px
        height 100px

    .wipe
        position: absolute;
        top 0
        left 0
        width 100%
        height 100%
        opacity 0.35

    svg
        width 100%
        height 100%


</style>
