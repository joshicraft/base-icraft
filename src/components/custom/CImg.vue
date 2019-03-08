<template>
    <v-img
            :src="getSrc"
            :height="height"
    >
        <slot></slot>
    </v-img>
</template>

<script>
    export default {
        props : {
            src: '',
            height: '0px',
            class: ''
        },
        methods: {
            getSrc(){
                return this.imgC(this.src, this.el)
            }
        }
    }
</script>
