import React from 'react'

import './index.css'

export default class Parent extends React.PureComponent {
	state = {carName: '奔驰C63'}
	changeCar = () => {
		this.setState({carName: '迈巴赫'})
		// this.setState({})
	}
	/*shouldComponentUpdate(nextProps, nextState) {
		return nextState.carName !== this.state.carName
	}*/
	render() {
		console.log('Parent.render------')
		const {carName} = this.state
		return (
			<div className="parent">
				<h3>Parent组件</h3>
				<span>车的名字是：{carName}</span>
				<br />
				<button onClick={this.changeCar}>换车</button>
				<Child carName="奥托" />
			</div>
		)
	}
}

class Child extends React.PureComponent {
	/*shouldComponentUpdate(nextProps, nextState) {
		return nextProps.carName !== this.props.carName
	}*/
	render() {
		console.log('Child.render------')
		return (
			<div className="child">
				<h3>Child组件</h3>
				<span>Parent组件车的名字是：{this.props.carName}</span>
			</div>
		)
	}
}