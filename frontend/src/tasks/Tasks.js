import React from 'react';
import TaskBody from '../tasks/TaskBody';
import TaskHeader from '../tasks/TaskHeader';
import TaskForm from '../tasks/TaskForm'

export default class Tasks extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			formVisible: false
		};
		this.showTaskForm = this.showTaskForm.bind(this);
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

	renderTasks() {
		return this.props.tasks.map((item,index) => <TaskBody key={index} task={item} taskId={index}/>)
	}

	render() {
		const form =  <TaskForm projectId={this.props.openProjectId}/>

		return (
				<div className="card m-3 p-3">
					<TaskHeader/>
					<div className="card-body">
						{this.renderTasks()}
						<button onClick={this.showTaskForm} 
								className="btn btn-primary btn-block mt-4">
								Add new task
						</button>
					</div>
					{this.state.formVisible ? form : ''}
				</div>
		);
	}
}
