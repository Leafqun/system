/**
 * Created by Leafqun on 2017/6/17.
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login/login.vue'
import main_page from '../page/temp/main_page.vue'
import map from '../page/temp/map/map.vue'
import video from '../page/temp/video/video.vue'
import pick from '../page/temp/video/pick.vue'
import player from '../page/temp/video/player.vue'
import p1 from '../page/temp/video/player/1.vue'
import p2 from '../page/temp/video/player/2.vue'
import p3 from '../page/temp/video/player/3.vue'
import p4 from '../page/temp/video/player/4.vue'
import p5 from '../page/temp/video/player/5.vue'
import login2 from '../page/login/login2.vue'
import login3 from '../page/login/login3.vue'

Vue.use(Router)

export default new Router({
    base:'/system/',
    routes:[
        { path:'/',redirect:'/login2' },
        { path:'/login',name:'login',component:login },
        { path:'/login2',name:'login2',component:login2 },
        { path:'/login3',name:'login3',component:login3 },
        { path:'/pick',component:pick},
        { path:'/player',component:player,
            children:[
                { path:'p1',component:p1},
                { path:'p2',component:p2},
                { path:'p3',component:p3},
                { path:'p4',component:p4},
                { path:'p5',component:p5}
            ]
        },
        { path:'/main',component:main_page,
            children:[
                { path:'', redirect:'map'},
                { path:'map', name:'map', component:map },
                { path:'video', name:'video', component:video}
            ]
        }
    ]
})