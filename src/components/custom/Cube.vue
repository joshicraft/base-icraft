<template>
    <div class="wrapper -arrow-buffer-top" id="cube">
        <div class="cube">
            <div class="wrapper">
                <div class="boxes" >
                    <div class="box" @click="cube.click(i)" v-for="(item, i ) in items">
                        <v-img

                                :src="item.img"
                        >
                        <!--<h1>{{item.title}}</h1>-->
                        </v-img>
                    </div>
                </div>
            </div>
        </div>
        <div class="null-object">

        </div>
        <div class="thumbs-wrapper d-flex">
            <div class="arrow left-arrow">
                <v-icon @click="cube.click('prev')" color="white" size="60">
                    mdi-chevron-left
                </v-icon>
            </div>
            <div class="thumbs">
                <div class="thumb"
                     @click="cube.click(i)"
                     v-for="(item, i) in items"
                >
                    <v-img
                    :src="item.img"
                    >

                    </v-img>
                    <!--<h4>{{item.title}}</h4>-->
                </div>
            </div>
            <div class="arrow left-arrow">
                <v-icon @click="cube.click('next')" color="white" size="60">
                    mdi-chevron-right
                </v-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import cubeObject from '../../plugins/cube-3d'
    export default {
        name: "Cube",
        data() {
            return {
                cube: cubeObject,
                items: [
                    {
                        title: 'Nectar',
                        img: 'static/nectar-bg-1.png'
                    },
                    {
                        title: 'Certified Welding',
                        img: 'static/nectar-bg-1.png'
                    },
                    {
                        title: 'Tonys Rount Tuit',
                        img: 'static/nectar-bg-1.png'
                    },
                    {
                        title: 'Urban Socialite',
                        img: 'static/nectar-bg-1.png'
                    },
                    {
                        title: 'Nectar',
                        img: 'static/nectar-bg-1.png'
                    },
                    {
                        title: 'Nectar',
                        img: 'static/nectar-bg-1.png'
                    },
                    {
                        title: 'New 1',
                        img: 'static/nectar-bg-1.png'
                    }
                ]
            }
        },
        mounted() {
            cubeObject.init('#cube', this.items)
        }
    }
</script>

<style scoped lang="stylus">

    .boxes
        width 100%
        hight auto

    .arrow:hover
        i
            color #00abff !important

    .box
        left: 50%
        top: 30%
        xPercent: -50
        yPercent: -0
        position: absolute
        overflow: hidden
        backgroundSize: cover
        backgroundPosition: center
        background: rgba(244 244 244 0.9)
        z: -0
    
    .thumbs-wrapper
        position: relative
        left: 0
        width: 90%
        max-width: 600px
        zIndex: 100
        margin: 0 auto
        height: 60px
        margin-bottom 2em


    .thumbs
        width 100%
        display: flex
        flex-direction row

    .thumb
        opacity 0.7
        margin 3px
        background white
        height 50px
        flex-grow: 1
        flex-basis: 0
        cursor pointer
        transition opacity 0.3s ease-in
        &:hover
         opacity 1

    #cube
        /*margin-top: 300px;*/
        padding-top 100px
        min-height 100vh
        width: 100%
        backgroundColor: black
        overflow: hidden

    .null-object
        position: 'absolute'
        x: 0

</style>