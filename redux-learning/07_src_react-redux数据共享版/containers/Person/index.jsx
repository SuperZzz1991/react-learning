import React from 'react'
import {nanoid} from 'nanoid'
import {connect} from 'react-redux'

import {createAddPersonAction} from '../../redux/actions/person'

class Person extends React.Component {

	handlePerson = () => {
		const name = this.nameNode.value
		const age = this.ageNode.value
		const person = {id:nanoid(), name, age}
		this.props.addPerson(person)
		this.nameNode.value = ''
		this.ageNode.value = ''
	}

	render() {
		const {persons, count} = this.props
		return (
			<div>
				<h2>Person组件。Count组件求和：{count}</h2>
				<input ref={c => this.nameNode = c} type='text' placeholder='输入名字' />
				<input ref={c => this.ageNode = c} type='text' placeholder='输入年龄' />
				<button onClick={this.handlePerson}>添加</button>
				<ul>
				{
					persons.map(person => {
						return <li key={person.id}>{person.name}-{person.age}</li>
					})
				}
				</ul>
			</div>
		)
	}
}

export default connect(
	state => ({persons:state.persons, count:state.result}),
	{
		addPerson: createAddPersonAction
	}
)(Person)