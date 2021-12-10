import React, {useState, useEffect, createRef, useRef} from 'react'
import ReactDOM from 'react-dom'

/*class Demo extends React.Component {

	state = {count:0}

	myRef = createRef()

	add = () => {
		this.setState(state => ({count:state.count + 1}))
	}

	unmount = () => {
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	show = () => {
		alert(this.myRef.current.value)
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({count: this.state.count + 1})
		},1000)
	}	

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		return (
			<div>
				<h2>当前求和为：{this.state.count}</h2>
				<button onClick={this.add}>+1</button>
				<button onClick={this.unmount}>卸载组件</button>
				<input type="text" ref={this.myRef} />
				<button onClick={this.show}>展示</button>
			</div>
		)
	}
}*/

const Demo = (props) => {

	const [count, setCount] = useState(0)

	const myRef = useRef()

	const add = () => {
		// setCount(count+1)
		setCount(count => count + 1)
	}

	const unmount = () => {
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	const show = () => {
		alert(myRef.current.value)
	}

	useEffect(() => {
		let timer = setInterval(() => {
			add()
		},1000)

		return () => {
			clearInterval(timer)
		}
	},[])

	return(
		<div>
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>+1</button>
			<button onClick={unmount}>卸载组件</button>
			<input type="text" ref={myRef} />
			<button onClick={show}>展示</button>
		</div>
	)
}

export default Demo