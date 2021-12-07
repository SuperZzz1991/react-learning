 import React from 'react'
import {Link, Route} from 'react-router-dom'

import Detail from './Detail'

export default class Message extends React.Component {

	state = {
		messages: [
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'}
		]
	}

	handlePush = (id, title) => {
		//push跳转+params参数
		// this.props.history.push(`/home/message/detail/${id}/${title}`)

		//push跳转+search参数
		// this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

		//push跳转+state参数
		this.props.history.push('/home/message/detail', {id, title})
	}

	handleReplace = (id, title) => {
		//replace跳转+params参数
		// this.props.history.replace(`/home/message/detail/${id}/${title}`)

		//replace跳转+search参数
		// this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

		//replace跳转+state参数
		this.props.history.replace('/home/message/detail', {id, title})
	}

	handleBack = () => {
		this.props.history.goBack()
	}


	handleForward = () => {
		this.props.history.goForward()
	}


	handleGo = () => {
		this.props.history.go(-1)
	}

	render() {
		const {messages} = this.state
		return (
			<div>
				<ul>
					{
						messages.map(msg => {
							return (
								<li key={msg.id}>
									{/*向路由组件传递params参数*/}
									{/*{<Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>}*/}

									{/*向路由组件传递search参数*/}
									{/*{<Link to={`/home/message/detail?id=${msg.id}&title=${msg.title}`}>{msg.title}</Link>}*/}

									{/*向路由组件传递state参数*/}
									{<Link to={{pathname:'/home/message/detail', state:{id:msg.id, title:msg.title}}}>{msg.title}</Link>}

									&nbsp;<button onClick={() => this.handlePush(msg.id,msg.title)}>push跳转</button>
									&nbsp;<button onClick={() => this.handleReplace(msg.id,msg.title)}>replace跳转</button>

								</li>
							)
						})
					}
	            </ul>

	            <hr />
	            {/*声明接受params参数*/}
	            {/*{<Route path="/home/message/detail/:id/:title" component={Detail} />}*/}

	            {/*search参数无需声明接受，正常注册路由即可*/}
	            {/*<Route path="/home/message/detail" component={Detail} />*/}


	            {/*state参数无需声明接受，正常注册路由即可*/}
	            {<Route path="/home/message/detail" component={Detail} />} 

	            &nbsp;<button onClick={this.handleBack}>后退</button>
				&nbsp;<button onClick={this.handleForward}>前进</button>
				&nbsp;<button onClick={this.handleGo}>go</button>
			</div>
		)
	}
}
