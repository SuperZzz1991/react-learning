import React from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends React.Component {
	render() {
		// console.log(this.props)
		return (
			<NavLink activeClassName="active" className="list-group-item" {...this.props}/>
		)
	}
}