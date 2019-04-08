<template>
    <v-content id="view">
        <div class="jumbo-bot-arrow top"
            v-if="$route.path !== '/blog'"
        >
            <svg viewBox="0,0,500,100" preserveAspectRatio="none">
                <polygon fill="#fafafa" points="0,0 0,50 250,100 500,50 500,0 250,50"></polygon>
                <!--<polygon fill="#fafafa" points="0,0 0,100 250,50 500,100 500,0 250,50"></polygon>-->
            </svg>
        </div>

        <router-view :loadTickerCount="loadTickerCount"/>
        <noscript>



            <h1 class="mb-3 -text-anim">{{title}}</h1>
            <h2 class="-text-anim">{{subTitle}}</h2>


            <p>We're sorry but ICRAFT Websites - Digital - Branding doesn't work properly without JavaScript enabled.</p>
            <p>Please enable it to continue to check out our sweet business website deals and IT Solutions.</p>
            <p>If you can't do that email us at <a href="mailto:josh@icraft.co.nz">josh@icraft.co.nz</a> or give us a call on <a href="tel:02102859043">02102859043</a></p>

        </noscript>
    </v-content>
</template>

<script>
    export default {
        metaInfo() {
            console.log(window.location.href)
            return {
                // titleTemplate: '%s',

                links: [
                    {rel: 'canonical', href: window.location.href}
                ]
            }
        },
        computed: {

            namespace() {
                return this.getNameSpace()
            },
            title() {
                return this.$t('Views.' + this.namespace + '.jumbotronTitle')
            },
            subTitle() {
                return this.$t('Views.' + this.namespace + '.jumbotronSubTitle')
            }
        },
        props: {
            scrolled: Boolean,
            loadTickerCount: {
                default: 0,
                type: Number
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .v-content
        min-height 100vh
        opacity 0
        transition opacity 0.25s ease-in
        opacity 1
</style>
