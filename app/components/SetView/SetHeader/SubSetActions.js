import React, { Component, PropTypes } from 'react';
import Menu from '../../Menu/Menu';
import classnames from 'classnames';
import Modal from '../../Modal/modal';

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
		modal_open: false,
		modal_type: null,
		more_is_open: false,
		set_choices: ['Edit', 'Copy', 'Change privacy'],
		create_choices: ['Add a purpose', '|', 'Privacy', 'Editability', '|', 'Delete set']
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

	toggleModal(value) {
		$('[data-toggle="tooltip"]').tooltip('hide')
		this.setState({ 
			modal_open: true,
			modal_type: value
		});
	}

	render() {
		const { set, createset } = this.props,
			member_icon = require('../../../assets/profile_icon.png'),
			share_icon = require('../../../assets/share_icon.png'),
			more_icon = require('../../../assets/more_icon.png');
		let dir;
		if(this.props.right) {
			dir = 'right'
		}
		if(this.props.left) {
			dir = 'left'
		}
		return(
			<div style={secondary_actions} className="secondary_actions">
				<button className={classnames('toggle_btn')}
					    onClick={() => ::this.toggleModal('share')}
				   		ref="share"				   
				   		title="Share"
				   		data-toggle="tooltip" 
				  		data-placement="bottom">
					<i className="">
						<img style={_icon} className="share_icon" src={share_icon}/>
					</i>					
				</button>

				<Modal  open={this.state.modal_open} 
						closeModal={() => this.setState({ modal_open: false })}
						type={this.state.modal_type}
						{...this.props} />

				<button onClick={::this.openMenu} 
						onBlur={() => setTimeout(() => { ::this.closeMenu() }, 150)} 
						className={classnames('toggle_btn', {'active': this.state.more_is_open})}
						ref="more"				   
						title="More actions"
						data-toggle="tooltip" 
						data-placement="bottom" >
					<i className="">
						<img style={_smallicon} className="share_icon" src={more_icon}/>
					</i>					
				</button>
				
				<Menu 	set={this.props.set}
					  	isOpen={this.state.more_is_open}
					  	side={dir}
					  	rect={::this.findPos}
					  	ref="more_actions"
					  	choices={createset ? this.state.create_choices : this.state.set_choices}
						onSelect={(_choice) => {
							let type,
								choice = _choice.toLowerCase().trim()
							if(choice.indexOf('privacy') !== -1) type = 'settings'
							else if(choice.indexOf('edit') !== -1) type = 'settings'
							else if(choice.indexOf('delete') !== -1) type = 'confirm'
							else if(choice.indexOf('add') !== -1) type = 'textarea'
							this.setState({
								modal_open: true,
								modal_type: type
							})
						}
				  }/>			
			</div>
		);
	}
}



// <div style={member_count_container}>
// 					<span style={_member_count_style} className="member_count">
// 						<img src={member_icon} style={_member_styles} className="member_icon"/>
// 						{set.member_count}
// 					</span>
// 				</div>








