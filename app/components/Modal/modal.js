import React, { Component, PropTypes } from 'react';
require('./modal.scss')

export default class Modal extends Component {
	static propTypes = {
		
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			$(this.refs.modal).modal()
		}
		$(this.refs.modal).on('hidden.bs.modal', (e) => {
		  	this.props.closeModal()
		})
	}

	renderShareBody() {
		return (
			<div className="modal-body">
				<input id="share_link" ref="share_link" type="text" defaultValue="https://ace.com/987389/cog-sci" />
			</div>
		);
	}
	renderSettingsBody() {
		return (
			<div className="modal-body no_footer">
				<p className="bold no_bottom_margin">Privacy</p>
				<p className="small_bottom_margin">Who can view?</p>
				<p className="left_margin">
					<label className="radio small_bottom_margin">
						<input type="radio" className="small_right_margin"/>
						<span className="small_left_margin">Everyone: &nbsp;</span>
						<span className="normal">
						All users can view this set and your progress
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input type="radio" className="small_right_margin"/>
						<span className="small_left_margin">People with a password: &nbsp;</span>
						<span className="normal">
						Only people with a password can use this set
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input type="radio" className="small_right_margin"/>
						<span className="small_left_margin">Just me: &nbsp;</span>
						<span className="normal">
						Only you can view and use this set
						</span>
					</label>
				</p>
				<p className="bold no_bottom_margin">Editing</p>
				<p className="small_bottom_margin">Who can edit?</p>
				<p className="left_margin">
					<label className="radio small_bottom_margin">
						<input type="radio" className="small_right_margin"/>
						<span className="small_left_margin">Everyone: &nbsp;</span>
						<span className="normal">
						All users can edit this set
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input type="radio" className="small_right_margin"/>
						<span className="small_left_margin">Administrators: &nbsp;</span>
						<span className="normal">
						Only admins can edit this set
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input type="radio" className="small_right_margin"/>
						<span className="small_left_margin">Just me: &nbsp;</span>
						<span className="normal">
						Only you can edit this set
						</span>
					</label>
				</p>
			</div>
		)
	}
	renderConfirmBody() {

	}
	renderTextAreaBody() {

	}

	render() {
		const { type } = this.props;
		console.log(type)
		return(
			<div ref="modal" 
				 className="modal fade" 
				 id="myModal" 
				 role="dialog" 
				 aria-labelledby="myModalLabel"
				 aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
					<div className="modal-header">
						{
							type !== 'settings'
							? 
							<button type="button" 
									className="close" 
									
									aria-label="Close">
							<span aria-hidden="true">&times;</span>
							<span className="sr-only">Close</span>
							</button>
							: null
						}
						{
							type == 'settings'
							? <button type="button"
									  className="button button-primary button-small float_right"
									  data-dismiss="modal" >
							  Done
							  </button>
							: null
						}
						<h3 className="modal-title" id="myModalLabel">
							{
								type == 'share'
								? 'Share this study study set'
								: null
							}
							{
								type == 'settings'
								? `Settings` 
								: null
							}
						</h3>
					</div>
					{
						type == 'share'
						? ::this.renderShareBody()
						: null
					}
					{
						type == 'settings'
						? ::this.renderSettingsBody()
						: null
					}
					{
						type !== 'settings'
						?
						<div className="modal-footer">
							<button type="button" 
									className="button button-outline" 
									data-dismiss="modal">
									Cancel
							</button>
							<button type="button" 
									className="button button-primary" 
									data-dismiss="modal">
									Done
							</button>
						</div>
						: null
					}
					</div>
				</div>
			</div>
		);
	}
}