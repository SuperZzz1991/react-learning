import React from 'react'

export default class Demo extends React.Component {
	
	state = {count:0}

	add = () => {
		
		// 对象式的setState
		/*const {count} = this.state
		this.setState({count: count + 1}, () => {
			console.log('2',this.state.count)
		})
		console.log('1',this.state.count)*/

		// 函数式的setState
		this.setState(sttate => ({count:sttate.count+1}))
	}

	render() {
		return (
			<div>
				<h2>当前求和为：{this.state.count}</h2>
				<button onClick={this.add}>+1</button>
			</div>
		)
	}
}
