import React, { Component, PropTypes } from 'react';
require('./LearnHelp.scss')

export default class LearnHelp extends Component {
	static propTypes = {
	}

	render() {
		return(
			<ul className="list-group augmentations">
			  <li className="list-group-item">Cras justo odio</li>
			  <li className="list-group-item">Dapibus ac facilisis in</li>
			  <li className="list-group-item">Morbi leo risus</li>
			  <li className="list-group-item">Porta ac consectetur ac</li>
			  <li className="list-group-item">Vestibulum at eros</li>
			</ul>
		);
	}
}