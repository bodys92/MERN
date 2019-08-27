import React from 'react';
import {Api} from '../common/Api';

export default class TaskForm extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			taskTitle: "",
			taskDesc: "",
			taskTime: 0,
			tasks:[]
		}
		this.handleSubmit = this.handleSubmit.bind(this);	
		this.handleChange = this.handleChange.bind(this);			
	}

	setDefault() {
		this.setState({
			taskTitle: "",
			taskDesc: "",
			taskTime: 0
		});
	}

	handleSubmit(event){
		// cancel the event
        event.preventDefault();
        const task = {
        	title: this.state.taskTitle,
        	description: this.state.taskDesc,
        	time: this.state.taskTime
        };
        const options = {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(task), // body data type must match "Content-Type" header
        }
        
        Api(`/api/project/${this.props.projectId}/task`, {}, options)
        	.then(this.props.addTask(task))
	}

	handleChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value 
		});
	}

	render() {
		const taskTitle = this.state.taskTitle;
		const taskDesc = this.state.taskDesc;
		const taskTime = this.state.taskTime;

		return (
			<form className="p-4" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label className="label-override">Title
						<input 	type="text" 
								className="form-control" 
								id="imputTitle" 
								placeholder="Enter title"
								name="taskTitle"
								value={taskTitle}
								onChange={this.handleChange}
								required/>
						<small 	id="imputTitleHelp" 
								className="form-text text-muted">Enter job title</small>
					</label>
				</div>
				<div className="form-group">
					<label className="label-override">Describe
						<input 	type="text" 
								className="form-control" 
								id="inputDesc" 
								placeholder="Describe"
								name="taskDesc"
								value={taskDesc}
								onChange={this.handleChange}
								required/>
						<small 	id="imputDescHelp" 
								className="form-text text-muted">Enter job title</small>
					</label>
				</div>
				<div className="form-group">
					<label className="label-override">Total time
						<input 	type="number" 
								className="form-control" 
								id="inputTotalTime" 
								placeholder="Total time"
								name="taskTime"
								value={taskTime}
								onChange={this.handleChange}
								required/>
					</label>
				</div>

				<button type="submit" 
						className="btn btn-block btn-outline-primary">Submit</button>

			</form>
		);
	}
}
