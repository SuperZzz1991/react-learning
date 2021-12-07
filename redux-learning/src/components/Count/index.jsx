import React from 'react'

export default class Count extends React.Component {

	handleIncrement = () => {
		const {value} = this.selectedNumber
	}

	handleDecrement = () => {
		const {value} = this.selectedNumber
	}

	handleIncrementOdd = () => {
		const {value} = this.selectedNumber
	}

	handleIncrementAsync = () => {
		const {value} = this.selectedNumber
	}

	render() {
		return (
			<div>
				<h1>当前求和为：0</h1>
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
