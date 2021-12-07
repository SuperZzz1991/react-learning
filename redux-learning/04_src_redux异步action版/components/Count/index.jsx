import React from 'react'
// 引入store，用于获取state状态
import store from '../../redux/store'
// 引入actionCreator，用于创建action对象
import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action'

export default class Count extends React.Component {

	// 放在/src/index.js中全局订阅
	/*componentDidMount() {
		// 监测redux中状态的变化
		store.subscribe(() => {
			this.setState({})
		})
	}
	*/
	handleIncrement = () => {
		const {value} = this.selectedNumber
		// 通知redux加value
		store.dispatch(createIncrementAction(Number(value)))
	}

	handleDecrement = () => {
		const {value} = this.selectedNumber
		store.dispatch(createDecrementAction(Number(value)))
	}

	handleIncrementOdd = () => {
		const {value} = this.selectedNumber
		const count = store.getState()
		if(count % 2 !== 0){
			store.dispatch(createIncrementAction(Number(value)))
		}
	}

	handleIncrementAsync = () => {
		const {value} = this.selectedNumber
		store.dispatch(createIncrementAsyncAction(Number(value), 1000))
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{store.getState()}</h1>
				<select ref={c => this.selectedNumber = c}>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
				</select>&nbsp;
				<button onClick={this.handleIncrement}>+</button>&nbsp;
				<button onClick={this.handleDecrement}>-</button>&nbsp;
				<button onClick={this.handleIncrementOdd}>+(odd)</button>&nbsp;
				<button onClick={this.handleIncrementAsync}>+(async)</button>
			</div>
		)
	}
}
