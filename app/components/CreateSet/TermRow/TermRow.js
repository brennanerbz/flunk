import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TermContent from '../TermContent/TermContent';

export default class TermRow extends Component {
	static propTypes = {
		deleteRow: PropTypes.func,
		setMousePos: PropTypes.func,
		index: PropTypes.number,
		lastIndex: PropTypes.number,
		isMouseOver: PropTypes.bool
	}

	handleDelete = () => {
		const { row, deleteRow } = this.props;
 		deleteRow(row)
	}	

	render() {
		const { row, index } = this.props;
		return(
		<div className="TermRow">
			<a className="TermRow-counter">
				{index}
			</a>
			<div className="TermRow-content">
				<TermContent			
					{...this.props}/>
			</div>
			<div className="TermRow-operations">	
			{this.props.isMouseOver && this.props.lastIndex > 2 &&
					<a className="TermRow-control material-icons"
				   		onClick={this.handleDelete}>
						clear
					</a>
				}
			</div>
		</div>
		);
	}
}

// onFocus={()=> this.props.setMousePos(row)}>
// onMouseOver={() => this.props.setMousePos(row)}
			 // onMouseLeave={() => this.props.setMousePos(0)}>