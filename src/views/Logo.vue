<template>
  <v-layout class="-full" pa-5>
    <v-flex text-xs-center>
      <!--<v-progress-linear-->
              <!--indeterminate-->
              <!--color="white"-->
              <!--class="mb-0"-->
      <!--&gt;</v-progress-linear>-->
      <h2>
        Logo Designs
      </h2>
      <p>

        Check out the logos below and let me know which number you like
      </p>
      <div class="sprite-container">
        <div class="sprite-wrapper">

          <img :src="sprite.src" :style="[{left: sprite.xPos, top: sprite.yPos}]"
               class="sprite"/>
        </div>
        <div class="actions">
          <v-btn aria-label="previous-logo" :disabled="!sprite.paused" @click="previous">previous
            <v-icon class="ml-3">mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn aria-label="pause-logo" :disabled="sprite.paused" @click="stopTicker">pause
            <v-icon class="ml-3">mdi-pause</v-icon>
          </v-btn>
          <v-progress-circular
            :value="sprite.index / sprite.frames * 100"
            color="blue-grey"
            class="ml-4 mr-4"
            size="60"
          >{{sprite.index}}
          </v-progress-circular>
          <v-btn aria-label="play-logo" :disabled="!sprite.paused" @click="startTicker">play
            <v-icon class="ml-3">mdi-play</v-icon>
          </v-btn>
          <v-btn aria-label="next-logo" :disabled="!sprite.paused" @click="next">next
            <v-icon class="ml-3">>mdi-skip-next</v-icon>
          </v-btn>
        </div>
      </div>
    </v-flex>
    <!--<v-dialog-->
      <!--v-model="!sprite.loaded"-->
      <!--persistent-->
      <!--width="300"-->
      <!--heigth="300"-->
      <!--dark-->
    <!--&gt;-->
      <!--<v-card-->
        <!--dark-->
      <!--&gt;-->
        <!--<v-card-text>-->
          <!--Please stand by-->

        <!--</v-card-text>-->
      <!--</v-card>-->
    <!--</v-dialog>-->
  </v-layout>
</template>

<script>
  /* eslint-disable no-trailing-spaces,no-unused-vars */

  export default {
    mounted () {
      this.load()
    },
    data () {
      return {
        sprite: {
          src: 'static/sprites/IC-1.png',
          cols: 4,
          frames: 32,
          imgWidth: null,
          index: 0,
          row: 0,
          containerWidth: 0,
          containerHeight: 0,
          speed: 1,
          paused: true,
          xPos: '0px',
          yPos: '0px',
          loaded: false
        }
      }
    },
    methods: {
      load () {
        this.sprite.imgData = new Image()
        this.sprite.imgData.onload = this.spriteLoaded.bind(this)
        this.sprite.imgData.src = this.sprite.src
      },
      spriteLoaded () {
        this.sprite.width = this.sprite.imgData.width
        this.sprite.height = this.sprite.imgData.height
        this.buildSprite()
      },
      stopTicker () {
        this.sprite.paused = true
        clearTimeout(this.sprite.ticker)
      },
      previous () {
        this.stopTicker()
        if (this.sprite.index === 0) {
          this.sprite.index = this.sprite.frames
        } else {
          this.sprite.index--
        }
        this.tick('previous')
      },
      next () {
        this.stopTicker()
        this.tick()
      },
      setSpeed () {

      },
      setContainer () {
        let spriteW = document.querySelector('.sprite-wrapper')
        spriteW.style.width = this.sprite.containerWidth + 'px'
        spriteW.style.height = this.sprite.containerHeight + 'px'
      },
      tick (direction) {
        let spr = this.sprite
        this.setContainer()
        if (spr.index > 0 && spr.index % spr.cols === 0) {
          spr.row++
        }
        spr.yPos = -spr.containerHeight * spr.row + 'px'
        spr.xPos = -spr.containerWidth * (spr.index % spr.cols) + 'px'
        if (spr.index >= spr.frames) {
          spr.index = 0
          spr.row = 0
          return
        }
        if (direction !== 'previous') {
          spr.index++
        }
      },
      startTicker () {
        let spr = this.sprite
        spr.paused = false
        clearTimeout(spr.ticker)
        spr.ticker = setInterval(this.tick.bind(this), 1000 * spr.speed)
      },
      buildSprite () {
        this.sprite.rows = (this.sprite.frames / this.sprite.cols)
        this.sprite.containerWidth = this.sprite.width / this.sprite.cols
        this.sprite.containerHeight = this.sprite.height / this.sprite.rows
        this.setContainer()
        this.sprite.loaded = true
        this.startTicker()
      }
    }
  }
</script>
<style lang="stylus">
  .sprite-wrapper
    margin 0 auto
    width 200px
    height 200px
    overflow hidden
    position relative

  .loader

  .sprite
    position absolute
    background-position 0 0
    background-repeat no-repeat
    background-size auto

</style>
