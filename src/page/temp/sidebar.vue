<template>
    <div>
        <div class="sidebar" data-background-color="white" data-active-color="danger">
            <div class="sidebar-wrapper">
                <div class="logo">
                    <a href="#" class="simple-text">
                        应急指挥系统
                    </a>
                </div>

                <ul class="nav">
                    <li :class="(page=='communication')?'active':''">
                        <router-link to="">
                            <i class="ti-panel"></i>
                            <p>通讯</p>
                        </router-link>
                    </li>
                    <li :class="(page=='video')?'active':''">
                        <router-link to="/main/video">
                            <i class="ti-user"></i>
                            <p>视频</p>
                        </router-link>
                    </li>
                    <li :class="(page=='voice')?'active':''">
                        <router-link to="">
                            <i class="ti-view-list-alt"></i>
                            <p>语音</p>
                        </router-link>
                    </li>
                    <li :class="(page=='map')?'active':''">
                        <router-link to="/main/map">
                            <i class="ti-map"></i>
                            <p>地图</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <i class="ti-pencil-alt2"></i>
                            <p>单兵</p>
                        </router-link>
                    </li>
                    <li>
                        <a href="maps.html">
                            <i class="ti-text"></i>
                            <p>无人机</p>
                        </a>
                    </li>
                    <li>
                        <a href="notifications.html">
                            <i class="ti-bell"></i>
                            <p>Notifications</p>
                        </a>
                    </li>
                    <li class="active-pro">
                        <a href="#myModal" data-toggle="modal">
                            <i class="ti-export"></i>
                            <p>Quit</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"
                                aria-hidden="true">×
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            注销
                        </h4>
                    </div>
                    <div class="modal-body">
                        确定要注销账户吗？
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default"
                                data-dismiss="modal">取消
                        </button>
                        <button type="button" class="btn btn-default" @click="logout" data-dismiss="modal">
                            确定
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
    export default {
        data(){
            return {
                page: null
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                var path=this.$route.path;
                this.page=path.substring(path.lastIndexOf("\/")+1);
            },
            logout(){
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style scoped>

</style>