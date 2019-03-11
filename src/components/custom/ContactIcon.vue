<template>
    <div class="contact-ico bot-p left-p">
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
        <div class="relative">
            <div class="text-wrapper">
                <div class="text">
                    <h3>Get in touch here.</h3>
                </div>
                <div class="text">
                    <h3>Get a FREE quote today.</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
        position absolute
        top 0
        left 0
        color white
        

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