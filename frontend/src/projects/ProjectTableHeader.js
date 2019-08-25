import React from 'react';

export default class ProjectTableHeader extends React.Component {
		
	render() {
		return (
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Project</th>
						<th scope="col">Category</th>
						<th scope="col">Number of tasks</th>
						<th scope="col">Date created</th>
						<th scope="col">Total time</th>
					</tr>
				</thead>
		);
	}
}
