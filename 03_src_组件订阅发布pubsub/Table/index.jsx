import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Table extends Component {

	state = {content: undefined}

	componentDidMount() {
		this.token = PubSub.subscribe('default_topic', (msg, data) => {
			this.setState({content: msg + ':' + data})
		})
	}

	componentWillUnmount() {
		PubSub.unsubscribe(this.token)
	}

	render() {
		const {content} = this.state
		return(
			<div>{content}</div>
		)
	}
}