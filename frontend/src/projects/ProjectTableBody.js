import React from 'react';
import {formatDate} from '../common/DateHelper';



export default class ProjectTableBody extends React.Component {

	handleClick() {
		console.log("Click on row");
		this.setState({
			tasksVisible: true 
		});
	}
	
	render() {
		return (
				<tbody>
					<tr onClick={this.handleClick} className={this.props.project.isAvailable ? "" : "unAvailable"} key={this.props.itemIndex + 1}>
						<th scope="row">{this.props.itemIndex + 1}</th>
						<td>{this.props.project.name}</td>
						<td>{this.props.project.category}</td>
						<td>{this.props.project.tasks.length}</td>
						<td>{formatDate(this.props.project.dateAdded)}</td>
						<td>{this.props.project.totalTime}</td>
					</tr>
				</tbody>
		);
	}
}
