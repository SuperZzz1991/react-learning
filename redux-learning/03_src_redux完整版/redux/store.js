/*
	该文件专门用于暴露store对象，整个应用仅需一个
*/

// 引入createStore，专门用于创建redux中最为核心的对象
import {createStore} from 'redux'
// 引入为Count服务的reducer
import countReducer from './count_reducer'
// 暴露store
export default createStore(countReducer)