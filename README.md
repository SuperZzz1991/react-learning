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

## 路由的严格匹配与模糊匹配
	1.默认使用模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
	2.开启严格匹配：<Route exact={true} path="/home" component={Home} />
	3.严格匹配不要随便开启。需要则开，有时候开启会导致无法继续匹配二级路由

## Redirect的使用
	1.一般卸载所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
	2.具体编码：
		<Switch>
			<Route path="/home" component={Home} />
			<Route path="/about" component={About} />
			<Redirect to="/home"/>
		</Switch>

## 嵌套路由
	1.注册子路由时要写上父路由的path值
	2.路由的匹配是按照注册路由的顺序进行的

## 向路由组件传递参数
	1.params参数
		路由链接（携带参数）：<Link to="/demo/test/18">详情</Link>
		注册路由（声明接受）：<Route path="/demo/test/:id component={Test} />
		接受参数：this.props.match.params
	2.search参数
		路由链接（携带参数）：<Link to="/demo/test?id=18">详情</Link>
		注册路由（无需声明接受，正常注册即可）：<Route path="/demo/test component={Test} />
		接受参数：this.props.location.search
		tips：获取到的search是urlencoded编码字符串，需要借助querystring解析
	3.state参数
		