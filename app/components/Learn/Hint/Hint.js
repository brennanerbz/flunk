import React, { Component, PropTypes } from 'react';
require('./Hint.scss');

export default class Hint extends Component {
	static propTypes = {
		hints: PropTypes.array
	}

	shouldComponentUpdate(nextProps) {
		return (this.props.current_slot.id == nextProps.current_slot.id) || (this.props.hints == nextProps.hints)
	}

	render() {
		const { hints } = this.props,
			  hint = hints[0];
		return (
			hint !== null
			? <div className="hint_container">	
				<p className="hint">{hint}</p>
				<p className="hint_source">Source</p>
			  </div>
			: null
		);
	}
}


// <p className="hint_label">Hint:</p>