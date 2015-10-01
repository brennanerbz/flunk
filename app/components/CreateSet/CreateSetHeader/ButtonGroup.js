import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ButtonGroup extends Component {
	static propTypes = {
		onSave: PropTypes.func
	}

	render() {
        const { onSave } = this.props;
		return(
			<div className="CreateSetHeader-wrapper-buttongroup">
            	<div className="push-right">
            		<div className="Button-set">
            			<button className="button">Share</button>
            			<button className="button button-primary"
                                      onClick={onSave}
                              >Create</button>
            			<button className="button button-icon button-circle">
            				<i className="material-icons icon icon-more">more_horiz</i>
            			</button>           		
            		</div>	            	
            	</div>
            </div>
		);
	}
}