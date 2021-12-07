import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {

	state = {
		count: 0
	}

	search = () => {
		const {count} = this.state
		const data = 'Hello, PubSub_' + count
		PubSub.publish('default_topic', data)
		this.setState({
			count: count + 1
		})
	}

	render() {
		return(
			<div>
				<button onClick={this.search}>Search</button>
			</div>
		)
	}
}


/*const Search = (props) => {
	let count = 1

	const query = () => {
		const data = 'Hello, PubSub_' + count
		PubSub.publish('default_topic', data)
		count++
	}

	return(
		<div>
			<button onClick={query}>Search</button>
		</div>
	)
}

export default Search*/