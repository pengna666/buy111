
import Vue from "vue"
import moment from "moment"

Vue.filter('dateFormat',(el,formatStr='YYYY-MM-DD')=>{
	return moment(el).format(formatStr)
})