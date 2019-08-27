import React from 'react';
import {formatDate} from '../common/DateHelper';
import Tasks from '../tasks/Tasks';
import {ApiGet} from '../common/Api';

export default class ProjectBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				tasksVisible: false,
				openProjectId: 0,
				tasksCounter: this.props.project.tasks.length,
				totalTime: []
			};

		this.showTasks = this.showTasks.bind(this);
		this.updateTasksCount = this.updateTasksCount.bind(this);
		this.updateTasksTime = this.updateTasksTime.bind(this);
	}

	componentDidMount() {
		ApiGet(`api/project/${this.props.project._id}/taskstime`)
			.then(data => {
				this.setState({totalTime:data});
			})


	}

	showTasks() {
		if (!this.state.tasksVisible){
			this.setState({
				tasksVisible: true,
				openProjectId: this.props.project._id
			});
		} else {
			this.setState({
				tasksVisible: false,
				openProjectId: 0
			});
		}
	}

	updateTasksCount() {
		this.setState({
			tasksCounter: this.state.tasksCounter + 1
		});
	}

	updateTasksTime(time) {
		const newState = this.state.totalTime;
		newState.push(time);
		this.setState({
			totalTime: newState
		});
	}

	
	render() {
		const openProjectId = this.state.openProjectId;
		const renderTasks = <Tasks 	updateTasksCount={this.updateTasksCount} 
									openProjectId={openProjectId}
									updateTasksTime={this.updateTasksTime}/>

		const totalTimeSum = this.state.totalTime.reduce((a,b) => a + b, 0)

		return (
			<div>
				<div className={this.state.tasksVisible ? "alert alert-primary row" : "alert alert-secondary row"} 
					 onClick={this.showTasks}>
						<div className="col" >{this.props.projectIndex + 1}</div>
						<div className="col-3" >{this.props.project.name}</div>
						<div className="col-2" >{this.props.project.category}</div>
						<div className="col-2" >{this.state.tasksCounter}</div>
						<div className="col" >{formatDate(this.props.project.dateAdded)}</div>
						<div className="col" >{totalTimeSum}</div>
				</div>
				{this.state.tasksVisible ? renderTasks : ''}
			</div>
		);
	}
}
