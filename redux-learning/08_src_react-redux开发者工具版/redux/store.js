/*
	该文件专门用于暴露store对象，整个应用仅需一个
*/

// 引入createStore，专门用于创建redux中最为核心的对象
import {createStore, applyMiddleware,combineReducers} from 'redux'
// 引入为Count服务的reducer
import countReducer from './reducers/count'
// 引入为Person服务的reducer
import personReducer from './reducers/person'
// 引入redux-thunk用于支持异步action
import thunk from 'redux-thunk'
// 引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'
 
const allReducers = combineReducers({
	result: countReducer,
	persons: personReducer
})

// 暴露store
export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))