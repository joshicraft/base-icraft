<template>
    <div class="contact-ico bot-p left-p">
        <div class="relative">
        <v-btn
                aria-label="go-to-contact"
                v-if="$route.name !== 'Contact'"
                @click="goToContact"
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
                mdi-phone
            </v-icon>
        </v-btn>
        <div class="contact-text absolute d-flex justify-center align-center">
            <div class="text-wrapper d-flex justify-center align-center"
                 @click="goToContact"
            >
                <a class="text">
                    <h3>Click here for a FREE quote.</h3>
                </a>
                <a class="text">
                    <h3>{{ contact.phone }}</h3>
                </a>
                <a class="text">
                    <h3>{{ contact.email }}</h3>
                </a>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        computed: {
          contact(){
              return this.$t('Views.Contact')
          }
        },
        mounted(){
            let $text = this.$el.querySelectorAll('.text')

            setTimeout(()=> {
                let tL = new TimelineMax({repeat: -1, repeatDelay: 0})
                $text.forEach(($e, i) => {
                    let newTL = new TimelineMax(),
                        text = $e,
                        mySplitText = new SplitText(text, {type: "words,chars"}),
                        chars = mySplitText.chars; //an array of all the divs that wrap each character
                    TweenLite.set(text, {perspective: 400});
                    newTL
                        .set($e, {display: 'block'}, 'a+' + i)
                        .staggerFrom(chars, 1, {
                            opacity: 0,
                            scale: 0,
                            y: -60,
                            rotationX: 180,
                            transformOrigin: "0% 50% 50",
                            ease: Back.easeInOut
                        }, 0.01)
                        .staggerTo(chars, 1, {
                            opacity: 0,
                            scale: 0,
                            y: 60,
                            rotationX: -180,
                            transformOrigin: "0% 50% 50",
                            ease: Back.easeInOut
                        }, 0.01, '+=5')
                        .set($e, {display: 'none'})
                    tL.add(newTL)
                })
            })


        },
        methods:{


            goToContact () {
                this.playSound('click', 0.3)
                this.$router.push({name:'Contact'});
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight, { offset: -document.querySelector('.v-toolbar').getBoundingClientRect().height })
                }, 3300)

            },
        }
    }
</script>

<style scoped lang="stylus">
    
    .relative
        position: relative;
    .absolute
        width: 100%
        height: 100%
        position: absolute;
        top:0;

    .text-wrapper
        overflow: visible;
        position: absolute;
        left: 120%;
        width: 285px;
        height: 40px;
        padding: 10px;
        border-radius: 10px;
        background: #595959;
        h3
            display block
    .text
        display none
        position absolute
        top: 8px;
        left: 10px;
        color white
        cursor pointer
        transition color 0.3s
        &:hover
            color: #56a3ff
        

    .contact-ico
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