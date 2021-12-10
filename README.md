## react生命周期

##### 旧版本

![react生命周期(旧)](./images/react生命周期(旧).png "react生命周期(旧)")

##### 新版本

![react生命周期(新)](./images/react生命周期(新).png "react生命周期(新)")

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
4. withRouter：
	* 可以加工一般组件，让一般组件具备酷游组件所持有的API
	* withRouterd的返回值是一个新组件
		
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
	* 路由链接（携带参数）：`<Link to="/demo/test/18">detail</Link>`
	* 注册路由（声明接受）：`<Route path="/demo/test/:id component={Test} />`
	* 接受参数：this.props.match.params
2. search参数
	* 路由链接（携带参数）：`<Link to="/demo/test?id=18">detail</Link>`
	* 注册路由（无需声明接受，正常注册即可）：`<Route path="/demo/test component={Test} />`
	* 接受参数：this.props.location.search
	* *tips：获取到的search是urlencoded编码字符串，需要借助querystring解析*
3. state参数
	* 路由链接（携带参数）：`<Link to={{pathname:'/demo/test', state:{id:18}}}}>detail</Link>`
	* 注册路由（无需声明接受，正常注册即可）：`<Route path="/demo/test component={Test} />`
	* 接受参数：this.props.location.state
	* *tips：刷新也可以保留住参数*

## 编程式路由导航

借助this.props.history对象上的API对象操作路由的跳转、前进、后退
```js
this.props.history.push()
this.props.history.replace()
this.props.history.goBack()
this.props.history.goForward()
this.props.history.go(n)
```

## BrowserRouter与HashRouter的区别

1. 底层原理不一样
	* BrowserRouter使用的是H5的history API，不兼容IE9及以下版本
	* HashRouter使用的是URL的哈希值
2. path表现形式不一样
	* BrowserRouter的路径中没有#，例如：localhost:3000/demo/test
	* HashRouter的路径包含#，例如：localhost:3000/#/demo/test
3. 刷新后对路由state参数的影响不一样
	* BrowserRouter没有任何影响，因为state保存在history对象中
	* **HashRouter刷新后会导致路由state参数的丢失**

*tips：HashRouter可以用于解决一些路径错误相关的问题*

## React-UI组件库

* material-ui
* ***ant-design***
* element-ui
* vant-ui

#### ant-design(antd v4)

1. 安装
```
yarn add antd
```
2. 引入
```js
import {Button} from 'antd'
import 'antd/dist/antd.css'
```
3. 按需引入/自定义主题
	* 安装依赖
	```
	yarn add @craco/craco
	yarn add craco-less
	```
	* 修改package.json的scripts属性
	```json
	"scripts": {
	-   "start": "react-scripts start",
	-   "build": "react-scripts build",
	-   "test": "react-scripts test",
	+   "start": "craco start",
	+   "build": "craco build",
	+   "test": "craco test",
	}
	```
	* 创建craco.config.js
	```js
	const CracoLessPlugin = require('craco-less')
	module.exports = {
		babel: {
			plugin: [
				'import', {
					libraryName: 'antd',
					libraryDirectory: 'es',
					style: true
				}
			]
		},
		plugins: [{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@primary-color': '#1DA57A'
						},
						javascriptEnabled: true
					}
				}
			}
		}]
	}
	```
	* 创建index.less并引入antd.less样式
	```js
	@import '~antd/dist/antd.less'; 
	```
	* 在src/index.js中全局引入index.less样式
	```js
	import './index.less'
	```
	* antd样式变量 [自定义主题](https://ant.design/docs/react/customize-theme-cn)
	```
	@primary-color: #1890ff; // 全局主色
	@link-color: #1890ff; // 链接色
	@success-color: #52c41a; // 成功色
	@warning-color: #faad14; // 警告色
	@error-color: #f5222d; // 错误色
	@font-size-base: 14px; // 主字号
	@heading-color: rgba(0, 0, 0, 0.85); // 标题色
	@text-color: rgba(0, 0, 0, 0.65); // 主文本色
	@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
	@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
	@border-radius-base: 2px; // 组件/浮层圆角
	@border-color-base: #d9d9d9; // 边框色
	@box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 
					  0 6px 16px 0 rgba(0, 0, 0, 0.08),	
					  0 9px 28px 8px rgba(0, 0, 0, 0.05); // 浮层阴影
	```

## redux

##### 概念

1. 专门用于做状态管理的JS库（不是react的插件库）
2. 可以用在react,angular,vue中，但基本与react配合使用
3. 集中式管理react应用中多组件共享状态

##### 使用场景

1. 某个组件的状态，其他组件可以随时获取（共享）
2. 一个组件需要改变另一个组件的状态（通信）
3. 原则：能不能就不用，如果不用比较吃力才考虑使用

##### 工作流程

![redux工作流程](./images/redux原理图.png "redux工作流程")

##### 三个核心概念

1. action
	* 动作对象
	* 2个属性
		* type：标识属性。值为字符串，唯一，必要属性
		* data：数据属性。值类型任意，可选属性
	* 示例
	```js
	{type: 'ADD_STUDENT', data:{name:'tom', age:18}}
	```
2. reducer（redux的reducer函数必须是一个纯函数）
	* 用于初始化状态、加工状态
	* 加工时，根据旧的state和action，生成新的state的***纯函数***
	* 纯函数：同样的输入（实参），必定得到同样的输出(返回)
		* 不得改写参数数据
		* 不产生任何副作用，例如网络请求，输入和输出设备
		* 不能调用Date.now()或者Math.random()等不纯的方法
3. store
	* 将state、action、reducer联系在一起
	* 获取对象
	```js
	import {createStore} from 'redux'
	import reducer from './reducers'
	const store = createStore(reduce)
	```
	* API
		* getState()：获取state
		* dispatch(action)：分发action，触发reducer调用，产生新的state
		* subscribe(listener)：注册监听，当产生了新的state时，自动调用

##### 使用

1. 安装
```
yarn add redux
```
2. 案例***(redux-learning/02_src_redux精简版)***
	1. 去除Count组件自身的state状态
	2. src下创建
		* redux/store.js
		* redux/count_reducer.js
	3. store.js
	```js
	// 引入createStore，专门用于创建redux中最为核心的对象
	import {createStore} from 'redux'
	// 引入为Count服务的reducer
	import countReducer from './count_reducer'
	// 暴露store
	export default createStore(countReducer)
	```
	4. count_reduce.js
		* reducer本质是一个函数，接受preState,action。返回加工后的状态
		* reducer有2个作用：初始化状态、加工状态
		* reducer被第一次调用时，是store自动出发的，传递的preState是undefined
	5. 在index.jsx在监测store中状态的改别，一旦发生改变重写渲染<App />

	***tips:redux只负责管理状态，状态改变重写渲染需要主动调用***

3. 案例***(redux-learning/03_src_redux完整版)***
	1. 新增文件：
		* count-action.js专门用于创建action对象
		* constant.js放置type常量类
4. 案例***(redux-learning/04_src_redux异步action版)***
	1. 需求：延迟操作由组件转移给action
	2. 使用场景：对状态进行操作，但是具体数据靠异步任务返回
	3. 安装redux-thunk
	```
	yarn add redux-thunk
	```
	4. store.js：
	```js
	// 引入createStore，专门用于创建redux中最为核心的对象
	import {createStore, applyMiddleware} from 'redux'
	// 引入为Count服务的reducer
	import countReducer from './count_reducer'
	// 引入redux-thunk用于支持异步action
	import thunk from 'redux-thunk'
	// 暴露store
	export default createStore(countReducer, applyMiddleware(thunk))
	```
	5. count_action.js
	```js
	// 异步action：返回function函数对象(借助redux-thunk中间件)
	export const createIncrementAsyncAction = (data, time) => {
		// dispatch为store调用时从自身获取
		return (dispatch) => {
			// 在函数中编写异步任务
			setTimeout(() => {
				// 异步任务结束后分发一个同步的action去执行真正的操作数据
				dispatch(createIncrementAction(data))
			}, time);
		}
	}
	```

	***tips:异步action不是必须要写的，完全可以等待异步任务结束后再去分发action*** 

## react-redux

##### 概念及模型图

![react-redux模型图](./images/react-redux模型图.png "react-redux模型图")

##### 使用

1. 安装
```
yarn add react-redux
```
2. 基本案例***(redux-learning/05_src_react-redux基本使用)***
	* 明确2个概念：
		1. UI组件：不能使用任何redux的api，只负责页面的呈现、交互等
		2. 容器组件：负责和redux通信，将结果交给UI组件
	* 如何创建一个容器组件（react-redux的connet函数）
		* connect(mapStateToProps, mapDisptachToProps)(UI组件)
		* mapStateToProps：映射状态，返回值是一个对象
		* mapDisptachToProps：映射操作状态的方法，返回值是一个对象***（mapDisptachToProps也可以是一个对象）***

	***tips:容器组件中的strore是靠props传递的，而不是在容器组件直接引入*** 

3. 优化案例***(redux-learning/06_src_react-redux优化使用)***
	* 容器组件和UI组件合并成一个文件
	* 统一由Provider给容器组件传递store
	```js
	import {Provider} from 'react-redux' 
	<Provider store={store}>
		<App />
	</Provider>
	```
	* react-redux无需自己监测redux中状态的改变，容器组件可以自动完成监测
	* mapDisptachToProps简写成一个对象
	* 与redux交互组件的编写流程：
		1. 定义一个UI组件---不暴露
		2. 引入connect生成容器组件，并暴露。写法如下：
		```jsx
		connect(
			state => ({key:value}),
			{key:action}
		)(UI组件)
		```
		3. 在UI组件中通过this.props读取状态、操作状态
4. 数据共享案列***(redux-learning/07_src_react-redux数据共享版)***
	* 多个组件的Reducer通过combineReducers合并，合并后的总状态是一个对象
	* store只处理合并之后的对象。组件获取redux共享数据时根据对应的key获取
5. 开发者工具案例***(redux-learning/08_src_react-redux开发者工具版)***
	1. 安装
	```
	yarn add redux-devtools-extension
	```
	2. store配置
	```js
	// 引入createStore，专门用于创建redux中最为核心的对象
	import {createStore, applyMiddleware} from 'redux'
	// 引入redux-thunk用于支持异步action
	import thunk from 'redux-thunk'
	// 引入redux-devtools-extension
	import {composeWithDevTools} from 'redux-devtools-extension'
	const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
	export default store
	```
6. 最终版案例***(redux-learning/09_src_react-redux最终版)***
	* 所有变量名字要规范，尽量触发对象的简写模式
	* reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

##### 打包及发布

1. 打包
```
yarn build
```
2.发布(借助serve发布)
```
// 安装serve
yarn global add serve
// 启动
serve
// 以build目录启动
serve build
```

***
## react扩展

## setState

### setState更新状态的2种写法

1. setState(stateChange, [callback])------对象式的setState
	* stateChange为状态改变对象(该对象可以体现出状态的更改)
	* callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
2. setState(updater, [callback])------函数式的setState
    * updater为返回stateChange对象的函数。
    * updater可以接收到state和props。
    * callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

###### 总结:

1. 对象式的setState是函数式的setState的简写方式(语法糖)
2. 使用原则：
	* 如果新状态不依赖于原状态 ===> 使用对象方式
	* 如果新状态依赖于原状态 ===> 使用函数方式
	* 如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取

## lazyLoad

```js
//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
const Login = lazy(()=>import('@/pages/Login'))

//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
<Suspense fallback={<h1>loading.....</h1>}>
    <Switch>
        <Route path="/xxx" component={Xxxx} />
        <Redirect to="/login"/>
    </Switch>
</Suspense>	
```

## Hooks

1. React Hook/Hooks是什么?
	* Hook是React 16.8.0版本增加的新特性/新语法
	* 可以让你在函数组件中使用 state 以及其他的 React 特性

2. 三个常用的Hook
	* State Hook: React.useState()
	* Effect Hook: React.useEffect()
	* Ref Hook: React.useRef()

3. State Hook
	* State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
	* 语法: const [xxx, setXxx] = React.useState(initValue)  
	* useState()说明:
        * 参数: 第一次初始化指定的值在内部作缓存
        * 返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
	* setXxx()2种写法:
        * setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        * setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

4. Effect Hook
	* Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
	* React中的副作用操作:
        * 发ajax请求数据获取
        * 设置订阅 / 启动定时器
        * 手动更改真实DOM
	* 语法和说明: 
	```js
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { 
          	// 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    ```
	* 可以把 useEffect Hook 看做如下三个函数的组合
        * componentDidMount()
        * componentDidUpdate()
    	* componentWillUnmount() 

5. Ref Hook
	* Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
	* 语法：`const refContainer = useRef()`
	* 作用：保存标签对象,功能与`React.createRef()`一样

## Fragment

1. 使用
```js
<Fragment><Fragment>
<></>
```
2. 作用
	* 可以不用必须有一个真实的DOM根标签了

## Context

1. 理解
> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

2. 使用
	* 创建Context容器对象：
	```js
	const XxxContext = React.createContext()  
	```
	* 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	```js
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    ```
	* 后代组件读取数据：
	```js
	// 第一种方式:仅适用于类组件
	// 声明接收context
	static contextType = xxxContext
	// 读取context中的value数据
	this.context
	// 第二种方式: 函数组件与类组件都可以
	<xxxContext.Consumer>
		{
			// value就是context中的value数据要显示的内容
			value => ()
		}
	</xxxContext.Consumer>
	```

3. 注意
> 在应用开发中一般不用context, 一般都用它的封装react插件

## 组件优化

1. Component的2个问题 
	* 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
	* 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低
2. 效率高的做法
	* 只有当组件的state或props数据发生改变时才重新render()
3. 原因
	* Component中的shouldComponentUpdate()总是返回true
4. 解决
	* 办法1: 
		* 重写shouldComponentUpdate()方法
		* 比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	* 办法2:  
		* 使用PureComponent
		* PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
5. 注意 
	* 只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
	* 不要直接修改state数据, 而是要产生新数据
	* 项目中一般使用PureComponent来优化

## render props

1. 如何向组件内部动态传入带内容的结构(标签)?
	* Vue中: 
		* 使用slot技术, 也就是通过组件标签体传入结构`<A><B/></A>`
	* React中:
		* 使用children props: 通过组件标签体传入结构
		* 使用render props: 通过组件标签属性传入结构，而且可以携带数据，一般用render函数属性
2. children props
```js
<A>
  <B>xxxx</B>
</A>
{this.props.children}
```
问题: 如果B组件需要A组件内的数据, ==> 做不到 
3. render props
```js
<A render={(data) => <C data={data}></C>}></A>
```
A组件: {this.props.render(内部state数据)}
C组件: 读取A组件传入的数据显示 {this.props.data} 

## 错误边界（生产环境）

1. 理解
	* 错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面
2. 特点
	* 只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
3. 使用方式(getDerivedStateFromError配合componentDidCatch)
```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error)
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    }
}
componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info)
}
```

## 组件通信方式

1. 组件间的关系：
	- 父子组件
	- 兄弟组件（非嵌套组件）
	- 祖孙组件（跨级组件）
2. 几种通信方式：
	* props：
		* children props
		* render props
	* 消息订阅-发布：
		* pubs-sub
		* event
	* 集中式管理
		* redux
		* dva
	* cont ext
		* 生产者-消费者模式
3. 比较好的搭配方式：
	* 父子组件：props
	* 兄弟组件：消息订阅-发布、集中式管理
	* 祖孙组件(跨级组件)：消息订阅-发布、集中式管理、context(开发用的少，封装插件用的多)
