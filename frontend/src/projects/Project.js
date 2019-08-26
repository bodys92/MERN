import React from 'react';
import {ApiGet} from '../common/Api';
import ProjectsHeader from './ProjectsHeader';
import ProjectBody from './ProjectBody';


export default class Project extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				projects: [],
				buttonText: "+"
			};
	}

	componentDidMount() {
		ApiGet("/api/projects")
				.then(myData => this.setState({
									projects: myData 
								}));
	}

	getTotalTime(project) {
		ApiGet(`/api/project/${project._id}/tasksTime`)
				.then(time => time)
	}

	renderProjectForm() {
		
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col d-flex justify-content-between">
						<h1>Projects:</h1>
						<button type="button" 
								className="btn btn-primary m-1"
								onClick={this.renderProjectForm}>
							{this.state.buttonText}
						</button>
					</div>
				</div>
				<div className="row">
						<div className="col-8 ml-auto mr-auto">
								<ProjectsHeader/>
								<hr/>
								{this.state.projects.map((project, index) => 
									<ProjectBody 	key={index} 
													project={project} 
													projectIndex={index} 
													totalTime={this.getTotalTime(project)}/> )}
						</div>
				</div>
			</div>
		);
	}
}

