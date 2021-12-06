## 使用create-react-app创建react应用

	1. 全局安装：yarn add create-react-app
	2. 创建项目：create-react-app HelloWorld
	3. 进入目录：cd HelloWorld
	4. 启动项目：yarn start

## 配置代理

### 方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

##### 优缺点：
1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

### 方法二

1. 创建代理配置文件**(在src下创建配置文件)**
   ```
   	src/setupProxy.js
   ```
2. 编写setupProxy.js配置具体代理规则
   ```js
   const proxy = require('http-proxy-middleware')
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

##### 优缺点：
1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

## 消息订阅-发布机制pubsubjs

1. 安装：yarn add pubsub-js
2. 使用
```js
	import PubSub from 'pubsub-js'
	PubSub.subscribe('MY_TOPIC', function(data){})
	PubSub.publish('MY_TOPIC', data)
	PubSub.unsubscribe('MY_TOPIC')
```

## axios和fetch

1. axios：xhr对象提交ajax请求
2. fetch：原生函数，不再使用xhr对象提交ajax请求，老版本浏览器可能不支持

## SPA

1. 单Web应用（single page web application, SPA）
2. 整个应用只有一个完整的页面
3. 点击页面中的链接不会刷新页面，只会做页面的局部刷新
4. 数据需要通过ajax请求获取，并在前端异步表现

## 路由

1. 一个路由就是一个映射关系(key:value)
2. key为路径, value可能是function或component
3. 后端路由：value是function, 用来处理客户端提交的请求
4. 前端路由：value是component，用于展示页面内容

## react-router-dom
1. 概念：
	- react的一个插件库。
	- 专门用来实现一个SPA应用。
	- 基于react的项目基本都会用到此库。
2. 内置组件：
	- `<BrowserRouter>`
	- `<HashRouter>`
	- `<Route>`
	- `<Redirect>`
	- `<Link>`
	- `<NavLink>`
	- `<Switch>`
3. 其他：
	- history对象
	- match对象
	- withRouter函数
4. 安装**(5.2版本，默认最新版本为6)**
```
	yarn add react-router-dom@5.2
```
5. 使用：
```js
	import {} from 'react-router-dom'
```

## 路由组件与一般组件
1. 写法不同：
	* 一般组件：`<Demo />`
	* 路由组件：`<Route path="/demo" component={Demo} />`
2. 存放位置不同：
	* 一般组件：components
	* 路由组件：pages
3. 接收到的props不同：
	* 一般组件：写组件标签时传递了什么，就能收到什么
	* 路由组件：接收到三个固定的属性
		* history:
			* go: ƒ go(n)
			* goBack: ƒ goBack()
			* goForward: ƒ goForward()
			* push: ƒ push(path, state)
			* replace: ƒ replace(path, state)
		* location:
			* pathname: "/about"
			* search: ""
			* state: undefined
		* match:
			* params: {}
			* path: "/about"
			* url: "/about"

			
## NavLink与封装NavLink

1. NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
2. 标签体内容是一个特殊的标签属性
3. 通过this.props.children可以获取标签体内容

## Switch的使用

1. 通常情况下，path和component是一一对应的关系
2. Switch可以提高路由匹配效率（单一匹配）

## 解决多级路径刷新页面样式丢失的问题

1. public/index.html中引入样式时不写'./'写'/'(常用)
2. public/index.html中引入样式时不写'./'写'%PUBLIC_URL%'(常用)
3. 使用HashRouter

## 路由的严格匹配与模糊匹配

1. 默认使用模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2. 开启严格匹配：<Route exact={true} path="/home" component={Home} />
3. 严格匹配不要随便开启。需要则开，有时候开启会导致无法继续匹配二级路由

## Redirect的使用
1. 一般卸载所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
2. 具体编码
```js
	<Switch>
		<Route path="/home" component={Home} />
		<Route path="/about" component={About} />
		<Redirect to="/home"/>
	</Switch>
```

## 嵌套路由

1. 注册子路由时要写上父路由的path值
2. 路由的匹配是按照注册路由的顺序进行的

## 向路由组件传递参数

1. params参数
	* 路由链接（携带参数）：`<Link to="/demo/test/18">详情</Link>`
	* 注册路由（声明接受）：`<Route path="/demo/test/:id component={Test} />`
	* 接受参数：this.props.match.params
2. search参数
	* 路由链接（携带参数）：`<Link to="/demo/test?id=18">详情</Link>`
	* 注册路由（无需声明接受，正常注册即可）：`<Route path="/demo/test component={Test} />`
	* 接受参数：this.props.location.search
	* *tips：获取到的search是urlencoded编码字符串，需要借助querystring解析*
3. state参数
	* 路由链接（携带参数）：`<Link to={{pathname:'/demo/test', state:{id:18}}}}>详情</Link>`
	* 注册路由（无需声明接受，正常注册即可）：`<Route path="/demo/test component={Test} />`
	* 接受参数：this.props.location.state
	* *tips：刷新也可以保留住参数*