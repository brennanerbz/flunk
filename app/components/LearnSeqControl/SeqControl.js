import React, { Component, PropTypes } from 'react';
require('./SeqControl.scss');
import SignPosts from './SignPosts';

export default class SeqControl extends Component {
	static propTypes = {

	}

	componentDidMount() {
		$('.seq_control').height($(window).height() - 50)
		window.addEventListener('resize', this.resizeSideNav);
	}

	resizeSideNav = () => {
		$('.seq_control').height($(window).height() - 50)
	}

	render() {
		return(
			<div className="seq_control">
				<SignPosts {...this.props} />
				<label className="label_term_first" for="term_first">See Term first</label>
				<input id="term_first" type="checkbox" className="term_first"/>
				<span className="">
					<button className="button button-outline startover_btn"
						    type="button"
						    >Start over</button>
				</span>
			</div>
		);
	}
}