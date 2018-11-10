/**
 * 把这个文件给 store/index.js使用,这个里面有 新增、修改、删除等方法
 * 
 */

 		var KEY = 'GOODS'
//1.  获取本地保存的商品信息   {88:2,89:3}   id作为key，数量作为值
		// getLocalGoods
		const getLocalGoods = () =>{
			return JSON.parse(localStorage.getItem(KEY) || '{}')	
		}
		
//2.  获取总数量
		// getTotalCount
		const getTotalCount = () =>{		
			var localGoods = getLocalGoods()
			var totalCount = 0 // 这里不能const定义，因为totalCount是一个变量.
			for (var key in localGoods) {
				totalCount += localGoods[key]
			}
			return totalCount
		}
		// 为什么获取商品的总数量 不需要传值？传参数？

		// const goods = {
		// 	count: this.buyCount,
		// 	goodsId: this.$route.params.goodsId
		// }

// 3.  把商品信息保存在本地，并返回本地存储的总数量
		// addLocalGoods
		const addLocalGoods = (goods) =>{
			// 先获取一下本地的数据，再在这个本地数据上添加新的数据
			var localGoods = getLocalGoods()
			// 先判断本地存储中有没有这个商品，通过id判断 ，如果有就给obj[key]+=count 在原来的数量上加，
			// 如果没有给这个对象的count重新赋值 obj[key] = count
			console.log(goods.goodsId);
			console.log(localGoods[goods.goodsId]);
			
			if (localGoods[goods.goodsId]){
				localGoods[goods.goodsId] += goods.count
			}else{
				localGoods[goods.goodsId] = goods.count
			}
			//保存在本地
			localStorage.setItem(KEY, JSON.stringify(localGoods))
			// 重新计算，保存最新的数据
			return getTotalCount()
		}
		 

// 4. 更新数据，保存在本地,并返回本地存储的总数量	updateLocalGoods
		const updateLocalGoods = (goods) =>{
			// 不管是添加，更新，还是删除，首先都要先获取到本地存储的那个对象，再对它来进行操作
			// 先获取一下本地的数据，再在这个本地数据上更新新的数据
			 var localGoods = getLocalGoods() 
			//  直接就是把修改过后的值   赋给本地存储中的对象的key
			//  localGoods[goods.goodsId] = goods['count']
			 localGoods[goods.goodsId] = goods.count
			 //保存在本地
			 localStorage.setItem(KEY, JSON.stringify(localGoods))
			 // 重新计算，保存最新的数据
			 return getTotalCount()
		}


// 5. 删除数据，并返回本地存储的总数量  deleteLocalGoods
		const deleteLocalGoods = (goodsId) =>{
			// 不管是添加，更新，还是删除，首先都要先获取到本地存储的那个对象，再对它来进行操作
			// 先获取一下本地的数据，再在这个本地数据上更新新的数据
			var localGoods = getLocalGoods()
			// 通过传递过来的goodsId，直接删除对象的属性. 
			delete localGoods[goodsId]
			 //保存在本地
			 localStorage.setItem(KEY, JSON.stringify(localGoods))
			 // 重新计算，保存最新的数据
			 return getTotalCount()

		}



// 6. 按需导出
		export{
			addLocalGoods,
			getTotalCount,
			getLocalGoods,
			updateLocalGoods,
			deleteLocalGoods
		}


