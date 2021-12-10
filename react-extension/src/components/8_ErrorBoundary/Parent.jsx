import React from 'react'
import Child from './Child'

export default class Parent extends React.Component {

	state = {
		// 用于标识子组件是否产生错误
		hasError: ''
	}

	// 当Parent的子组件出现报错时，会出发getDerivedStateFromError并调用，并携带错误信息
	static getDerivedStateFromError(error){
		// console.log(error)
		return {hasError:error}
	}

	componentDidCatch(){
		console.log('统计错误次数，反馈给服务器，用于通知编码人员进行bug解决')
	}

	render() {
		return (
			<div>
				<h3>Parent组件</h3>
				{this.state.hasError ? <h4>当前网络不稳定，稍后再试</h4>: <Child />}
			</div>
		)
	}
}
