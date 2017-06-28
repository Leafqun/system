<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <ul class="menu">
                    <li><router-link to="/login">Style 1</router-link></li>
                    <li><router-link to="/login2">Style 2</router-link></li>
                    <li class="active"><router-link to="/login3">Style 3</router-link></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 col-md-push-8">


                <!-- Start Sign In Form -->
                <form action="" class="fh5co-form animate-box" data-animate-effect="fadeInRight">
                    <h2>Sign In</h2>
                    <div class="form-group">
                        <label for="username" class="sr-only">Username</label>
                        <input type="text" class="form-control" id="username" placeholder="Username" autocomplete="off" v-model="username">
                    </div>
                    <div class="form-group">
                        <label for="password" class="sr-only">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" autocomplete="off" v-model="password">
                    </div>
                    <div class="form-group">
                        <label for="remember"><input type="checkbox" id="remember"> Remember Me</label>
                    </div>
                    <div class="form-group">
                        <p>Not registered? <a href="sign-up3.html">Sign Up</a> | <a href="forgot3.html">Forgot Password?</a></p>
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Sign In" class="btn btn-primary">
                        <span>{{msg}}</span>
                    </div>
                </form>
                <!-- END Sign In Form -->


            </div>
        </div>
        <div class="row" style="padding-top: 60px; clear: both;">
            <div class="col-md-12 text-center"><p><small>&copy; All Rights Reserved.  <a href="" target="_blank" title="模板之家">2017-6-19</a> - made by <a href="" title="网页模板" target="_blank">Leafqun</a></small></p></div>
        </div>
    </div>
</template>

<script>
    import './css/animate.css'
    import './css/style.css'
    import './js/jquery.placeholder.min'
    import './js/jquery.waypoints.min'
    import './js/main'
    export default {
        data(){
            return {
                username:null,
                password:null,
                msg:null
            }
        },
        methods:{
            login: function () {
                if(this.username==null||this.username==''){
                    this.msg='用户名为空';
                }else if(this.username.length<3||this.username.length>10){
                    this.msg='请输入4-9位的用户名';
                }else{
                    this.$http.post("http://119.23.22.99:8080/Student_Website/loginCheck.do",{userName:this.username,userPwd:this.password},{emulateJSON:true}).then(function (response) {
                        var data=response.body;
                        console.log(data.msg);
                        if(data.msg=='success'){
                            this.$router.push({name:'map'});
                        }else{
                            this.msg=data.msg;
                        }
                    },function(error){
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>