import React from 'react';
import {Api} from '../common/Api';

export default class ProjectForm extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			 name:"default",
			 category:"default"
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]:value 
		});
	}

	handleSubmit(event){
		// cancel the event
        event.preventDefault();
        const project = {
        	name: this.state.name,
        	category: this.state.category,
        };
        const options = {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(project), // body data type must match "Content-Type" header
        }
        
        Api('/api/project/', {}, options)
	}


	render() {
		return (
			<form onSubmit={this.handleSubmit} className="p-4">
				<div className="form-group">
					<label className="label-override">Project name
						<input 	type="text" 
								className="form-control" 
								id="imputTitle" 
								placeholder="Enter name of project"
								name="name"
								onChange={this.handleChange}
								maxlength="24"
								required/>
						<small 	id="imputProjectHelp" 
								className="form-text text-muted">Enter name of project
						</small>
					</label>
				</div>
				<div className="form-group">
					<label className="label-override">Category
						<input 	type="text" 
								className="form-control" 
								id="inputDesc" 
								placeholder="Category"
								name="category"
								onChange={this.handleChange}
								maxlength="24"
								required/>
						<small 	id="imputProjectHelp" 
								className="form-text text-muted">Enter category
						</small>
					</label>
				</div>
				<button type="submit" 
						className="btn btn-block btn-outline-primary">Submit</button>

			</form>
		);
	}
}
