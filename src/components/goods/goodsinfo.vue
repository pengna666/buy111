<template>
	<div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section" v-if="goods.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.item">
                                                    <div class="small-img">
                                                        <img :src="item.original_path"/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{ goods.goodsinfo.title }}</h1>
                                <p class="subtitle">{{ goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{ goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ goods.goodsinfo.market_price }}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{ goods.goodsinfo.sell_price }}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                 <dl>
                                    <dt>购买数量</dt>
                                    <dd>
                                        <div class="stock-box">
                                            <el-input-number :min="1" :max="goods.goodsinfo.stock_quantity" size="small" v-model="buyCount"></el-input-number>

                                        </div>
                                        <span class="stock-txt">
                                            库存
                                            <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                        </span>
                                    </dd>   
                                </dl>
                                <dl>
                                    <dd>
                                        <div id="buyButton" class="btn-buy">
                                            <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                            <button class="add" id="addBtn" ref="addToShopCartRef" @click="addToCart">加入购物车</button>
                                        </div>
                                         
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div id="goodsTabs" class="goods-tab bg-wrap">
                        <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" :class="isShowComment ? '':'selected'"  @click.prevent="isShowComment=false">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click.prevent="isShowComment=true" :class="isShowComment ? 'selected':''">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                        </Affix>
                        <!-- 商品介绍 -->
                        <div v-show="!isShowComment" class="tab-content entry" style="display: block; padding:5px" v-html="goods.goodsinfo.content"> 
                        </div>
                        <!-- 商品评论 -->
                        <div v-show="isShowComment" class="tab-content" style="display: block;" >
                            <div class="comment-box">
                                <div id="commentForm" name="commentForm"
                                class="form-box">
                                <div class="avatar-box">
                                    <i class="iconfont icon-user-full"></i>
                                </div>
                                <div class="conn-box">
                                    <div class="editor">
                                        <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容" ref="textareaRef"></textarea>
                                        <span class="Validform_checktip"></span>
                                    </div>
                                    <div class="subcon">
                                        <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="postComment">
                                        <span class="Validform_checktip"></span>
                                    </div>
                                </div>
                            </div>
                            <ul id="commentList" class="list-box">
                                <p v-if="commentList.length===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                <li v-for="item in commentList" :key="item.id">
                                    <div class="avatar-box">
                                        <i class="iconfont icon-user-full"></i>
                                    </div>
                                    <div class="inner-box">
                                        <div class="info">
                                            <span>{{item.user_name}}</span>
                                            <span>{{item.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                                        </div>
                                        <p>{{item.content}}</p>
                                    </div>
                                </li>      
                            </ul>
                            <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                <div id="pagination" class="digg">
                                   <el-pagination
                                      @size-change="handleSizeChange"
                                      @current-change="handleCurrentChange"
                                      :current-page="pageIndex"
                                      :page-sizes="[2, 5, 10, 20]"
                                      :page-size="pageSize"
                                      layout="total, sizes, prev, pager, next, jumper"
                                      :total="total">
                                   </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left-220">
                <div class="bg-wrap nobg">
                    <div class="sidebar-box">
                        <h4>推荐商品</h4>
                        <ul class="side-img-list"> 
                            <li v-for="item in goods.hotgoodslist" :key="item.id">
                                <div class="img-box">
                                    <!-- 点击右侧的商品也会触发路由的改变 -->
                                    <router-link :to="'/goodsinfo/'+item.id" class="">
                                        <img :src="item.img_url">
                                    </router-link>
                                </div>
                                <div class="txt-box">
                                     <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                     <span>{{item.add_time | dateFormat}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 动画元素 -->
<transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
    <div v-show="isShow" ref="animateDivRef" class="animateDiv" v-if="goods.imglist">
        <img :src="goods.imglist[0].original_path" alt="">
    </div>
</transition>
</div>
</template>

<script>
	
    //导入jq中放大镜需要的js文件
    import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'


    // 按需导入 iview 的 Affix
    import { Affix } from 'iview'

    export default {
        components: {
            // 这里是goodsinfo的子组件
            Affix
        },
        data(){
           return{
              goods:{},
              buyCount:0,  //购买数量
              isShowComment:false,
              commentList:[],
              pageIndex:1,
              pageSize:2,
              total:1,
              addToShopCartOffset:null,
              shopCartOffset:null,
              isShow:false
          }
      },
      created(){
          this.getGoods() 
          this.getCommentListData()
          
      },
      updated() {
    //放在这里是因为，我们点击了右边的连接之后，要重新更新图册
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
},
watch:{
   $route(){
      // 当路由发生改变时，重新获取商品详情
      this.getGoods()   
      this.getCommentListData()
  }
},
methods:{
           
            //1.获取商品详情
            getGoods(){
                // 直接写后面的路径，会自动拼接
                const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
                // 使用我们挂载在原型上的方法 $axios
                this.$axios.get(url).then(response=>{
                    this.goods = response.data.message
                    console.log(response.data)  
                    
                    // 渲染完数据以后，获取加入购物车按钮的偏移量
                    setTimeout(()=>{
                        // console.log(this.$refs)
                        // console.log(this)
                        // this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset()
                        this.addToShopCartOffset = $('#addBtn').offset()
             
                        $(this.$refs.animateDivRef).css({
                            top: this.addToShopCartOffset.top,
                            left:this.addToShopCartOffset.left                     
                         })

                          // 获取结束位置偏移量
                          this.shopCartOffset = $('#shoppingCartCount').offset()

                    }, 200)
                })
            },
            //2. 获取评论列表
            getCommentListData(){   
                // 直接写后面的路径，会自动拼接
                const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                
                // 使用我们挂载在原型上的方法 $axios
                this.$axios.get(url).then(response=>{
                    this.commentList = response.data.message
                    this.total = response.data.totalcount
                    console.log(response.data.message)  
                })
            },
            //  页码大小,每页显示多少条
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                // 更改完每页显示多少条以后，重新获取评论的数据，但是要记得把当前页改为1
                this.pageIndex = 1
                this.getCommentListData()
            },
            // 当前页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val
                this.getCommentListData()
            },
            // 提交评论
            postComment(){
                const comments = this.$refs.textareaRef.value
                if(!comments.trim()){
                   this.$message({
                      showClose: true,
                      message: '评论不能为空哦！',
                      type: 'error'
                  });   
                   return 
               }
               // console.log(comments)
                const url = `site/validate/comment/post/goods/${this.$route.params.goodsId}`
 
                // 使用我们挂载在原型上的方法 $axios
                this.$axios.post(url,{ commenttxt:comments }).then(response=>{
                    // this.commentList = response.data.message
                    console.log(response.data)  
                    // 1.到了这一步，肯定已经评论成功了
                    this.$message({
                      showClose: true,
                      message: '评论成功！',
                      type: 'success'
                    });  
                     // 2.清空评论的内容
                     this.$refs.textareaRef.value=''
                     // 3. 评论成功，刷新第一页的数据
                     this.pageIndex = 1
                     this.getCommentListData()
                }) 
            },
            // 点击“加入购物车”，执行的方法
             addToCart(){
                this.isShow = true
                // 创建一个商品信息对象：
                const goods = {
                    count:this.buyCount,
                    goodsId:this.$route.params.goodsId
                }
                // 点击加入购物车 触发 "store"仓库中的事件. 把商品的信息(id和count数量)传递过去.
                this.$store.commit('addGoods',goods)
             },
            // 动画之前
            beforeEnter(el){
                el.style.left = `${this.addToShopCartOffset.left}px`
                el.style.top = `${this.addToShopCartOffset.top}px`
            },
            // 动画进行中
            enter(el,done){
                el.offsetHeight
                el.style.transition = "all 0.5s"
                el.style.transform = "scale(0.5)"
                el.style.left = `${this.shopCartOffset.left}px`
                el.style.top = `${this.shopCartOffset.top}px`
                done()
            },
            // 动画完成之后
            afterEnter(el){
                this.isShow = false
            }
       }
    }
</script>
<style scoped>
    @import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
    .animateDiv {
      width: 50px;
      height: 50px;
      position: absolute;
      left: 0px;
      top: 0px;
  }

  .animateDiv img {
      width: 50px;
      height: 50px;
  }
</style>