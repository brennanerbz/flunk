import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/learnset';

@connect(state => ({
	sets: state.sets.items
	}),
	dispatch => ({
		...bindActionCreators({
			...actionCreators
		}, dispatch)
	})
)
export default class Learn extends Component {
	static propTypes = {
		params: PropTypes.object,
		sets: PropTypes.array
	}

	componentDidMount() {
		this.props.loadSet()
	}

	render() {
		const set = this.props.sets[this.props.params.id]
		return(
			<div className="main_content">
				{ set
				? <h1>{set.name}</h1>
				: null }						
			</div>
		);
	}
}