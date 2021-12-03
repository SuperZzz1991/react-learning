import React from 'react'
// import qs from 'querystring'

const data = [
	{id:'01', content:'Hello, React'},
	{id:'02', content:'Hello, React-Router'},
	{id:'03', content:'Hello, React-Router-Dom'}
]

export default class Detail extends React.Component {
	render() {
		console.log(this.props)
		// 接受params参数
		// const {id, title} = this.props.match.params

		// 接受search参数
		// const {search} = this.props.location
		// const {id, title} = qs.parse(search.slice(1))

		// 接受state参数
		const {id, title} = this.props.location.state || {}

		const findResult = data.find(obj => id === obj.id) || {}
		return (
			<ul>
				<li>id: {id}</li>
				<li>title: {title}</li>
				<li>content: {findResult.content}</li>
			</ul>
		);
	}
}
