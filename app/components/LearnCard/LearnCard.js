import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
require('./LearnCard.scss');

export default class LearnCard extends Component {
	static propTypes = {
		
	}

	state = {
		cue: ''
	}

	componentDidMount() {
		const { latest_trial } = this.props;
		if (typeof latest_trial['cue'] !== 'undefined') {
			this.setState({
				cue: latest_trial['cue']
			});
		}
	}

	componentWillUnmount() {
		this.setState({
			cue: ''
		});
	}
 
	render() {
		const { loading } = this.props;
		return(
			<div>
				{
					!loading
					? 	<div className="card">
							<div className="card-header">
							&nbsp;
							</div>
							<div className="card-block">
								<p className="card-text">{this.state.cue}</p>
							</div>
						</div>
					: null
				}
			</div>
		);
	}
}


// <h4 className="card-title">Card title</h4>