
// 导入
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 按需导入localStorage中的方法
import { addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js'

const store = new Vuex.Store({
	// 相当于data
	state:{
		buyCount:0
	},
	// 取数据，相当于computed
	getters:{
		getBuyCount(state){
			// getTotalCount() 已进入页面，首先就要获取到本地存储中商品的总数量，否则state.buyCount默认是0
			return state.buyCount === 0 ? getTotalCount() : state.buyCount
			// return state.buyCount
		}
	},
	// 相当于methods
	mutations:{
			/**
         * state 就是上面的state，固定的
         * goods 载荷 参数 约定 goods = {goodsId:90,count:5}
         */
		// 新增addGoods
		addGoods(state,goods){
			state.buyCount = addLocalGoods(goods)
		},
		// 修改 updateGoods
		updateGoods(state, goods) {
			state.buyCount = updateLocalGoods(goods)
		},
		// 删除 deleteGoods
		deleteGoods(state, goodsId) {
			state.buyCount = deleteLocalGoods(goodsId)
		}
		
	}
})
export default store 