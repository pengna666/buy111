<template>
   <div>

        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 循环的数据 -->
                                <li v-for="item in goodsData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{ item.title }}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{ subitem.title }}&nbsp;
                                            </span>    
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{ item.title }}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="subitem in item.subcates" :key="subitem.id">{{ subitem.title }}</a>                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </li> 
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->

                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                             <el-carousel  height="340px" arrow="always">
                                <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="">
                              </el-carousel-item>
                          </el-carousel>
                      </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{ index+1 }}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{ item.add_time | dateFormat }}</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分类列表数据 -->
        <div class="section" v-for="item in goodsList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{ item.catetitle }}</h2>
                <p>
                    <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{ subitem.subcatetitle }}</a>
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem in item.datas" :key="subitem.artID">
                            <router-link :to="'/goodsinfo/'+subitem.artID" class="">
                                <div class="img-box">
                                    <!-- 图片懒加载的方法 在前面绑定v-lazy -->
                                    <img v-lazy="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>{{subitem.stock_quantity}} 60</strong>
                                        <span>市场价：
                                            <s>{{subitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
   
    </div>  
</template>

<script>
	import axios from 'axios'
	 export default {
	 		data(){
	 			return{
	 				// 头部对象
	 				goodsData:{},
                    goodsList:[]
	 			}
	 		},
	 		created(){
	 			this.getGoodsData()
                this.getGoodsGroupList()
	 		},
	 		methods:{
                //1.获取头部数据
	 			getGoodsData(){
	 				const url = `site/goods/gettopdata/goods`
	 				this.$axios.get(url).then(response=>{
	 					this.goodsData = response.data.message
	 					console.log(response.data.message)
	 				})
	 			},
                //2. 按照分类获取数据
                getGoodsGroupList(){
                    const url = `site/goods/getgoodsgroup`
                    this.$axios.get(url).then(response=>{
                        this.goodsList = response.data.message
                        console.log(response.data.message)  
                    })
                }
	 		}

	 }
</script>

<style scoped>
  
    .el-carousel__item img{
        width: 100%;
        height:100%;
    }

</style>