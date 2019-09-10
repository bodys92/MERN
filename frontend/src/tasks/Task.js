import React from 'react';
import TaskBody from '../tasks/TaskBody';
import TaskForm from '../tasks/TaskForm'
import {ApiGet} from '../common/Api'

export default class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonText: "Add new task",
			formVisible: false,
			tasks: [],
		};
		this.showTaskForm = this.showTaskForm.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	componentDidMount() {
			ApiGet(`/api/project/${this.props.projectId}/tasks`)
				.then(data => {
					this.setState({tasks:data})
					})
	}

	addTask(newTask){
		const data = this.state.tasks;
		const parseTime = (t) => parseInt(t)
		data.push(newTask);
		this.setState({
			tasks:data,
			formVisible: false,
			buttonText: "Add new task"

		});
		this.props.updateTasksCounter();
		this.props.updateTasksTimer(parseTime(newTask.time));
	}

	shouldComponentUpdate(){
		// mrknout
		this.forceUpdate()
		return true
	}

	showTaskForm() {
		if (!this.state.formVisible){
			this.setState({
				formVisible: true ,
				buttonText: "Close"
			});
		} else {
			this.setState({
				formVisible: false,
				buttonText: "Add new task"
			});
		};
	};

	render() {

		const renderForm =  <TaskForm 	tasksCount={this.props.tasksCount} 
										addTask={this.addTask}
										projectId={this.props.projectId}/>

		return (
				<div className="card m-3 p-3">
					<div className="row text-primary p-4"> 
						<div className="col h5">#</div>
						<div className="col-3 h5">Title</div>
						<div className="col-6 h5">Description</div>
						<div className="col-2 h5">Amount of time</div>
					</div>
					<div className="card-body">
						{this.state.tasks.map((item,index) => {
							return <TaskBody key={index} task={item} taskIndex={index}/>
						})}
						<button onClick={this.showTaskForm} 
								className="btn btn-primary btn-block mt-4">
								{this.state.buttonText}
						</button>
						{this.state.formVisible ? renderForm : ''}
					</div>
				</div>
		);
	}
}
