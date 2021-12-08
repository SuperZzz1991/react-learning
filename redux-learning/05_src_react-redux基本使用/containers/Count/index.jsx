// 引入Count的UI组件
import CountUI from '../../components/Count'

// 引入connect用于连结UI组件与redux
import {connect} from 'react-redux'

// 引入action
import {
	createIncrementAction, 
	createDecrementAction, 
	createIncrementAsyncAction
} from '../../redux/count_action'

// mapStateToProps函数的返回对象作为状态传递给UI组件的props对象
const mapStateToProps = (state) => {
	return {result: state}
}

// mapDispatchToProps函数的返回对象作为传递给UI组件操作数据的方法
const mapDispatchToProps = (dispatch) => {
	return {
		increment: data => dispatch(createIncrementAction(data)),
		decrement: data => dispatch(createDecrementAction(data)),
		incrementAsync: (data, time) => dispatch(createIncrementAsyncAction(data,time))
	}
}

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)