import React from 'react'

// 引入connect用于连结UI组件与redux
import {connect} from 'react-redux'

// 引入action
import {
	createIncrementAction, 
	createDecrementAction, 
	createIncrementAsyncAction
} from '../../redux/actions/count'


// 定义UI组件
class Count extends React.Component {

	handleIncrement = () => {
		const {value} = this.selectedNumber
		const {increment} = this.props
		increment(Number(value))
	}

	handleDecrement = () => {
		const {value} = this.selectedNumber
		const {decrement} = this.props
		decrement(Number(value))
	}

	handleIncrementOdd = () => {
		const {value} = this.selectedNumber
		const {result, increment} = this.props
		if(result%2 !== 0){
			increment(Number(value))
		}
	}

	handleIncrementAsync = () => {
		const {value} = this.selectedNumber
		const {incrementAsync} = this.props
		incrementAsync(Number(value),1000)
	}

	render() {
		// console.log(this.props)
		const {result, persons} = this.props
		return (
			<div>
				<h2>Count组件。Person组件总人数：{persons.length}</h2>
				<h4>当前求和为：{result}</h4>
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

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(
	state => ({result: state.result, persons: state.persons}), 
	{
		increment: createIncrementAction,
		decrement: createDecrementAction,
		incrementAsync: createIncrementAsyncAction	
	}
)(Count)