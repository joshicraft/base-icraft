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
        data: () => {
            return {
                lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,

            }
        },
        computed: {
            items () {
                return this.$t('Views.Blog.items')
            }
        }
    }
</script>

