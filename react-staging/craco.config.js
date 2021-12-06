/* craco.config.js */
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