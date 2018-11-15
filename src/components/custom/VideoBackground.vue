<template>
  <section class="VideoBg">
    <video playsinline autoplay loop muted ref="video">
      <source v-for="source in sources" :key="source" :src="source" :type="getMediaType(source)">
    </video>
    <div class="VideoBg__content">
      <slot></slot>
    </div>
  </section>
</template>
<script>
    /* eslint-disable vue/no-async-in-computed-properties */

    export default {
        name: 'custom-video-background',
        props: {
            sources: {
                type: Array,
                required: true
            },
            img: {
                type: String
            }
        },

        data () {
            return {
                videoRatio: null
            }
        },
        watch: {
            $route() {
                this.$refs.video.currentTime = 6
            }
        },

        // computed: {
        //   lazyLoaded () {
        //     let lazyLoaded = this.$store.state.app.lazyLoaded
        //     let $this = this
        //     if (lazyLoaded) {
        //       setTimeout(this.play, 1)
        //     }
        //     return lazyLoaded
        //   }
        // },
        mounted () {
            this.setImageUrl()
            this.setContainerHeight()
            window.addEventListener('resize', this.resize)
            document.body.addEventListener('click', this.playVideo)
            setTimeout(this.play, 200)
        },

        beforeDestroy () {
            window.removeEventListener('resize', this.resize)
        },

        methods: {
            play () {
                this.playVideo()
            },
            playVideo () {
                this.setContainerHeight()
                if (this.videoCanPlay()) {
                    this.$refs.video.oncanplay = () => {
                        if (!this.$refs.video) return
                        this.videoRatio = this.$refs.video.videoWidth / this.$refs.video.videoHeight
                        this.setVideoSize()
                        this.$refs.video.style.visibility = 'visible'
                    }
                }
            },
            resize () {
                this.setContainerHeight()

                if (this.videoCanPlay()) {
                    this.setVideoSize()
                }
            },

            videoCanPlay () {
                return this.$refs.video && !!this.$refs.video.canPlayType
            },

            setImageUrl () {
                if (this.img) {
                    this.$el.style.backgroundImage = `url(${this.img})`
                }
            },

            setContainerHeight () {
                this.$el.style.height = `${window.innerHeight}px`
            },

            setVideoSize () {
                let width
                let height
                let containerRatio = this.$el.offsetWidth / this.$el.offsetHeight

                if (containerRatio > this.videoRatio) {
                    width = this.$el.offsetWidth
                } else {
                    height = this.$el.offsetHeight
                }

                this.$refs.video.style.width = width ? `${width}px` : 'auto'
                this.$refs.video.style.height = height ? `${height}px` : 'auto'
            },

            getMediaType (src) {
                return 'video/' + src.split('.').pop()
            }
        }
    }
</script>


<style>
  .VideoBg {
    position: relative;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .VideoBg video {
    position: absolute;
    top: 50%;
    left: 50%;
    visibility: hidden;
    transform: translate(-50%, -50%);
  }

  .VideoBg__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
