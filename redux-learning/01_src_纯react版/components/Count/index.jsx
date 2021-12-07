import React from 'react'

export default class Count extends React.Component {
	
	state = {result: 0}

	handleIncrement = () => {
		const {value} = this.selectedNumber
		const {result} = this.state
		this.setState({
			result: Number(result) + Number(value)
		})
	}

	handleDecrement = () => {
		const {value} = this.selectedNumber
		const {result} = this.state
		this.setState({
			result: Number(result) - Number(value)
		})
	}

	handleIncrementOdd = () => {
		const {value} = this.selectedNumber
		const {result} = this.state
		if(result % 2 !== 0){
			this.setState({
				result: Number(result) + Number(value)
			})
		}
	}

	handleIncrementAsync = () => {
		const {value} = this.selectedNumber
		const {result} = this.state
		setTimeout(() => {
			this.setState({
				result: Number(result) + Number(value)
			})
		},1000)
	}

	render() {
		const {result} = this.state
		return (
			<div>
				<h1>当前求和为：{result}</h1>
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
