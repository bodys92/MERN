import React from 'react';

export default class ProjectsTableHeader extends React.Component {
		
	render() {
		return (
				<div className={this.props.active ? "row text-secondary" : "row text-primary"}>
						<div className="col h4">#</div>
						<div className="col-3 h4">Project</div>
						<div className="col-3 h4">Category</div>
						<div className="col h4">Number of tasks</div>
						<div className="col h4">Date created</div>
						<div className="col h4">Total time</div>
				</div>
		);
	}
}
