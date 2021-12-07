import React, {Component} from 'react'
import Search from './Search'
import Table from './Table'

export default class App extends Component {
	render() {
		return (
			<div>
				<Search />
				<Table />
			</div>
		)
	}
}