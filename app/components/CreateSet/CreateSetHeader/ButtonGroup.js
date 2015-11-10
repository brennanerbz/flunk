import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import SubSetActions from '../../SetView/SetHeader/SubSetActions';

export default class ButtonGroup extends Component {
	static propTypes = {
		onSave: PropTypes.func
	}

	render() {
        const { onSave, set } = this.props;
		return(
			<div className="CreateSetHeader-wrapper-buttongroup">
            	<div className="push-right">
            		<div className="Button-set">
                        <button className={classnames("button button-primary", {"disaje": set == null })}
                                onClick={onSave}>
                                Create
                        </button>
            			<SubSetActions right={true} createset={true} {...this.props} />	
            		</div>	            	
            	</div>
            </div>
		);
	}
}