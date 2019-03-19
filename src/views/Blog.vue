<template>
    <div class="">
        <template
            v-for="(item, i) in items"
        >
            <custom-blog-preview :index="i" :item="item"></custom-blog-preview>
        </template>
    </div>
</template>

<script>

    export default {
        computed: {
            items () {
                return Object.values(this.$t('Blog'))
            }
        }
    }
</script>

