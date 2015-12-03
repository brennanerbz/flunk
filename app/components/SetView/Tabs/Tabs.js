import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./Tabs.scss')

export default class Tabs extends Component {
	static propTypes = {
	}

	state = {
		tab: 'terms'
	}

	render() {
		return(
			<div className="tab_set">
				<a className={classnames({selected: this.state.tab == 'terms'})}
				   onClick={() => this.setState({tab: 'terms'})}>
					Terms
				</a>
				<a className={classnames({selected: this.state.tab == 'info'})}
					onClick={() => this.setState({tab: 'info'})}>
					Info
				</a>
			</div>
		);
	}
}