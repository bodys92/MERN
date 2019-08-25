import React from 'react';

export default class TaskTableHeader extends React.PureComponent {

	render() {
		return (
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Title</th>
						<th scope="col">Description</th>
						<th scope="col">Amount of time</th>
					</tr>
				</thead>
		);
	}
}
