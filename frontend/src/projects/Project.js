import React from 'react';
import {ApiGet} from '../common/Api';
import ProjectBody from './ProjectBody';


export default class Project extends React.Component {

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

	getTotalTime(project) {
		ApiGet(`/api/project/${project._id}/taskstime`)
				.then(time => time)
	}

	render() {
		return (
			<div>
				<div className="row text-primary">
						<div className="col h4">#</div>
						<div className="col-3 h4">Project</div>
						<div className="col-2 h4">Category</div>
						<div className="col-2 h4">Number of tasks</div>
						<div className="col h4">Date created</div>
						<div className="col h4">Total time</div>
				</div>
				<hr/>
				{this.state.projects.map((project, index) => 
					<ProjectBody 	key={index} 
									project={project} 
									projectIndex={index}/> )}
			</div>
		);
	}
}

