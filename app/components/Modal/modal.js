import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./modal.scss')

export default class Modal extends Component {
	static propTypes = {
		
	}

	state = {
		purpose: null
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			$(this.refs.modal).modal()
		}
		$(this.refs.modal).on('hidden.bs.modal', (e) => {
		  	this.props.closeModal()
		})
	}
	
	componentDidUpdate(prevProps) {
		if((!prevProps.open && this.props.open) ) {
			if(this.props.type == 'textarea') setTimeout(() => { $(this.refs.purpose_input).focus() }, 300)
			if(this.props.type == 'share') setTimeout(() => { $(this.refs.share_link).select() }, 300)
		}
	}

	changeVisibilitySettings(val) {
		const { set, updateSet, createSet } = this.props;
		if(set == null) {
			createSet(null, {name: 'visibility', prop: val })
			return;
		}
		if(set !== null) {
			updateSet(set, {name: 'visibility', prop: val })
		}
	}
	changeEditabilitySettings(val) {
		const { set, updateSet, createSet } = this.props;
		if(set == null) {
			createSet(null, {name: 'editability', prop: val })
			return;
		} 
		if(set !== null) {
			updateSet(set, {name: 'editability', prop: val })
		}
	}

	changePurpose() {
		const { set, updateSet, createSet } = this.props;
		let purpose = this.state.purpose;
		if(purpose !== null && purpose.length > 0) {
			if(set == null) createSet(null, { name: 'description', prop: purpose })
			else if (set !== null) updateSet(set, { name: 'description', prop: purpose })
		}
	}

	renderShareBody() {
		return (
			<div className="modal-body">
				<input id="share_link" ref="share_link" type="text" defaultValue="https://ace.com/987389/cog-sci" />
			</div>
		);
	}

	renderSettingsBody() {
		const { set } = this.props;
		return (
			<div className="modal-body no_footer">
				<p className="bold no_bottom_margin">Privacy</p>
				<p className="small_bottom_margin">Who can view?</p>
				<p className="left_margin">
					<label className="radio small_bottom_margin">
						<input ref="public_privacy"
							   type="radio" 
							   defaultChecked={true}
							   checked={set !== null ? set.visibility == 'public' : null}
							   onChange={() => ::this.changeVisibilitySettings('public')} 
							   className="small_right_margin" 
							   value="public"/>
						<span className="small_left_margin">Everyone: &nbsp;</span>
						<span className="normal">
						All users can view this set
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input ref="private_privacy"
							   type="radio" 
							   defaultChecked={false}
							   checked={set !== null ? set.visibility == 'private' : null}
							   onChange={() => ::this.changeVisibilitySettings('private')} 
							   className="small_right_margin" 
							   value="private"/>
						<span className="small_left_margin">Just me: &nbsp;</span>
						<span className="normal">
						Only you can view this set
						</span>
					</label>
				</p>
				<p className="bold no_bottom_margin">Editing</p>
				<p className="small_bottom_margin">Who can edit?</p>
				<p className="left_margin">
					<label className="radio small_bottom_margin">
						<input ref="group_editing"
							   type="radio" 
							   defaultChecked={false}
							   checked={set !== null ? set.editability == 'group' : null}
							   onChange={() => ::this.changeEditabilitySettings('group')}
							   className="small_right_margin"
							   value="group"/>
						<span className="small_left_margin">Group: &nbsp;</span>
						<span className="normal">
						Only members of selected groups can edit
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input ref="admin_editing"
							   type="radio" 
							   defaultChecked={false}
							   checked={set !== null ? set.editability == 'admin' : null}
							   onChange={() => ::this.changeEditabilitySettings('admin')} 
							   className="small_right_margin" 
							   value="admin"/>
						<span className="small_left_margin">Admins: &nbsp;</span>
						<span className="normal">
						Only admins can edit this set
						</span>
					</label>
					<label className="radio small_bottom_margin">
						<input ref="creator_editing"
							   type="radio" 
							   defaultChecked={true}
							   checked={set !== null ? set.editability == 'creator' : null}
							   onChange={() => ::this.changeEditabilitySettings('creator')} 
							   type="radio" 
							   className="small_right_margin" 
							   value="creator"/>
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
		return (
			<div className="modal-body">
				<p>Are you sure you want to delete this set permanently?</p>
			</div>
		)
	}

	renderTextAreaBody() {
		const { set } = this.props;
		return (
			<div className="modal-body">
			<p>
				<label className="inline_block purpose_label" htmlFor="purpose_input">
					Purpose
					<br />
					<span className="normal">(optional)</span>
				</label>
				<textarea id="purpose_input" 
						  ref="purpose_input"
						  onChange={(event) => this.setState({ purpose: event.target.value })}
						  name="purpose_input"
						  className="textarea"
						  type="text"
						  value={set !== null && set.description !== null ? set.description : null}
						  />
				<span className="modal_input_note">Give your set a purpose that describes what it will be used for</span>
			</p>
			</div>
		)
	}

	render() {
		const { type } = this.props;
		return(
			<div ref="modal" 
				 className="modal fade" 
				 id="myModal" 
				 role="dialog" 
				 aria-labelledby="myModalLabel"
				 aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
					<div className={classnames("modal-header", { "settings": type == 'settings' }) }>
						{
							type !== 'settings'
							? 
							<button type="button" 
									className="close" 
									data-dismiss="modal"
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
							{
								type == 'textarea'
								? 'Set purpose'
								: null
							}
							{
								type == 'confirm'
								? 'Delete set'
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
						? ::this.renderSettingsBody(...this.props)
						: null
					}
					{
						type == 'textarea'
						? ::this.renderTextAreaBody(...this.props)
						: null
					}
					{
						type == 'confirm'
						? ::this.renderConfirmBody()
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
							{
								type !== 'confirm'
								? 
								<button type="button" 
										className="button button-primary" 
										data-dismiss='modal'
										onClick={type == 'textarea' ? ::this.changePurpose : null}>
										{
											type == 'textarea'
											? 'Update purpose'
											: 'Done'
										}
								</button>
								: null
							}
							{
								type == 'confirm'
								?
								<button className="button button-danger">
									Delete set
								</button>
								: null
							}
						</div>
						: null
					}
					</div>
				</div>
			</div>
		);
	}
}