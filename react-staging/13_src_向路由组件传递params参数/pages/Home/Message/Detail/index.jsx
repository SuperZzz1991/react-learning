import React from 'react'

const data = [
	{id:'01', content:'Hello, React'},
	{id:'02', content:'Hello, React-Router'},
	{id:'03', content:'Hello, React-Router-Dom'}
]

export default class Detail extends React.Component {
	render() {
		// console.log(this.props)
		// 接受params参数
		const {id, title} = this.props.match.params
		const findResult = data.find(obj => id === obj.id)
		return (
			<ul>
				<li>id: {id}</li>
				<li>title: {title}</li>
				<li>content: {findResult.content}</li>
			</ul>
		);
	}
}
