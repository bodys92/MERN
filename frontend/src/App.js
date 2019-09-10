import React, { useState } from 'react';
import './App.css';
import Project from './projects/Project';
import ProjectForm from './projects/ProjectForm';


function App() {
	const [actualPage, setActualPage] = useState("default");
	const [title, setTitle] = useState("Projects");
	const [buttonText, setButtonText] = useState("+");
	const project = ( 	<div className="container-fluid">
								<div className="row">
									<div className="col d-flex justify-content-between">
										<h1>{title}</h1>
										<button type="button" 
										className="btn btn-primary m-1"
										onClick={ () => { 	setActualPage("createProject")
															setButtonText("back")
															setTitle("Add new project")}}>{buttonText}
										</button>
									</div>
								</div>
								<div className="row">
									<div className="col-8 ml-auto mr-auto">
										<Project/>
									</div>
								</div>					    
							</div>)

	const projectForm = ( 	<div className="container-fluid">
								<div className="row">
									<div className="col d-flex justify-content-between">
										<h1>{title}</h1>
										<button type="button" 
										className="btn btn-primary m-1"
										onClick={ () => { 	setActualPage("default")
															setButtonText("+")
															setTitle("Project")}}>{buttonText}
										</button>
									</div>
								</div>
								<div className="row">
									<div className="col-8 ml-auto mr-auto">
										<ProjectForm/>
									</div>
								</div>
						    </div>)


  	switch(actualPage){
  		case "default":
  			return project;
  		break;
  		case "createProject":
  			return projectForm;
  		break;
  		default:
  			return project;
  	}
}

export default App;
