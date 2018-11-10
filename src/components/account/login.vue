<template>
    <div>
      <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50" v-model="user_name">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16" v-model="password">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click="login">
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    // 导入公共的bus
    import { bus } from '../../common/commonvue.js' 

    export default {
        data() {
                return {
                user_name: 'zhangsan',
                password: '123'
            }
        },
        methods:{
            login(){
                this.$axios.post('site/account/login',{
                    user_name:this.user_name,
                    password:this.password
                }).then(response=>{
                    console.log(response.data) 
                    if(response.data.status == 0){
                        // 0表示登录成功, 登录成功就跳转到 之前要进去的页面. 
                        this.$router.push({ path:localStorage.getItem('wantVisitPath') })
                        // 发送消息给App.vue 登录成功
                        bus.$emit('loginSuccess',true)
                    }
                })
            }
        }

    }

</script>

<style scoped>
    
</style>