<template>
    <div class="selectpicker">
        <select id="st3" v-model="selectedProvince" class="selectpicker">
            <option v-for="(province,index) in provinces"
                v-if="province.level==1" :value="province" :key="province.code" >
                {{province.name}}
            </option>
        </select>
        <div>{{selectedProvince}}</div>
        <select id="st1" v-model="selectedCity" class="selectpicker" data-live-search='true' title='请选择' data-live-search-placeholder='搜索'>
            <option v-for="(city,index) in cities" :value="city" :key="city.code" >
                {{city.name}}
            </option>
        </select>
        <div>{{selectedCity}}</div>
        <select id="st2" v-model="selectedBlock" class="selectpicker" data-live-search='true' title='请选择' data-live-search-placeholder='搜索'>
            <option v-for="(block,index) in blocks" :value="block" :key="block.code" >
                {{block.name}}
            </option>
        </select>
        <select class="selectpicker">
            <option>213</option>
            <option>213</option>
            <option>213</option>
            <option>213</option>
        </select>
        <div>{{selectedBlock}}</div>
        <button @click="changeCities">aa</button>
        <div>{{cities}}</div>
        <video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered"
               controls preload="auto" width="1080" height="620"
               poster="http://video-js.zencoder.com/oceans-clip.png"
               data-setup='{"example_option":true}'>
            <source src="http://localhost:8080/pic/yq.mp4" type='video/mp4' />
            <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
        </video>
        <video src="http://localhost:8080/pic/yq.mp4" controls="controls">
            your browser does not support the video tag
        </video>
    </div>
</template>

<script>
    import provinces from './province.js'
    import Vue from 'vue'
    export default{
        data(){
            return{
                provinces:[],
                selectedProvince:null,
                selectedCity:null,
                selectedBlock:null,
                cities:[],
                blocks:[]
            }
        },
        created() {
            this.fetchData();
            $('.selectpicker').selectpicker();
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
        computed: {
            info() {
                return {
                    province: this.selectedProvince,
                    city: this.selectedCity,
                    block: this.selectedBlock
                }
            }
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
                    Vue.nextTick(function () {
                        $('#st1').selectpicker('refresh');
                        $('#st2').selectpicker('refresh');
                        $('#st3').selectpicker('refresh');
                    });
                }

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
                    Vue.nextTick(function () {
                        $('#st1').selectpicker('refresh');
                        $('#st2').selectpicker('refresh');
                        $('#st3').selectpicker('refresh');
                    });
                }
            }
        },
        methods: {
            fetchData () {
                this.provinces=provinces.provinces();
            },
            changeCities(){
                if(this.selectedProvince==null||this.selectedProvince=='') return false;
                // 港澳台数据只有一级,特殊处理
                if (this.selectedProvince.sheng === '71' || this.selectedProvince.sheng === '81' || this.selectedProvince.sheng === '82') {
                    this.cities = [this.selectedProvince]
                    this.blocks = [this.selectedProvince]
                } else{
                    this.cities = this.provinces.filter(item => {
                        if (item.level == 2 && item.sheng && item.sheng == this.selectedProvince.sheng) {
                            return true;
                        }
                    });
                    this.selectedCity=this.cities[0];
                }
            }
        }
    }
</script>
<style>

</style>