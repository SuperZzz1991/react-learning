## 路由组件与一般组件
	1.写法不同：
		一般组件：<Demo />
		路由组件：<Route path="/demo" component={Demo} />
	2.存放位置不同：
		一般组件：components
		路由组件：pages
	3.接收到的props不同：
		一般组件：写组件标签时传递了什么，就能收到什么
		路由组件：接收到三个固定的属性
					history:
						go: ƒ go(n)
						goBack: ƒ goBack()
						goForward: ƒ goForward()
						push: ƒ push(path, state)
						replace: ƒ replace(path, state)
					location:
						pathname: "/about"
						search: ""
						state: undefined
					match:
						params: {}
						path: "/about"
						url: "/about"

## NavLink与封装NavLink
	1.NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
	2.标签体内容是一个特殊的标签属性
	3.通过this.props.children可以获取标签体内容

## Switch的使用
	1.通常情况下，path和component是一一对应的关系
	2.Switch可以提高路由匹配效率（单一匹配）

## 解决多级路径刷新页面样式丢失的问题
	1.public/index.html中引入样式时不写'./'写'/'(常用)
	2.public/index.html中引入样式时不写'./'写'%PUBLIC_URL%'(常用)
	3.使用HashRouter