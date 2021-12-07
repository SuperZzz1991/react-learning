import React from 'react'
import ReactDOM from 'react-dom'

import store from './redux/store'

import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

// 全局订阅store
store.subscribe(() => {
	ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
})