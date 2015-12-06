import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
	static propTypes = {
	}

	componentDidMount = () => {
		$("[data-toggle='tooltip']").tooltip({
			delay: { show: 400, hide: 50}
		})
	}

	renderTarget(target) {
		const { pushState } = this.props;
		let new_target = target !== null ? target.charAt(0).toUpperCase() + target.slice(1) : "..."
		return (
			<a className="item_target link"
			   onClick={() => pushState(null, `/search/concepts/${new_target}`)}>
			   {new_target}
			</a>
		)
	}

	renderCue(cue) {
		let new_cue = cue !== null ? cue.charAt(0).toUpperCase() + cue.slice(1) : '...'
		return (
			<p className="item_cue">{new_cue}</p>
		);
	}

	render() {
		const { item } = this.props,
			  star = require('../../../assets/star.png');
		return(
			<li>
				<div className="progress">
					<span className="no_answers_yet">
						No answers yet
					</span>
				</div>
				<div className="text">
					{::this.renderTarget(item.target)}
					{::this.renderCue(item.cue)}
				</div>
				<div className="actions">
					<div className="icons">
						<button className="toggle_btn star"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Select">
							<img src={star}/>
						</button>
					</div>
				</div>
			</li>
		);
	}
}

