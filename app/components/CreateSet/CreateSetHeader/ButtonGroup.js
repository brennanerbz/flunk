import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import SubSetActions from '../../SetView/SetHeader/SubSetActions';

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
                        <button className="button button-primary"
                                      onClick={onSave}
                              >Create</button>
            			 <SubSetActions right={true} />	
            		</div>	            	
            	</div>
            </div>
		);
	}
}