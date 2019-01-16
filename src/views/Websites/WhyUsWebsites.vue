<template>
    <error-in-development></error-in-development>
</template>

<script>
    export default {
        computed: {
            data() {
                return this.$t('Views.' + this.getNameSpace())
            }
        }
    }
</script>

<style scoped>

</style>