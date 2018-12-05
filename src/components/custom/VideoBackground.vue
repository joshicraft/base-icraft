<template>
    <section class="VideoBg">
        <video playsinline autoplay loop muted ref="video">
            <source v-for="source in sources" :key="source" :src="source+'#t=5.56'" :type="getMediaType(source)">
        </video>
        <div class="VideoBg__content">
            <slot></slot>
        </div>
    </section>
</template>
<script>
    /* eslint-disable no-undef */
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

        data() {
            return {
                video: null,
                videoRatio: null
            }
        },
        watch: {
            $route(to, from) {
                if (from !== null) {
                    this.play()
                    this.video.currentTime = 5.65
                }
            }
        },

        mounted() {
            this.video = this.$el.querySelector('video')
            this.setImageUrl()
            this.setContainerHeight()
            window.addEventListener('resize', this.resize)
            document.body.addEventListener('click', this.play)
            // setTimeout(this.play, 500)
            // setTimeout(this.play, 1000)
            // setTimeout(this.play, 2000)
            // TweenMax.delayedCall(0.5, this.play, [], this)
            // TweenMax.delayedCall(1, this.play, [], this)
            // TweenMax.delayedCall(2, this.play, [], this)

            this.video.onloadeddata = this.play
            this.checkPausedTicker = setInterval(this.tickCheck, (1000/24))

        },

        beforeDestroy() {
            window.removeEventListener('resize', this.resize)
        },

        methods: {
            play() {
                this.playVideo()
                this.tickCheck()
            },
            tickCheck () {
                if(this.video && this.video.paused) {
                    // clearInterval(this.checkPausedTicker)
                    this.video.play()
                }
            },
            playVideo() {
                this.setContainerHeight()
                if (this.videoCanPlay()) {
                    this.video.oncanplay = () => {
                        if (!this.video) return
                        this.videoRatio = this.video.videoWidth / this.video.videoHeight
                        this.setVideoSize()
                        this.video.style.visibility = 'visible'
                    }
                }
            },
            resize() {
                this.setContainerHeight()

                if (this.videoCanPlay()) {
                    this.setVideoSize()
                }
            },

            videoCanPlay() {
                return this.video
            },

            setImageUrl() {
                if (this.img) {
                    this.$el.style.backgroundImage = `url(${this.img})`
                }
            },

            setContainerHeight() {
                this.$el.style.height = `${window.innerHeight}px`
            },

            setVideoSize() {
                let width
                let height
                let containerRatio = this.$el.offsetWidth / this.$el.offsetHeight

                if (containerRatio > this.videoRatio) {
                    width = this.$el.offsetWidth
                } else {
                    height = this.$el.offsetHeight
                }

                this.video.style.width = width ? `${width}px` : 'auto'
                this.video.style.height = height ? `${height}px` : 'auto'
            },

            getMediaType(src) {
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
