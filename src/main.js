import Vue from 'vue'
import Resource from 'vue-resource'
import AMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'jquery'
import 'jquery.scrollto/jquery.scrollTo.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-select/dist/css/bootstrap-select.css'
import 'bootstrap-select/dist/js/bootstrap-select.js'
import 'bootstrap-notify/bootstrap-notify.js'
import  'video.js/dist/video.js'
import  'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player'
import './assets/css/animate.min.css'
import './assets/css/paper-dashboard.css'
import './assets/css/demo.css'
import './assets/css/themify-icons.css'
import './assets/js/chartist.min.js'
import './assets/js/bootstrap-notify.js'
//import './assets/js/paper-dashboard.js'
import './assets/js/demo.js'
import 'videojs-hotkeys'

Vue.use(ElementUI)
Vue.use(Resource)
Vue.use(AMap)
Vue.use(VideoPlayer)

AMap.initAMapApiLoader({
    key: '00e7bd2746771744cb1427bf416e9026',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','Geocoder']
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
