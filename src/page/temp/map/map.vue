<template>
    <div class="container-fluid">
        <div class="card card-map">
            <div class="header">
                <h4 class="title">高德Maps  position: [{{ lng }}, {{ lat }}] address: {{ address }}</h4>
            </div>
            <div class="map">
                <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :events="events">
                    <el-amap-marker v-for="marker in markers" :key="marker.position" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
                    <el-amap-info-window v-for="window in windows" :key="window.position" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
                </el-amap>
            </div>
            <div class="a">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">中心坐标:{{center|remove_brackets}}</h4>
                            <p class="category">成员数：{{memberNum}}，摄像头数：{{cameraNum}}</p>
                        </div>
                        <div class="content table-responsive table-full-width">
                            <table class="table table-striped">
                                <thead>
                                <th>ID</th>
                                <th> Coordinate</th>
                                <th>Address</th>
                                <th>Operating </th>
                                </thead>
                                <tbody>
                                <tr v-for="(one,index) in posInfo" :key="one.coordinate">
                                    <td>{{index+1}}</td>
                                    <td>{{one.coordinate|remove_brackets}}</td>
                                    <td>{{one.address}}</td>
                                    <td>
                                        <div class="icon-container">
                                        <span class="ti-headphone-alt"></span><span class="icon-name"> 呼叫</span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { AMapManager } from 'vue-amap'
    export default {
        data(){
            let self = this;
            return {
                zoom: 14,
                center: [121.5273285, 31.21515044],
                address: '',
                events: {
                    click(e) {
                        let {lng, lat} = e.lnglat;
                        self.lng = lng;
                        self.lat = lat;

                        // 这里通过高德 SDK 完成。
                        var geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: "all"
                        });
                        geocoder.getAddress([lng, lat], function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.regeocode) {
                                    self.address = result.regeocode.formattedAddress;
                                    self.$nextTick();
                                }
                            }
                        });
                    }
                },
                lng: 0,
                lat: 0,
                markers: [
                    {
                        position: [121.5273285, 31.21515044],
                        events: {
                            click: () => {
                                self.windows.forEach(window => {
                                    window.visible = false;
                                });

                                self.$nextTick(() => {
                                    self.windows[0].visible = true;
                                });
                            },
                            dragend: (e) => {
                                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false
                    },
                    {
                        position: [121.519226, 31.212508],
                        events: {
                            click: () => {
                                self.windows.forEach(window => {
                                    window.visible = false;
                                });

                                self.$nextTick(() => {
                                    self.windows[1].visible = true;
                                });
                            },
                            dragend: (e) => {
                                this.markers[1].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false,
                    }
                ],
                windows: [
                    {
                        position: [121.5273285, 31.21515044],
                        content: 'Hi! I am here1!',
                        visible: false,
                        events: {
                            /*close() {
                             console.log('close infowindow1');
                             }*/
                        }
                    },
                    {
                        position: [121.519226, 31.212508],
                        content: 'Hi! I am here2!',
                        visible: false,
                        events: {
                            close() {
                                console.log('close infowindow2');
                            }
                        }
                    }
                ],
                memberNum: 4,
                cameraNum: 5,
                posInfo:[
                    {
                        coordinate:[121.5273285, 31.21515044],
                        address: "上海市浦东新区塘桥街道峨山路135号峨海小区",
                    },
                    {
                        coordinate:[121.516728, 31.212787],
                        address: "上海市浦东新区塘桥街道浦明路1234号宁阳小区(塘桥路)",
                    },
                    {
                        coordinate:[121.516728, 31.212787],
                        address: "上海市浦东新区塘桥街道浦明路1234号宁阳小区(塘桥路)",
                    },
                    {
                        coordinate:[121.516728, 31.212787],
                        address: "上海市浦东新区塘桥街道浦明路1234号宁阳小区(塘桥路)",
                    },
                    {
                        coordinate:[121.516728, 31.212787],
                        address: "上海市浦东新区塘桥街道浦明路1234号宁阳小区(塘桥路)",
                    },
                    {
                        coordinate:[121.516728, 31.212787],
                        address: "上海市浦东新区塘桥街道浦明路1234号宁阳小区(塘桥路)",
                    }
                ]
            }
        },
        methods: {},
        filters:{
            remove_brackets(value){
                var str=value.toString()
                return str.replace(/\[|]/g,'');

            }
        }
    }
</script>

<style scoped>
.a{
    margin-top:20px;
}
</style>