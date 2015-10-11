import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
require('./LearnCard.scss');

export default class LearnCard extends Component {
	static propTypes = {
		
	}
	render() {
		return(
			<div>
			 	<div className="card">
					<div className="card-header">
					&nbsp;
					</div>
					<div className="card-block">
						<p className="card-text">
						{	
							typeof this.props.trial['cue'] == 'undefined'
							? null
							: this.props.trial['cue']
						}
						</p>
					</div>
				</div>
			</div>
		);
	}
}


// <h4 className="card-title">Card title</h4>