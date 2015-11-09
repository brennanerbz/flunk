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
						<button type="button" 
								className="close" 
								data-dismiss="modal" 
								aria-label="Close">
						<span aria-hidden="true">&times;</span>
						<span className="sr-only">Close</span>
						</button>
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
					</div>
				</div>
			</div>
		);
	}
}