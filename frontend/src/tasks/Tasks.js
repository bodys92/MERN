import React from 'react';
import TaskBody from '../tasks/TaskBody';
import TaskHeader from '../tasks/TaskHeader';
import TaskForm from '../tasks/TaskForm'
import {ApiGet} from '../common/Api'

export default class Tasks extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			formVisible: false,
			tasks: [],
			tasksJsx: []
		};
		this.showTaskForm = this.showTaskForm.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	componentDidMount() {
			ApiGet(`/api/project/${this.props.openProjectId}/tasks`)
				.then(data => {
					this.setState({tasks:data})
					this.renderJsx(data)
					})
	}

	addTask(newTask){
		const data = this.state.tasks;
		const time = (t) => parseInt(t)
		data.push(newTask);
		this.renderJsx(data)
		this.props.updateTasksCount();
		this.props.updateTasksTime(time(newTask.time));
	}

	showTaskForm() {
		if (!this.state.formVisible){
			this.setState({
				formVisible: true 
			});
		} else {
			this.setState({
				formVisible: false 
			});
		};
	};

	renderJsx(data){
		const arr = []
		data.map((item,index) => {
			return arr.push(<TaskBody key={index} task={item} taskIndex={index}/>)
			})
		this.setState({
			tasksJsx:arr 
		});
	}

	render() {
		const renderForm =  <TaskForm 	tasksCount={this.props.tasksCount} 
										addTask={this.addTask}
										projectId={this.props.openProjectId}/>

		return (
				<div className="card m-3 p-3">
					<TaskHeader/>
					<div className="card-body">
						{this.state.tasksJsx}
						<button onClick={this.showTaskForm} 
								className="btn btn-primary btn-block mt-4">
								Add new task
						</button>
					</div>
					{this.state.formVisible ? renderForm : ''}
				</div>
		);
	}
}
