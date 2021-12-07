/*
	1.创建一个为Count组件服务的reducer，reducer本质就是一个函数
	2.reducer函数有2个参数，分别为之前的状态（preState），动作对象（action）
*/

const initState = 0
export default function countReducer(preState=initState, action) {
	// console.log(preState, action)
	// 从action中获取type、data
	const {type, data} = action
	// 根据type决定如何加工数据
	switch (type) {
		case 'increment': 
			return preState + data
		case 'decrement':
			return preState - data
		default:
			return preState
	}
}