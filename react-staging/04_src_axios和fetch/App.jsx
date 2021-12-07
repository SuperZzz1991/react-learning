import React, {Component} from 'react'
// import axios from 'axios'

export default class App extends Component {
	
	query = async () => {
		let url = 'http://localhost:5000/students'
		// axios
		// axios.get(url).then(response => console.log(response), error => console.warn(error))

		// xhr:XMLHttpRequest
		// fetch:关注分离
		
		// fetch-未优化
		/*fetch(url).then(response => {
			console.log('fetch_请求服务器成功',response)
			// Promise对象
			return response.json()
		}, error => {
			console.warn('fetch_请求服务器失败',error)
		}).then(response => {
			console.log('fetch_获取成功',response)
		}, error => {
			console.warn('fetch_获取数据失败',error)
		})*/

		// fetch优化-异常穿透
		/*fetch(url).then(response => {
			console.log('fetch_请求服务器成功',response)
			// Promise对象
			return response.json()
		}).then(response => {
			console.log('fetch_获取成功',response)
		}).catch(error => console.warn('请求出错', error))*/

		// fetch优化-async/await
		try{
			const response = await fetch(url)
			const data = await response.json()
			console.log(data)
		}catch(error){
			console.warn('请求出错', error)
		}
		
	}

	render() {
		return (
			<div>
				<button onClick={this.query}>Search</button>
			</div>
		)
	}
}