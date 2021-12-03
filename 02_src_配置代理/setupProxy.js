const proxy = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
		//遇见/api1前缀的请求，就会触发改代理配置
		proxy('/api1',{
			//配置转发目标地址
			target:'http://localhost:5000',
			//控制服务器收到响应头中Host字段的值
			/*
				true: 服务器收到的请求头中host为localhost:5000
				false: 服务器收到的请求头中host为localhost:3000
				默认值为false，一般设置为true
			*/
			changeOrigin:true,	
			//去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
			pathRewrite:{'^/api1':''}
		}),
		proxy('/api2',{
			target:'http://localhost:5001',
			changeOrigin:true,
			pathRewrite:{'^/api2':''}
		}),
	)
}