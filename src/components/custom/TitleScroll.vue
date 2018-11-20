<template>
    <div v-scroll="scrollS" class="scroll-title">
        <h1 class="mb-4 display-2 font-weight-bold">{{data.title}}</h1>
        <h3 class="mb-4 display-1">{{data.text}}</h3>
    </div>
</template>

<script>
    export default {
        props: {
            data:{
                type: Object,
                default: ()=> {
                    return {}
                }
            }
        },
        methods: {
            scrollS () {
                let $e = this.$el
                let pos = $e.getBoundingClientRect().y
                if (pos < window.innerHeight / 2.5 && !$e.scrollAnimated) {
                    TweenMax.fromTo($e, 1.2, {y: 60, autoAlpha: 0}, {y: 0, autoAlpha: 1})
                    $e.scrollAnimated = true
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .scroll-title
        opacity: 0
</style>
