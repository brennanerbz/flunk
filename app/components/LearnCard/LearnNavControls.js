import React, { Component, PropTypes } from 'react';

export default class Controls extends Component {
	static propTypes = {

	}

	keyDownHandlers = {
		ArrowLeft() {
			() => this.props.skip('prev')
		}, 

		ArrowRight() {
			() => this.props.skip('next')
		}
	}

	handleKeyDown(event) {
	  if (this.keyDownHandlers[event.key]) {
	    this.keyDownHandlers[event.key].call(this, event)
	  }
	}

	render() {
		const left = require('../../assets/arrow_left.png'),
			  right = require('../../assets/arrow_right.png');
		return (
			<div>
				<i 
					style={{cursor: 'pointer'}} 
					className="arrow arrow_left" 
					onClick={() => this.props.skip('prev')}
					onKeyDown={::this.handleKeyDown}
					><img src={left}/>
				</i>
					
				<i 
					style={{cursor: 'pointer'}}
					className="arrow arrow_right"
					onClick={() => this.props.skip('next')}
					onKeyDown={::this.handleKeyDown}
					><img src={right}/>
				</i>
			</div>
		);
	}
}
