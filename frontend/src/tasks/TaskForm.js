import React from 'react';
import {Api} from '../common/Api';

export default class TaskForm extends React.PureComponent {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleSubmit(){
		
	}

	render() {
		return (
			<form className="p-4" onSubmit={this.handleSubmit}>
				<div class="form-group">
					<label for="imputTitle">Title</label>
					<input type="text" class="form-control" id="imputTitle" aria-describedby="imputTitleHelp" placeholder="Enter title"/>
					<small id="imputTitleHelp" class="form-text text-muted">Enter job title</small>
				</div>
				<div class="form-group">
					<label for="inputDesc">Describe</label>
					<input type="text" class="form-control" id="inputDesc" aria-describedby="imputDescHelp" placeholder="Describe"/>
					<small id="imputDescHelp" class="form-text text-muted">Enter job title</small>
				</div>
				<div class="form-group">
					<label for="inputTotalTime">Total time</label>
					<input type="number" class="form-control" id="inputTotalTime" placeholder="Total time"/>
				</div>

				<button type="submit" class="btn btn-block btn-outline-primary">Submit</button>

			</form>
		);
	}
}
