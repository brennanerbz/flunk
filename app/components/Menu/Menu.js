import React, { Component, PropTypes } from 'react';
require('./Menu.scss');

class MenuItem extends Component {
	render() {
		const { choice } = this.props;
		return(
			<li onClick={() => this.props.onSelect(choice)} className="menu_item">
				<a className=""><i className="_icon"></i>{choice}</a>
			</li>
		);
	}
}

export default class Menu extends Component {
	static propTypes = {
		rect: PropTypes.function,
		choices: PropTypes.array
	}

	state = {
		menuTop: '',
		menuRight: '',
		menuLeft: ''
	}

	componentDidMount() {
		this.setMenuPositions()
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isOpen && nextProps.rect() !== this.props.rect()) { this.setMenuPositions() }
	}

	setMenuPositions() {
	  const { rect, bounding, set, learn } = this.props;
	  var r = rect(); // measurements
	  if (bounding) {
	  	this.setState({
	  		menuTop: r.top + r.height,
	  		menuRight: r.right,
	  		menuLeft: r.left
	  	});
	  	return;
	  }
	  let height = r.height.replace('px', '')
	  if(learn) {
	  	height = Number(height) + 12 + 'px'
	  } else {
	  	 height = Number(height) + 5 + 'px'
	  }	 
	  let left;
	  if (set) {
	  	left = '55px'
	  } else {
	  	left = '25px'
	  }
	  this.setState({
	    menuTop: height,
	    menuRight: '0px',
	    menuLeft: left
	  })
	}

	renderMenu() {
		const { choices, side } = this.props;
		var mid_styles = {
			top: this.state.menuTop,
			left: this.state.menuLeft
		}
		var right_styles = {
			top: this.state.menuTop,
			right: this.state.menuRight
		}
		var left_styles = {
			top: this.state.menuTop,
			left: this.state.menuLeft
		}
		var _menustyle;
		if(side == 'mid') {
			_menustyle = mid_styles
		}
		if(side == 'right') {
			_menustyle = right_styles
		}
		if(side == 'left') {
			_menustyle = left_styles
		}
		return (
			<div style={_menustyle} className="menu flex_menu">
				<div className="menu_items_scroller">
					<ul className="menu_items">
						{
							choices !== undefined 
							? choices.map((choice, i) => {
								return (
									<MenuItem {...this.props} choice={choice} key={i}/>
								)
							})
							: null
							
						}
					</ul>
				</div>
			</div>
		)
	}

	render() {
		const { isOpen } = this.props;
		return(
			<div>
				{
					isOpen
					? ::this.renderMenu()
					: null
				}
			</div>
		);
	}
}