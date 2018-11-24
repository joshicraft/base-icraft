<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: {
            features: []
        },
        methods:{
            isVisible (item) {
                console.log(item)
                return item.visible
            }
        }
    }
</script>

<style scoped lang="stylus">
    .progress
        position: fixed
        right 20px
        width 10px
        top: 0
        bottom 0
        margin auto
        height 100px
        .progress-item
            width 10px
            height 10px
            margin 5px 0
            border-radius 5px
            background #000
</style>
