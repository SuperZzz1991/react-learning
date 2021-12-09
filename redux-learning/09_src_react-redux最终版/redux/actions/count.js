/*
	该文件专门为Count组件生成action对象
*/
import {INCREMENT, DECREMENT} from '../constant'

// 同步action：返回Object类型的一般对象
export const increment = data => ({type:INCREMENT, data})
export const decrement = data => ({type:DECREMENT, data})

// 异步action：返回function函数对象(借助redux-thunk中间件)
// 异步action中一般都会调用同步action
// dispatch为store调用时从自身获取
// 异步action不是必须要用的
export const incrementAsync = (data, time) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(increment(data))
		}, time);
	}
}