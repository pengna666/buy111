
import Vue from 'vue'
import VueRouter from 'vue-router'
// 将VueRouter挂载在vue的原型上.
Vue.use(VueRouter)

// 导入组件
// import后面这个名字是自己取的，不是模板的名称.
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import shopcart from '../components/shopcart/shopcart.vue'
// import order from '../components/order/order.vue'
// import login from '../components/account/login.vue'
// import pay from '../components/pay/pay.vue'
// import paySuccess from '../components/pay/paySuccess.vue'
// import vipcenter from '../components/vip/vipcenter.vue'
// import myorder from '../components/vip/myorder.vue'
// import orderinfo from '../components/vip/orderinfo.vue'


const goodslist = () => import( /* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import( /* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import( /* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const order = () => import( /* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import( /* webpackChunkName: "login" */ '../components/account/login.vue')
const pay = () => import( /* webpackChunkName: "pay" */ '../components/pay/pay.vue')
const paySuccess = () => import( /* webpackChunkName: "paySuccess" */ '../components/pay/paySuccess.vue')
const vipcenter = () => import( /* webpackChunkName: "vipcenter" */ '../components/vip/vipcenter.vue')
const myorder = () => import( /* webpackChunkName: "myorder" */ '../components/vip/myorder.vue')
const orderinfo = () => import( /* webpackChunkName: "orderinfo" */ '../components/vip/orderinfo.vue')



import axios from 'axios'
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true  // 让ajax可以携带cookied
// 在axios原型上挂载一个方法
Vue.prototype.$axios = axios


const router = new VueRouter({
	// 配置路由规则：routes
	routes:[
	   // component是组件的模板对象，不是模板名称
		{path:'/goodslist',component:goodslist},
		// 重定向 路由 
		{path:'/',redirect:'/goodslist'},
		// 商品详情
		{path:'/goodsinfo/:goodsId',component:goodsinfo},

		{path:'/shopcart',component:shopcart},
		{path: '/login', component: login},
		{path: '/paySuccess', component: paySuccess,meta:{checkoutLogin:true}},
		// 给order和pay等这些页面设置路由守卫，因为这些页面要先登录，才能进入.
		{path:'/order',component:order,meta:{checkoutLogin:true}},
		// {path:'/pay/:orderid',component:pay,meta:{checkoutLogin:true},name:'pays'}
		{path:'/pay',component:pay,meta:{checkoutLogin:true},name:'pays'},
		{ path: '/vipcenter', component: vipcenter, meta: { checkoutLogin: true } },
		{ path: '/myorder', component: myorder, meta: { checkoutLogin: true } },
		{ path: '/orderinfo/:orderid', component: orderinfo, meta: { checkoutLogin: true } }
	
	]
})

// 路由守卫
router.beforeEach((to, from, next) => {
	// console.log(from);  // 之前的页面
	// console.log(to);	   //将要去的那个页面
	
	 //记录想跳转去的页面
	//  只要不是去 login这个页面，我都在历史记录中存储一个wantVisitPath，记录它要去的那个页面，
	// 当用户登录过后，再让它跳转到这个页面。
	 if (to.path !== '/login') {
	 	localStorage.setItem('wantVisitPath', to.fullPath)
	 }
	// console.log(to);
	// 判断一下是否需要登录
	// 如果要去的页面 有 meta.checkoutLogin这个属性，就判断它有没有登录.
	if(to.meta.checkoutLogin){
		//需要登录，则判断一下是否已经登录
		axios.get('site/account/islogin').then(response => {
			console.log(response.data.code)  
			if (response.data.code === 'nologin'){
				// 如果没有登录，就跳到登录页面.
				router.push({ path:'/login' })
			}else{
				next()
			}		
		})
	}else{
		// 来到这里表示不要登录
		next()
	}
	next()
})

// 导出成员
export default router 