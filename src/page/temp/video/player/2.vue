<template>
    <div class="item">
        <div class="player">
            <video-player :options="playerOptions"
                          @ready="playerIsReady"
                          @changed="playerStateChanged($event)"
                          ref="videoPlayer">
            </video-player>
        </div>
    </div>
</template>

<script>
    // hotkeys plugin
    export default {
        data() {
            return {
                playerOptions: {
                    // component options
                    customEventName: 'changed',
                    // component options
                    autoplay: false,
                    sources: [{
                        type: "video/mp4",
                        src: "http://vjs.zencdn.net/v/oceans.mp4"
                    }],
                    language: 'zh-CN',
                    techOrder: ['flash'],
                    poster: "/vue-video-player/static/images/author-2.jpg"
                }
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            playerStateChanged(playerCurrentState) {
                // console.log('example 2: state changed', playerCurrentState)
            },
            playerIsReady(player) {
                console.log('example 2 ready!', player)
                player.hotkeys({
                    volumeStep: 0.1,
                    seekStep: 5,
                    enableModifiersForNumbers: false
                })
            }
        }
    }
</script>

<style scoped>

</style>