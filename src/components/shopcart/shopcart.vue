<template>
<div>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/cart.html">购物车</a>
        </div>
    </div>

    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2>
                        <i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span>
                                    放进购物车
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span>2</span>
                                    填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span>
                                    支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <!--商品列表-->
                <div class="cart-box">
                    <input id="jsondata" name="jsondata" type="hidden">
                    <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                        <tbody>
                            <tr>
                                <th width="48" align="center">
                                    <a>选择</a>
                                </th>
                                <th align="left" colspan="2">商品信息</th>
                                <th width="84" align="left">单价</th>
                                <th width="104" align="center">数量</th>
                                <th width="104" align="left">金额(元)</th>
                                <th width="54" align="center">操作</th>
                            </tr>
                            <tr v-for="(item,index) in goodsList" :key="item.id">
                                <td width="48" align="center">
                                    <!-- 绑定一个布尔值 -->
                                    <el-switch v-model="item.isSelectd"></el-switch>
                                </td>
                                <td align="left" colspan="2">
                                    <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                        <span>{{item.title}}</span>
                                    </div>
                                </td>
                                <td width="84" align="left">2195</td>
                                <td width="104" align="center">
                                    <div data-v-2be32b7a="">
                                        <!-- <div data-v-2be32b7a="" class="left">-</div>
                                            <div data-v-2be32b7a="" class="middle">{{item.buycount}}</div>
                                            <div data-v-2be32b7a="" class="right">+</div> -->

                                        <!-- 把id和数量 通过绑定属性的方式传递给子元素 -->
                                        <!-- 多个元素是如何计算的呢？ 通过遍历 -->
                                        <inputnumber :goodsId="item.id" :count="item.buycount" @func="getChangeGoods"></inputnumber>
                                    </div>
                                </td>
                                <td width="104" align="left">{{item.sell_price}}</td>
                                <td width="54" align="center">

                                    <el-button href="javascript:void(0)" @click="deleteGoods(index)">删除</el-button>
                                </td>
                            </tr>
                            <tr v-if="goodsList.length===0">
                                <td colspan="10">
                                    <div class="msg-tips">
                                        <div class="icon warning">
                                            <i class="iconfont icon-tip"></i>
                                        </div>
                                        <div class="info">
                                            <strong>购物车没有商品！</strong>
                                            <p>您的购物车为空，
                                                <a href="/index.html">马上去购物</a>吧！</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th align="right" colspan="8">
                                    已选择商品
                                    <b class="red" id="totalQuantity">{{getTotalAmount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                    <span class="red">￥</span>
                                    <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--/商品列表-->
                <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <button class="button" @click="continueBuy">继续购物</button>
                        <button class="submit" @click="goToPay">立即结算</button>
                    </div>
                </div>
                <!--购物车底部-->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    getLocalGoods
} from '../../common/localStorage.js'
// 导入子组件
import inputnumber from '../subcomponents/inputnumber.vue'

export default {
    // 子组件
    components: {
        inputnumber
    },
    data() {
        return {
            goodsList: [],
        }
    },
    created() {
        this.getGoodsListData()
    },
    computed: {
        //1. 计算总数量
        getTotalAmount() {
            var totalAmount = 0
            this.goodsList.forEach(item => {
                if (item.isSelectd) {
                    totalAmount += item.buycount
                }
            })
            return totalAmount
        },
        // 2. 计算总价格: 每件商品的 价格*数量
        getTotalPrice() {
            var totalPrice = 0
            this.goodsList.forEach(item => {
                if (item.isSelectd) {
                    totalPrice += item.buycount * item.sell_price
                }
            })
            return totalPrice
        }
    },
    methods: {
        //1. 获取购物车商品列表的数据
        getGoodsListData() {
            // // 1. 找到url , url其实就是前面的80，87等
            var localGoods = getLocalGoods() // 得到  {80:2,87:3} 这种形式的对象 
            console.log("对象是：", localGoods);
            // 2. 遍历 , 得到对象中的key
            var keys = Object.keys(localGoods)
            console.log(keys);
            if (keys.length == 0) {
                return
            }
            // 3.拼接url
            const url = `site/comment/getshopcargoods/${keys.join(',')}` //site/comment/getshopcargoods/88,91,94,97
            //4. 发送请求
            this.$axios.get(url).then(response => {
                console.log(response.data.message);
                //遍历数据中的每一个对象.
                response.data.message.forEach(item => {
                    //对象的值就是购买的数量，将它赋值给item.buycount.
                    item.buycount = localGoods[item.id]
                    // 给每个开关绑定一个布尔值.
                    item.isSelectd = true
                })
                this.goodsList = response.data.message
            })
        },

        // 修改 购物车的值 
        //2. 子组件的数据一旦发生改变，就会将值传递给下面这个父组件，inputnumber这个子组件会把参数都传递过来
        getChangeGoods(changeGoods) {
            this.goodsList.forEach(item => {
                if (item.id === changeGoods.goodsId) {
                    item.buycount = changeGoods.count
                }
            })
            // changeGoods 是子组件传递过来的参数. {  }
            this.$store.commit('updateGoods', changeGoods)
        },

        // 删除购物车的值
        // 3.  点击“删除”按钮
        deleteGoods(index) {
            this.$confirm('是否删除该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // this.goodsList.splice(index,1) 如果是先删除这个的话，数组就变化了，历史存储中删除的就是下一个商品的index。 
                this.$store.commit('deleteGoods', this.goodsList[index].id)
                this.goodsList.splice(index, 1)

            }).catch(() => {});
        },
        // 4. 点击“继续购物”
        continueBuy() {
            // 编程式路由 
            this.$router.push({
                path: '/goodsList'
            }) // 在js中写
            // <router-link> 在html结构中写. 
        },
        // 5. 点击“支付”
        goToPay() {
            // 声明一个空数组，存放每个商品的id，以便于把id传到下一个页面.
            var ids = []
            this.goodsList.forEach(item => {
                if (item.isSelectd) {
                    ids.push(item.id)
                }
            })
            if (ids.length === 0) {
                this.$message({
                    message: '至少要选择一个商品结算',
                    type: 'warning'
                })
                return
            }
            // query 方法传值 
            this.$router.push({
                path: '/order',
                query: {
                    ids: ids.join(',')
                }
            })
        }

    }
}
</script>

<style scoped>
.shopInfo {
    display: flex;
    align-items: center;
}
