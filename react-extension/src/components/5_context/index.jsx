import React, {createContext} from 'react'
import './index.css'

// 创建context对象
const MyContext = createContext()
const {Provider,Consumer} = MyContext

export default class A extends React.Component {

	state = {name: 'tom', age:18}

	render() {
		const {name,age} = this.state
		return (
			<div className="parent">
				<h3>A组件-用户名是{name}</h3>
				<Provider value={{name,age}}>
					<B/>
				</Provider>
			</div>
		)
	}
}

class B extends React.Component {
	render() {
		return (
			<div className="child">
				<h3>B组件</h3>
				<C />
				<D />
			</div>
		)
	}
}

class C extends React.Component {
	// 声明接受context
	static contextType = MyContext
	render() {
		const {name,age} = this.context
		return (
			<div className="grand">
				<h3>C组件-获取A的用户名是{name}-{age}</h3>
			</div>
		)
	}
}

const D = () => {
	return(
		<div className="grand">
			<h3>D组件-获取A的用户名是
				<Consumer>
					{value => `${value.name}-${value.age}`}
				</Consumer>
			</h3>
		</div>
	)
}