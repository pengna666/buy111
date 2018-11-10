<template>
<div id="app">
    <!-- 头部 -->
    <div class="header">
        <!-- 1.0 导航栏头部 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>黑马买买买</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <span v-if="!isLogin">
                        <router-link  to="/login">登录</router-link>
                        <strong>|</strong>
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                    <span v-if="isLogin">
                        <router-link to="/vipcenter">会员中心</router-link>
                        <strong>|</strong>
                        <a @click="logout">退出</a>
                        <strong>|</strong>
                    </span>
                    <router-link to="/shopcart">
                        <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车
                        (<span>{{ this.$store.getters.getBuyCount }}</span>)
                    </router-link>
                    </a>
                </div>
            </div>
        </div>

        <!-- 2.0 导航条 -->
        <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">首页</span>
                            </a>
                        </li>
                        <li class="news">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                        </li>
                        <li class="video">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">黑马超市</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                        </li>
                        <li class="goods">
                            <router-link to="/goodslist" class="router-link-exact-active ">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                        <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中间路由 -->
        <router-view></router-view>

        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                                <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    bus
} from './common/commonvue.js'

import $ from 'jquery'
// import HelloWorld from './components/HelloWorld.vue';

// export default 导出的对象，就是Vue实例
export default {
    name: 'app',
    // 注册子组件，局部注册
    // 全局注册 Vue.component('名称',{})
    // components: {
    //   HelloWorld
    // },
    data() {
        return {
            isLogin: false
        }
    },
    created() {
        //   接收登录成功以后传过来的值，但是这个时候，只执行一次，当页面重新刷新后，isLogin的值又变成默认值false了。
        // 所以要在methods里面先判断登录状态，如果是登录的，isLogin=true.
        bus.$on('loginSuccess', (isLogin) => {
            this.isLogin = isLogin
        })

        this.checkoutLogin()
    },
    //   页面都加载完以后再执行这里的jq代码
    mounted() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function () {
            $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function () {
            $(".out", this).stop().animate({
                'top': '48px'
            }, 300); // move down - hide
            $(".over", this).stop().animate({
                'top': '0px'
            }, 300); // move down - show

        }, function () {
            $(".out", this).stop().animate({
                'top': '0px'
            }, 300); // move up - show
            $(".over", this).stop().animate({
                'top': '-48px'
            }, 300); // move up - hide
        });
    },
    methods: {
        // 退出登录
        logout() {
            this.$confirm('是否退出登录?', '提示', {
                confirmButtonText: '退出',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.get('site/account/logout').then(response => {
                    console.log(response.data.status) // 0 表示注销成功
                    // 退出成功，则返回到登录页面，isLogin的值改为false
                    this.isLogin = false
                    this.$router.push({
                        path: '/login'
                    })
                })
            }).catch(() => {});
        },
        // 检查登录状态  
        checkoutLogin() {
            this.$axios.get('site/account/islogin').then(response => {
                console.log(response.data.code)
                if (response.data.code === "logined") {
                    //   如果已经登录，
                    this.isLogin = true
                } else {
                    this.isLogin = false
                }

            })
        }

    }

};
</script>

<style scoped>
@import "./statics/site/jquery_plugins/hoverNav/css/style.css";
</style>
