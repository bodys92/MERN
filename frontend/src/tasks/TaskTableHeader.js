import React from 'react';

export default class TaskTableHeader extends React.PureComponent {

	render() {
		return (
				<div className="row">
						<div className="col">#</div>
						<div className="col-3">Title</div>
						<div className="col-6">Description</div>
						<div className="col-2">Amount of time</div>
				</div>
		);
	}
}
