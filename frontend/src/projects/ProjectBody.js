import React from 'react';
import {formatDate} from '../common/DateHelper';
import {ApiGet} from '../common/Api';
import Tasks from '../tasks/Tasks';

export default class ProjectBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				tasksVisible: false,
				tasks: [],
				openProjectId: 0
			};
		this.showTasks = this.showTasks.bind(this);
	}

	getTask() {
		ApiGet(`/api/project/${this.props.project._id}/tasks`)
			.then(data => this.setState({
				tasks:data,
				tasksVisible: true,
				openProjectId: this.props.project._id,
			}))
	}



	showTasks() {
		if (!this.state.tasksVisible){
			this.getTask();
		} else {
			this.setState({
				tasksVisible: false,
				tasks: [],
				openProjectId: 0,
				taskFormVisible: false
			});
		}
	}

	
	render() {
		const formVisible = this.state.taskFormVisible; 
		const tasksList = this.state.tasks;
		const openProjectId = this.state.openProjectId
		const tasks = <Tasks tasks={tasksList} formVisible={formVisible} openProjectId={openProjectId}/>

		return (
			<div>
				<div className={this.state.tasksVisible ? "alert alert-primary row" : "alert alert-secondary row"} 
					 onClick={this.showTasks}>
						<div className="col" >{this.props.projectIndex + 1}</div>
						<div className="col-3" >{this.props.project.name}</div>
						<div className="col-2" >{this.props.project.category}</div>
						<div className="col-2" >{this.props.project.tasks.length}</div>
						<div className="col" >{formatDate(this.props.project.dateAdded)}</div>
						<div className="col" >{this.props.project.totalTime}</div>
				</div>
				{this.state.tasksVisible ? tasks : ''}
			</div>
		);
	}
}
