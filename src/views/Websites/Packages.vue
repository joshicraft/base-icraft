<template>
    <v-container class="-arrow-buffer-top packages">
        <v-layout column wrap class="title-a">
            <h1 class="mt-5 mb-3 text-lg-center" id="packages">
                BASELINE PACKAGES
            </h1>
            <h3 class="mb-4 text-lg-center">
                {{ data.subTitle }}
            </h3>
            <p class="text-lg-center">
                {{ data.disclaimer }}
            </p>
        </v-layout>
        <v-layout

                class="relative"
                row
                wrap
                justify-center
                align-start
        >
            <div class="info-box-container" v-if="showInfo" :style="{top: infoBoxPos.y + 'px', left: infoBoxPos.x + 'px'}">
                <div class="tab-arrow"></div>
                {{infoBoxContent}}
            </div>
            <v-flex
                    mb-3
                    :class="[$vuetify.breakpoint.smAndDown ? 'pa-2' : '']"
                    justify-space-between
                    align-content-space-between
                    d-flex>
                <v-flex
                        light
                        class="pa-3"
                >
                    <v-container
                            grid-list-lg
                            pa-0
                            pb-4
                            d-flex
                            justify-center
                            align-center
                            class="max-view-width"
                            id="packages-scroll-point"
                    >
                        <v-layout
                                row
                                wrap
                                mt-4

                        >
                            <v-flex
                                    lg3
                                    md3
                                    sm6
                                    xs12
                                    v-for="(packageItem, p) in items"
                                    :key="p"
                            >
                                <v-card
                                        md6
                                        dark
                                        @mouseover="hoverPackage"
                                        class="elevation-6 column shake-vertical package"
                                >
                                    <div class="point"></div>
                                    <div class="text-xs-center top-content pt-4 pl-4 pr-4 pb-1">
                                        <v-flex
                                                row
                                        >
                                            <h1
                                                    :class="packageItem.iconColor + '--text'"
                                            >
                                                {{packageItem.name }}
                                            </h1>
                                            <v-icon
                                                    v-model="resultName"
                                                    mt-2
                                                    :size="$vuetify.breakpoint.smAndDown ? '100px' : '150px'"
                                                    class="anim-icon"
                                                    :class="{'animate' : resultName.toLowerCase() === packageItem.name.toLowerCase()}"
                                                    :color="packageItem.iconColor"
                                            >
                                                {{packageItem.icon}}
                                            </v-icon>
                                        </v-flex>
                                        <h3
                                                class="font-weight-thin"
                                                :class="$vuetify.breakpoint.smAndDown ? 'mt-2' : 'mt-4'"
                                        >
                                            {{ packageItem.price }}
                                        </h3>
                                        <p
                                                :class="$vuetify.breakpoint.smAndDown ? 'mt-2' : 'mt-4'"
                                        >
                                            {{ packageItem.title }}
                                        </p>
                                    </div>
                                    <v-list two-line class="list">
                                        <v-list-group
                                                append-icon="mdi-arrow-down"
                                                v-model="packageItem.active"
                                                expand
                                        >
                                            <v-list-tile :ripple="true" slot="activator"
                                                         @click="clickPackage(!packageItem.active ? '#packages-scroll-point' : '#packages')">
                                                <v-list-tile-content>
                                                    <h4>
                                                        {{!packageItem.active ? "SHOW PACKAGE" : "CLOSE"}}
                                                    </h4>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile

                                                    v-for="subItem in packageItem.items"
                                                    :key="subItem.text"
                                                    @mouseleave="showInfo = false"
                                            >
                                                <v-list-tile-action>
                                                    <v-icon>{{ subItem.icon }}</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>{{ subItem.text }}
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                                <template>
                                                <v-list-tile-action @mouseover="hoverInfo($event, subItem)"
                                                                    @mouseleave="hoverOffInfo(subItem)" class="pointer">
                                                    <v-icon right :class="{'ping': subItem.active}">mdi-information-outline</v-icon>
                                                </v-list-tile-action>
                                                </template>
                                            </v-list-tile>
                                            <div class="line mb-3"></div>
                                            <v-btn @click="goToAndScroll('Contact')"
                                                   class="primary mb-4 ml-3 center-btn">GET IN TOUCH
                                                <v-icon class="ml-4">mdi-phone</v-icon>
                                            </v-btn>
                                        </v-list-group>
                                    </v-list>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                showInfo: false,
                infoBoxPos: {x: 0, y: 0},
                infoBoxContent: "",
                resultName: this.$route.params.result || '',
                items: [],
                packageItems: this.$t('Views.Websites.Packages.packageItems')
            }
        },
        mounted(){
            this.mapInfo()
        },
        computed: {
            getPackageSelected(name) {
                let result = this.resultName
                if (!result) {
                    return ''
                }
                return result.toLowerCase() === name.toLowerCase() ? 'animate' : ''
            },

            data() {
                return this.$t('Views.' + this.getNameSpace())
            },
            getInfoPos() {
                return this.infoBoxPos
            }
        },
        methods: {
            mapInfo(){
                let d = this.$t('Views.' + this.getNameSpace()).items
                this.items = d.map((item)=>{
                    item.items = item.items.map((i)=>{
                        let l = {...this.packageItems.find((j)=>{
                            return j.key === i.key
                            }), ...i}
                        if(i.suffix && l.text.indexOf(i.suffix) === -1){
                            l.text += i.suffix
                        }
                        return l
                    })
                    return item

                })
                console.log(this.items)
            },
            hoverPackage() {
                this.resultName = ''
            },
            clickPackage (loc) {
                this.showInfo = false
                this.goToID(loc)
            },
            getPackItem(info){
              let item = this.packageItems.find((item)=>{
                  return item.key === info.key
              })
                if(item && item.suffix){
                    item.text += info.suffix
                }
                if(!item){
                    item = {text: ""}
                }
                return item
            },
            hoverOffInfo(info){
              this.showInfo = false
              info.active = false
            },
            hoverInfo(e, info) {
                let cords = e.currentTarget.getBoundingClientRect()
                info.active = true
                this.showInfo = true


                this.infoBoxContent = info.info
                this.infoBoxPos.x = cords.left + cords.width + 20
                this.infoBoxPos.y = cords.top
                console.log(this.infoBoxPos)
                console.log(this.infoBoxContent)
                console.log(info)

            }
        }
    }
</script>
<style lang="stylus">
    .packages
        .info-box-container
            position: fixed;
            left 0
            top 0
            z-index 100
            background: #2b2b2b;
            color: white;
            border-radius: 5px;
            padding: 8px 10px;
            max-width: 250px;
            box-shadow: 0px 1px 9px rgba(49, 49, 49, 0.3);
            .tab-arrow
                width: 20px
                height: 20px
                position: absolute
                left: -10px
                z-index: -1
                top: 27px
                background: inherit
                transform: rotate(45deg)
    .title-a
            max-width: 800px;

    .package
        overflow hidden

        .center-btn
            margin-left auto !important
            margin-right auto
            display block

        .line
            height 1px
            background: rgba(255, 255, 255, 0.12);

        .point
            width 100%
            height 1000px
            position absolute
            bottom 0
            left 0
            transform: rotate(45deg);
            background: rgba(179, 179, 179, 0.03)
</style>