import React, { Component, PropTypes } from 'react';
import Menu from '../../Menu/Menu';
import classnames from 'classnames';

//TODO: replace the inline-styles with scss file

var _member_styles = {
	display: 'inline-block',
	verticalAlign: 'middle',
	height: '15px',
	opacity: '0.6',
	marginRight: '5px'
}
var _member_count_style = {
	display: 'inline-block',
	verticalAlign: 'middle',
	color: '#555549',
	marginRight: '5px'
}
var secondary_actions = {
	position: 'relative',
	display: 'inline-flex',
	verticalAlign: 'middle'
}
var _icon = {
	position: 'absolute',
	display: 'inline-block',
	height: '18px',
	top: '6px',
	left: '10px',
	opacity: '0.8'
}
var _smallicon = {
	position: 'absolute',
	display: 'inline-block',
	height: '5px',
	top: '13px',
	left: '8px',
	opacity: '0.8'
}
var member_count_container = {
	paddingTop: '5px'
}

export default class SubSetActions extends Component {
	static propTypes = {
	}

	state = {
		more_is_open: false,
		choices: ['Edit', 'Copy', 'Change privacy']
	}	

	componentDidMount() {
		$('[data-toggle="tooltip"]').tooltip({
			delay: { show: 1000, hide: 50},
			template: '<div class="tooltip bottom_tool" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		})
	}

	findPos() {
		let node = this.refs.more
		const rect = window.getComputedStyle(node)
		return rect;
	}

	openMenu() {
		$('[data-toggle="tooltip"]').tooltip('hide')
		if (this.state.more_is_open) {
			this.setState({
				more_is_open: false
			});
			return;
		}
		this.setState({
			more_is_open: true
		});
	}
	closeMenu() {
		this.setState({
			more_is_open: false
		});
	}

	render() {
		const { set } = this.props;
		const member_icon = require('../../../assets/profile_icon.png');
		const share_icon = require('../../../assets/share_icon.png');
		const more_icon = require('../../../assets/more_icon.png')
		return(
			<div style={secondary_actions} className="secondary_actions">
				<div style={member_count_container}>
					<span style={_member_count_style} className="member_count">
						<img src={member_icon} style={_member_styles} className="member_icon"/>
						{set.member_count}
					</span>
				</div>
				<button className="toggle_btn"
				   		ref="share"				   
				   		title="Share"
				   		data-toggle="tooltip" 
				  		data-placement="bottom" >
					<i className="">
						<img style={_icon} className="share_icon" src={share_icon}/>
					</i>					
				</button>
				<button onClick={::this.openMenu} 
						onBlur={::this.closeMenu} 
						className={classnames('toggle_btn', {'active': this.state.more_is_open})}
						ref="more"				   
						title="More actions"
						data-toggle="tooltip" 
						data-placement="bottom" >
					<i className="">
						<img style={_smallicon} className="share_icon" src={more_icon}/>
					</i>					
				</button>
				<Menu isOpen={this.state.more_is_open}
					  side="mid"
					  rect={::this.findPos}
					  ref="more_actions"
					  choices={this.state.choices}
					  onSelect={(choice) => console.log(choice)}/>			
			</div>
		);
	}
}










