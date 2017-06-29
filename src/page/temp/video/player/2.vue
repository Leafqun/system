<template>
    <div class="item">
        <div class="player">
            <video-player :options="playerOptions"
                          @ready="playerIsReady"
                          @changed="playerStateChanged($event)"
                          ref="videoPlayer">
            </video-player>
        </div>
        <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            开始演示模态框
        </button>
        <div>
        <a href="javascript:void(0)" data-toggle="modal" data-target="#myModal">
            <i class="ti-export"></i>
            <p>Quit</p>
        </a>
        </div>
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"
                                aria-hidden="true">×
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            模态框（Modal）标题
                        </h4>
                    </div>
                    <div class="modal-body">
                        按下 ESC 按钮退出。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default"
                                data-dismiss="modal">关闭
                        </button>
                        <button type="button" class="btn btn-primary">
                            提交更改
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
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