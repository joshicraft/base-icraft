<template>
    <div class="vid-bg-vector" :class="position + ' ' + changeFill">
        <div class="wrap" v-if="top && !right">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 176.667">
                <path class="st0" d="M-0.083,0.855c0,0,485,175.333,1117,175.333s787-84,787-84v84h-1904V0.855z"/>

            </svg>
        </div>
        <div class="wrap" v-if="bot && !right">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 176.667">
                <path class="st1" :style="{'fill': fill}"
                      d="M0,44.667c0,0,484.667,130.417,1116.667,130.417S1902,110.667,1902,110.667l2,66H0V44.667z"/>
            </svg>
        </div>
        <div class="wrap" v-if="right">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 175.947 1902.886">
            <path fill="#A5A5A5" d="M0.136,1902.969c0,0,175.333-485,175.333-1117s-84-787-84-787h84v1904H0.136z"/>
            <path  :style="{'fill': fill}" d="M43.947,1902.886c0,0,130.417-484.667,130.417-1116.667S109.416-1.031,109.416-1.031l66.531-0.083v1904    H43.947z"/>
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
            right: {
                type: Boolean,
                default: false
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

    .right
        left calc(100% - 1px)
        bottom initial
        height 101%
        width initial
        min-height initial
        min-width: 150px
        z-index: 7;
        .wrap
            height 100%
            bottom initial
        svg
            height 100%
            width initial
            position absolute
            transform scaleX(-1)

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
