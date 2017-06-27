<template>
    <div class="container-fluid">
                <div class="card">
                    <div class="header">
                        <span class="title" style="font-size: 30px">选择地点:</span>
                        <select v-model="selectedProvince" class="selectpicker" id="st1">
                            <option v-for="(province,index) in provinces"
                                    v-if="province.level==1" :value="province" :key="province.code">
                                {{province.name}}
                            </option>
                        </select>
                        <select v-model="selectedCity" class="selectpicker" id="st2">
                            <option v-for="(city,index) in cities" :value="city" :key="city.code">
                                {{city.name}}
                            </option>
                        </select>
                        <select v-model="selectedBlock" class="selectpicker" id="st3">
                            <option v-for="(block,index) in blocks" :value="block" :key="block.code">
                                {{block.name}}
                            </option>
                        </select>
                        <button class="btn btn-info btn-fill btn-wd">确 定</button>
                        <p class="category">24 Hours performance</p>
                    </div>
                    <div class="content">
                        <ul class="list-unstyled team-members">
                            <li v-for="(video,index) in videos" :key="video.vid">
                                <div class="row">
                                    <div class="col-xs-3">
                                            {{index+1}}
                                    </div>
                                    <div class="col-xs-6">
                                        {{video.videoName}}
                                        <br />
                                        <span class="text-muted"><small>{{video.videoTime}}</small></span>
                                    </div>
                                    <div class="col-xs-3 text-right">
                                        <button class="btn btn-sm btn-success btn-icon" @click="playVideo(video.videoName)"><img :src="play"/></button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="block page">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="10"
                                layout="total,prev, pager, next, jumper"
                                :total="20">
                        </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="card">
                        <div class="header">
                            <h4 class="title">播放录像</h4>
                            <p class="category">24 Hours</p>
                        </div>
                        <div class="content">
                            <div id="player1">
                                <video-player  ref="videoPlayer"
                                               :options="playerOptions"
                                               @play="onPlayerPlay($event)"
                                               @pause="onPlayerPause($event)"
                                               @ended="onPlayerEnded($event)"
                                               @loadeddata="onPlayerLoadeddata($event)"
                                               @waiting="onPlayerWaiting($event)"
                                               @playing="onPlayerPlaying($event)"
                                               @timeupdate="onPlayerTimeupdate($event)"
                                               @canplay="onPlayerCanplay($event)"
                                               @canplaythrough="onPlayerCanplaythrough($event)"
                                               @ready="playerReadied"
                                               @statechanged="playerStateChanged($event)">
                                </video-player>
                            </div>
                        </div>
                </div>
    </div>
</template>

<script>
    import provinces from './province.js'
    import Vue from 'vue'
    import play from './img/play.png'
    import posters from '../../../assets/2.jpg'
    export default{
        data(){
            return{
                provinces:null,
                selectedProvince:null,
                selectedCity:null,
                selectedBlock:null,
                cities:null,
                blocks:null,
                posters,
                play,
                videos:[
                    {vid:1,videoName:'yq.mp4',videoTime:'2017-6-20'},
                    {vid:2,videoName:'movie.mp4',videoTime:'2017-6-19'},
                    {vid:3,videoName:'nnnn',videoTime:'2017-6-18'},
                    {vid:4,videoName:'cccc',videoTime:'2017-6-17'},
                    {vid:5,videoName:'dddd',videoTime:'2017-6-16'},
                    {vid:6,videoName:'dddd',videoTime:'2017-6-16'},
                    {vid:7,videoName:'dddd',videoTime:'2017-6-16'},
                    {vid:8,videoName:'dddd',videoTime:'2017-6-16'},
                    {vid:9,videoName:'dddd',videoTime:'2017-6-16'},
                    {vid:10,videoName:'dddd',videoTime:'2017-6-16'},
                ],
                currentPage:1,
                playerOptions: {
                    // component options
                    start: 0,
                    playsinline: false,
                    // videojs options
                    muted: true,
                    //autoplay:true,
                    language: 'Zh-cn',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    height:600,
                    sources: [{
                        type: "video/mp4",
                        src: ""
                    }],
                    poster: posters,
                }
            }
        },
        created() {
            this.fetchData();
            // 数据初始化,默认选中北京市,默认选中第一个;北京市数据为总数据的前18个
            let beijing = this.provinces.slice(0, 19);
            this.selectedProvince=beijing[0];
            this.cities = beijing.filter(item => {
                if (item.level === 2) {
                    return true;
                }
            });
            this.selectedCity = this.cities[0];
            this.blocks = beijing.filter(item => {
                if (item.level === 3) {
                    return true;
                }
            });
            this.selectedBlock = this.blocks[0];
            Vue.nextTick(function () {
                $('#st1').selectpicker('refresh');
                $('#st2').selectpicker('refresh');
                $('#st3').selectpicker('refresh');
            });
        },
        mounted() {
            // console.log('this is current player instance object', this.player)
            setTimeout(() => {
                // console.log('dynamic change options', this)
                this.playerOptions.muted = false
            }, 2000)
        },
        watch: {
            selectedProvince(val){
                if(val==null||val=='') return false;
                // 港澳台数据只有一级,特殊处理
                if (val.sheng === '71' || val.sheng === '81' || val.sheng === '82') {
                    this.cities = [val]
                    this.blocks = [val]
                } else{
                    this.cities = this.provinces.filter(item => {
                        if (item.level == 2 && item.sheng && item.sheng == val.sheng) {
                            return true;
                        }
                    });
                    this.selectedCity=this.cities[0];
                }
                Vue.nextTick(function () {
                    $('#st1').selectpicker('refresh');
                    $('#st2').selectpicker('refresh');
                    $('#st3').selectpicker('refresh');
                });
            },
            selectedCity(val){
                if (val == null || val == '') return false;
                if (val.sheng === '71' || val.sheng === '81' || val.sheng === '82') {
                    this.cities = [val]
                    this.blocks = [val]
                } else {
                    this.blocks = this.provinces.filter(item => {
                        if (item.level == 3 && item.sheng == val.sheng && item.di == val.di && item.name != '市辖区') {
                            return true;
                        }
                    });
                    this.selectedBlock=this.blocks[0];
                }
                Vue.nextTick(function () {
                    $('#st1').selectpicker('refresh');
                    $('#st2').selectpicker('refresh');
                    $('#st3').selectpicker('refresh');
                });
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            fetchData () {
                this.provinces=provinces.provinces();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            playVideo(videoName){
                this.playerOptions.sources[0].src="http://119.23.22.99/static/video/"+videoName;
                this.playerOptions.autoplay=true;
                $('div').animate({scrollTop: 1000}, 800)
            },
            // listen event
            onPlayerPlay(player) {
                console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            onPlayerEnded(player) {
                // console.log('player ended!', player)
            },
            onPlayerLoadeddata(player) {
                // console.log('player Loadeddata!', player)
            },
            onPlayerWaiting(player) {
                // console.log('player Waiting!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player Playing!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player Timeupdate!', player.currentTime())
            },
            onPlayerCanplay(player) {
                // console.log('player Canplay!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player Canplaythrough!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                console.log('example 01: the player is readied', player)
            }
        }
    }
</script>

<style scoped>
    select {
        /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
        border: solid 1px #000;

        /*很关键：将默认的select选择框样式清除*/
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;

        /*在选择框的最右侧中间显示小箭头图片*/
        background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;


        /*为下拉小箭头留出一点位置，避免被文字覆盖*/
        padding-right: 14px;
    }


    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
    select::-ms-expand { display: none; }
    .page{
        margin:0 auto;
    }
</style>