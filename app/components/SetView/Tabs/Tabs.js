import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./Tabs.scss')

export default class Tabs extends Component {
	static propTypes = {
	}

	state = {
		tab: 'terms'
	}

	componentDidMount() {
		let path = this.props.location.pathname,
			end_route = path.substr(path.lastIndexOf('/') + 1)
		if(end_route == 'info') this.setState({tab: 'info'})
		else this.setState({tab: 'terms'})
	}

	render() {
		return(
			<div className="tab_set">
				<a className={classnames({selected: this.state.tab == 'terms'})}
				   onClick={() => { 
				   		this.setState({tab: 'terms'})
				   		this.props.pushState(null, `/set/${this.props.id}`)
				   }}>
					Terms
				</a>
				<a className={classnames({selected: this.state.tab == 'info'})}
					onClick={() => {
						this.setState({tab: 'info'})
						this.props.pushState(null, `/set/${this.props.id}/info`)
					}}>
					Info
				</a>
			</div>
		);
	}
}