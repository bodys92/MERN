import React from 'react';

export default class ProjectsTableHeader extends React.Component {
		
	render() {
		return (
				<div className="row">
						<div className="col">#</div>
						<div className="col-3">Project</div>
						<div className="col-3">Category</div>
						<div className="col">Number of tasks</div>
						<div className="col">Date created</div>
						<div className="col">Total time</div>
				</div>
		);
	}
}
