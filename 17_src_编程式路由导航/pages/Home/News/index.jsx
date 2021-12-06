import React from 'react'

export default class News extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.history.push('/home/message')
		},2000)
	}
	render() {
		return (
			<ul>
				<li>News001</li>
				<li>News002</li>
				<li>News003</li>
            </ul>
		)
	}
}
