import React from 'react';
import {ApiGet} from '../common/Api';
import ProjectTable from './ProjectTable';

export default class ProjectIndex extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				projects: []
			};
	}

	componentDidMount() {
		ApiGet("/api/projects")
				.then(myData => this.setState({
									projects: myData 
								}));
	}

	handleClick(){
		console.log("Click");
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col d-flex justify-content-between">
						<h1>Projects:</h1>
						<button type="button" className="btn btn-primary m-1"
						onClick={this.handleClick}>
							+
						</button>
					</div>
				</div>
				<div className="row">
					{this.state.projects.map((item, index) => 
						<ProjectTable project={item} projectIndex={index}/>)}
				</div>
			</div>
		);
	}
}

