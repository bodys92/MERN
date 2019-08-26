import React from 'react';

export default class TaskHeader extends React.PureComponent {

	render() {
		return (
				<div className="row text-primary p-4"> 
						<div className="col h5">#</div>
						<div className="col-3 h5">Title</div>
						<div className="col-6 h5">Description</div>
						<div className="col-2 h5">Amount of time</div>
				</div>
		);
	}
}
