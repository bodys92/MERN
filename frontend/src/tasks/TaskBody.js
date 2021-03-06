import React from 'react';
import {formatTime} from '../common/FormatHelper.js';

export default class TaskBody extends React.Component {
	render() {
		return (
			<div className="row py-2 border-bottom mb-2">
					<div className="col">{this.props.taskIndex + 1}</div>
					<div className="col-3">{this.props.task.title}</div>
					<div className="col-6">{this.props.task.description}</div>
					<div className="col-2">{formatTime(this.props.task.time)}</div>
			</div>
		);
	}
}
