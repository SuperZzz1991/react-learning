import React, {Component, lazy, Suspense} from 'react'
import {NavLink, Routes, Route} from 'react-router-dom'

// import Home from './Home'
// import About from './About'
import Loading from './Loading'

const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))


export default class Demo extends Component {

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header"><h2>React Router Demo</h2></div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">
							<NavLink className="list-group-item" to="/home">Home</NavLink>
							<NavLink className="list-group-item" to="/about">About</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								<Suspense fallback={<Loading />}>
									<Routes>
										<Route path="/home" element={<Home />} />
										<Route path="/about" element={<About />} />
									</Routes>
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}