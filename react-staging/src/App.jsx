import React from 'react'

import {Button, DatePicker} from 'antd'
import {SearchOutlined, WechatOutlined,WeiboOutlined} from '@ant-design/icons'

const {RangePicker} = DatePicker

export default class App extends React.Component {
	render() {
		return (
			<div>
				App....
				<Button type="primary">Primary</Button>
				<Button>Default</Button>
				<Button type="link">Link</Button>
				<Button type="primary" icon={<SearchOutlined/>}>Search</Button>
				<WechatOutlined />
				<WeiboOutlined />
				<DatePicker />
				<RangePicker  />
			</div>
		)
	}
}
