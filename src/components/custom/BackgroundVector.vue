<template>
    <div class="vid-bg-vector" :class="position" :style="{width: width, height: height}">
        <div class="wrap">
            <svg preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 176.667">
                <path :style="{'fill': fillTop}" d="M-0.083,0.855c0,0,485,175.333,1117,175.333s787-84,787-84v84h-1904V0.855z"/>
            </svg>
        </div>
        <div class="wrap">
            <svg preserveAspectRatio="xMinYMax meet" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1902 176.667">
                <path :style="{'fill': fill}"
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
            fillTop: {
                type: String,
                default: '#5A5A5A'
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
        top 0
        left 0
        //top 1px
        //left -1px

        overflow hidden

    .top-right
        transform scaleX(-1)
        right -1px
        top -1px
        left initial

    .bot-left
        transform scaleY(-1)
        top initial
        left -1px
        bottom -1px

    .bot-right
        transform scale(-1)
        top initial
        left initial
        right -1px
        bottom -1px
        svg
            filter drop-shadow(0px 0px -7px rgba(0, 0, 0, 0.25))

    .wrap
        position: absolute;
        height calc(100% + 2px)
        width calc(100% + 2px)
        overflow hidden



</style>
