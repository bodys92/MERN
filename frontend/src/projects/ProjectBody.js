import React from 'react';
import {formatDate} from '../common/DateHelper';
import {ApiGet} from '../common/Api';
import TaskBody from '../tasks/TaskBody';
import TaskTableHeader from '../tasks/TaskTableHeader';

export default class ProjectBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				tasksVisible: false,
				tasks: [],
			};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (!this.state.tasksVisible){
			console.log("ROW Click!!!");
			this.getTask();
		} else {
			this.setState({
				tasksVisible: false
			});
		}

	}

	getTask() {
		ApiGet(`/api/project/${this.props.project._id}/tasks`)
			.then(data => this.setState({
				tasks:data,
				tasksVisible: true 
			}))
	}

	renderTaskList() {
		return this.state.tasks.map((item,index) => <TaskBody key={index} task={item} taskId={index}/>)
	}

	
	render() {
		const visible = this.state.tasksVisible; 
		let tasks = <div className="card m-3 p-3">
					<TaskTableHeader/>
						<div className="card-body">
					{this.renderTaskList()}
					<button className="btn btn-primary btn-block">Add new task</button>
						</div>
					</div>
		return (
			<div>
				<div className={this.state.tasksVisible ? "alert alert-primary row" : "alert alert-secondary row"} onClick={this.handleClick}>
						<div className="col" >{this.props.projectIndex + 1}</div>
						<div className="col-3" >{this.props.project.name}</div>
						<div className="col-3" >{this.props.project.category}</div>
						<div className="col" >{this.props.project.tasks.length}</div>
						<div className="col" >{formatDate(this.props.project.dateAdded)}</div>
						<div className="col" >{this.props.project.totalTime}</div>
				</div>
				{this.state.tasksVisible ? tasks:''}
			</div>
		);
	}
}
