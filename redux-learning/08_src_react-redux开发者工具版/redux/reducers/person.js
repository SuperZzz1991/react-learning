import {ADD_PERSON} from '../constant'

const initState = [{id:'001', name:'tom', age:18}]
export default function personReducer(preState=initState, action){
	const {type, data} = action
	switch(type){
		case ADD_PERSON:
			// preState.unshift(data)
			// preState被改写了，personReducer不再是一个纯函数
			return [data, ...preState]
		default:
			return preState
	}
}