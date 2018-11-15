<template>
    <div class="vid-bg-vector" :class="position" :style="{width: width, height: height}">
        <div class="wrap" >
            <svg preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.9 107.9" >
                <path :style="{'fill': '#5a5a5a'}" d="M0,94c0,0,18-67,81-94C5,0,0,0,0,0V94z"/>
                <path :style="{'fill': fill}"  d="M0,93c0,0,17-67,80-94C5,0,0,0,0,0V94z"/>
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
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100%'
            },
            position: {
                type: String,
                default: 'top-left'
            }
        }
    }
</script>

<style scoped lang="stylus">
    svg
        position: relative;
        -webkit-filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
        filter drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25))
        width: 100%
        height: 100%
        display: block;

    .vid-bg-vector
        position: absolute;
        top -1px
        left -1px
        height 100%
        width 100%
        overflow hidden

    .top-right
        right -1px
        top -1px
        left initial
        .wrap
            transform scaleX(-1)

    .bot-left
        top initial
        left -1px
        bottom -1px
        .wrap
            transform scaleY(-1)
    .bot-right
        top initial
        left initial
        right -1px
        bottom -1px
        .wrap
            transform scale(-1)

    .wrap
        position: absolute;
        height: 100%
        width 100%





</style>
