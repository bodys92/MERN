import React from 'react';
import ProjectTableHeader from './ProjectTableHeader';
import ProjectTableBody from './ProjectTableBody';
import TaskTableBody from '../tasks/TaskTableBody';
import TaskTableHeader from '../tasks/TaskTableHeader';
import {ApiGet} from '../common/Api';


export default class ProjectTable extends React.Component {
		constructor(props) {
		super(props);
		this.state = {
				tasksVisible: false,
				tasks: []
			};
	}

	componentDidMount() {
		ApiGet(`/api/project/${this.props.project._id}/tasks`)
			.then(data => this.setState({
				tasks:data 
			}));
	}

	render() {
		return (
			<div className="col-8 ml-auto mr-auto">
				<table className="table">
					<ProjectTableHeader/>
					<ProjectTableBody project={this.props.project} itemIndex={this.props.projectIndex}/>
					<TaskTableHeader/>
					{this.state.tasks.map((item,index) => 
					<TaskTableBody task={item} taskIndex={index}/>)}
					<TaskTableBody/>
				</table>
			</div>
		);
	}
}
