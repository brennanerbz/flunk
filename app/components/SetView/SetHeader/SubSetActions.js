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

	toggleModal() {
		$('[data-toggle="tooltip"]').tooltip('hide')
		$(this.refs.share_modal).modal()
		setTimeout(() => {
			this.refs.share_link.select()
		}, 300)		
	}

	render() {
		const { set } = this.props,
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
					    onClick={::this.toggleModal}
				   		ref="share"				   
				   		title="Share"
				   		data-toggle="tooltip" 
				  		data-placement="bottom">
					<i className="">
						<img style={_icon} className="share_icon" src={share_icon}/>
					</i>					
				</button>

				<div ref="share_modal" className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				          <span className="sr-only">Close</span>
				        </button>
				        <h3 className="modal-title" id="myModalLabel">Share study set</h3>
				      </div>
				      <div className="modal-body">
				      	<input id="share_link" ref="share_link" type="text" value="https://ace.com/987389/cog-sci" />
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="button button-outline" data-dismiss="modal">Cancel</button>
				        <button type="button" className="button button-primary" data-dismiss="modal">Done</button>
				      </div>
				    </div>
				  </div>
				</div>

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
				<Menu 
					  set={this.props.set}
					  isOpen={this.state.more_is_open}
					  side={dir}
					  rect={::this.findPos}
					  ref="more_actions"
					  choices={this.state.choices}
					  onSelect={(choice) => console.log(choice)}/>			
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








