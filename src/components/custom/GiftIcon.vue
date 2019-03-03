<template>
    <div class="gift-ico bot-p ">
        <v-btn
                aria-label="go-to-contact"
                v-if="$route.name !== 'Contact'"
                @click="showGift = !showGift"
                fab
                dark
                medium
                :small="$vuetify.breakpoint.smAndDown"
                color="primary"
                :class="$vuetify.breakpoint.smAndDown ? 'bot' : ''"
                class="darken-3"
        >
            <v-icon
                    large
                    :medium="$vuetify.breakpoint.mdAndDown"
                    dark
            >
                mdi-gift
            </v-icon>
        </v-btn>
        <div class="relative">
            <div class="text-wrapper">
                <div class="text">
                    <p>Get in touch here.</p>
                </div>
                <div class="text">
                    <p>Get a FREE quote today.</p>
                </div>
            </div>
        </div>
        <v-dialog v-model="showGift" dark width="80vw">
            <div class="bg-white">
                <div class="dialog-wrapper ">
                    <div class="svg-wrap"
                    :class="{'wobble-hor-bottom' : !this.unwrap}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                            <path class="draw-path" d="M249.9 256.4c-55.4 0-108.7-7.2-142.8-39.5-21-19.9-31.7-46.5-31.7-79.2 0-38.2 34.5-93.7 90.1-116.7 48.4-20 127-22.8 227 77.3 12.7 12.7 12.7 33.4 0 46.2-12.7 12.7-33.4 12.7-46.2 0C287.5 85.7 233.9 63.9 191.1 81c-34.3 14-50.3 48.2-50.4 56.7 0 18.9 6.5 27.1 11.3 31.8 28 26.5 106.5 22.3 163.6 19.3 19.5-1.1 37.8-2 53.7-2 18.1 0 32.7 14.6 32.7 32.7S387.4 252 369.3 252c-14.9 0-32 .9-50.2 1.9-22.6 1.3-46.1 2.5-69.2 2.5zM750.1 256.4c-23.1 0-46.6-1.2-69.2-2.4-18.2-1-35.4-1.9-50.2-1.9-18.1 0-32.7-14.6-32.7-32.7s14.6-32.7 32.7-32.7c15.9 0 34.2 1 53.7 2 57.3 3 135.7 7.2 163.6-19.3 4.8-4.7 11.3-12.9 11.3-31.8-.1-8.4-16.1-42.7-50.4-56.6-42.8-17.2-96.4 4.6-155.2 63.4-12.7 12.7-33.4 12.7-46.2 0-12.8-12.7-12.7-33.4 0-46.2C707.7-1.8 786.3 1 834.5 21c55.6 23.1 90.1 78.5 90.1 116.7 0 32.6-10.7 59.2-31.8 79.2-34 32.3-87.3 39.5-142.7 39.5zM500 924.8c-18.1 0-32.7-14.6-32.7-32.7V271.4c0-18.1 14.6-32.7 32.7-32.7s32.7 14.6 32.7 32.7v620.8c0 18-14.6 32.6-32.7 32.6z"/>
                            <path class="draw-path" d="M565.3 304.1H434.7c-54.1 0-98-44-98-98v-32.7c0-54.1 44-98 98-98h130.6c54.1 0 98 44 98 98v32.7c0 54-43.9 98-98 98zM434.7 140.7c-18 0-32.7 14.6-32.7 32.7v32.7c0 18 14.6 32.7 32.7 32.7h130.6c18 0 32.7-14.6 32.7-32.7v-32.7c0-18-14.6-32.7-32.7-32.7H434.7z"/>
                            <path class="draw-path" d="M892 990.2H108c-18.1 0-32.7-14.6-32.7-32.7v-392c0-18.1 14.6-32.7 32.7-32.7s32.6 14.6 32.6 32.7v359.4h718.7V467.4c0-18.1 14.6-32.7 32.7-32.7h32.6V304.1H75.3v130.6H794c18.1 0 32.7 14.6 32.7 32.7S812 500.1 794 500.1H42.6c-18.1 0-32.6-14.6-32.6-32.7v-196c0-18.1 14.6-32.7 32.6-32.7h914.7c18.1 0 32.7 14.6 32.7 32.7v196c0 18.1-14.6 32.7-32.7 32.7h-32.7v457.4c0 18-14.6 32.7-32.6 32.7z"/>

                        </svg>
                    </div>
                    <div class="gift-content text-lg-center mt-4">
                        <h1>Here's your gift</h1>
                        <p>Unwrap it to see what gift is available to you today.</p>

                        <v-form
                                light
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-text-field
                                    light
                                    v-model="name"
                                    :counter="10"
                                    :rules="nameRules"
                                    label="Name"
                                    placeholder="CODE"
                                    outline
                                    required
                            ></v-text-field>
                            <v-btn @click="unwrapGift">unwrap</v-btn>
                        </v-form>
                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    import animLib from '../../plugins/gsap-animation-library'
    export default {
        data () {
            return {
                showGift: null,
                unwrap: null,
                valid: false,
                name: "",
                nameRules: [
                    v => !!v || 'Code is required',
                    v => (v && v.length <= 10) || 'The code can be found on any of our promotional material'
                ]
            }
        },
        mounted(){
            let $text = this.$el.querySelectorAll('.text')
            setTimeout(()=> {
                let tL = new TimelineMax()
                $text.forEach(($e) => {
                    let newTL = new TimelineMax()
                    newTL
                        .set($e, {display: 'block'})
                        .to($e, 2, {autoAlpha: 1, yoyo: true, repeat: 1})
                        .set($e, {display: 'none'})
                    tL.add(newTL)
                }, 2000)
            })


        },
        methods:{
            submit(){

            },
            unwrapGift(){
                this.submitToServer({code: this.name}, 'POST', '/get-promo-code')
                    .then(response => {
                        console.log(response)
                        this.unwrap = !this.unwrap
                        let $paths = document.querySelectorAll('.draw-path')
                        let tL = new TimelineMax()
                        tL
                            .set($paths, {drawSVG:'100%'})
                            .to($paths, 2, {drawSVG:'0%'})
                    })
                    .catch(err =>{
                        console.log(err)
                    })


            }
        }
    }
</script>

<style scoped lang="stylus">

    path
        stroke: #000;
        stroke-width: 12px;
        fill: white;

    .relative
        position: relative;

    .text-wrapper
        overflow visible
        position: absolute;
        bottom:100%;
        left:100%;
        width: 300px;

    .text
        display none
        visibility: hidden;
        opacity: 0;

    .bg-white
        background #eaeaea

    .dialog-wrapper
        width: 500px;
        max-width: 80vw;
        max-height: 90vh
        margin: auto;
        padding: 50px

    .gift-ico
        right 0
        top 0
        bottom 0
        margin auto
        position: fixed
        z-index: 50
        .v-btn
            border-radius 0
            margin 0
        &.bot-p
            top initial
            bottom: 0px
        &.left-p
            right initial
            left 0

</style>
