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
									{/*<Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>*/}

									{/*向路由组件传递search参数*/}
									<Link to={`/home/message/detail?id=${msg.id}&title=${msg.title}`}>{msg.title}</Link>
								</li>
							)
						})
					}
	            </ul>
	            <hr />
	            {/*声明接受params参数*/}
	            {/*<Route path="/home/message/detail/:id/:title" component={Detail} />*/}

	            {/*search参数无需声明接受，正常注册路由即可*/}
	            <Route path="/home/message/detail" component={Detail} />
			</div>
		)
	}
}
