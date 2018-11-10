<template>
    <div>
        <div class="left" @click="substrict">-</div>
        <div class="middle">{{initCount}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>

<script>
	export default{
		props:['goodsId','count'],
		data(){
			return{
				initCount:0
			}
		},
		created(){
			// 一刷新页面，就把父组件中的商品数量 传给子组件
			this.initCount = this.count
		},
		methods:{
			// 减
			substrict(){
				if(this.initCount === 1) return 
				this.initCount --
				this.notify()
			},
			//加
			add(){			
				this.initCount ++
				// 先++完再去触发notify()
				this.notify()
			},
			// 不管是点击 - 还是 + ，都要将值( id 和 count )传递给父组件
			notify(){
				this.$emit('func',{
					goodsId:this.goodsId,
					count:this.initCount
				})
			}
		}

	}

</script>

<style scoped>
	.left,.right,.middle{
    border: 1px solid rgba(92,92,92,0.3);
    width:25px;
    height: 30px;
    display: inline-block;
    text-align: center;
    line-height:  30px;
    cursor: pointer;
}
.middle{
    width:30px;
    margin:0 2px;
}
</style>