<template>
    <div class="vid-bg-vector" :class="position">
        <div v-if="top">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 934" style="enable-background:new 0 0 1902 934;" xml:space="preserve">
            <path class="st0" d="M0,761.7c0,0,485,175.3,1117,175.3s787-84,787-84v84H0L0,761.7z"/>
        </svg>
        </div>
        <div v-if="bot">
        <svg xmlns="http://www.w3.org/2000/svg" :class="changeFill" version="1.1" x="0px" y="0px" viewBox="0 0 1902 934" style="enable-background:new 0 0 1902 934;" xml:space="preserve">
            <path class="st1" d="M0,802c0,0,485,132,1117,132s785-66,785-66l2,66H0L0,802z"/>
        </svg>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            position: {
                type: String,
                default: 'bottom'
            },
            changeFill: {
                type: String,
                default: ''
            },
            bot: {
                type: Boolean,
                default: true
            },
            top: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped lang="stylus">



    .st0
        fill: #CECECE;

    .st1
        fill: #FAFAFA;

    .st3
        transform scaleX(-1)
        path
            fill: #212121;


    .vid-bg-vector
        position: absolute;
        top 0
        left 0
        width 100%
        height 100%

    svg
        -webkit-filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
        filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
        width: 100%;
        /* height: 100%; */
        display: block;
        position: absolute;
        bottom: 0;

    .top
        svg
            top: -1px;
            transform scaleY(-1)
            -webkit-filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
            filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
</style>
