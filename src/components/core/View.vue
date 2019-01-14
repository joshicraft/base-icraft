<template>
    <v-content>
        <div class="jumbo-bot-arrow top">
            <svg viewBox="0,0,500,100" preserveAspectRatio="none">
                <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
                <!--<polygon fill="#fafafa" points="0,0 0,100 250,50 500,100 500,0 250,50"></polygon>-->
            </svg>
        </div>
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
        </div>
        <router-view :loadTickerCount="loadTickerCount"/>
    </v-content>
</template>

<script>
    import animationLibrary from '../../plugins/gsap-animation-library'
    export default {
        metaInfo() {
            return {
                titleTemplate: '%s'
            }
        },
        props: {
            loadTickerCount: {
                default: 0,
                type: Number
            }
        },
        mounted () {
            let p = 's'
            animationLibrary.wobble(document.querySelector('.contact-ico'))
          //   let $this = this
          // document.addEventListener('keydown', (e)=>{
          //     console.log(e)
          //     if(e.keyCode === 78) {
          //         $this.$vuetify.goTo(window.scrollY + window.innerHeight)
          //         // TweenMax.to(window, {scrollTo: {y: window.scrollY + window.innerHeight}})
          //     }else {
          //         $this.$vuetify.goTo(0)
          //     }
          //     return false
          // }, false)
        },
        methods: {
            goToContact () {
                this.$router.push({name:'Contact'})
                setTimeout(() => {
                    this.$vuetify.goTo(window.innerHeight + 15, { offset: -document.querySelector('.v-toolbar').getBoundingClientRect().height })
                }, 2000)

            },
        }
    }
</script>
<style lang="stylus" scoped>
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
            left 0px

    .v-content
        min-height 100vh
        opacity 0
        transition opacity 0.25s ease-in
        opacity 1
</style>
