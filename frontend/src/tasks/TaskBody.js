import React from 'react';

export default class TaskBody extends React.Component {
	render() {
		return (
			<div className="row py-2 border-bottom">
					<div className="col">{this.props.taskId}</div>
					<div className="col-3">{this.props.task.title}</div>
					<div className="col-6">{this.props.task.description}</div>
					<div className="col-2">{this.props.task.time}</div>
			</div>
		);
	}
}
