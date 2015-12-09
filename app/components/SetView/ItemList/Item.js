import React, { Component, PropTypes } from 'react';

import ItemProgress from './ItemProgress';
import ItemContent from './ItemContent';
import ItemActions from './ItemActions';


export default class Item extends Component {
	static propTypes = {
	}

	state = {
		mouseIsOver: false
	}

	render() {
		return(
			<li 
				onMouseOver={() => this.setState({
					mouseIsOver: true
				})}
				onMouseLeave={() => this.setState({
					mouseIsOver: false
				})}>
				<ItemProgress {...this.props} />
				<ItemContent {...this.props}/>
				<ItemActions
					mouseIsOver={this.state.mouseIsOver}
				/>
			</li>
		);
	}
}

