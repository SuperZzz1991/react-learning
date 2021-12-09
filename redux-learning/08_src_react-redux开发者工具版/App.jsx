import React from 'react'

import Count from './containers/Count'
import Person from './containers/Person'

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Count />
				<hr />
				<Person />
			</div>
		)
	}
}
