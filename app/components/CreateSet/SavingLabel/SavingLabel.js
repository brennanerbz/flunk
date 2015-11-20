import React, { Component, PropTypes } from 'react';

export default class SavingLabel extends Component {
	static propTypes = {
	}

	state = {
		message: ''
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isCreatingSet 
			|| nextProps.isUpdatingSet 
			|| nextProps.isCreatingItem) {
			this.setState({
				message: 'Saving...'
			});
			setTimeout(() => {
				this.setState({
					message: nextProps.set == null ? 'Draft' : 'Saved'
				});
			}, 500)
			return;
		}	
	}

	render() {
		return(
			<div className="saving_label">
				<div className="saving_message">
					{ this.state.message }
				</div>
			</div>
		);
	}
}