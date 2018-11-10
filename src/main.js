//ES6 导入模块的方式 相当于原先 require('')
import Vue from 'vue' // const Vue = require('vue')
// 导入根组件
import App from './App.vue'

// 导入elementUI
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// 导入懒加载
import VueLazyload from 'vue-lazyload'

// 导入css样式
import './statics/site/css/style.css'

//  导入路由对象
import router from './router'
//导入过滤器
import filter from './filter'

import store from './store'

// 按需导入 elementUI中的文件.
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col
} from 'element-ui';

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./statics/site/images/01.gif'),
  attempt: 1
})

// 创建根实例，整个项目中只需要有一个根实例
// 使用render函数，渲染根组件
new Vue({
  // 渲染根组件
  render: h => h(App),
  router,
  filter,
  store
}).$mount('#app')
