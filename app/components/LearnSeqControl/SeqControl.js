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
				<span className="">
					<button className="square_fill_btn startover_btn"
						    type="button"
						    >Start over</button>
				</span>
			</div>
		);
	}
}