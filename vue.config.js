module.exports = {
	baseUrl:'./', 
	productionSourceMap:false,
	lintOnSave:false, // 开发阶段暂时去掉lint提示
	configureWebpack: {
		externals: {
			// 左边的名字是 import xx from '包名'  包名
			// 右边的名字是 xx 建议使用平时使用的名字即可
			vue: 'Vue',
			axios: 'axios',
			'vue-router': 'VueRouter',
			vuex: 'Vuex',
			moment: 'moment',
			'vue-lazyload': 'VueLazyload',
			'v-distpicker': 'VDistpicker'
			
		}
	}
}