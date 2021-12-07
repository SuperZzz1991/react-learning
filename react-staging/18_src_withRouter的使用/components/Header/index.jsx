import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Header extends Component {

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
		console.log('Header组件props:',this.props)
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				&nbsp;<button onClick={this.handleBack}>后退</button>
				&nbsp;<button onClick={this.handleForward}>前进</button>
				&nbsp;<button onClick={this.handleGo}>go</button>
			</div>
		)
	}
}

export default withRouter(Header)
// withRouter可以加工一般组件，让一般组件具备酷游组件所持有的API
// withRouterd的返回值是一个新组件