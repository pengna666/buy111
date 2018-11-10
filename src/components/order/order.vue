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
                            <li class="active">
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
                <div class="cart-box">
                    <h2 class="slide-tit">
                        <span>1、收货地址</span>
                    </h2>
                    <div id="orderForm" name="orderForm" url="">
                        <div class="form-box address-info">
                            <!--status-icon 属性为输入框添加了表示校验结果的反馈图标 -->
                            <el-form :model="order" :rules="rules" ref="orderRef" label-width="150px" status-icon>
                                <el-form-item label="收货人姓名：" prop="accept_name">
                                    <el-input style="width:500px;" v-model="order.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区：" prop="accept_name">
                                    <!--<el-input style="width:500px;" v-model="order.accept_name"></el-input>-->
                                    <v-distpicker @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址：" prop="address">
                                    <el-input style="width:500px;" v-model="order.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码：" prop="mobile">
                                    <el-input style="width:500px;" v-model.number="order.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱：">
                                    <el-input style="width:300px;" v-model="order.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码：">
                                    <el-input style="width:300px;" v-model="order.post_code"></el-input>
                                </el-form-item>
                            </el-form>

                        </div>
                        <h2 class="slide-tit">
                            <span>2、支付方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                    <!--<input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                    <input name="payment_price" type="hidden" value="0.00">在线支付
                                    <em>手续费：0.00元</em>-->
                                     <label>
                                        <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                         <em>手续费：0.00元</em>
                                    </label>
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>3、配送方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                    <el-radio-group @change="expressChange" v-model="order.express_id">
                                        <el-radio label="1">顺丰快递 <em>费用：20.00元</em></el-radio>
                                        <el-radio label="2">圆通快递 <em>费用：10.00元</em></el-radio>
                                        <el-radio label="3">韵达快递 <em>费用：8.00元</em></el-radio>
                                    </el-radio-group>   
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>4、商品清单</span>
                        </h2>
                        <div class="line15"></div>
                        <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                            <tbody>
                                <tr>
                                    <th colspan="2" align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="84" align="center">购买数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                </tr>
                                <tr v-for="item in orderList" :key="item.id">
                                    <td width="68">
                                        <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                    </td>
                                    <td>
                                        <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                    </td>
                                    <td>
                                        <span class="red">
                                                {{item.sell_price}}
                                            </span>
                                    </td>
                                    <td align="center">{{item.buycount}}</td>
                                    <td>
                                        <span class="red">
                                                ￥2299.00
                                            </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="line15"></div>
                        <h2 class="slide-tit">
                            <span>5、结算信息</span>
                        </h2>
                        <div class="buy-foot clearfix">
                            <div class="left-box">
                                <dl>
                                    <dt>订单备注(100字符以内)</dt>
                                    <dd>
                                        <textarea v-model="order.message" class="input" style="height:35px;"></textarea>
                                    </dd>
                                </dl>
                            </div>
                            <div class="right-box">
                                <p>
                                    商品
                                    <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                    <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p>
                                    运费：￥
                                    <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                </p>
                                <p class="txt-box">
                                    应付总金额：￥
                                    <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                </p>
                                <p class="btn-box">
                                    <a class="btn button"  @click.prevent="goToShopCart">返回购物车</a>
                                    <a id="btnSubmit" class="btn submit" @click.prevent="goToOrder" >确认提交</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import {
    getLocalGoods
} from '../../common/localStorage.js'
export default {
    components: {
        VDistpicker
    },
    data() {
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            }
            setTimeout(() => {
                if ((/^1[3,4,5,6,7,8][0-9]{9}$/).test(value)) {
                    callback()
                } else {
                    callback(new Error("手机号不合法!"))
                }
            }, 1000);
        };
        return {
            totalPrice: 0,
            totalCount: 0,
            orderList: [],
            order: {
                accept_name: '康康',
                address: '庭威402',
                mobile: '13812345678',
                email: 'liyapeng@163.vip.com',
                post_code: '518000',
                payment_id: '6',
                express_id: '1',
                expressMoment: 20,
                message: '请快点发货',
                area: {
                    // 所属区域
                    province: {
                        code: '440000',
                        value: '广东省'
                    },
                    city: {
                        code: '440300',
                        value: '深圳市'
                    },
                    area: {
                        code: '440306',
                        value: '宝安区'
                    }
                },
            },
            rules: {
                accept_name: [{
                    required: true,
                    message: '请输入收货人姓名',
                    trigger: 'blur'
                }],
                address: [{
                    required: true,
                    message: '请输入详细地址',
                    trigger: 'blur'
                }],
                mobile: [{
                    validator: checkMobile,
                    trigger: 'blur'
                }]
            }

        }
    },
    created() {
        this.getOrderList()
    },
    computed: {
        getTotalAmount() {
            return this.totalPrice + this.order.expressMoment
        }
    },
    methods: {
        // 省区市重新选择了，就会触发
        onSelected(data) {
            console.log(data)
            this.order.area = data
        },
        // 快递变化
        expressChange(label) {
            switch (label) {
                case "1":
                    this.order.expressMoment = 20
                    break;

                case "2":
                    this.order.expressMoment = 10
                    break;

                case "3":
                    this.order.expressMoment = 8
                    break;

                default:
                    break;
            }
        },
        // 获取订单详情
        getOrderList() {

            this.order.goodsids = this.$route.query.ids
            const url = `site/validate/order/getgoodslist/${this.$route.query.ids}`
            this.$axios.get(url).then(response => {
                
                var temObj={}               
                var localGoods = getLocalGoods()
                response.data.message.forEach(item => {
                    // 把历史记录中的商品数量传给
                    item.buycount = localGoods[item.id]
                    // 计算出总金额 和 总数量
                    this.totalCount += item.buycount
                    this.totalPrice += item.sell_price * item.buycount
                    // 根据后台需要传递一个对象 {89:1, 98:5} 
                    temObj[item.id] = item.buycount

                })
                //  把修改过后的值传给这个数组
                this.orderList = response.data.message
                console.log(response.data.message)
                this.order.cargoodsobj = temObj 
                this.order.goodsAmount = this.totalPrice               
            })
        },
        // 返回购物车
        goToShopCart() {
            // this.$router.go(-1)
            this.$router.push({
                path: '/shopcart'
            })
        },
        goToOrder() {
            this.$refs.orderRef.validate((valid) => {
                if (!valid) {
                    console.log('error submit!!');
                    return false;
                } 
                const url = 'site/validate/order/setorder'

                console.log(this.order)

                console.log(this.$route.query.ids)
                this.$axios.post(url, this.order).then(response => {
                   
                    if(response.data.status==0){
         
                        // 把购物车中的商品删除
                        // 把id传给store仓库 让仓库去删
                     console.log(this.$route.query.ids)   // undefined 

                      var idArray = this.$route.query.ids.split(',')
                      
                       idArray.forEach(id=>{
                            console.log(id)
                            this.$store.commit('deleteGoods',id)
                        })   
                        // 跳转页面.
                        this.$router.push({path:'/pay',query:{orderid:response.data.message.orderid}})
                    }
                })
            })
        }

    }

}
</script>

<style>

</style>
