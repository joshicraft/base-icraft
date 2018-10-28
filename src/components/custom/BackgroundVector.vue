<template>
    <div class="vid-bg-vector" :class="position + ' ' + changeFill">
        <div class="wrap" v-if="top">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 176.667">
                <path class="st0" d="M-0.083,0.855c0,0,485,175.333,1117,175.333s787-84,787-84v84h-1904V0.855z"/>

            </svg>
        </div>
        <div class="wrap" v-if="bot">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 176.667">
                <path class="st1" :style="{'fill': fill}"
                      d="M0,44.667c0,0,484.667,130.417,1116.667,130.417S1902,110.667,1902,110.667l2,66H0V44.667z"/>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            fill: {
                type: String,
                default: '#FAFAFA'
            },
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

    .wrap
        position: absolute;
        bottom: -1px;
        width: 100%

    .vid-bg-vector
        position: absolute;
        /*top 0*/
        left 0
        width 100%
        bottom: -1px;
        min-height: 200px;
        overflow hidden
    .st0
        fill: #CECECE;

    .st1
        fill: #FAFAFA;

    .full-bot
        bottom: calc(100% - 1px);
        transform scaleX(-1)
        path
            fill: #212121;



    svg
        position: relative;
        -webkit-filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
        filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
        width: calc(100% + 1px);
        /* height: 100%; */
        display: block;

    .top-flip
        bottom: 100%;

    .top
        bottom: initial;
        top: -1px;
        .wrap
            bottom: initial;
            top: -1px;
            transform scaleY(-1)
        svg

            -webkit-filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
            filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
</style>
