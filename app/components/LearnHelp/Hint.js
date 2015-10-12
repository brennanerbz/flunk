import React, { Component, PropTypes } from 'react';

export default class Hint extends Component {
	static propTypes = {
		hint: PropTypes.string
	}
	render() {
		const { hint } = this.props;
		return (
			<div>
				<p>
				  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
				    Button with data-target
				  </button>
				</p>
				<div className="collapse" id="collapseExample">
				  <div className="card card-block">
				    {hint}
				  </div>
				</div>
			</div>
		);
	}
}
