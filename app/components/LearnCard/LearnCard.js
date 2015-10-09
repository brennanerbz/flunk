import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
require('./LearnCard.scss');

@connect(state => ({
	latest_trial: state.learn.trials.latest_trial
}))
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

	renderCue() {
		return(
			<div className="card">
				<div className="card-header">
				&nbsp;
				</div>
				<div className="card-block">
					<p className="card-text">{this.state.cue}</p>
				</div>
			</div>
		);
	}
 
	render() {
		return(
			<div>
				{::this.renderCue()}
			</div>
		);
	}
}


// <h4 className="card-title">Card title</h4>