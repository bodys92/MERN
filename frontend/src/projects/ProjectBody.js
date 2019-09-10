import React from 'react';
import {formatDate} from '../common/FormatHelper.js';
import Task from '../tasks/Task';
import {ApiGet} from '../common/Api';
import {formatTime} from '../common/FormatHelper.js';

export default class ProjectBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				tasksVisible: false,
				projectId: 0,
				tasksCounter: this.props.project.tasks.length,
				totalTime: []
			};

		this.showTasks = this.showTasks.bind(this);
		this.updateTasksCounter = this.updateTasksCounter.bind(this);
		this.updateTasksTimer = this.updateTasksTimer.bind(this);
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
				projectId: this.props.project._id
			});
		} else {
			this.setState({
				tasksVisible: false,
				projectId: 0
			});
		}
	}

	updateTasksCounter() {
		this.setState({
			tasksCounter: this.state.tasksCounter + 1
		});
	}

	updateTasksTimer(time) {
		const newState = this.state.totalTime;
		newState.push(time);
		this.setState({
			totalTime: newState
		});
	}
	
	render() {
		const projectId = this.state.projectId;

		const renderTasks = () => {
			return (						
					<Task 		updateTasksCounter={this.updateTasksCounter} 
								projectId={projectId}
								updateTasksTimer={this.updateTasksTimer}/>
				);
		}

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
						<div className="col" >{formatTime(totalTimeSum)}</div>
				</div>
				{this.state.tasksVisible ? renderTasks() : ''}
			</div>
		);
	}
}
